import React, { Children, useEffect } from "react";
import HeaderDashboard from "../header/HeaderDashboard";
import Footer from "../footer/Footer";
import Divider from "../divider/Divider";
import Breadcrumb from "../breadcrumb/Breadcrumb";
import Footbar from "../footbar/footbar";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";
import InactivityLogout from "../HOC/inactivity";
import { fetchNewNotifications } from "../../redux/api/notificationApi";
import { useDispatch, useSelector } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import BusinessSetupmodal from "../../pages/AuthAndRegisterPages/BusinessRegistration/businessSetupmodal";
// import { setupNotifications } from "../../utills/firebase";
// import useVisibilityChange from "../../Hooks/useVisibilityChange";
// import { sendNativeNotification, toastNotification } from "../../utills/notificationhelper";

const DashboardLayout = ({ children, title , showBreadCrumb}) => {
  const location = useLocation()
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notification);
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

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (notifications.currentpage !== 0 && notifications.checkForUpdate) {
        dispatch(fetchNewNotifications())
      };
    }, 60000); // Fetch every 1 minute

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [dispatch]);

  
  return (
    <> 
      <HeaderDashboard />
      <InactivityLogout />
      {localStorage.getItem("business_exists") === "false" && <BusinessSetupmodal />}
      <div className="admin-wrapper">
        {!showBreadCrumb && <Breadcrumb
          breadcrumbTitle={title}
          breadcrumbNav={[
            {
              navText: "Home",
              path: "/dashboard",
            },
          ]}
        />}
        <div className="container">
          
          {children}
        </div>
        <Divider />
        <Footer />
      </div>
      <Footbar />
    </>
  );
};

export default DashboardLayout;
