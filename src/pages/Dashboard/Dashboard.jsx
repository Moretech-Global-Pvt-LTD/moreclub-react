
import DashboardLayout from "../../components/Layout/DashboardLayout";
import DashboardContent from "./DashboardContent";


const Dashboard = () => {


  return (
    
      <DashboardLayout showBreadCrumb={true}>
        <DashboardContent />
      </DashboardLayout>
      );
};

export default Dashboard;
