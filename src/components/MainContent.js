import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import find from "lodash/find";
import isEmpty from "lodash/isEmpty";
import forEach from "lodash/forEach";
import capitalize from "capitalize";
import classnames from "classnames";
import Form from "react-bootstrap/Form";

import NavBar from "../components/NavBar";
import {
  getTopArtists,
  getTopTracks,
  getUserPlaylists,
} from "../slices/itemsSlice";
import "../styles/App.scss";
import spotifyApi from "../spotifyFunctions";

import ItemList from "./ItemList";

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

const getAllPlaylistTracks = async (playlist) => {
  const tracks = await spotifyApi.getPlaylistTracks(playlist.id, {
    limit: 100,
  });

  return tracks.items;
};

const MainDisplay = ({ contentType }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [timeFrame, setTimeFrame] = useState(SHORT_TERM.slug);
  const [timeFrameMessage, setTimeFrameMessage] = useState("");
  const [playlistName, setPlaylistName] = useState("New playlist");
  const [firstPlaylist, setFirstPlaylist] = useState("");
  const [secondPlaylist, setSecondPlaylist] = useState("");
  const dispatch = useDispatch();

  const items = useSelector((state) => state.items.data);

  /* @TODO Can now merge playlists, need to check for duplicate tracks 
  add some error handling and then improve the UX massively */
  const createNewPlaylist = async () => {
    const { id } = await spotifyApi.getMe();

    const { id: playlistId } = await spotifyApi.createPlaylist(id, {
      name: playlistName,
    });

    const firstPlaylistTracks = await getAllPlaylistTracks(firstPlaylist);
    const secondPlaylistTracks = await getAllPlaylistTracks(secondPlaylist);
    const tracksToAddUris = [
      ...firstPlaylistTracks.map(({ track }) => track.uri),
      ...secondPlaylistTracks.map(({ track }) => track.uri),
    ];

    console.log({ tracksToAddUris });

    spotifyApi.addTracksToPlaylist(playlistId, tracksToAddUris);
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

  // @TODO Use actual loading spinner
  if (isEmpty(items))
    return (
      <div className="min-vh-100">
        <div className="p-5 text-white">Loading...</div>
      </div>
    );

  return (
    <>
      <NavBar />
      <Container className="min-vh-100">
        <Row>
          <Form
            onSubmit={async (e) => {
              e.preventDefault();
              await createNewPlaylist();
              console.log({ firstPlaylist, secondPlaylist });
            }}
          >
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Playlist name</Form.Label>
              <Form.Control
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
                placeholder="My new playlist"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="text-white">
                First Playlist for merge:
              </Form.Label>
              <select
                onChange={(e) => {
                  const firstPlaylistObj = find(items, {
                    id: e.target.value,
                  });
                  setFirstPlaylist(firstPlaylistObj);
                }}
                size="lg"
                aria-label="Select first playlist for merge"
              >
                {items.map(({ name, id }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </select>
            </Form.Group>
            <Form.Group>
              <Form.Label className="text-white">
                Second Playlist for merge:
              </Form.Label>
              <select
                onChange={(e) => {
                  const secondPlaylistObj = find(items, {
                    id: e.target.value,
                  });
                  setSecondPlaylist(secondPlaylistObj);
                }}
                size="lg"
                aria-label="Select second playlist for merge"
              >
                {items.map(({ name, id }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </select>
            </Form.Group>
            <Button type="submit">Create new playlist</Button>
          </Form>
        </Row>
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
        {contentType !== PLAYLISTS && (
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            closeTimeoutMS={200}
            contentLabel="Options Modal"
            className="Modal"
            ariaHideApp={false}
          >
            <button className="icon-button text-right" onClick={closeModal}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <h1 className="text-center mb-4">Options</h1>

            <>
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
          </Modal>
        )}
      </Container>
    </>
  );
};

export default MainDisplay;
