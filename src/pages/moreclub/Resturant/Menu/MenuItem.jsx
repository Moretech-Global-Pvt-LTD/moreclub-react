import React from "react";
import Divider from "../../../../components/divider/Divider";
import MenuItem from "../../../../components/Moreclub/Resturant/Menu/MenuItem";
import RestaurantLayout from "../../../../components/Layout/RestaurantLayout";

const RestroMenuItem = () => {
  return (
    <RestaurantLayout>
      <MenuItem />
      <Divider />
    </RestaurantLayout>
  );
};

export default RestroMenuItem;
