import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import find from "lodash/find";
import isEmpty from "lodash/isEmpty";
import capitalize from "capitalize";

import {
  getTopArtists,
  getTopTracks,
  getUserPlaylists,
} from "../slices/itemsSlice";

import Modal from "./Modal";
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
        <CircularProgress />
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
            <Typography variant="h4" fontWeight="500">
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
      <Modal open={open} onClose={handleClose}>
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
      </Modal>
    </>
  );
};

export default MainDisplay;
