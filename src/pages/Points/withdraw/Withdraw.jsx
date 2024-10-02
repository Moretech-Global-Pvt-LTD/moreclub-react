import React from "react";
import DashboardLayout from "../../../components/Layout/DashboardLayout";
import MainWithDrawalForm from "../../../components/points/withdrawal/MainWithDrawalForm";
import AlertNotification from "../../../components/alert_notification/AlertNotification";


const Withdraw = () => {
  return (
    <DashboardLayout title={"Withdraw "}>
      <AlertNotification />
      <div>
        <MainWithDrawalForm />
      </div>
    </DashboardLayout>
  );
};

export default Withdraw;
