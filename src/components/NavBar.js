import React from "react";
import { useLocation } from "@reach/router";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Cookies from "js-cookie";

const logout = () => {
  Cookies.remove("access_token");
};

const navConfig = [
  {
    href: "/",
    title: "Top Artists",
  },
  {
    href: "/tracks",
    title: "Top Tracks",
  },
  {
    href: "/playlists",
    title: "Playlists",
  },
];

// @TODO Make this look better and highlight current page properly
const NavBar = () => {
  const { pathname } = useLocation();
  return (
    <Navbar variant="dark" style={{ padding: 0 }}>
      <Container>
        <Nav
          activeKey="1"
          className="bg-dark d-flex w-100 justify-content-start"
        >
          {navConfig.map(({ href, title }, index) => (
            <Nav.Link
              style={{
                fontWeight: pathname === href ? 700 : 400,
                color: pathname === href ? "#fff" : "rgba(255, 255, 255, 0.5)",
              }}
              href={href}
              eventKey={index + 1}
              className="bg-dark"
              key={index}
            >
              {title}
            </Nav.Link>
          ))}
          <Nav.Link
            href="/"
            style={{ marginLeft: "auto" }}
            className="bg-dark"
            onSelect={() => logout()}
          >
            Log out
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
