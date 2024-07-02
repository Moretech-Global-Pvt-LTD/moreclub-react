import React from "react";
import PrivacyContent from "./PrivacyContent";
import LandingLayout from "../../components/Layout/LandingLayout";
import Divider from "../../components/divider/Divider";
import { useSelector } from "react-redux";
import HeaderDashboard from "../../components/header/HeaderDashboard";
import Footbar from "../../components/footbar/footbar";
import Footer from "../../components/footer/Footer";

const PrivacyPage = () => {
  const user = useSelector((state) => state.userReducer);
  if (user.isAuthenticated) {
    return (
      <>
        <HeaderDashboard />
        <div className="admin-wrapper">
          <PrivacyContent />

          <Divider />
          <Footer />
        </div>
        <Footbar />
      </>
    );
  } else {
    return (
      <LandingLayout>
        <div className="container">
          <PrivacyContent />
          <Divider />
        </div>
      </LandingLayout>
    );
  }
};

export default PrivacyPage;
