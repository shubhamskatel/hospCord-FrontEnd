import React, { Component } from "react";
// import QrReader from "react-qr-reader";

import Modal from "react-modal";
import { Button, Form, Input, Message } from "semantic-ui-react";
import dynamic from "next/dynamic";
const QrReader = dynamic(() => import("react-qr-reader"), {
  ssr: false,
});

import hospital from "../abis/Hospital";
import web3 from "../abis/web3";
import routes, { Router } from "../../routes";

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

class patlogin extends Component {
  state = {
    id: "",
    loading: false,
    errorMessage: "",
    modal: false,
    result: "No Result",
  };

  handleScan = (data) => {
    if (data) {
      this.setState({
        result: data,
      });
    }
  };
  handleError = (err) => {
    console.error(err);
  };
  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: "" });

    try {
      const address = await hospital.methods.enterPatient(this.state.id).call();
      Router.pushRoute(`/patient/${address}`);
    } catch (error) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  render() {
    const previewStyle = {
      height: 240,
      width: 320,
    };

    return (
      <div>
        <Modal style={customStyles} isOpen={this.state.modal}>
          <h3>Scan the QR Code Here</h3>
          <QrReader
            delay={300}
            onError={this.handleError}
            onScan={this.handleScan}
            style={{ previewStyle }}
          />
          <p>{this.state.result}</p>

          {/* <Input
            type="password"
            placeholder="ID"
            value={this.state.result}
            onChange={(event) => this.setState({ id: event.target.value })}
          /> */}
          <br></br>
          <div style={{ textAlign: "center" }}>
            <Button
              onClick={() => this.setState({ modal: false })}
              content="Close"
              negative
            />
          </div>
        </Modal>

        <h3>Login the Patient</h3>
        <Form
          onSubmit={() => this.setState({ modal: true })}
          error={!!this.state.errorMessage}
        >
          <Message error header="Oops!!" content={this.state.errorMessage} />

          <Button loading={this.state.loading} type="submit" primary>
            Scan the QR Card
          </Button>
        </Form>
      </div>
    );
  }
}

export default patlogin;
