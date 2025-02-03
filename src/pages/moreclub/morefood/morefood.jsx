import React from "react";
import DashboardLayout from "../../../components/Layout/DashboardLayout";
import MorefoodContent from "../../../components/Moreclub/morefood/morefoodContent";
import PopularResturant from "../../../components/Moreclub/morefood/PopularResturant";
import { getAccessToken } from "../../../utills/token";
import LandingLayout from "../../../components/Layout/LandingLayout";
import { Container } from "react-bootstrap";

const Morefood = () => {
  if (!getAccessToken()) {
    return (
      <LandingLayout>
        <Container>
          <div className="w-full mx-auto">
            <h4 className="mx-auto mt-3 ">Popular Restaurants</h4>
            <PopularResturant />
            <MorefoodContent />
          </div>
        </Container>
      </LandingLayout>
    );
  } else {
    return (
      <DashboardLayout title={"MORE FOOD"}>
        <div className="w-full mx-auto">
          <h4 className="mx-auto mt-3 ">Popular Restaurants</h4>
          <PopularResturant />

          <MorefoodContent />
        </div>
      </DashboardLayout>
    );
  }
};

export default Morefood;
