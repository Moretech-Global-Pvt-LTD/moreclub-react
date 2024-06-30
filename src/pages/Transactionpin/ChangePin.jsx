import React from "react";
import ChangePinForm from "../../components/points/ChangeTransactionPin";
import DashboardLayout from "../../components/Layout/DashboardLayout";

const ChangePin = () => {
  return (
    <DashboardLayout title={"Change Pin"}>
      <ChangePinForm />
    </DashboardLayout>
  );
};

export default ChangePin;
