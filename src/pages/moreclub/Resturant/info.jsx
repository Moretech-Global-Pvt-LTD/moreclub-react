import React from "react";
import DashboardLayout from "../../../components/Layout/DashboardLayout";
import Divider from "../../../components/divider/Divider";
import InfoForm from "../../../components/Moreclub/Resturant/InfoForm";

const RestroInfo = () => {
  return (
    <DashboardLayout>
      <InfoForm />
      <Divider />
      <Divider />
    </DashboardLayout>
  );
};

export default RestroInfo;
