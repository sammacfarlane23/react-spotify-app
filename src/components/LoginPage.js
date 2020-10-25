import React from 'react';
import { redirectUrlToSpotifyForLogin } from '../spotifyFunctions';

export default () => {
  return (
    <div className='login-page'>
      <div className='login-page__box'>
        <h1>Spotifyre</h1>
        <p>Login to see your most played tracks and artists on Spotify</p>
        <a href={redirectUrlToSpotifyForLogin()}>Continue with Spotify</a>
      </div>
    </div>
  );
};
