import React, { Component } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import Layout from "../components/Layout";
import Home from "../components/Home";

class App extends Component {
  render() {
    return (
      <Layout>
        <div>
          <Home />
        </div>
      </Layout>
    );
  }
}

export default App;
