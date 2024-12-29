import React from "react";
import UniversalNavbar from "../header/Header";
import Divider from "../divider/Divider";

const AuthLayout = ({ children }) => {
  return (
    <div className="layout-wrapper">
      <UniversalNavbar />
      <div className="container">
        <div className="login-container">
          <Divider />
          <div className="mt-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
