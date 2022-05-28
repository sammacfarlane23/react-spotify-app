import { useState, useEffect } from "react";
import { Router, navigate } from "@reach/router";
import queryString from "query-string";
import Cookies from "js-cookie";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import spotifyApi from "./spotifyFunctions";
import LoginPage from "./components/LoginPage";
import ArtistsPage from "./screens/Artists";
import TracksPage from "./screens/Tracks";
import PlaylistsPage from "./screens/Playlists";
import NotFoundPage from "./screens/NotFound";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1db954",
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: "#000000",
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#000000",
          color: "white",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        root: {
          backgroundColor: "#000000",
          color: "white",
        },
      },
    },
  },
});

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const params = queryString.parse(window.location.hash);
    const token = params.access_token || Cookies.get("access_token");
    if (token) {
      spotifyApi.setAccessToken(token);
      Cookies.set("access_token", token, { expires: 1 / 24 });
      navigate(window.location.pathname);
      setLoggedIn(true);
      return;
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        {loggedIn ? (
          <>
            <ArtistsPage path="/" />
            <TracksPage path="/tracks" />
            <PlaylistsPage path="/playlists" />
            <LoginPage path="/login" />
            <NotFoundPage default />
          </>
        ) : (
          <LoginPage path="*" />
        )}
      </Router>
    </ThemeProvider>
  );
};

export default App;
