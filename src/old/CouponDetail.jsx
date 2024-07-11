import React from "react";

import Divider from "../components/divider/Divider";

import { useParams } from "react-router-dom";
import CouponTransactions from "../pages/Coupon/CouponTransaction";
import DashboardLayout from "../components/Layout/DashboardLayout";

const CouponDetail = () => {
  const { couponId } = useParams();

  return (
    <DashboardLayout title={"Coupons Details"}>
      <h4 className="mt-4">Hello Coupons Transactions</h4>

      <div className="content-outside-wrapper">
        <div className="nft-card card pt-4 ps-2 pe-2">
          <CouponTransactions couponId={couponId} />
        </div>
      </div>

      <Divider />
    </DashboardLayout>
  );
};

export default CouponDetail;
