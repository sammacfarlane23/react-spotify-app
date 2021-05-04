import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SpotifyWebApi from "spotify-web-api-js";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";

import "./styles/App.scss";
import { useConstructor } from "./hooks/hooks";
import LoginPage from "./components/LoginPage";
import HeaderButtons from "./components/HeaderButtons";
import ItemList from "./components/ItemList";

const spotifyApi = new SpotifyWebApi();

const getHashParams = () => {
  var hashParams = {};
  var e,
    r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
  e = r.exec(q);
  while (e) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
    e = r.exec(q);
  }
  return hashParams;
};

const App = () => {
  const dispatch = useDispatch();

  const timeFrame = useSelector((state) => state.timeFrame);
  const topItems = useSelector((state) => state.topItems);

  let token = "";
  useConstructor(() => {
    const params = getHashParams();
    token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loggedIn] = useState(token ? true : false);
  const [topArtists, setTopArtists] = useState([]);
  const [topTracks, setTopTracks] = useState([]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const getTopArtists = () => {
    spotifyApi.getMyTopArtists({ limit: 50, time_range: timeFrame }).then(
      (response) => {
        const data = response.items;
        setTopArtists(data);
      },
      () => {
        console.log("unfortunately that request failed");
      }
    );
  };

  const getTopTracks = () => {
    spotifyApi.getMyTopTracks({ limit: 50, time_range: timeFrame }).then(
      (response) => {
        const data = response.items;
        setTopTracks(data);
      },
      () => {
        console.log("unfortunately that request failed");
      }
    );
  };

  const getTitleMessage = (timeFrame, topItems) => {
    const category = topItems === "tracks" ? "Tracks" : "Artists";

    let duration = "";

    switch (timeFrame) {
      case "short_term":
        duration = "From the Last Four Weeks";
        break;
      case "medium_term":
        duration = "From the Last Six Months";
        break;
      case "long_term":
        duration = "of All Time";
        break;
      default:
        duration = "";
    }

    return `Your Top ${category} ${duration}`;
  };

  // I think we want to grab topTracks or artists in useEffect and only in useEffect
  useEffect(() => {
    if (loggedIn) {
      topItems === "tracks"
        ? getTopTracks(timeFrame)
        : getTopArtists(timeFrame);
    }
  }, [loggedIn, topItems, timeFrame]);

  return loggedIn ? (
    <Container className="min-vh-100">
      <Row>
        <Col xs={12} className="px-4">
          <h1 className="my-4">
            {getTitleMessage(timeFrame, topItems)}{" "}
            <button className="icon-button" onClick={openModal}>
              <FontAwesomeIcon icon={faEllipsisH} />
            </button>
          </h1>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <ItemList topList={topItems === "tracks" ? topTracks : topArtists} />
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
        <button className="icon-button text-right" onClick={closeModal}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h1 className="text-center mb-4">Options</h1>
        <HeaderButtons
          closeModal={closeModal}
          isTopTracks={topItems === "tracks"}
          timeFrame={timeFrame}
          getTopTracks={getTopTracks}
          getTopArtists={getTopArtists}
        />
        <button onClick={() => dispatch({ type: "setLongTerm" })}>
          Set long term through Redux store
        </button>
      </Modal>
    </Container>
  ) : (
    <LoginPage />
  );
};

export default App;
