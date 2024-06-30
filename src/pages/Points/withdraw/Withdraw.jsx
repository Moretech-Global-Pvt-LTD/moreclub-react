import React from "react";
import DashboardLayout from "../../../components/Layout/DashboardLayout";
import MainWithDrawalForm from "../../../components/points/withdrawal/MainWithDrawalForm";


const Withdraw = () => {
  return (
    <DashboardLayout title={"Withdraw "}>
      <div>
        <MainWithDrawalForm />
        
      </div>
    </DashboardLayout>
  );
};

export default Withdraw;
