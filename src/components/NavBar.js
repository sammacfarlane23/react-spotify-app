import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Cookies from "js-cookie";

const logout = () => {
  Cookies.remove("access_token");
};

const NavBar = () => (
  <Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="/">Home</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="/">Top Tracks + Artists</Nav.Link>
        <Nav.Link href="/playlists">Playlists</Nav.Link>
        <Nav.Link href="/" onSelect={() => logout()}>
          Log out
        </Nav.Link>
      </Nav>
    </Container>
  </Navbar>
);

export default NavBar;
