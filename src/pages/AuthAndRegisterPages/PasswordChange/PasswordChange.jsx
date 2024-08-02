import React from "react";
import ChangePasswordContent from "../../../components/password_change/PasswordChangeContent";
import AuthLayout from "../../../components/Layout/AuthLayout";

const PasswordChange = () => {
  return (
    <AuthLayout>
      <ChangePasswordContent
        title="Change your Password"
        subTitle="Already have an account?"
      />
    </AuthLayout>
  );
};

export default PasswordChange;
