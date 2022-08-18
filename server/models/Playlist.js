const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");
const dateFormat = require("../utils/dateFormat");

const playlistSchema = new Schema(
  {
    playlistName: {
      type: String,
    },
    tracks: {
      type: Array,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

playlistSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Playlist = model("Playlist", playlistSchema);

module.exports = Playlist;
