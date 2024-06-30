import React from "react";
import HeaderDashboard from "../../components/header/HeaderDashboard";
import { useSelector } from "react-redux";
import Divider from "../../components/divider/Divider";
import Footer from "../../components/footer/Footer";
import AboutContents from "./AboutContent";
import LandingLayout from "../../components/Layout/LandingLayout";


const AboutPage = () => {
  const user = useSelector((state) => state.userReducer);
  if (user.isAuthenticated) {
    return (
      <>
        <HeaderDashboard />
        <div className="admin-wrapper">
      
          <AboutContents/>
          <Divider />
          <Footer />
        </div>
      </>
    );
  } else {
    return (
      <LandingLayout>
       <AboutContents/>
        <Divider />
      </LandingLayout>
    );
  }
};

export default AboutPage;
