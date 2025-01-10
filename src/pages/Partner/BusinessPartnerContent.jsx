import React from "react";
import { Col, Row } from "react-bootstrap";

import { baseURL } from "../../config/config";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../..";
import Divider from "../../components/divider/Divider";
import { useParams } from "react-router-dom";
import { BestDealsinTownSkeleton } from "../../components/Skeleton/SmallCardSkeleton";
import BusinessListCard from "../../components/dashboard/BusinessListCard";
import { getplatformName } from "../../utills/utility";

const BusinessPartnerContent = ({ partnerId }) => {
  const { partnerName } = useParams();
  const title = partnerName.replace("-", " ");
  const { data, isLoading, isError } = useQuery({
    queryKey: [`partners data ${partnerId}`],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `${baseURL}business/partners/${partnerId}/list/`
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
    <div className="text-dynamic white">Error getting data</div>;
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
          <p className="text-center">Partner not Registered yet in {title} </p>
          <Divider />
        </>
      )}
    </div>
  );
};

export default BusinessPartnerContent;
