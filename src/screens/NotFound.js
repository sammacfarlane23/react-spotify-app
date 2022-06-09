import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import Layout from "../components/Layout";

const NotFound = () => {
  return (
    <Layout>
      <Box
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography color="white" variant="h5">
          Oops, that page doesn't exist
        </Typography>
        <Button
          sx={{
            mt: 5,
            maxWidth: 200,
          }}
          variant="contained"
          fullWidth={true}
          href="/"
        >
          Go home
        </Button>
      </Box>
    </Layout>
  );
};

export default NotFound;
