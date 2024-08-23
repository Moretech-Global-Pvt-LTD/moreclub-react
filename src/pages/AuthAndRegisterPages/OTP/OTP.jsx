import React from "react";
import OTPArea from "../../../components/otp/OTP";
import AuthLayout from "../../../components/Layout/AuthLayout";


const OTP = () => {
  return (
    <AuthLayout>
   

      <div className="divider-large" />

      <OTPArea />
    </AuthLayout>
  );
};

export default OTP;
