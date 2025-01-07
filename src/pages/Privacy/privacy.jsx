import React from "react";
import PrivacyContent from "./PrivacyContent";
import LandingLayout from "../../components/Layout/LandingLayout";
import Divider from "../../components/divider/Divider";
import HeaderDashboard from "../../components/header/HeaderDashboard";
import Footbar from "../../components/footbar/footbar";
import Footer from "../../components/footer/Footer";
import Cookies from "js-cookie";

const PrivacyPage = () => {
  if (Cookies.get("moretechglobal_access")) {
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
