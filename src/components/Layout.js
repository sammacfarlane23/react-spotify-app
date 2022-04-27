import Container from "@mui/material/Container";

import BottomNav from "./NavBars/BottomNav";
import TopNav from "./NavBars/TopNav";

const Layout = ({ children }) => {
  return (
    <>
      <TopNav />
      <Container className="min-vh-100">{children}</Container>
      <BottomNav />
    </>
  );
};

export default Layout;
