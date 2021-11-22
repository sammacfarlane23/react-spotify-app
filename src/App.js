import React, { useState, useEffect } from "react";
import queryString from "query-string";

import spotifyApi from "./spotifyFunctions";
import LoginPage from "./components/LoginPage";
import MainContent from "./components/MainContent";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const params = queryString.parse(window.location.hash);
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
      setLoggedIn(true);
    }
  }, []);

  return loggedIn ? <MainContent /> : <LoginPage />;
};

export default App;
