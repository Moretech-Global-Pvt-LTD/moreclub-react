import React from "react";
import DashboardLayout from "../../../components/Layout/DashboardLayout";
import Setuppage from "../../../components/Moreclub/Resturant/setuppage";
import ResturantContent from "../../../components/Moreclub/Resturant/ResturantContent";

const Resturant = () => {
  return (
    <DashboardLayout title={"Setup Resturant"}>
      {/* <Setuppage /> */}
      <ResturantContent />
    </DashboardLayout>
  );
};

export default Resturant;
