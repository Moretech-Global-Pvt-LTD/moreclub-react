import React from "react";
import LandingLayout from "../../components/Layout/LandingLayout";
import Divider from "../../components/divider/Divider";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import EventpageContent from "./eventPageContent";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import { useSelector } from "react-redux";

const Eventpage = () => {
  const user = useSelector((state) => state.userReducer);

  if (user.isAuthenticated) {
    return (
      <DashboardLayout title={"Events"}>
        <EventpageContent />
        <Divider />
      </DashboardLayout>
    );
  } else {
    return (
      <LandingLayout>
        <Breadcrumb
          breadcrumbTitle={"Events"}
          breadcrumbNav={[
            {
              navText: "Home",
              path: "/",
            },
          ]}
        />
        <div className="container">
          <EventpageContent />
        </div>
        <Divider />
      </LandingLayout>
    );
  }
};

export default Eventpage;
