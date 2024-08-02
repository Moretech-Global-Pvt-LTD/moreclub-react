import React from "react";
import Divider from "../../../components/divider/Divider";
import OTPContent from "../../../components/otp/OTPContent";
import LoggedHeader from "../../../components/header/LoggedHeader";
import DashboardLayout from "../../../components/Layout/DashboardLayout";

const OTPPhone = () => {
  return (
    // <>
    //   <LoggedHeader />
    //   <div className="login-container">
    //     <Divider />
    //     <div className="mt-3">
    //       <OTPContent />
    //     </div>
    //   </div>
    // </>
    <DashboardLayout title={"Phone verification"}>
      <OTPContent />
    </DashboardLayout>
  );
};

export default OTPPhone;
