import React from "react";
import { useSelector } from "react-redux";
import Divider from "../../components/divider/Divider";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import LandingLayout from "../../components/Layout/LandingLayout";
import PricingPlans from "./PricingPlans";

const PricingPage = () => {
  const user = useSelector((state) => state.userReducer);

  if (user.isAuthenticated) {
    return (
      <DashboardLayout title={"Pricing plans"}>
        <PricingPlans />
        <Divider />
      </DashboardLayout>
    );
  } else {
    return (
      <LandingLayout>
        <Breadcrumb
          breadcrumbTitle="Pricing plans"
          breadcrumbNav={[
            {
              navText: "Home",
              path: "/",
            },
          ]}
        />
        <div className="container">
          <PricingPlans />
        </div>
        <Divider />
      </LandingLayout>
    );
  }
};

export default PricingPage;
