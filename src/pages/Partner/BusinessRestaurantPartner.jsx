import React from "react";
import { useParams } from "react-router-dom";
import { getAccessToken } from "../../utills/token";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import LandingLayout from "../../components/Layout/LandingLayout";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import UnauthenticatedBusinessPartnerContent from "./UnauthenticatedPartnerContent";
import Divider from "../../components/divider/Divider";
import { useQuery } from "@tanstack/react-query";
import { baseURL } from "../../config/config";
import { BestDealsinTownSkeleton } from "../../components/Skeleton/SmallCardSkeleton";
import { Row } from "react-bootstrap";
import Cookies from "js-cookie";
import axios from "axios";
import BusinessListCard from "../../components/dashboard/BusinessListCard";
import { getplatformName } from "../../utills/utility";
import UniversalErrorbox from "../../components/Layout/UniversalErrorBox";

const BusinessRestaurantPartner = () => {
  const { partnerId, partnerName, cuisineName } = useParams();

  const title = partnerName.replace(/-/g, " ");
  const CuisineName = cuisineName.replace(/-/g, " ").toLowerCase();

  if (!!getAccessToken()) {
    return (
      <DashboardLayout title={`${CuisineName} Cuisine`}>
        <BusinessPartnerContent
          partnerId={partnerId}
          CuisineName={CuisineName}
        />
        <Divider />
      </DashboardLayout>
    );
  } else {
    return (
      <LandingLayout>
        <Breadcrumb
          breadcrumbTitle={title}
          breadcrumbNav={[
            {
              navText: "Home",
              path: "/",
            },
          ]}
        />
        <div className="container">
          <UnauthenticatedBusinessPartnerContent partnerId={partnerId} />
          <Divider />
        </div>
      </LandingLayout>
    );
  }
};

export default BusinessRestaurantPartner;

const BusinessPartnerContent = ({ partnerId, CuisineName }) => {
  const { partnerName, cuisineName } = useParams();
  const title = partnerName.replace(/-/g, " ");

  const { data, isLoading, isError } = useQuery({
    queryKey: [`restaurant partners data ${cuisineName} `],
    queryFn: async () => {
      const response = await axios.get(
        `${baseURL}business/partners/${partnerId}/list/?cuisine=${cuisineName}`,
        {
          credentials: "include",
          Origin: "https://moredealsclub.com",
          headers: {
            "Content-Type": "application/json",

            "x-country-code": Cookies.get("countryCode"),
          },
        }
      );
      return response.data.data;
    },
    staleTime: 360000,
  });

  if (isLoading) {
    return (
      <div className="d-flex gap-2">
        <BestDealsinTownSkeleton />
      </div>
    );
  }

  if (isError) {
    <UniversalErrorbox message="Something went wrong while fetching the Partners" 
        retry={[`restaurant partners data ${cuisineName} `]}
        />
  }

  return (
    <div className="mt-4">
      <Row xs={2} sm={2} md={2} lg={3} xl={4} xxl={5} className=" px-2">
        {data &&
          data.map((item) => {
            const platformdetail = getplatformName(partnerName);
            return (
              <>
                <BusinessListCard
                  key={item.id}
                  type={platformdetail.name}
                  banner={item.banner}
                  open_hrs={item.open_hrs}
                  name={item.name}
                  address={item.address}
                  path={`/${platformdetail.paths}/${item[platformdetail.type]}`}
                />
              </>
            );
          })}
      </Row>
      {data && data.length === 0 && (
        <>
          <Divider />
          <p className="text-center">
            Partner not Registered yet having {CuisineName} cuisines
          </p>
          <Divider />
        </>
      )}
    </div>
  );
};
