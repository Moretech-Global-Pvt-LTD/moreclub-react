import React from "react";
import LandingLayout from "../../components/Layout/LandingLayout";
import Divider from "../../components/divider/Divider";
import LiscenceContent from "./LiscenceContent";
import Footer from "../../components/footer/Footer";
import Footbar from "../../components/footbar/footbar";
import HeaderDashboard from "../../components/header/HeaderDashboard";
import Cookies from "js-cookie";

const LiscencePage = () => {
  if (Cookies.get("moretechglobal_access")) {
    return (
      <>
        <HeaderDashboard />
        <div className="admin-wrapper">
          <LiscenceContent />

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
          <LiscenceContent />
          <Divider />
        </div>
      </LandingLayout>
    );
  }
};

export default LiscencePage;
