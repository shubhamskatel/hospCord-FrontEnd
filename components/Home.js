import { Component } from "react";

import { Grid, Card } from "semantic-ui-react";

import NewPat from "./index/newpat";
import NewDoc from "./index/newdoc";
import PatLogin from "./index/patlogin";

class Home extends Component {
  render() {
    const submit = (event) => {
      event.preventDefault();
      console.log("AA");
    };

    return (
      <div style={{ paddingTop: "80px", textAlign: "center" }}>
        <Grid stackable columns={3} padded="horizontally">
          <Grid.Row>
            <Grid.Column>
              <Card>
                <div style={{ padding: "20px" }}>
                  <NewPat />
                </div>
              </Card>
            </Grid.Column>

            <Grid.Column>
              <Card>
                <div style={{ padding: "20px" }}>
                  <PatLogin />
                </div>
              </Card>
            </Grid.Column>

            <Grid.Column>
              <Card>
                <div style={{ padding: "20px" }}>
                  <NewDoc />
                </div>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Home;
