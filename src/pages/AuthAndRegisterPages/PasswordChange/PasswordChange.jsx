import React from "react";

import Divider from "../../../components/divider/Divider";
import ChangePasswordContent from "../../../components/password_change/PasswordChangeContent";

import LandingLayout from "../../../components/Layout/LandingLayout";

const PasswordChange = () => {
  return (
    <LandingLayout>
      <ChangePasswordContent
        title="Change your Password"
        subTitle="Already have an account?"
      />

      <Divider />
    </LandingLayout>
  );
};

export default PasswordChange;
