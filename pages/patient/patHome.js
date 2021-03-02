import React, { Component } from "react";
import { Card, Button, Form } from "semantic-ui-react";

import Patient from "../../components/abis/Patient";
import Layout from "../../components/Layout";
import routes, { Link, Router } from "../../routes";
import AllRecords from "../../components/allRecords";
import web3 from "../../components/abis/web3";

class Home extends Component {
  state = {
    name: "",
    dob: "",
    bGroup: "",
    id: "",
    address: "",
    records: "",
  };

  static async getInitialProps(props) {
    const add = props.query.address;
    return { address: add };
  }

  async componentDidMount() {
    const patient = Patient(this.props.address);
    const summary = await patient.methods.getPatient().call();

    const records = await patient.methods.getRecords().call();
    this.renderRecords();

    this.setState({
      name: summary[0],
      dob: summary[1],
      bGroup: summary[2],
      id: summary[3],
      record: records,
    });
  }

  renderRecords() {
    try {
      const items = this.state.record.map((address, i) => {
        return {
          key: i,
          header: address,
          description: (
            <Link route={`/records/${address}`}>
              <a>View Campaign</a>
            </Link>
          ),
          fluid: true,
          style: { overflowWrap: "break-word" },
        };
      });

      return <Card.Group items={items} />;
    } catch (error) {
      console.log("Error", error);
    }
  }

  renderCards() {
    const items = [
      {
        header: this.state.name,
        meta: "Name of the Patient",
        description: this.state.dob,
        style: { overflowWrap: "break-word" },
      },
      {
        header: this.state.bGroup,
        meta: "Blood Group",
      },
      {
        header: this.state.id,
        meta: "Patient's unique ID",
      },
    ];

    return <Card.Group items={items} />;
  }

  onCreate = async (event) => {
    event.preventDefault();

    try {
      const accounts = await web3.eth.getAccounts();

      const patient = Patient(this.props.address);
      await patient.methods.addrecord().send({ from: accounts[0] });

      const add = await patient.methods.addr().call();
      this.setState({ address: add });

      Router.pushRoute(`/patient/ipfs/${this.state.address}`);
    } catch (err) {
      return err;
    }
  };

  render() {
    return (
      <Layout>
        <div>
          <h3>Hello, Patient !!</h3>

          <br></br>

          <Form onSubmit={this.onCreate}>
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
          {this.renderRecords()}
        </div>
      </Layout>
    );
  }
}

export default Home;
