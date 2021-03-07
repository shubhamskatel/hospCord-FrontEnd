import React, { Component } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import Modal from "react-modal";

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

class Patlogin extends Component {
  state = {
    id: "",
    loading: false,
    errorMessage: "",
    result: "No Result",
    modal: false,
  };

  handleScan = (data) => {
    if (data) {
      this.setState({
        id: data,
        result: data,
      });
      this.onSubmit();
    }
  };
  handleError = (err) => {
    console.error(err);
  };

  onSubmit = async () => {
    // event.preventDefault();

    // this.setState({ loading: true, errorMessage: "" });

    try {
      const address = await hospital.methods.enterPatient(this.state.id).call();
      Router.pushRoute(`/patient/${address}`);
    } catch (err) {
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
          <QrReader
            delay={300}
            onError={this.handleError}
            onScan={this.handleScan}
            style={{ previewStyle }}
          />
          <p>{this.state.result}</p>
          <br></br>

          <Button
            loading={this.state.loading}
            onClick={() => this.setState({ modal: false })}
            type="submit"
            negative
          >
            Close
          </Button>
        </Modal>

        <h3>Login Patient</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          {/* <Form.Field>
            <label>Patient's ID</label>
            <Input
              type="password"
              placeholder="ID"
              value={this.state.id}
              onChange={(event) => this.setState({ id: event.target.value })}
            />
          </Form.Field> */}

          <Message error header="Oops!!" content={this.state.errorMessage} />

          <Button
            loading={this.state.loading}
            onClick={() => this.setState({ modal: true })}
            type="submit"
            primary
          >
            Login a Patient
          </Button>
        </Form>
      </div>
    );
  }
}

export default Patlogin;
