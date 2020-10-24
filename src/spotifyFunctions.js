import Spotify from 'spotify-web-api-js';

const spotifyApi = new Spotify();
require('dotenv').config();

let globalAccessToken = '';

export function redirectUrlToSpotifyForLogin() {
  const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const REDIRECT_URI =
    process.env.NODE_ENV === 'production'
      ? process.env.REACT_APP_SPOTIFY_PRODUCTION_REDIRECT_URI
      : process.env.REACT_APP_SPOTIFY_DEVELOPMENT_REDIRECT_URI;
  const scopes = [
    'user-read-private',
    'user-read-email',
    'user-read-playback-state',
    'user-top-read',
  ];
  return (
    'https://accounts.spotify.com/authorize?client_id=' +
    CLIENT_ID +
    '&redirect_uri=' +
    encodeURIComponent(REDIRECT_URI) +
    '&scope=' +
    encodeURIComponent(scopes.join(' ')) +
    '&response_type=token'
  );
}

export function setAccessToken(accessToken) {
  //since using spotifyApi as helper library you can set the access code once
  //you get it and then not have to include it in every request
  spotifyApi.setAccessToken(accessToken);
  globalAccessToken = accessToken;
}

export async function getUserPlaylists() {
  //returns an array of objects with playlist name (like "Favorite Smashing Pumpkins jamz")
  //and the id of the playlist. Use this to feed the playlists selection list
  try {
    const playlistsResponse = await spotifyApi.getUserPlaylists();
    //playlistsResponse.items are the actual playlist objects
    const playlists = playlistsResponse.items.map((playlistObject) => {
      const { id, name } = playlistObject;
      return { id: id, playlistName: name };
    });
    return playlists;
  } catch (err) {
    //return default array with note that can't download playlists
    console.error('Error: Attempting to get user playlists', err);
    console.error(err.stack);
    return [{ id: null, playlistName: "Can't Download your Playlists!" }];
  }
}
