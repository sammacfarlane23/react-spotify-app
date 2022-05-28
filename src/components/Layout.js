import Container from "@mui/material/Container";

import TopNav from "./NavBars/TopNav";

const Layout = ({ children }) => {
  return (
    <>
      <TopNav />
      <Container className="min-vh-100">{children}</Container>
    </>
  );
};

export default Layout;
