import React from "react";

import Divider from "../../components/divider/Divider";

import DashboardLayout from "../../components/Layout/DashboardLayout";

import PointsPayment from "../Payment/PointsPayment";

const BuyPlan = () => {
  return (
    <DashboardLayout title={"Buy Membership Plan"}>
      <PointsPayment />
      <Divider />
    </DashboardLayout>
  );
};

export default BuyPlan;
