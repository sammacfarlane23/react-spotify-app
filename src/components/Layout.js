import Container from "@mui/material/Container";

import TopNav from "./NavBars/TopNav";

const Layout = ({ children }) => {
  return (
    <>
      <TopNav />
      <Container sx={{ minHeight: "100vh" }}>{children}</Container>
    </>
  );
};

export default Layout;
