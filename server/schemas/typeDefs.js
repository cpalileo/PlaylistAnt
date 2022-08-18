const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    songCount: Int
    playlists: [Playlist]
    songs: [User]
  }

  type Playlist {
    _id: ID
    playlistName: String
    createdAt: String
    username: String
    reactionCount: Int
    reactions: [Reaction]
  }

  type Reaction {
    _id: ID
    reactionBody: String
    createdAt: String
    username: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Track {
    duration_ms: Int
    href: String
    id: String
    name: String
    popularity: Int
    preview_url: String
    image: String
    artist: [String]
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    playlists(username: String): [Playlist]
    playlist(_id: ID!): Playlist
    search(searchTerm: String): [Track]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addPlaylist(playlistName: String!): Playlist
    addReaction(playlistId: ID!, reactionBody: String!): Playlist
    addSong(songId: ID!): User
  }
`;

module.exports = typeDefs;

// // import the gql tagged template function
// const { gql } = require("apollo-server-express");

// // create our typeDefs

// const typeDefs = gql`
//   type Playlists {
//     _id: ID
//     playlistsName: String
//     createdAt: String
//     username: String
//   }
//   type Query {
//     playlists(username: String): [Playlists]
//   }
// `;

// // export the typeDefs
// module.exports = typeDefs;
