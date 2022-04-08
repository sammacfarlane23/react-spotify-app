import { useLocation, Link } from "@reach/router";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Cookies from "js-cookie";

import * as React from "react";
import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import {
  Audiotrack,
  FeaturedPlayList,
  TheaterComedy,
} from "@mui/icons-material";

const BottomNav = () => {
  const [value, setValue] = React.useState("artists");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        display: { xs: "block", md: "none" },
      }}
      elevation={3}
    >
      <BottomNavigation showLabels value={value} onChange={handleChange}>
        <BottomNavigationAction
          label="Artists"
          icon={<TheaterComedy />}
          component={Link}
          to="/"
          value="artists"
        />
        <BottomNavigationAction
          label="Tracks"
          icon={<Audiotrack />}
          component={Link}
          to="/tracks"
          value="tracks"
        />
        <BottomNavigationAction
          label="Playlists"
          icon={<FeaturedPlayList />}
          component={Link}
          to="/playlists"
          value="playlists"
        />
      </BottomNavigation>
    </Paper>
  );
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

  const handleLogout = () => {
    Cookies.remove("access_token");
  };
  return (
    <Navbar variant="dark" style={{ padding: 0 }}>
      <Nav activeKey="1" className="bg-dark d-flex w-100 justify-content-start">
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
          href="/login"
          style={{ marginLeft: "auto" }}
          className="bg-dark"
          onClick={handleLogout}
        >
          Log out
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default BottomNav;
