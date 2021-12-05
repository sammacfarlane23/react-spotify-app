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
import capitalize from "capitalize";
import classnames from "classnames";

import NavBar from "../components/NavBar";
import { getTopArtists, getTopTracks } from "../slices/topItems";
import "../styles/App.scss";
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

export const timeFrames = [SHORT_TERM, MEDIUM_TERM, LONG_TERM];

export const dataTypes = [TRACKS, ARTISTS];

const MainDisplay = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [dataType, setDataType] = useState(ARTISTS);
  const [timeFrame, setTimeFrame] = useState(SHORT_TERM.slug);
  const [timeFrameMessage, setTimeFrameMessage] = useState("");

  const topItems = useSelector((state) => state.topItems.data);

  const dispatch = useDispatch();

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    if (dataType === "tracks") {
      dispatch(getTopTracks({ timeFrame }));
    }

    if (dataType === "artists") {
      dispatch(getTopArtists({ timeFrame }));
    }

    setTimeFrameMessage(
      `Your top ${dataType} of ${find(timeFrames, { slug: timeFrame }).period}`
    );
  }, [timeFrame, dataType, dispatch]);

  // @TODO Use actual loading spinner
  if (isEmpty(topItems))
    return (
      <div className="min-vh-100">
        <div className="p-5 text-white">Loading...</div>
      </div>
    );

  return (
    <Container className="min-vh-100">
      <NavBar />
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
          <ItemList topList={topItems} />
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
