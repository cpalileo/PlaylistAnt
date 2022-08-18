const { AuthenticationError } = require("apollo-server-express");
const { User, Playlist } = require("../models");
const { signToken } = require("../utils/auth");

const clientId = "d832a28cf8dc48a39964ead771a95c73";
require("dotenv").config();

const clientSecret = process.env.CLIENT_SECRET;
const SpotifyWebApi = require("spotify-web-api-node");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("playlists")
          .populate("songs");

        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },
    users: async () => {
      return User.find()
        .select("-__v -password")
        .populate("playlists")
        .populate("songs");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("songs")
        .populate("playlists");
    },
    playlists: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Playlist.find(params).sort({ createdAt: -1 });
    },
    playlist: async (parent, { _id }) => {
      return Playlist.findOne({ _id });
    },

    search: async (parent, { searchTerm }) => {
      const spotifyApi = new SpotifyWebApi({
        clientId: clientId,
        clientSecret: clientSecret,
      });

      const data = await spotifyApi.clientCredentialsGrant();
      spotifyApi.setAccessToken(data.body["access_token"]);

      const results = await spotifyApi.searchPlaylists(searchTerm, {
        limit: 2,
      });

      const playlist = await spotifyApi.getPlaylist(
        results.body.playlists.items[0].id
      );

      const tracks = playlist.body.tracks.items.map((el) => {
        const artist = el.track.artists.map((artist) => artist.name);
        return {
          ...el.track,
          image: el.track.album.images[0].url,
          artist: artist,
        };
      });

      return tracks;
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
    addPlaylist: async (parent, args, context) => {
      if (context.user) {
        const playlist = await Playlist.create({
          ...args,
          username: context.user.username,
        });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { playlists: playlist._id } },
          { new: true }
        );

        return playlist;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    addReaction: async (parent, { playlistId, reactionBody }, context) => {
      if (context.user) {
        const updatedPlaylist = await Playlist.findOneAndUpdate(
          { _id: playlistId },
          {
            $push: {
              reactions: { reactionBody, username: context.user.username },
            },
          },
          { new: true, runValidators: true }
        );

        return updatedPlaylist;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    addSong: async (parent, { songId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { songs: songId } },
          { new: true }
        ).populate("songs");

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;

// const { User, Playlists } = require("../models");

// const resolvers = {
//   Query: {
//     playlists: async (parent, { username }) => {
//       const params = username ? { username } : {};
//       return Playlists.find(params).sort({ createdAt: -1 });
//     },
//   },
// };

// module.exports = resolvers;
