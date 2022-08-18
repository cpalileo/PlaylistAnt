import React, { useState } from "react";
import { QUERY_SEARCHPLAYLISTS } from "../../utils/queries";
import { useLazyQuery } from "@apollo/client";
import "./SearchBar.css";

export default function SearchBar() {
  const [inputState, setInputState] = useState();
  const [getPlaylist, { loading, error, data }] = useLazyQuery(
    QUERY_SEARCHPLAYLISTS
  );

  const [songs, setSongs] = useState([]);

  function handleSearchClick(event) {
    event.preventDefault();

    getPlaylist({ variables: { searchTerm: inputState } });
    // We do fetching here
  }

  console.log(data);

  const handleChange = (event) => {
    const { value } = event.target;
    setInputState(value);
    console.log("Hey you made it to the handleChange function!")
  };

  function handleSongChange(song) {
    const inArray = songs.findIndex((track) => track === song.id);
    console.log();
    if (inArray > -1) {
      songs.splice(inArray, 1);
      console.log(song.id + " was removed from playlist. WOOT!");
      console.log(songs);
    } else {
      // setSongs([...songs, song]);
      songs.push(song.id);
      console.log(song.name + " was added to playlist. YAY!");
      console.log(songs);
    }
  }

  function savePlaylist() {
    // use graphql mutation to create playlist
    //songs;
  }

  return (
    <div>
      <form>
        <label htmlFor="search" className="form-label mb-4">
          Enter a genre, artist or activity:
        </label>
        <input
          placeholder="What do you want to listen to?"
          onChange={handleChange}
          className="form-input mb-4"
        />
      </form>

      {/* search button */}
      <button
        onClick={handleSearchClick}
        className="btn d-block mb-4 w-100"
      >
        {" "}
        Search{" "}
      </button>

      {data?.search ? (
        <div>
          <button className="saveButton" onClick={() => savePlaylist()}>
            Save to Playlist
          </button>

          {data.search.map((el, index) => {
            return (
              <div key={index} style={{background:"rgba(245,245,245,0.1)", padding:"5%"}}>
                
                {/* First row  */}
                <div className="displayrow">
                  <input
                    className="select-box mr-4"
                    type="checkbox"
                    onChange={() => handleSongChange(el)}
                  />
                  </div>

                    {" "}
                    <h3 className="mb-3">{el.name}</h3>
                    <h4 className="mb-4">{el.artist.join(", ")}</h4>
                
               
                  <img src={el.image} className="musicimg"/>

                  {/* audio preview  */}
                  <div className="audio">
                  {el.preview_url && (
                    <audio
                      controls="controls"
                      src={el.preview_url}
                      autostart="0"
                      style={{margin:"5% 0"}}
                    ></audio>
                  )}
                  </div>

                {/* popularity bar  */}
                <div className="bar">
                  <p style={{ position: "absolute", fontSize: "18px", padding:"0 10%", fontWeight:"bolder" }}>
                    Popularity
                  </p>
                  <div
                    className="bar-inner"
                    style={{ width: el.popularity + "%" }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
