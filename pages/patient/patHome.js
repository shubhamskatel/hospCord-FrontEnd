import React, { Component } from "react";
import { Card, Button, Form } from "semantic-ui-react";

import Patient from "../../components/abis/Patient";
import Layout from "../../components/Layout";
import { Link } from "../../routes";
import AllRecords from "../../components/allRecords";
import web3 from "../../components/abis/web3";

class Home extends Component {
  static async getInitialProps(props) {
    try {
      const patient = Patient(props.query.address);

      const summary = await patient.methods.getPatient().call();

      return {
        name: summary[0],
        dob: summary[1],
        bGroup: summary[2],
        id: summary[3],
      };
    } catch (error) {
      return { error: "Err in com ", error };
    }
  }

  newRecord = async (event) => {
    event.preventDefault();

    try {
      const accounts = await web3.eth.getAccounts();
      await patient.methods.getRecord().send({ from: accounts[0] });
      console.log(account[0]);
    } catch (err) {
      return err;
    }
  };

  renderCards() {
    const { name, dob, bGroup, id } = this.props;

    const items = [
      {
        header: name,
        meta: "Name of the Patient",
        description: dob,
        style: { overflowWrap: "break-word" },
      },
      {
        header: bGroup,
        meta: "Blood Group",
        style: { overflowWrap: "break-word" },
      },
      {
        header: id,
        meta: "Patient's unique ID",
        style: { overflowWrap: "break-word" },
      },
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <div>
          <h3 style={{ paddingTop: "70px" }}>Hello, Patient !!</h3>
          <br></br>

          <Form onSubmit={this.newRecord}>
            <a>
              <Button
                floated="right"
                content="Create a New Record"
                icon="add circle"
                type="submit"
                primary
              />
            </a>
          </Form>

          {this.renderCards()}

          <br></br>
          <br></br>

          <h3>Previous Records</h3>
          <AllRecords />
        </div>
      </Layout>
    );
  }
}

export default Home;
