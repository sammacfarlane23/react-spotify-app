import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import find from "lodash/find";
import isEmpty from "lodash/isEmpty";
import flatten from "lodash/flatten";
import uniq from "lodash/uniq";
import capitalize from "capitalize";

import {
  getTopArtists,
  getTopTracks,
  getUserPlaylists,
} from "../slices/itemsSlice";
import "../styles/App.scss";
import spotifyApi from "../spotifyFunctions";

import PlaylistLandingPage from "./PlaylistLandingPage";
import ItemList from "./ItemList";
import PlaylistMergeForm from "./PlaylistMergeForm";

const SHORT_TERM = {
  slug: "short_term",
  period: "last four weeks",
};

const MEDIUM_TERM = {
  slug: "medium_term",
  period: "last six months",
};

const LONG_TERM = {
  slug: "long_term",
  period: "all time",
};

const TRACKS = "tracks";

const ARTISTS = "artists";

const PLAYLISTS = "playlists";

export const timeFrames = [SHORT_TERM, MEDIUM_TERM, LONG_TERM];

export const contentTypes = [TRACKS, ARTISTS, PLAYLISTS];

const getPlaylistTracks = async (playlistId) => {
  const tracks = await spotifyApi.getPlaylistTracks(playlistId, {
    limit: 100,
  });

  return tracks.items;
};

const MainDisplay = ({ contentType }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [timeFrame, setTimeFrame] = useState(SHORT_TERM.slug);
  const [timeFrameMessage, setTimeFrameMessage] = useState("");
  const [playlistName, setPlaylistName] = useState("");
  const dispatch = useDispatch();
  const playlistsEnabled = JSON.parse(process.env.REACT_APP_PLAYLISTS_ENABLED);

  const items = useSelector((state) => state.items.data);

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

  useEffect(() => {
    if (contentType === TRACKS) {
      dispatch(getTopTracks({ timeFrame }));
    }

    if (contentType === ARTISTS) {
      dispatch(getTopArtists({ timeFrame }));
    }

    if (contentType === PLAYLISTS) {
      setTimeFrameMessage("Your playlists");
      dispatch(getUserPlaylists());
      return;
    }

    setTimeFrameMessage(
      `Your top ${contentType} of ${
        find(timeFrames, { slug: timeFrame }).period
      }`
    );
  }, [timeFrame, dispatch, contentType]);

  const modalContent = (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        maxWidth: "80%",
        bgcolor: "#000",
        border: "2px solid #000",
        borderRadius: 3,
        boxShadow: 24,
        p: 4,
      }}
    >
      {contentType === PLAYLISTS ? (
        <Typography
          variant="h1"
          sx={{ fontSize: 25, fontWeight: "bold", textAlign: "center" }}
        >
          Merging your playlists...
        </Typography>
      ) : (
        <>
          <Box display="flex" justifyContent="flex-end">
            <Button onClick={handleClose}>
              <FontAwesomeIcon icon={faTimes} />
            </Button>
          </Box>
          <Typography
            variant="h1"
            sx={{
              fontSize: 25,
              fontWeight: "bold",
              textAlign: "center",
              mb: 3,
            }}
          >
            Options
          </Typography>

          <Box display="flex" flexDirection="column">
            {timeFrames.map(({ slug, period }) => (
              <Button
                key={slug}
                sx={{
                  mb: 2,
                  backgroundColor: timeFrame !== slug && "black",
                }}
                variant="contained"
                onClick={() => {
                  setTimeFrame(slug);
                  handleClose();
                }}
              >
                {capitalize.words(period)}
              </Button>
            ))}
          </Box>
        </>
      )}
    </Box>
  );

  // @TODO Use actual loading spinner
  if (isEmpty(items))
    return (
      <Box
        sx={{
          color: "#fff",
          width: 1,
          display: "flex",
          justifyContent: "center",
          p: 5,
        }}
      >
        Loading...
      </Box>
    );

  if (contentType === PLAYLISTS && !playlistsEnabled) {
    return <PlaylistLandingPage />;
  }

  return (
    <>
      {contentType === PLAYLISTS && (
        <PlaylistMergeForm
          {...{
            createNewPlaylist,
            items,
            playlistName,
            setPlaylistName,
          }}
        />
      )}
      <Box
        sx={{
          px: 3,
        }}
      >
        {timeFrameMessage && (
          <Box sx={{ my: 4, color: "#fff" }}>
            <Typography variant="h4">
              {timeFrameMessage}
              {contentType !== PLAYLISTS && (
                <>
                  {" "}
                  <Button
                    sx={{
                      background: "none",
                      border: "none",
                      outline: "none",
                      padding: 0,
                      fontSize: "inherit",
                    }}
                    onClick={() => {
                      handleOpen();
                    }}
                  >
                    <FontAwesomeIcon icon={faEllipsisH} />
                  </Button>
                </>
              )}
            </Typography>
          </Box>
        )}
      </Box>
      <Box>
        <ItemList topList={items} />
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {modalContent}
      </Modal>
    </>
  );
};

export default MainDisplay;
