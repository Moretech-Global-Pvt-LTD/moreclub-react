import React from "react";
import DashboardLayout from "../../../components/Layout/DashboardLayout";
import ResturantContent from "../../../components/Moreclub/Resturant/ResturantContent";

const Resturant = () => {
  return (
    <DashboardLayout title={"Setup Resturant"}>
      <ResturantContent />
    </DashboardLayout>
  );
};

export default Resturant;
