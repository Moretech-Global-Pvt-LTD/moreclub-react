import React from "react";

const Unauthorized = () => {
  return (
    <div className="row" style={{ height: "80vh", width: "100%" }}>
      <div className="d-flex flex-column align-items-center justify-content-center">
        <h1> Unauthorized access</h1>
        <h6>You need to Upgrade to higher packages to access this page</h6>
        <button className="btn btn-warning rounded-pill btn-lg">
          Upgrade Package
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
