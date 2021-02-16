import { React, Component } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import Layout from "../components/Layout";
import Home from "../components/Home";

// import web3 from "./abis/web3";

// import Login from "./components/main";

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
