import React from "react";
import Container from "@mui/material/Container";

import TopNav from "./NavBars/TopNav";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <TopNav />
      <Container sx={{ minHeight: "100vh" }}>{children}</Container>
    </>
  );
};

export default Layout;
