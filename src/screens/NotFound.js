import Button from "react-bootstrap/Button";
import React from "react";

import Layout from "../components/Layout";

const NotFound = () => {
  return (
    <Layout>
      <div className="justify-content-center">
        <h1>Oops, that page doesn't exist</h1>
        <Button href="/">Go home</Button>
      </div>
    </Layout>
  );
};

export default NotFound;
