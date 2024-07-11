import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Logos = ({ link }) => {
  const metainfo = useSelector((state) => state.metaReducer);
  return (
    <div className="admin-logo me-2 me-sm-3">
      <div className="admin-logo me-2 me-sm-3">
        <Link className="d-block" to={link}>
          <img
            className="nav-light-logo navbar-logo"
            src={`${metainfo.meta?.black_logo}`}
            alt="Light"
            // style={{ maxHeight: "100px" }}
          />
          <img
            className=" nav-dark-logo navbar-logo"
            src={`${metainfo.meta?.white_logo}`}
            alt="Dark"
            // style={{ maxHeight: "100px" }}
          />
        </Link>
      </div>
    </div>
  );
};

export default Logos;
