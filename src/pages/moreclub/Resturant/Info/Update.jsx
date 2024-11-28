import React from "react";
import InfoUpdateTabs from "./UpdateTabs";
import RestaurantLayout from "../../../../components/Layout/RestaurantLayout";

const RestroUpdateInfo = () => {
  return (
    <RestaurantLayout title={"Update Restaurant"}>
      <InfoUpdateTabs />
    </RestaurantLayout>
  );
};

export default RestroUpdateInfo;
