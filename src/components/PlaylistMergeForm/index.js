import { useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import find from "lodash/find";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { Paper } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  textFieldRoot: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        // - The <fieldset> inside the Input-root
        borderColor: "#fff", // - Set the Input border
      },
      "&:hover fieldset": {
        borderColor: "#fff", // - Set the Input border when parent has :hover
      },
      "&.Mui-focused fieldset": {
        // - Set the Input border when parent is focused
        borderColor: "#fff",
      },
    },
  },
  selectFieldRoot: {
    color: "#fff !important",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        // - The <fieldset> inside the Input-root
        borderColor: "#fff", // - Set the Input border
      },
      "&:hover fieldset": {
        borderColor: "#fff", // - Set the Input border when parent has :hover
      },
      "&.Mui-focused fieldset": {
        // - Set the Input border when parent is focused
        borderColor: "#fff",
      },
    },
  },
  addPlaylistButton: {
    border: "2px solid #fff",
    "&:hover": {
      border: "2px solid #fff",
      color: "black",
      backgroundColor: "#fff",
    },
  },
  createNewPlaylistButton: {
    "&:hover": {
      backgroundColor: "#fff",
      color: "#000",
    },
  },
  deleteButton: {
    cursor: "pointer",
  },
}));

const PlaylistMergeForm = ({
  createNewPlaylist,
  items,
  playlistName,
  setPlaylistName,
}) => {
  const [playlists, setPlaylists] = useState([
    { playlist: null },
    { playlist: null },
  ]);

  const classes = useStyles();

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Paper
        variant="elevation"
        elevation={20}
        sx={{
          // backgroundColor: "#212121",
          backgroundImage: "linear-gradient(to bottom left, #000, #313131)",
          mt: 5,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          maxWidth: { md: "80%" },
        }}
      >
        <Box
          component="form"
          onSubmit={async (e) => {
            e.preventDefault();
            await createNewPlaylist(playlists);
          }}
          sx={{ p: 4, maxWidth: { md: 500 }, width: { md: "100%" } }}
          display="flex"
          flexDirection="column"
        >
          <Typography
            variant="h1"
            sx={{ mb: 3, fontWeight: "500" }}
            color="#fff"
          >
            <span style={{ color: "#1db954" }}>Merge</span> Your Playlists
          </Typography>

          <TextField
            label="New playlist name"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            placeholder="A great name for your new playlist..."
            classes={{ root: classes.textFieldRoot }}
            sx={{ backgroundColor: "#414141", mb: 5 }}
          />
          <Box textAlign="center">
            <Typography
              variant="h6"
              sx={{ mb: 2, fontWeight: "500" }}
              color="#fff"
            >
              {playlists.length === 0 ? (
                <>Click the button below select playlists to merge</>
              ) : (
                <>Playlists to Merge</>
              )}
            </Typography>
          </Box>

          <Box sx={{ mb: 5 }}>
            {playlists.map((playlist, playlistIndex) => (
              <FormGroup
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  id="standard-select-currency-native"
                  select={true}
                  label={`Playlist ${playlistIndex + 1}`}
                  classes={{ root: classes.selectFieldRoot }}
                  onChange={(e) => {
                    const firstPlaylistObj = find(items, {
                      id: e.target.value,
                    });
                    const newArray = [...playlists];
                    newArray[playlistIndex] = firstPlaylistObj;
                    setPlaylists(newArray);
                  }}
                  SelectProps={{
                    native: true,
                  }}
                  // variant="standard"
                  sx={{ backgroundColor: "#414141", mb: 3, flexGrow: 1, mr: 2 }}
                >
                  {items.map(({ name, id }, index) => (
                    <option
                      selected={playlistIndex === index}
                      key={id}
                      value={id}
                    >
                      {name}
                    </option>
                  ))}
                </TextField>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  mb={3}
                >
                  <FontAwesomeIcon
                    size="md"
                    icon={faTrash}
                    className={classes.deleteButton}
                    // @TODO Get the removal of the playlist to work
                    onClick={() => {
                      const newPlaylists = playlists.filter(
                        (playlist, index) => index !== playlistIndex
                      );
                      setPlaylists(newPlaylists);
                    }}
                  />
                </Box>
              </FormGroup>
            ))}
          </Box>

          <Button
            sx={{
              alignSelf: "center",
              maxWidth: 180,
              border: "1px solid #fff",
              py: 1,
              mb: 3,
            }}
            className={classes.addPlaylistButton}
            variant="outlined"
            onClick={() => {
              setPlaylists([...playlists, { playlist: null }]);
            }}
          >
            +{"  "}Add playlist
          </Button>
          <Box textAlign="center">
            <Button
              sx={{
                p: 2,
                // maxWidth: 200,
                color: "black",
                backgroundColor: "primary",
                fontSize: "1rem",
                maxWidth: 400,
              }}
              className={classes.createNewPlaylistButton}
              variant="contained"
              fullWidth={true}
              href="/"
              type="submit"
            >
              Create new playlist
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default PlaylistMergeForm;
