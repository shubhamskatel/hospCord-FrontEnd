import React, { useState, useEffect } from "react";

import Layout from "../../../components/Layout";
import Patient from "./recordForm";
import { makeHash } from "../../../components/common";

function AddData() {
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
  11;
  const updatePatient = (value, index) => {
    let clonePatients = patients;
    clonePatients[index] = value;
    setPatients(clonePatients);
    setUpdate(clonePatients.length);
  };

  const AddRecordsToIpfs = async () => {
    try {
      const value = await makeHash(patients);
      console.log(value);
      // if (value.status) {
      //   console.log(value.hash);
      // } else {
      //   return error;
      // }
    } catch (error) {
      return error;
    }
  };

  return (
    <div>
      <Layout>
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
      </Layout>
    </div>
  );
}

export default AddData;
