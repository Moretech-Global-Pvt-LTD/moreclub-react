import React from "react";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import Divider from "../../components/divider/Divider";
import PartnerContent from "./PartnerContent";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import LandingLayout from "../../components/Layout/LandingLayout";
import { getAccessToken } from "../../utills/token";

const PartnerPage = () => {
  if (!!getAccessToken()) {
    return (
      <DashboardLayout title={"Our Partners"}>
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
          {/* <PartnerUnauthenticatedContent /> */}
          <Divider />
        </div>
      </LandingLayout>
    );
  }
};

export default PartnerPage;
