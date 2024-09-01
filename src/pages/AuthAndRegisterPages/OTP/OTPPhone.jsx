import React from "react";

import OTPContent from "../../../components/otp/OTPContent";

import DashboardLayout from "../../../components/Layout/DashboardLayout";

const OTPPhone = () => {
  return (
    <DashboardLayout title={"Phone verification"}>
      <OTPContent />
    </DashboardLayout>
  );
};

export default OTPPhone;
