import React from "react";
import TransactionPinForm from "../../components/points/TransactionPinForm";
import DashboardLayout from "../../components/Layout/DashboardLayout";

const TransactionPin = () => {
  return (
    <DashboardLayout title={"Transaction PIN"}>
      <TransactionPinForm />
    </DashboardLayout>
  );
};

export default TransactionPin;
