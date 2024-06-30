import React from "react";
import HeaderDashboard from "../../components/header/HeaderDashboard";
import { useSelector } from "react-redux";
import Divider from "../../components/divider/Divider";
import Footer from "../../components/footer/Footer";
import LearnMoreContents from "./LearnMoreContent";

import LandingLayout from "../../components/Layout/LandingLayout";

const LearmMorePage = () => {
  const user = useSelector((state) => state.userReducer);
  if (user.isAuthenticated) {
    return (
      <>
        <HeaderDashboard />
        <div className="admin-wrapper">
          <LearnMoreContents/>
          <Divider />
          <Footer />
        </div>
      </>
    );
  } else {
    return (
      <LandingLayout>
       <LearnMoreContents/>
        <Divider />
        <Footer />
      </LandingLayout>
    );
  }
};

export default LearmMorePage;
