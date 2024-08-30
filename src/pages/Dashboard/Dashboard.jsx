
import { useEffect } from "react";
import Divider from "../../components/divider/Divider";
import Footbar from "../../components/footbar/footbar";
import Footer from "../../components/footer/Footer";
import HeaderDashboard from "../../components/header/HeaderDashboard";
import DashboardContent from "./DashboardContent";
// import useVisibilityChange from "../../Hooks/useVisibilityChange";
// import { setupNotifications } from "../../utills/firebase";
// import { sendNativeNotification, toastNotification } from "../../utills/notificationhelper";




const Dashboard = () => {
  // const isForeground = useVisibilityChange();
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
      <div className="admin-wrapper admin-wrapper-padding"  >
        <div className="container px-1 px-sm-2">
        <DashboardContent/>
        </div>
        <Divider />
        <Footer />
      </div>
      <Footbar/>
    </>
  );
};

export default Dashboard;
