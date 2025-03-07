import React from "react";
import {Row } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import { morefoodhostURL } from "../../../config/config";
import RestaurantCardSkeleton from "../../Skeleton/RestaurantCardSkeleton";
import { morefoodPublicAxios } from "../../../utills/axios/morefoodaxios";
import UniversalErrorbox from "../../Layout/UniversalErrorBox";
import HotelCard from "../hotel/hotelCard";
import { morelivingPublicAxios } from "../../../utills/axios/morelivingaxios";

const MorelivingContent = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["More living hotel List"],
    queryFn: async () => {
      const response = await morelivingPublicAxios.get(`property/properties/list/`);
      const data = await response.data.data;
      return data;
    },
    staleTime: 60000,
  });

  if (isLoading) {
    return (
      <RestaurantCardSkeleton/>
    );
  }

  if (isError) {
    return <UniversalErrorbox message="Something went wrong while fetching the hotel" 
    retry={["More living hotel List"]}
    />
  }



  return (
    <>
      <h4 className="mx-auto mt-3 ">Hotels</h4>
     
      <Row xs={2} sm={2} md={2} lg={3} xl={4} xxl={5} className=" px-2">
        {data?.map((item) => (
          <>
            <HotelCard key={item.id}  res={item} />
          </>
        ))}
      </Row>
      
       
    </>
  );
};

export default MorelivingContent;
