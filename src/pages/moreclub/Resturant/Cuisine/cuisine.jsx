import React from "react";
import Divider from "../../../../components/divider/Divider";
import CuisineItem from "./CuisineItem";
import RestaurantLayout from "../../../../components/Layout/RestaurantLayout";

const Cuisine = () => {

    return (
        <RestaurantLayout >
            <CuisineItem />
            <Divider />
            <Divider />
        </RestaurantLayout>
    );
};

export default Cuisine;
