// import React, { useState } from "react";

// import { useMutation } from "@apollo/client";
// import { ADD_THOUGHT } from "../../utils/mutations";
// import { QUERY_THOUGHTS, QUERY_ME } from "../../utils/queries";

// const PlaylistForm = () => {
//   const [playlistName, setText] = useState("");
//   const [characterCount, setCharacterCount] = useState(0);

//   const [addPlaylist, { error }] = useMutation(ADD_THOUGHT, {
//     update(cache, { data: { addPlaylist } }) {
//       // could potentially not exist yet, so wrap in a try/catch
//       try {
//         // update me array's cache
//         const { me } = cache.readQuery({ query: QUERY_ME });
//         cache.writeQuery({
//           query: QUERY_ME,
//           data: { me: { ...me, playlists: [...me.playlists, addPlaylist] } },
//         });
//       } catch (e) {
//         console.warn("First playlist insertion by user!");
//       }

//       // update playlist array's cache
//       const { playlists } = cache.readQuery({ query: QUERY_THOUGHTS });
//       cache.writeQuery({
//         query: QUERY_THOUGHTS,
//         data: { playlists: [addPlaylist, ...playlists] },
//       });
//     },
//   });

//   // update state based on form input changes
//   const handleChange = (event) => {
//     if (event.target.value.length <= 280) {
//       setText(event.target.value);
//       setCharacterCount(event.target.value.length);
//     }
//   };

//   // submit form
//   const handleFormSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       await addPlaylist({
//         variables: { playlistName },
//       });

//       // clear form value
//       setText("");
//       setCharacterCount(0);
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   return (
//     <div> 
//       {/* <p
//         className={`m-0 ${characterCount === 280 || error ? "text-error" : ""}`}
//       >
//         Character Count: {characterCount}/280
//         {error && <span className="ml-2">Something went wrong...</span>}
//       </p> */}
//       <form
//         className="flex-row justify-center justify-space-between-md align-stretch"
//         onSubmit={handleFormSubmit}
//       >
//         {/* <textarea
//           placeholder="Search for Music"
//           value={playlistName}
//           className="form-input col-12 col-md-9"
//           onChange={handleChange}
//         ></textarea>
//         <button className="btn col-12 col-md-3" type="submit">
//           Search
//         </button> */}
//       </form>
//     </div>
//   );
// };

// export default PlaylistForm;
