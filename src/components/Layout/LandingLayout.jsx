import React, { useEffect } from "react";
import Footer from "../footer/Footer";
import Divider from "../divider/Divider";
import UniverslNavbar from "../header/Header";

const LandingLayout = ({ children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <UniverslNavbar />
      <Divider />
      <div className="divider-mobile" />
      <div className="mt-3">{children}</div>

      <Footer />
    </>
  );
};

export default LandingLayout;
