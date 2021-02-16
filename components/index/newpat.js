import React, { Component } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";

import routes, { Router } from "../../routes";

import hospital from "../abis/Hospital";
import web3 from "../abis/web3";

class newPatient extends Component {
  state = {
    name: "",
    dob: "",
    bGroup: "",
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
        .addPatient(this.state.name, this.state.dob, this.state.bGroup)
        .send({ from: accounts[0] });

      const uniid = await hospital.methods.uniid().call();
      const add = await hospital.methods.addid().call();

      console.log(uniid);
      console.log(add);

      Router.pushRoute(`/patient/${add}`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <div>
        <h3 className="form-name text-center">Enter a New Patient</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Patient's Name</label>
            <Input
              placeholder="Name"
              value={this.state.name}
              onChange={(event) => this.setState({ name: event.target.value })}
            />
          </Form.Field>

          <Form.Field>
            <label>Date of Birth</label>
            <Input
              placeholder="DOB"
              type="date"
              value={this.state.dob}
              onChange={(event) => this.setState({ dob: event.target.value })}
            />
          </Form.Field>

          <Form.Field>
            <label>Blood Group</label>
            <Input
              placeholder="Blood Group"
              value={this.state.bGroup}
              onChange={(event) =>
                this.setState({ bGroup: event.target.value })
              }
            />
          </Form.Field>

          <Message error header="Oops!!" content={this.state.errorMessage} />

          <Button loading={this.state.loading} type="submit" primary>
            Create a New Patient
          </Button>
        </Form>
      </div>
    );
  }
}

export default newPatient;
