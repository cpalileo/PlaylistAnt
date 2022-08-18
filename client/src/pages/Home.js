import React from "react";
import PlaylistList from "../components/PlaylistList";
import PlaylistForm from "../components/PlaylistForm";
import FriendList from "../components/FriendList";
import SearchBar from "../components/SearchBar"

import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_THOUGHTS, QUERY_ME_BASIC } from "../utils/queries";

const Home = () => {
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const { data: userData } = useQuery(QUERY_ME_BASIC);
  const playlists = data?.playlists || [];

  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <SearchBar />
      {/* <div className="flex-row justify-space-between">
        {loggedIn && (
          <div className="col-12 mb-3">
            <PlaylistForm />
          </div>
        )}
        <div className={`col-12 mb-3 ${loggedIn && "col-lg-8"}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <PlaylistList
              playlists={playlists}
              title="Your place for playlists..."
            />
          )}
        </div>
        {loggedIn && userData ? (
          <div className="col-12 col-lg-3 mb-3">
            <FriendList
              username={userData.me.username}
              friendCount={userData.me.friendCount}
              friends={userData.me.friends}
            />
          </div>
        ) : null}
      </div> */}

    </main>
  );
};

export default Home;
