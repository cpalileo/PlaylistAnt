import { gql } from "@apollo/client";

export const QUERY_THOUGHTS = gql`
  query playlists($username: String) {
    playlists(username: $username) {
      _id
      playlistName
      createdAt
      username
      reactionCount
      reactions {
        _id
        createdAt
        username
        reactionBody
      }
    }
  }
`;

export const QUERY_SEARCHPLAYLISTS = gql`
  query search($searchTerm: String!) {
    search(searchTerm: $searchTerm) {
      duration_ms
      href
      id
      name
      popularity
      preview_url
      image
      artist
    }
  }
`;

export const QUERY_THOUGHT = gql`
  query playlist($id: ID!) {
    playlist(_id: $id) {
      _id
      playlistName
      createdAt
      username
      reactionCount
      reactions {
        _id
        createdAt
        username
        reactionBody
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      friendCount
      friends {
        _id
        username
      }
      playlists {
        _id
        playlistName
        createdAt
        reactionCount
      }
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      friendCount
      playlists {
        _id
        playlistName
        createdAt
        reactionCount
        reactions {
          _id
          createdAt
          reactionBody
          username
        }
      }
      friends {
        _id
        username
      }
    }
  }
`;

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
      friendCount
      friends {
        _id
        username
      }
    }
  }
`;
