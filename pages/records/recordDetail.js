import React, { Component } from "react";
import { Grid, Card, Button, Form } from "semantic-ui-react";

import Layout from "../../components/Layout";
import Record from "../../components/abis/Record";
import { Link } from "../../routes";
import web3 from "../../components/abis/web3";

class RecordDetail extends Component {
  state = {
    name: "",
    dob: "",
    bloodGroup: "",
    doctor: "",
    hospital: "",
    address: "",
  };

  static async getInitialProps(props) {
    const add = props.query.address;

    return { address: add };
  }

  async componentDidMount() {
    const record = Record(this.props.address);

    const summary = await record.methods.getSummary().call();

    this.setState({
      name: summary[0],
      dob: summary[1],
      bloodGroup: summary[2],
      doctor: summary[3],
      hospital: summary[4],
    });
  }

  //   onCreate = async (event) => {
  //     event.preventDefault();

  //     try {
  //       const accounts = await web3.eth.getAccounts();

  //       const patient = Patient(this.props.address);
  //       await patient.methods.addrecord().send({ from: accounts[0] });

  //       const add = await patient.methods.addr().call();
  //       this.setState({ address: add });

  //       Router.pushRoute(`/patient/ipfs/${this.state.address}`);
  //     } catch (err) {
  //       return err;
  //     }
  //   };

  renderCards() {
    const items = [
      {
        header: this.state.name,
        meta: "Name of the Patient",
        description: "This is the name of the patient",
        style: { overflowWrap: "break-word" },
      },
      {
        header: this.state.dob,
        meta: this.state.bloodGroup,
        description: "Basic Patient Details",
        style: { overflowWrap: "break-word" },
      },
      {
        header: this.state.doctor,
        meta: this.state.hospital,
        description: "Assigned Doctor of the Record",
        style: { overflowWrap: "break-word" },
      },
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h1>Record Details</h1>
        <br></br>

        {/* <Form onSubmit={this.onCreate}>
          <a>
            <Button
              floated="right"
              content="Create a New Record"
              icon="add circle"
              type="submit"
              primary
            />
          </a>
        </Form> */}

        <Grid>
          <Grid.Row>
            <Grid.Column width={20}>{this.renderCards()}</Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Link route={`/records/${this.props.address}/finalRecord`}>
                <a>
                  <Button primary>View Full Record</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default RecordDetail;
