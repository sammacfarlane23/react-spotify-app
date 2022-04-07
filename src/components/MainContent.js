import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import find from "lodash/find";
import isEmpty from "lodash/isEmpty";
import flatten from "lodash/flatten";
import uniq from "lodash/uniq";
import capitalize from "capitalize";
import classnames from "classnames";

import Layout from "./Layout";
import {
  getTopArtists,
  getTopTracks,
  getUserPlaylists,
} from "../slices/itemsSlice";
import "../styles/App.scss";
import spotifyApi from "../spotifyFunctions";

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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [timeFrame, setTimeFrame] = useState(SHORT_TERM.slug);
  const [timeFrameMessage, setTimeFrameMessage] = useState("");
  const [playlistName, setPlaylistName] = useState("");
  const dispatch = useDispatch();

  const items = useSelector((state) => state.items.data);

  /* @TODO Fix this up to work with infinite number of playlists and need to check for duplicate tracks, 
  add some error handling and then improve the UX massively */
  const createNewPlaylist = async (playlists) => {
    setModalIsOpen(true);
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

    // @TODO Work on logic for more than 100 songs
    // if (numberOfTracks > 100) {
    //   const numberOfRequestsRequired = Math.ceil(numberOfTracks / 100);
    //   for (let i = 0; i < numberOfRequestsRequired; i++) {
    //     spotifyApi.addTracksToPlaylist(
    //       playlistId,
    //       uniqueTracksToAddUris.splice(0, 100)
    //     );
    //   }

    //   return;
    // }
    const response = await spotifyApi.addTracksToPlaylist(
      playlistId,
      uniqueTracksToAddUris
    );
    console.log({ response });
    setTimeout(() => {
      setModalIsOpen(false);
      dispatch(getUserPlaylists());
    }, 1000);
  };

  const closeModal = () => {
    setModalIsOpen(false);
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

  const modalContent =
    contentType === PLAYLISTS ? (
      <h1 className="text-center mb-4">Merging your playlists...</h1>
    ) : (
      <>
        <button className="icon-button text-right" onClick={closeModal}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h1 className="text-center mb-4">Options</h1>

        <Row className="justify-content-center align-items-space-between my-3 px-3">
          {timeFrames.map(({ slug, period }) => (
            <Button
              key={slug}
              className={classnames("btn mr-1 mb-2", {
                "active-button": timeFrame === slug,
              })}
              onClick={() => {
                setTimeFrame(slug);
                closeModal();
              }}
            >
              {capitalize.words(period)}
            </Button>
          ))}
        </Row>
      </>
    );

  // @TODO Use actual loading spinner
  if (isEmpty(items))
    return (
      <Layout>
        <div className="p-5 text-white w-100 d-flex justify-content-center">
          Loading...
        </div>
      </Layout>
    );

  return (
    <Layout>
      {contentType === PLAYLISTS && (
        <Row>
          <Col>
            <PlaylistMergeForm
              {...{
                createNewPlaylist,
                items,
                playlistName,
                setPlaylistName,
              }}
            />
          </Col>
        </Row>
      )}
      <Row>
        <Col xs={12} className="px-4">
          {timeFrameMessage && (
            <h1 className="my-4">
              {timeFrameMessage}
              {contentType !== PLAYLISTS && (
                <>
                  {" "}
                  <button
                    className="icon-button"
                    onClick={() => {
                      setModalIsOpen(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faEllipsisH} />
                  </button>
                </>
              )}
            </h1>
          )}
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <ItemList topList={items} />
        </Col>
      </Row>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        closeTimeoutMS={200}
        contentLabel="Options Modal"
        className="Modal"
        ariaHideApp={false}
      >
        {modalContent}
      </Modal>
    </Layout>
  );
};

export default MainDisplay;
