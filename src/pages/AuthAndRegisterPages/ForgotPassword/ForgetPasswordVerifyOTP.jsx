import React from "react";
import ForgetPasswordOTP from "../../../components/forgot_password/ForgetPasswordOTP";
import AuthLayout from "../../../components/Layout/AuthLayout";

const ForgetPasswordVerifyOTP = () => {
  return (
    <>
      <AuthLayout>
        <div className="divider-large" />
        <ForgetPasswordOTP />
      </AuthLayout>
    </>
  );
};

export default ForgetPasswordVerifyOTP;
