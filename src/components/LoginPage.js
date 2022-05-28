import { Link, Typography } from "@mui/material";
import Box from "@mui/material/Box";

import DesktopBackground from "../images/login-image-desktop.jpg";
import MobileBackground from "../images/login-image-mobile.jpg";
import { redirectUrlToSpotifyForLogin } from "../spotifyFunctions";

const LoginPage = () => {
  // @TODO Write some working logic that redirects any pathname to /login
  // useEffect(() => {
  //   if (hash.split("=")[0] !== "#access_token" && pathname !== "/login") {
  //     console.log({ pathname, hash: hash.split("=")[0] });
  //     navigate("/login");
  //   }
  // }, [hash, pathname]);

  return (
    <Box
      sx={{
        backgroundImage: {
          xs: `url(${MobileBackground})`,
          md: `url(${DesktopBackground})`,
        },
        backgroundSize: "cover",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          background: "hsla(0, 0%, 100%, 0.95)",
          boxShadow: "0px 10px 20px 0px rgba(50, 50, 50, 0.52)",
          color: "#000",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "18rem",
          px: 2,
          py: 4,
          textAlign: "center",
        }}
      >
        <Typography
          sx={{ color: "#000", fontWeight: "700", fontSize: "2rem", mb: 1 }}
          variant="h1"
        >
          Spotify App
        </Typography>
        <Typography paragraph={true}>
          Login to see your most played tracks and artists on Spotify
        </Typography>
        <Link
          sx={{ color: "#fff", textDecoration: "none", mx: 4 }}
          href={redirectUrlToSpotifyForLogin()}
        >
          Continue with Spotify
        </Link>
        <Typography
          variant="caption"
          sx={{ color: "white", position: "fixed", bottom: 0, mb: 2 }}
        >
          Designed and developed by Sam MacFarlane &#169; 2022
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginPage;
