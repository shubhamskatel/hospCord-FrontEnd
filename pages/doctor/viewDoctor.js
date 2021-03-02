import React, { Component } from "react";
import { Card } from "semantic-ui-react";

import Layout from "../../components/Layout";
import hospital from "../../components/abis/Hospital";

class newDoctor extends Component {
  state = {
    docname: "",
    dochosp: "",
    auth: "",
    add: "",
  };

  static async getInitialProps(props) {
    const addr = props.query.address;
    return { address: addr };
  }

  async componentDidMount() {
    const summary = await hospital.methods
      .viewDoctor(this.props.address)
      .call();

    this.setState({
      docname: summary[0],
      dochosp: summary[1],
      auth: summary[2],
      add: this.props.address,
    });
  }

  renderCards() {
    const items = [
      {
        header: this.state.docname,
        meta: "Doctor",
        description: "New Doctor is created",
        style: { overflowWrap: "break-word" },
      },
      {
        header: this.state.dochosp,
        meta: "Hospital",
        description: "The doctor works in this hospital",
      },
      {
        header: this.state.add,
        meta: "Doctor's unique ID",
        description: "The doctor can only login using his unique ID",
      },
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h3>New Doctor Created</h3>
        {this.renderCards()}
      </Layout>
    );
  }
}

export default newDoctor;
