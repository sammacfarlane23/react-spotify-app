import { useLocation } from "@reach/router";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Cookies from "js-cookie";

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

export default NavBar;
