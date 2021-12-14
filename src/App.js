import React, { useState, useEffect } from "react";
import { Router, navigate } from "@reach/router";
import queryString from "query-string";
import Cookies from "js-cookie";

import spotifyApi from "./spotifyFunctions";
import LoginPage from "./components/LoginPage";
import ArtistsPage from "./screens/Artists";
import TracksPage from "./screens/Tracks";
import PlaylistsPage from "./screens/Playlists";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const params = queryString.parse(window.location.hash);
    const token = params.access_token || Cookies.get("access_token");
    // @TODO Do something about access token expiring
    if (token) {
      spotifyApi.setAccessToken(token);
      Cookies.set("access_token", token);
      navigate(window.location.pathname);
      setLoggedIn(true);
      return;
    }
    setLoggedIn(false);
  }, []);

  return (
    <>
      <Router>
        {loggedIn ? (
          <>
            <ArtistsPage path="/" />
            <TracksPage path="/tracks" />
            <PlaylistsPage path="/playlists" />
          </>
        ) : (
          <LoginPage path="/" />
        )}
      </Router>
    </>
  );
};

export default App;
