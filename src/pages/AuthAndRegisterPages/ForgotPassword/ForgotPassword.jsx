import React from "react";
import ForgetPasswordContent from "../../../components/forgot_password/ForgetPasswordContent";
import AuthLayout from "../../../components/Layout/AuthLayout";

const ForgotPassword = () => {
  return (
    <AuthLayout>
      <div className="divider-large" />
      <ForgetPasswordContent
        title="Reset your Password"
        subTitle=""
      />
    </AuthLayout>
  );
};

export default ForgotPassword;
