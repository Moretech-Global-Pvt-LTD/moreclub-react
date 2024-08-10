import React, { useEffect } from "react";

import Divider from "../../components/divider/Divider";

import DashboardLayout from "../../components/Layout/DashboardLayout";

import PricingPlans from "./PricingPlans";
import { useDispatch } from "react-redux";
import { planDetailSuccess } from "../../redux/slices/membershipTypeSlice";


// const planConfig = {
//   2: {
//     cardClass: "pricingcard-starter",
//     textColorClass: "pricing-text-color",
//     bgColorClass: "bg-gray text-warning",
//     priceColorClass: "text-dynamic-white",
//     discountsColorClass: "text-primary",
//   },
//   4: {
//     cardClass: "pricingcard-gold",
//     textColorClass: "pricingcard-text-gold",
//     bgColorClass: "pricingcard-premium text-white",
//     priceColorClass: "text-white",
//     discountsColorClass: "text-black",
//   },
//   3: {
//     cardClass: "pricingcard-premium",
//     textColorClass: "text-white",
//     bgColorClass: "bg-warning text-white",
//     priceColorClass: "pricing-text-color",
//     discountsColorClass: "text-warning",
//   },
//   1: {
//     cardClass: "pricingcard-platinum",
//     textColorClass: "text-danger",
//     bgColorClass: "bg-gold text-black",
//     priceColorClass: "text-danger",
//     discountsColorClass: "text-black",
//   },
// }

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
