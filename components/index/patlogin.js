import React, { Component } from "react";

class patlogin extends Component {
  render() {
    const submit = (event) => {
      event.preventDefault();
      console.log("AA");
    };

    return (
      <div>
        <h3 className="form-name text-center">Login a Patient</h3>
        <form noValidate onSubmit={(event) => submit(event)}>
          <div className="form-group">
            <label>Patient ID</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Patient ID"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login a Patient
          </button>
        </form>
      </div>
    );
  }
}

export default patlogin;
