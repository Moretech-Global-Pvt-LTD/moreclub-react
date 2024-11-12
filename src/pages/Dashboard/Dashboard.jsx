
import Divider from "../../components/divider/Divider";
import Footbar from "../../components/footbar/footbar";
import Footer from "../../components/footer/Footer";
import HeaderDashboard from "../../components/header/HeaderDashboard";
import InactivityLogout from "../../components/HOC/inactivity";
import DashboardContent from "./DashboardContent";




const Dashboard = () => {

 

  


  return (
    <>
      <HeaderDashboard />
      <InactivityLogout />
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
