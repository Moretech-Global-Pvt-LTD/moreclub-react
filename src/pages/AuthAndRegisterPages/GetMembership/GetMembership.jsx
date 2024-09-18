import React from "react";
import Divider from "../../../components/divider/Divider";
import Footer from "../../../components/footer/Footer";
import ScannarContent from "./ScannarContent";
import HeaderDashboard from "../../../components/header/HeaderDashboard";


const GetMembership = () => {

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

};

export default GetMembership;
