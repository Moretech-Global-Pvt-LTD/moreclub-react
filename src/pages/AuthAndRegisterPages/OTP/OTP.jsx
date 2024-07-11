import React from "react";
import OTPArea from "../../../components/otp/OTP";
import AuthLayout from "../../../components/Layout/AuthLayout";
import UniverslNavbar from "../../../components/header/Header";
import Divider from "../../../components/divider/Divider";

const OTP = () => {
  return (
    <AuthLayout>
      {/* <div className="login-container">
        <UniverslNavbar />
        <div className="container">
          <Divider />
          <div className="divider-large" />

          <OTPArea />
        </div>
      </div> */}

      <div className="divider-large" />

      <OTPArea />
    </AuthLayout>
  );
};

export default OTP;
