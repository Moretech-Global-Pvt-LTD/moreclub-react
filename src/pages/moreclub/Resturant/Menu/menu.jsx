import React from "react";
import Divider from "../../../../components/divider/Divider";
import MenuCategory from "../../../../components/Moreclub/Resturant/Menu/MenuCategory";
import RestaurantLayout from "../../../../components/Layout/RestaurantLayout";

const RestroMenu = () => {

  return (
    <RestaurantLayout>
      <MenuCategory/>
      <Divider />
      <Divider />
    </RestaurantLayout>
  );
};

export default RestroMenu;
