import React from "react";
import DashboardLayout from "../../../../components/Layout/DashboardLayout";
import InfoUpdateTabs from "./UpdateTabs";

const RestroUpdateInfo = () => {
  return (
    <DashboardLayout title={"Update Restaurant"}>
      <InfoUpdateTabs />
    </DashboardLayout>
  );
};

export default RestroUpdateInfo;
