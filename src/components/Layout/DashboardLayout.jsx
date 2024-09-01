import React, { Children, useEffect } from "react";
import HeaderDashboard from "../header/HeaderDashboard";
import Footer from "../footer/Footer";
import Divider from "../divider/Divider";
import Breadcrumb from "../breadcrumb/Breadcrumb";
import Footbar from "../footbar/footbar";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";
// import { setupNotifications } from "../../utills/firebase";
// import useVisibilityChange from "../../Hooks/useVisibilityChange";
// import { sendNativeNotification, toastNotification } from "../../utills/notificationhelper";

const DashboardLayout = ({ children, title }) => {
  const location = useLocation()
  // const isForeground = useVisibilityChange();
  const removebpms = () => {

    if (location.pathname !== '/points/send') {
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("bpms");
      }
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    ReactGA.send("page_view", {
      page_path: location.pathname,
    });

    removebpms()

  }, [location.pathname]);

  // useEffect(() => {
  //   setupNotifications(({ title, body }) => {
  //     if (isForeground) {
  //       // App is in the foreground, show toast notification
  //       toastNotification({
  //         title,
  //         description: body,
  //       });
  //     } else {
  //       // App is in the background, show native notification
  //       sendNativeNotification({
  //         title,
  //         body,
  //       });
  //     }
  //   });
  // }, [isForeground]);

 

  return (
    <>
      <HeaderDashboard />
      <div className="admin-wrapper">
        <Breadcrumb
          breadcrumbTitle={title}
          breadcrumbNav={[
            {
              navText: "Home",
              path: "/dashboard",
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
