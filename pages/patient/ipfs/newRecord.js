import React, { useState, useEffect } from "react";

import Layout from "../../../components/Layout";
import Patient from "./recordForm";
import { makeHash } from "../../../components/common";
import Record from "../../../components/abis/Record";
import web3 from "../../../components/abis/web3";
import routes, { Router } from "../../../routes";

AddData.getInitialProps = async (props) => {
  const add = props.query.address;
  return { address: add };
};

function AddData(props) {
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
      console.log(patients);
      console.log(patients);
      const record = Record(props.address);
      const value = await makeHash(JSON.stringify(patients));
      const _hash = value.hash;
      console.log(_hash);
      const accounts = await web3.eth.getAccounts();
      await record.methods.setHash(_hash).send({ from: accounts[0] });
      const finalHash = await record.methods.getHash().call();
      console.log(finalHash);
      const disAddress = await record.methods.disAddress().call();
      Router.pushRoute(`/patient/${disAddress}`);
    } catch (error) {
      console.log(error, "error from IPFS");
      return error;
    }
  };

  return (
    <div>
      <Layout>
        {/* {props.address} */}
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
