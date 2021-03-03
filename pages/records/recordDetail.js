import React, { Component } from "react";
import { Grid, Card, Button, Form } from "semantic-ui-react";

import Layout from "../../components/Layout";
import Record from "../../components/abis/Record";
import { Link } from "../../routes";
import web3 from "../../components/abis/web3";
import { decHash } from "../../components/common";

class RecordDetail extends Component {
  state = {
    name: "",
    dob: "",
    bloodGroup: "",
    doctor: "",
    hospital: "",
    address: "",
    hash: "",
    loading: false,
    show: false,
    allData: "",
  };

  static async getInitialProps(props) {
    const add = props.query.address;

    return { address: add };
  }

  async componentDidMount() {
    const record = Record(this.props.address);

    const summary = await record.methods.getSummary().call();
    const _hash = await record.methods.getHash().call();
    // this.getData;

    this.setState({
      name: summary[0],
      dob: summary[1],
      bloodGroup: summary[2],
      doctor: summary[3],
      hospital: summary[4],
      hash: _hash,
    });
  }

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
      {
        header: this.state.hash,
        description: "IPFS Hash of the stored record",
        style: { overflowWrap: "break-word" },
      },
    ];

    return <Card.Group items={items} />;
  }

  getData = async () => {
    try {
      this.setState({ loading: true });
      const getValues = await decHash(this.state.hash);
      this.setState({ show: true });
      this.setState({ loading: false });
      this.setState({ allData: getValues.data });
    } catch (error) {
      this.setState({ show: true });
      this.setState({ loading: false });
      console.log("Error:", error);
    }
  };

  render() {
    return (
      <Layout>
        <h1>Record Details</h1>
        <br></br>

        <Grid>
          <Grid.Row>
            <Grid.Column width={15}>
              {this.state.name != "" && this.renderCards()}
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <br></br>

        <Button onClick={this.getData} primary>
          View Full Record
        </Button>

        <br></br>
        <br></br>
        <br></br>

        {Array.isArray(this.state.allData) && this.state.allData.length > 0 ? (
          <table class="table ">
            <thead>
              <tr>
                <th scope="col">S. No.</th>
                <th scope="col">disease</th>
                <th scope="col">summary</th>
                <th scope="col">medicines</th>
              </tr>
            </thead>
            <tbody>
              {this.state.allData.map((val) => (
                <tr>
                  <th scope="row">{val.serialNumber}</th>
                  <td>{val.disease}</td>
                  <td>{val.summary}</td>
                  <td>{val.medicines}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : this.state.show ? (
          "Error Data is not in proper order/tables"
        ) : (
          ""
        )}
        {this.state.loading ? <p>Loading Please Wait....</p> : ""}
      </Layout>
    );
  }
}

export default RecordDetail;
