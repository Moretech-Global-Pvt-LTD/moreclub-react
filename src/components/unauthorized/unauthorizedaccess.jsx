import React from "react";
import { Link } from "react-router-dom";

const UnauthorizedAccess = () => {
  return (
    <div className="row" style={{ height: "80vh", width: "100%" }}>
      <div className="d-flex flex-column align-items-center justify-content-center">
        <h1> Unauthorized access</h1>
        <h6>You donot have permission to access this page</h6>
      </div>
    </div>
  );
};

export default UnauthorizedAccess;
