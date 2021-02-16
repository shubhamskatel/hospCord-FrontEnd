import React, { Component } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";

import routes, { Router } from "../../routes";

import hospital from "../abis/Hospital";
import web3 from "../abis/web3";

class newDoc extends Component {
  state = {
    name: "",
    hospname: "",
    password: "",
    address: "",
    errorMessage: "",
    loading: false,
  };

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: "" });

    try {
      const accounts = await web3.eth.getAccounts();

      await hospital.methods
        .addDoctor(
          this.state.name,
          this.state.hospname,
          this.state.password,
          this.state.address
        )
        .send({ from: accounts[0] });

      console.log("Doctor Added");

      Router.pushRoute(`/doctor/${this.state.address}`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <div>
        <h3>Enter a New Doctor</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Doctor's Name</label>
            <Input
              placeholder="Name"
              value={this.state.name}
              onChange={(event) => this.setState({ name: event.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Hopital's Name</label>
            <Input
              placeholder="Hospital"
              value={this.state.hospname}
              onChange={(event) =>
                this.setState({ hospname: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <Input
              placeholder="Password"
              type="password"
              value={this.state.password}
              onChange={(event) =>
                this.setState({ password: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Blockchain Address</label>
            <Input
              placeholder="Address"
              value={this.state.address}
              onChange={(event) =>
                this.setState({ address: event.target.value })
              }
            />
          </Form.Field>

          <Message error header="Oops!!" content={this.state.errorMessage} />

          <Button loading={this.state.loading} type="submit" primary>
            Create a New Doctor
          </Button>
        </Form>
      </div>
    );
  }
}

export default newDoc;
