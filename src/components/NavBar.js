import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Cookies from "js-cookie";

const logout = () => {
  Cookies.remove("access_token");
};

// @TODO Make this look better and highlight current page properly
const NavBar = () => (
  <Navbar bg="dark" variant="dark">
    <Container>
      <Nav activeKey="1" className="me-auto">
        <Nav.Link href="/" eventKey="1">
          Top Tracks + Artists
        </Nav.Link>
        <Nav.Link href="/playlists" eventKey="2">
          Playlists
        </Nav.Link>
        <Nav.Link href="/" onSelect={() => logout()}>
          Log out
        </Nav.Link>
      </Nav>
    </Container>
  </Navbar>
);

export default NavBar;
