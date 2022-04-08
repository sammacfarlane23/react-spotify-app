import Container from "@mui/material/Container";

import BottomNav from "./BottomNav";
import TopNav from "./TopNav";

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
