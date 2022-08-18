import React from "react";
import { Link } from "react-router-dom";

const PlaylistList = ({ playlists, title }) => {
  if (!playlists.length) {
    return <h3 className="mt-5 mb-3 mx-5"> No Playlists Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {playlists &&
        playlists.map((playlist) => (
          <div key={playlist._id} className="card mb-3">
            <p className="card-header">
              <Link
                to={`/profile/${playlist.username}`}
                style={{ fontWeight: 700 }}
                className="text-light"
              >
                {playlist.username}
              </Link>{" "}
              playlist on {playlist.createdAt}
            </p>
            <div className="card-body">
              <Link to={`/playlist/${playlist._id}`}>
                <p>{playlist.playlistName}</p>
                <p className="mb-0">
                  Reactions: {playlist.reactionCount} || Click to{" "}
                  {playlist.reactionCount ? "see" : "start"} the discussion!
                </p>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PlaylistList;
