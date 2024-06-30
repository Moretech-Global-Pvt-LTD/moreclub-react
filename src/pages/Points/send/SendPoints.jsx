import React from "react";

import Divider from "../../../components/divider/Divider";

import TransferForm from "../../../components/points/transferform";

import DashboardLayout from "../../../components/Layout/DashboardLayout";

const SendPoints = () => {


  return (
    <DashboardLayout title={"Send Money"}>
      <div className="row">
        <div className="col-12 col-md-6">
          <TransferForm />
        </div>
      </div>
      <Divider />
    </DashboardLayout>
  );
};

export default SendPoints;
