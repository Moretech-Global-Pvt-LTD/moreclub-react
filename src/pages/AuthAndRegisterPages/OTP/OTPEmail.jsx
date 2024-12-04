import React from "react";

import OTPContent from "../../../components/otp/OTPContent";

import DashboardLayout from "../../../components/Layout/DashboardLayout";

const OTPEmail = () => {
  return (
    <DashboardLayout title={"Phone verification"}>
      <OTPContent />
    </DashboardLayout>
  );
};

export default OTPEmail;
