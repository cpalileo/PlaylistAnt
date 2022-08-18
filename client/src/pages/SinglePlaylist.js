import React from "react";
import { useParams } from "react-router-dom";

import ReactionList from "../components/ReactionList";
import ReactionForm from "../components/ReactionForm";

import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_THOUGHT } from "../utils/queries";

const SinglePlaylist = (props) => {
  const { id: playlistId } = useParams();

  const { loading, data } = useQuery(QUERY_THOUGHT, {
    variables: { id: playlistId },
  });

  const playlist = data?.playlist || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {playlist.username}
          </span>{" "}
          playlist on {playlist.createdAt}
        </p>
        <div className="card-body">
          <p>{playlist.playlistName}</p>
        </div>
      </div>

      {playlist.reactionCount > 0 && (
        <ReactionList reactions={playlist.reactions} />
      )}

      {Auth.loggedIn() && <ReactionForm playlistId={playlist._id} />}
    </div>
  );
};

export default SinglePlaylist;
