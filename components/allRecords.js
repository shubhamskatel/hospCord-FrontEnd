import React, { Component } from "react";
import { Card } from "semantic-ui-react";

import Patient from "./abis/Patient";
import { Link } from "../routes";

class AllRecords extends Component {
  static async getInitialProps(props) {
    const patient = Patient(props.query.address);

    console.log(props.query.address);
    const record = await patient.methods.getRecords().call();

    return { record };
  }

  renderRecords() {
    const items =
      this.props.record &&
      this.props.record.map((address) => {
        return {
          header: address,
          description: (
            <Link>
              <a>View Record</a>
            </Link>
          ),
          fluid: true,
          style: { overflowWrap: "break-word" },
        };
      });

    return <Card.Group items={items} />;
  }

  render() {
    return <div>{this.renderRecords()}</div>;
  }
}

export default AllRecords;
