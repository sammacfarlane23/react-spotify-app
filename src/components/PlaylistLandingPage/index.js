import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Link } from "@reach/router";

const PlaylistLandingPage = () => {
  return (
    <Box>
      <Typography variant="h4">
        Exciting things coming on this page soon...
      </Typography>
      <Typography paragraph={true}>Explore:</Typography>
      <Box>
        <Link to="/">Top Artists</Link>
        <Link to="/tracks">Top Tracks</Link>
      </Box>
    </Box>
  );
};

export default PlaylistLandingPage;
