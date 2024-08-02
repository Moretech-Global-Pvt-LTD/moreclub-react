import React from "react";
import Divider from "../../../components/divider/Divider";
import Footer from "../../../components/footer/Footer";
import ScannarContent from "./ScannarContent";
import HeaderDashboard from "../../../components/header/HeaderDashboard";
import { useSelector } from "react-redux";
import UniverslNavbar from "../../../components/header/Header";

const GetMembership = () => {
  const user = useSelector((state) => state.userReducer);
  if (user.isAuthenticated) {
    return (
      <>
        <HeaderDashboard />
        <div className="admin-wrapper">
          <div className="container">
            <ScannarContent title="Scan" />
            <Divider />
          </div>

          <Footer />
        </div>
      </>
    );
  } else {
    return (
      <>
        <UniverslNavbar />
        <Divider />
        <ScannarContent title="Scan" />
        <Divider />
        <Footer />
      </>
    );
  }
  // return (
  //   <>
  //     <Header />

  //     <Divider />

  //     <ScannarContent title="Create your account" />

  //     <Divider />

  //     <Footer />
  //   </>
  // );
};

export default GetMembership;
