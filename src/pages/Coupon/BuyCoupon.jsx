import React from "react";

import Divider from "../../components/divider/Divider";

import DashboardLayout from "../../components/Layout/DashboardLayout";

import PointsPayment from "../Payment/PointsPayment";

const BuyCoupon = () => {
  return (
    <DashboardLayout title={"Buy Coupon"}>
      <PointsPayment />
      <Divider />
    </DashboardLayout>
  );
};

export default BuyCoupon;
