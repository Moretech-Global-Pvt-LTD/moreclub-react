import React from "react";
import Divider from "../../../components/divider/Divider";
import Footer from "../../../components/footer/Footer";
import Header from "../../../components/header/Header";
import ScannarContent from "./ScannarContent";
import HeaderDashboard from "../../../components/header/HeaderDashboard";
import { useSelector } from "react-redux";

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
        <Header />
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
