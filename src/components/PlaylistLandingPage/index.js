import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Link } from "@reach/router";

const PlaylistLandingPage = () => {
  return (
    <Box color="white" sx={{ px: 3 }}>
      <Typography sx={{ mt: 5 }} variant="h4">
        Exciting things coming here soon...
      </Typography>
      <Typography sx={{ mt: 5 }} paragraph={true}>
        Explore:
      </Typography>
      <Box
        display="flex"
        justifyContent="space-around"
        sx={{ mt: 3, width: "100%" }}
      >
        <Box>
          <Link to="/">My Top Artists</Link>
        </Box>
        <Box>
          <Link to="/tracks">My Top Tracks</Link>
        </Box>
      </Box>
    </Box>
  );
};

export default PlaylistLandingPage;
