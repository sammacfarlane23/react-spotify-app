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
        borderColor: "#b2b2b2", // - Set the Input border
      },
      "&:hover fieldset": {
        borderColor: "#1db954", // - Set the Input border when parent has :hover
      },
      "&.Mui-focused fieldset": {
        // - Set the Input border when parent is focused
        borderColor: "#1db954",
      },
    },
  },
  selectFieldRoot: {
    color: "#fff !important",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        // - The <fieldset> inside the Input-root
        borderColor: "#b2b2b2", // - Set the Input border
      },
      "&:hover fieldset": {
        borderColor: "#1db954", // - Set the Input border when parent has :hover
      },
      "&.Mui-focused fieldset": {
        // - Set the Input border when parent is focused
        borderColor: "#1db954",
      },
    },
  },
  addPlaylistButton: {
    "&:hover": {
      border: "2px solid #fff",
      backgroundColor: "#1db954",
    },
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

  // @TODO Make number of playlists adjustable
  return (
    <Paper
      variant="elevation"
      elevation={20}
      sx={{ backgroundColor: "#212121", mt: 5 }}
    >
      <Box
        component="form"
        onSubmit={async (e) => {
          e.preventDefault();
          await createNewPlaylist(playlists);
        }}
        sx={{ p: 4 }}
        display="flex"
        flexDirection="column"
      >
        <Typography variant="h1" sx={{ mb: 3, fontWeight: "500" }} color="#fff">
          Merge Your Playlists
        </Typography>

        <TextField
          label="New playlist name"
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
          placeholder="Your new playlist name"
          classes={{ root: classes.textFieldRoot }}
          sx={{ backgroundColor: "#414141", mb: 3 }}
        />

        <Typography variant="h6" sx={{ mb: 3, fontWeight: "500" }} color="#fff">
          Playlists to merge
        </Typography>
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
                <option selected={playlistIndex === index} key={id} value={id}>
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

        <Button
          sx={{
            alignSelf: "center",
            maxWidth: 180,
            border: "1px solid #fff",
            py: 1,
          }}
          className={classes.addPlaylistButton}
          variant="outlined"
          onClick={() => {
            setPlaylists([...playlists, { playlist: null }]);
          }}
        >
          +{"  "}Add playlist
        </Button>
        <Button
          sx={{
            mt: 3,
            p: 2,
            // maxWidth: 200,
            color: "black",
            backgroundColor: "#fff",
            fontSize: "1rem",
          }}
          variant="contained"
          fullWidth={true}
          href="/"
          className="text-black"
          type="submit"
        >
          Create new playlist
        </Button>
      </Box>
    </Paper>
  );
};

export default PlaylistMergeForm;
