import React, { useState } from "react";

import { decHash } from "../../components/common";

function GetData() {
  const [hash, setHash] = useState("");
  const [allData, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const getValues = await decHash(hash);
      setShow(true);
      setLoading(false);
      setData(getValues.data);
    } catch (error) {
      setShow(true);
      setLoading(false);
      return error;
    }
  };

  return (
    <div>
      <form className="m-2">
        <div className="form-row">
          <div className="form-group col-md-8">
            <input
              type="text"
              className="form-control"
              name="hash"
              placeholder="Hash"
              onChange={(e) => {
                setHash(e.target.value);
              }}
            />
          </div>
          <div className="form-group col-md-4">
            <button onClick={getData} type="button" className="btn btn-primary">
              Get data
            </button>
          </div>
        </div>
      </form>
      {Array.isArray(allData) && allData.length > 0 ? (
        <table class="table table-dark">
          <thead>
            <tr>
              <th scope="col">S. No.</th>
              <th scope="col">disease</th>
              <th scope="col">summary</th>
              <th scope="col">medicines</th>
            </tr>
          </thead>
          <tbody>
            {allData.map((val) => (
              <tr>
                <th scope="row">{val.serialNumber}</th>
                <td>{val.disease}</td>
                <td>{val.summary}</td>
                <td>{val.medicines}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : show ? (
        "Error Data is not in proper order/tables"
      ) : (
        ""
      )}
      {loading ? <p>Loading Please Wait....</p> : ""}
    </div>
  );
}

export default GetData;
