import React from "react";
import Header from "./Header";
import { Container } from "semantic-ui-react";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";

export default (props) => {
  return (
    <Container>
      <Head>
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
        />
      </Head>
      <Header />
      <div style={{ paddingTop: "70px" }}>{props.children}</div>
    </Container>
  );
};
