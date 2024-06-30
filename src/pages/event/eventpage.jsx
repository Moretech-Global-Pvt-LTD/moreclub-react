import React from "react";
import LandingLayout from "../../components/Layout/LandingLayout";
import Divider from "../../components/divider/Divider";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import EventpageContent from "./eventPageContent";

const Eventpage = () => {
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
        <EventpageContent/>
      </div>
      <Divider />
    </LandingLayout>
  );
};

export default Eventpage;


