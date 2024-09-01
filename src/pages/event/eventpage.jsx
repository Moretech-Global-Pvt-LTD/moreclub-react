import React from "react";
import Divider from "../../components/divider/Divider";
import EventpageContent from "./eventPageContent";
import DashboardLayout from "../../components/Layout/DashboardLayout";

const Eventpage = () => {
  

    return (
      <DashboardLayout title={"Events"}>
        <EventpageContent />
        <Divider />
      </DashboardLayout>
    );
  // } else {
  //   return (
  //     <LandingLayout>
  //       <Breadcrumb
  //         breadcrumbTitle={"Events"}
  //         breadcrumbNav={[
  //           {
  //             navText: "Home",
  //             path: "/",
  //           },
  //         ]}
  //       />
  //       <div className="container">
  //         <EventpageContent />
  //       </div>
  //       <Divider />
  //     </LandingLayout>
  //   );
  // }
};

export default Eventpage;
