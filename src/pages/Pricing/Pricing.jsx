import React, { useEffect } from "react";

import Divider from "../../components/divider/Divider";

import DashboardLayout from "../../components/Layout/DashboardLayout";

import PricingPlans from "./PricingPlans";
import { useDispatch } from "react-redux";
import { planDetailSuccess } from "../../redux/slices/membershipTypeSlice";

const PricingPage = () => {
  const dispatch= useDispatch()

  useEffect(() => {
    dispatch(planDetailSuccess({}));
  },[])

    return (
      <DashboardLayout title={"Pricing plans"}>
        <PricingPlans />
        <Divider />
      </DashboardLayout>
    );
};

export default PricingPage;
