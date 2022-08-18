// const faker = require('faker');
const userSeeds = require("./userSeed.json");
const playlistSeeds = require("./playlistSeed.json");
const db = require("../config/connection");
const { Playlist, User } = require("../models");
const mongoose = require("mongoose")
db.once("open", async () => {
  try {
    await Playlist.deleteMany({});
    await User.deleteMany({});

    const playlists = await Playlist.create(playlistSeeds);



    const userMap = userSeeds.map(user=>{
      return{...user, playlists:[mongoose.Types.ObjectId(playlists[0]._id)]}
    })

    for (const user of userMap) {
      const users = await User.create(user);
      console.log(users)
      
    }
  
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("all done!");
  process.exit(0);
});
