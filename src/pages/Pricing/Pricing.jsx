import React from "react";

import Divider from "../../components/divider/Divider";

import DashboardLayout from "../../components/Layout/DashboardLayout";

import PricingPlans from "./PricingPlans";


const PricingPage = () => {

    return (
      <DashboardLayout title={"Pricing plans"}>
        <PricingPlans />
        <Divider />
      </DashboardLayout>
    );
};

export default PricingPage;
