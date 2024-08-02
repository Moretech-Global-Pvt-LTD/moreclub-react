import React from "react";

import { useSelector } from "react-redux";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import Divider from "../../components/divider/Divider";
import PartnerContent from "./PartnerContent";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import LandingLayout from "../../components/Layout/LandingLayout";

const PartnerPage = () => {
  const user = useSelector((state) => state.userReducer);
  if (user.isAuthenticated) {
    return (
      <DashboardLayout title={"Our Partners"}>
        {/* <div className="container"> */}
        <PartnerContent />

        {/* </div> */}
        <Divider />
      </DashboardLayout>
    );
  } else {
    return (
      <LandingLayout>
        <Breadcrumb
          breadcrumbTitle="Our Partners"
          breadcrumbNav={[
            {
              navText: "Home",
              path: "/",
            },
          ]}
        />
        <div className="container">
        <PartnerContent />
        <Divider/>
        </div>
      </LandingLayout>
    );
  }
};

export default PartnerPage;
