import React, { Component } from "react";
import { Button, Form } from "semantic-ui-react";

import web3 from "./abis/web3";
import Patient from "./abis/Patient";


class RecButton extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;

    return { address };
  }

  newRecord = async (event, props) => {
    event.preventDefault();

    console.log(props.address);

    const patient = Patient(this.props.address);

    try {
      const accounts = await web3.eth.getAccounts();

      await patient.methods.getRecord().send({ from: accounts[0] });

      const addr = await patient.methods.addr().call();

      console.log(addr);
    } catch (err) {
      return err;
    }
  };

  render() {
    return (
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
    );
  }
}

export default RecButton;
