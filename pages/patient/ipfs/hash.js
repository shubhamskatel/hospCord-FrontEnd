import React, { useState, useEffect } from "react";
import Patient from "./patient";
// import { makeHash } from "../common";
// import { useHistory } from "react-router-dom";
function AddData() {
  //   const history = useHistory();
  const [update, setUpdate] = useState(1);
  const [patients, setPatients] = useState([
    {
      serialNumber: "",
      disease: "",
      summary: "",
      medicines: "",
    },
  ]);
  const AddNewLine = () => {
    let clonePatients = patients;
    clonePatients.push({
      serialNumber: "",
      disease: "",
      summary: "",
      medicines: "",
    });
    setPatients(clonePatients);
    setUpdate(clonePatients.length);
  };
  const removeLine = (index) => {
    let clonePatients = patients;
    clonePatients.splice(index, 1);
    setPatients(clonePatients);
    setUpdate(clonePatients.length);
  };
  const updatePatient = (value, index) => {
    let clonePatients = patients;
    clonePatients[index] = value;
    setPatients(clonePatients);
    setUpdate(clonePatients.length);
  };
  const AddRecordsToIpfs = async () => {
    try {
      //   let value = await makeHash(patients);
      if (value.status) {
        // history.push(`/hash/${value.hash}`);
      } else {
        // history.push(`/error`);
      }
    } catch (error) {
      //   history.push(`/error`);
    }
  };
  return (
    <div>
      <h3 style={{ marginBottom: `${5}%` }}>Enter patient's data</h3>
      {patients.map((patient, i) => (
        <Patient
          key={i}
          patient={patient}
          update={update}
          index={i}
          AddNewLine={AddNewLine}
          removeLine={removeLine}
          updatePatient={updatePatient}
        />
      ))}
      <div className="col-md-12" style={{ textAlign: "right" }}>
        <button
          onClick={() => {
            AddNewLine();
          }}
          type="button"
          className="btn btn-primary"
        >
          Add New
        </button>
      </div>
      <button
        onClick={() => {
          AddRecordsToIpfs();
        }}
        type="button"
        className="btn btn-primary"
      >
        Add Records
      </button>
    </div>
  );
}

export default AddData;
