import React, { Children, useEffect } from "react";
import HeaderDashboard from "../header/HeaderDashboard";
import Footer from "../footer/Footer";
import Divider from "../divider/Divider";
import Breadcrumb from "../breadcrumb/Breadcrumb";
import Footbar from "../footbar/footbar";

const DashboardLayout = ({ children, title }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <HeaderDashboard />
      <div className="admin-wrapper">
        <Breadcrumb
          breadcrumbTitle={title}
          breadcrumbNav={[
            {
              navText: "Home",
              path: "/",
            },
          ]}
        />
        <div className="container">{children}</div>
        <Divider />
        <Footer />
      </div>
      <Footbar />
    </>
  );
};

export default DashboardLayout;
