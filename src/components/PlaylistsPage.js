import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import isEmpty from "lodash/isEmpty";

import NavBar from "../components/NavBar";
import { getUserPlaylists } from "../slices/playlistSlice";
import "../styles/App.scss";
import ItemList from "./ItemList";

// @TODO Refactor this and MainContent into one parent component
const PlaylistsPage = () => {
  const playlists = useSelector((state) => state?.playlist?.data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserPlaylists());
  }, [dispatch]);

  // @TODO Use actual loading spinner
  if (isEmpty(playlists))
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
          <h1 className="my-4">Your Playlists </h1>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <ItemList topList={playlists} />
        </Col>
      </Row>
    </Container>
  );
};

export default PlaylistsPage;
