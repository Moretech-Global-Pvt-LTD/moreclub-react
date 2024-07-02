import React from "react";
import LandingLayout from "../../components/Layout/LandingLayout";
import TermsContent from "./TermsContent";
import Divider from "../../components/divider/Divider";
import HeaderDashboard from "../../components/header/HeaderDashboard";
import Footer from "../../components/footer/Footer";
import Footbar from "../../components/footbar/footbar";
import { useSelector } from "react-redux";

const TermsPage = () => {
  const user = useSelector((state) => state.userReducer);
  if (user.isAuthenticated) {
    return (
      <>
        <HeaderDashboard />
        <div className="admin-wrapper">
          <TermsContent />

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
          <TermsContent />
          <Divider />
        </div>
      </LandingLayout>
    );
  }
};

export default TermsPage;
