import React from "react";

import DashboardLayout from "../../components/Layout/DashboardLayout";
import FAQContent from "./FAQContent";
import LandingLayout from "../../components/Layout/LandingLayout";
import { useSelector } from "react-redux";
import Divider from "../../components/divider/Divider";
const FAQPage = () => {
  const user = useSelector((state) => state.userReducer);
  if (user.isAuthenticated) {
    return (
      <DashboardLayout title={"FAQs"}>
        <FAQContent />
      </DashboardLayout>
    );
  } else {
    return (
      <LandingLayout>
        <div className="container">
          <FAQContent />
          <Divider />
        </div>
      </LandingLayout>
    );
  }
};

export default FAQPage;
