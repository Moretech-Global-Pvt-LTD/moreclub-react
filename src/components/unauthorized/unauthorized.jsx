import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="row" style={{ height: "80vh", width: "100%" }}>
      <div className="d-flex flex-column align-items-center justify-content-center">
        <h1> Unauthorized access</h1>
        <h6>You need to Upgrade to higher packages to access this page</h6>
        <Link to="/pricing">
          <button className="btn btn-warning rounded-pill btn-lg">
            Upgrade Package
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
