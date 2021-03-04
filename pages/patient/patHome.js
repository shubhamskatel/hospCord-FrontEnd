import React, { Component } from "react";
import { Card, Button, Form } from "semantic-ui-react";
import QRCode from "qrcode.react";
import Modal from "react-modal";

import Patient from "../../components/abis/Patient";
import Layout from "../../components/Layout";
import routes, { Link, Router } from "../../routes";
import AllRecords from "../../components/allRecords";
import web3 from "../../components/abis/web3";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

class Home extends Component {
  state = {
    name: "",
    dob: "",
    bGroup: "",
    id: "",
    address: "",
    record: [],
    modal: false,
  };
  static async getInitialProps(props) {
    const add = props.query.address;
    return { address: add };
  }

  async componentDidMount() {
    const patient = Patient(this.props.address);
    const summary = await patient.methods.getPatient().call();
    const records = await patient.methods.getRecords().call();
    this.setState(
      {
        name: summary[0],
        dob: summary[1],
        bGroup: summary[2],
        id: summary[3],
        record: records,
      },
      () => {
        console.log("Set ++");
      }
    );
  }

  renderRecords() {
    try {
      const items =
        this.state &&
        this.state.record &&
        this.state.record.map((address, i) => {
          return {
            key: `${address}${i}`,
            header: address,
            description: (
              <Link route={`/records/${address}`}>
                <a>View Record</a>
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

  downloadQR = () => {
    const canvas = document.getElementById("123456");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "123456.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  render() {
    return (
      <Layout>
        <Modal style={customStyles} isOpen={this.state.modal}>
          <h3 style={{ textAlign: "center" }}>Patient's ID</h3>
          <br></br>

          <QRCode id="123456" value={this.state.id} size={"300"} />
          <br></br>
          <br></br>

          <div style={{ textAlign: "center" }}>
            <Form onSubmit={this.downloadQR}>
              <Button content="Download" type="submit" primary />
            </Form>
            <br></br>

            <Form onSubmit={() => this.setState({ modal: false })}>
              <Button content="Close" type="submit" negative />
            </Form>
          </div>
        </Modal>

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

          {this.state.name !== "" &&
            this.state.dob !== "" &&
            this.renderCards()}

          <br></br>
          <br></br>

          <Form onSubmit={() => this.setState({ modal: true })}>
            <a>
              <Button
                content="Get the QR Code"
                icon="qrcode"
                type="submit"
                primary
              />
            </a>
          </Form>

          <br></br>
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
