import Spotify from "spotify-web-api-js";

const spotifyApi = new Spotify();
require("dotenv").config();

export const redirectUrlToSpotifyForLogin = () => {
  const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const REDIRECT_URI = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;

  const scopes = [
    "user-read-private",
    "user-read-email",
    "user-read-playback-state",
    "user-top-read",
    "playlist-modify-private",
  ];

  return (
    "https://accounts.spotify.com/authorize?client_id=" +
    CLIENT_ID +
    "&redirect_uri=" +
    encodeURIComponent(REDIRECT_URI) +
    "&scope=" +
    encodeURIComponent(scopes.join(" ")) +
    "&response_type=token"
  );
};

export default spotifyApi;
