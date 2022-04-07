import Container from "react-bootstrap/Container";

import NavBar from "../components/NavBar";

const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      <Container className="min-vh-100">{children}</Container>
    </>
  );
};

export default Layout;
