import React, { Component } from "react";
import { Card } from "semantic-ui-react";

import Layout from "../../components/Layout";
import hospital from "../../components/abis/Hospital";

class newDoctor extends Component {
  static async getInitialProps(props) {
    try {
      const addr = props.query.address;

      console.log(addr, "Add");

      const summary = await hospital.methods.viewDoctor(addr).call();

      console.log({ summary });

      return {
        docname: summary[0],
        dochosp: summary[1],
        auth: summary[2],
        add: props.query.address,
      };
    } catch (error) {
      return { error: "Err in com ", error };
    }
  }

  renderCards() {
    const { docname, dochosp, auth, add } = this.props;

    const items = [
      {
        header: docname,
        meta: "Doctor",
        description: "New Doctor is created",
        style: { overflowWrap: "break-word" },
      },
      {
        header: dochosp,
        meta: "Hospital",
        description: "The doctor works in this hospital",
      },
      {
        header: add,
        meta: "Doctor's unique ID",
        description: "The doctor can only login using his unique ID",
      },
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h3 style={{ paddingTop: "80px" }}>New Doctor Created</h3>
        {this.renderCards()}
      </Layout>
    );
  }
}

export default newDoctor;
