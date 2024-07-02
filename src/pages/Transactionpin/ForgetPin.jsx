import React from "react";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import ForgetPinForm from "../../components/points/ForgetTransactionPin";

const ForgetPin = () => {
  return (
    <DashboardLayout title={"Reset Pin"}>
      <ForgetPinForm />
    </DashboardLayout>
  );
};

export default ForgetPin;
