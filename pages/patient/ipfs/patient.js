import React, { useEffect } from "react";

function Patient({ patient, update, index, removeLine, updatePatient }) {
  useEffect(() => {
    console.log({ patient, index });
  }, [update]);

  const handelOnChange = (e) => {
    patient[e.target.name] = e.target.value;
    updatePatient(patient);
  };
  return (
    <div>
      <form className="m-2">
        <div className="form-row">
          <div className="col-md-11">
            <div className="row">
              <div className="form-group col-md-3">
                <input
                  type="number"
                  className="form-control"
                  name="serialNumber"
                  placeholder="S. No."
                  onChange={handelOnChange}
                />
              </div>
              <div className="form-group col-md-3">
                <input
                  type="text"
                  className="form-control"
                  name="disease"
                  placeholder="Disease"
                  onChange={handelOnChange}
                />
              </div>
              <div className="form-group col-md-3">
                <input
                  type="text"
                  className="form-control"
                  name="summary"
                  placeholder="Summary"
                  onChange={handelOnChange}
                />
              </div>
              <div className="form-group col-md-3">
                <input
                  type="text"
                  className="form-control"
                  name="medicines"
                  placeholder="Medicines"
                  onChange={handelOnChange}
                />
              </div>
            </div>
          </div>
          {index !== 0 && (
            <div className="col-md-1">
              <i
                className="fa fa-trash"
                aria-hidden="true"
                onClick={() => {
                  removeLine(index);
                }}
              ></i>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default Patient;
