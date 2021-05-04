import React from "react";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";

const HeaderButtons = ({ isTopTracks, timeFrame, closeModal }) => {
  const dispatch = useDispatch();

  return (
    <>
      <Row className="justify-content-center">
        <Button
          className={`btn mr-1 mb-2 ${isTopTracks ? "active-button" : ""}`}
          onClick={() => {
            dispatch({ type: "setTopTracks" });
          }}
        >
          Top Tracks
        </Button>
        <Button
          className={`btn ml-1 mb-2 ${isTopTracks ? "" : "active-button"}`}
          onClick={() => {
            dispatch({ type: "setTopArtists" });
          }}
        >
          Top Artists
        </Button>
      </Row>
      <Row className="justify-content-center align-items-space-between my-3">
        <Button
          className={`btn mx-1 mb-2 ${
            timeFrame === "long_term" ? "active-button" : ""
          }`}
          onClick={() => {
            dispatch({ type: "setLongTerm" });
            closeModal();
          }}
        >
          All Time
        </Button>
        <Button
          className={`btn mx-1 mb-2 ${
            timeFrame === "medium_term" ? "active-button" : ""
          }`}
          onClick={() => {
            dispatch({ type: "setMediumTerm" });
            closeModal();
          }}
        >
          Last Six Months
        </Button>
        <Button
          className={`btn mx-1 mb-2 ${
            timeFrame === "short_term" ? "active-button" : ""
          }`}
          onClick={() => {
            dispatch({ type: "setShortTerm" });
            closeModal();
          }}
        >
          Last Four Weeks
        </Button>
      </Row>
    </>
  );
};

export default HeaderButtons;
