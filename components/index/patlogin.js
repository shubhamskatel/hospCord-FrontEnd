import React, { Component } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";

import hospital from "../abis/Hospital";
import web3 from "../abis/web3";
import routes, { Router } from "../../routes";

class Patlogin extends Component {
  state = {
    id: "",
    loading: false,
    errorMessage: "",
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
    return (
      <div>
        <h3>Enter a New Patient</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Patient's ID</label>
            <Input
              type="password"
              placeholder="ID"
              value={this.state.id}
              onChange={(event) => this.setState({ id: event.target.value })}
            />
          </Form.Field>

          <Message error header="Oops!!" content={this.state.errorMessage} />

          <Button loading={this.state.loading} type="submit" primary>
            Login a Patient
          </Button>
        </Form>
      </div>
    );
  }
}

export default Patlogin;
