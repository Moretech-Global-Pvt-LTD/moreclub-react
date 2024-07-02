import React from "react";
import OTPArea from "../../../components/otp/OTP";
import Divider from "../../../components/divider/Divider";

import LandingLayout from "../../../components/Layout/LandingLayout";

const OTP = () => {
  return (
    <LandingLayout>
      <OTPArea />
      <Divider />
    </LandingLayout>
  );
};

export default OTP;
