import React from "react";
import DashboardLayout from "../../../../components/Layout/DashboardLayout";

import InfoTabs from "./InfoLayout";

const RestroInfo = () => {
  return (
    <DashboardLayout title={"Resturant Setup"}>
      <InfoTabs/>
    </DashboardLayout>
  );
};

export default RestroInfo;
