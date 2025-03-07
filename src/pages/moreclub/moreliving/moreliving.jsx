import React from "react";
import DashboardLayout from "../../../components/Layout/DashboardLayout";
import MorefoodContent from "../../../components/Moreclub/morefood/morefoodContent";
import PopularResturant from "../../../components/Moreclub/morefood/PopularResturant";
import { getAccessToken } from "../../../utills/token";
import LandingLayout from "../../../components/Layout/LandingLayout";
import { Container } from "react-bootstrap";
import MorelivingContent from "../../../components/Moreclub/moreliving/MorelivingContent";
import Popularhotels from "../../../components/Moreclub/moreliving/popularHotels";

const MoreLiving = () => {
  if (!getAccessToken()) {
    return (
      <LandingLayout>
        <Container>
          <div className="w-full mx-auto">
            <h4 className="mx-auto mt-3 ">Popular Hotels</h4>
            <Popularhotels />
            <MorelivingContent />
          </div>
        </Container>
      </LandingLayout>
    );
  } else {
    return (
      <DashboardLayout title={"MORE LIVING"}>
        <div className="w-full mx-auto">
          <h4 className="mx-auto mt-3 ">Popular Hotels</h4>
          <Popularhotels />

          <MorelivingContent />
        </div>
      </DashboardLayout>
    );
  }
};

export default MoreLiving;
