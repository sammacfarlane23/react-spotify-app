import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import find from "lodash/find";
import capitalize from "capitalize";
import classnames from "classnames";

import "../styles/App.scss";
import ItemList from "./ItemList";

const spotifyApi = new SpotifyWebApi();

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

export const timeFrames = [SHORT_TERM, MEDIUM_TERM, LONG_TERM];

export const dataTypes = [TRACKS, ARTISTS];

const MainDisplay = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [dataType, setDataType] = useState(ARTISTS);
  const [timeFrame, setTimeFrame] = useState(SHORT_TERM.slug);

  const [topArtists, setTopArtists] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [timeFrameMessage, setTimeFrameMessage] = useState("");

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    if (dataType === "tracks") {
      spotifyApi.getMyTopTracks({ limit: 50, time_range: timeFrame }).then(
        (response) => {
          setTopTracks(response.items);
        },
        () => {
          console.log("unfortunately that request failed");
        }
      );
    }

    if (dataType === "artists") {
      spotifyApi.getMyTopArtists({ limit: 50, time_range: timeFrame }).then(
        (response) => {
          setTopArtists(response.items);
        },
        () => {
          console.log("unfortunately that request failed");
        }
      );
    }

    setTimeFrameMessage(
      `Your top ${dataType} of ${find(timeFrames, { slug: timeFrame }).period}`
    );
  }, [timeFrame, dataType]);

  return (
    <Container className="min-vh-100">
      <Row>
        <Col xs={12} className="px-4">
          {timeFrameMessage && (
            <h1 className="my-4">
              {timeFrameMessage}{" "}
              <button className="icon-button" onClick={openModal}>
                <FontAwesomeIcon icon={faEllipsisH} />
              </button>
            </h1>
          )}
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <ItemList topList={dataType === "artists" ? topArtists : topTracks} />
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

        <>
          <Row className="justify-content-center">
            {dataTypes.map((type) => (
              <Button
                key={type}
                className={classnames("btn mr-1 mb-2", {
                  "active-button": dataType === type,
                })}
                onClick={() => {
                  setDataType(type);
                }}
              >
                Top {capitalize(type)}
              </Button>
            ))}
          </Row>
          <Row className="justify-content-center align-items-space-between my-3">
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
    </Container>
  );
};

export default MainDisplay;
