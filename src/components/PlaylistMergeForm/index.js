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
import flatten from "lodash/flatten";
import uniq from "lodash/uniq";
import { Paper } from "@mui/material";
import { useDispatch } from "react-redux";

import Modal from "../Modal";
import { getUserPlaylists } from "../../slices/itemsSlice";
import spotifyApi from "../../spotifyFunctions";
import ItemImage from "../ItemImage";

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
  "@keyframes blinker": {
    from: { opacity: 0.8 },
    to: { opacity: 0.4 },
  },
  playlistMergeText: {
    animationName: "$blinker",
    animationDuration: "1s",
    animationTimingFunction: "ease-in-out",
    animationIterationCount: "infinite",
  },
}));

const getNextPlaylistOrFirst = (items, index) => {
  // If the next playlist doesn't exist, return the first playlist
  if (index > items.length - 1) {
    return items[0];
  }
  return items[index];
};

const getPlaylistTracks = async (playlistId) => {
  const tracks = await spotifyApi.getPlaylistTracks(playlistId, {
    limit: 100,
  });

  return tracks.items;
};

const PlaylistMergeForm = ({ items, playlistName, setPlaylistName }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const secondPlaylist = getNextPlaylistOrFirst(items, 1);
  const [playlists, setPlaylists] = useState([
    { ...items[0] },
    { ...secondPlaylist },
  ]);

  console.log({ playlists });

  /* @TODO Fix this up to work with infinite number of playlists and need to check for duplicate tracks, 
  add some error handling and then improve the UX massively */
  const createNewPlaylist = async (playlists) => {
    handleOpen();
    const { id } = await spotifyApi.getMe();

    const { id: playlistId } = await spotifyApi.createPlaylist(id, {
      name: playlistName,
    });

    const allPlaylistTracks = flatten(
      await Promise.all(
        playlists.map(async (playlist) => {
          const playlistTracks = await getPlaylistTracks(playlist.id);
          return playlistTracks;
        })
      )
    );

    console.log({ allPlaylistTracks });

    const uniqueTracksToAddUris = uniq(
      allPlaylistTracks.map(({ track }) => track.uri)
    );

    const numberOfTracks = uniqueTracksToAddUris.length;

    if (numberOfTracks > 100) {
      const numberOfRequestsRequired = Math.ceil(numberOfTracks / 100);
      for (let i = 0; i < numberOfRequestsRequired; i++) {
        spotifyApi.addTracksToPlaylist(
          playlistId,
          uniqueTracksToAddUris.splice(0, 100)
        );
      }

      return;
    }
    const response = await spotifyApi.addTracksToPlaylist(
      playlistId,
      uniqueTracksToAddUris
    );
    console.log({ response });
    setTimeout(() => {
      handleOpen();
      dispatch(getUserPlaylists());
    }, 1000);
  };

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
                <>Click the button below to select playlists to merge</>
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
                  sx={{ backgroundColor: "#414141", mb: 3, flexGrow: 1, mr: 2 }}
                  value={playlist.id}
                  selected={playlist}
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
              const nextOrFirstPlaylist = getNextPlaylistOrFirst(
                items,
                playlists.length
              );
              setPlaylists([...playlists, { ...nextOrFirstPlaylist }]);
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Typography
          variant="h1"
          color="white"
          className={classes.playlistMergeText}
          sx={{ fontSize: 25, fontWeight: "bold", textAlign: "center" }}
        >
          Merging your playlists...
        </Typography>
        <Box>
          {playlists.map((playlist, index) => (
            <Box color="white">
              <ItemImage
                item={playlist}
                index={index}
                src={playlist.images[0].url}
              />
              <Typography variant="subtitle2">{playlist.name}</Typography>
            </Box>
          ))}
        </Box>
      </Modal>
    </Box>
  );
};

export default PlaylistMergeForm;
