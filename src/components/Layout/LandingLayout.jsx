import React, { useEffect } from "react";
import Footer from "../footer/Footer";
import Divider from "../divider/Divider";
import UniverslNavbar from "../header/Header";
import { useLocation } from "react-router-dom";

const LandingLayout = ({ children }) => {
  const location = useLocation()

  const removebpms = () => {

    if (location.pathname !== '/points/send') {
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("bpms");
      }
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);

    removebpms()
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
