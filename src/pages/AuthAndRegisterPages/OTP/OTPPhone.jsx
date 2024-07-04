import React from "react";

import Divider from "../../../components/divider/Divider";
import OTPContent from "../../../components/otp/OTPContent";
import LandingLayout from "../../../components/Layout/LandingLayout";

const OTPPhone = () => {
  return (
    <LandingLayout>
      <OTPContent />
      <Divider />
    </LandingLayout>
  );
};

export default OTPPhone;
