import React from "react";
import LandingLayout from "../../components/Layout/LandingLayout";
import TermsContent from "./TermsContent";
import Divider from "../../components/divider/Divider";
// import { useSelector } from "react-redux";
// import DashboardLayout from "../../components/Layout/DashboardLayout";

const TermsPage = () => {
  // const user = useSelector((state) => state.userReducer);
  // if (user.isAuthenticated) {
  //   return (
  //     <DashboardLayout>
  //       <TermsContent />
  //       <Divider />
  //     </DashboardLayout>
  //   );
  // } else {
    return (
      <LandingLayout>
        <TermsContent />
        <Divider />
      </LandingLayout>
    );
  // }

 
};

export default TermsPage;
