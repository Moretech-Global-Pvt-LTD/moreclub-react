import React from "react";

import ForgetPasswordChange from "./ForgetPasswordChange";
import AuthLayout from "../../../components/Layout/AuthLayout";
// import ForgetPasswordContent from '../../components/forgot_password/ForgetPasswordContent'

const PasswordChangeContent = () => {
  return (
    <>
      <AuthLayout>
        <ForgetPasswordChange />
      </AuthLayout>
    </>
  );
};

export default PasswordChangeContent;
