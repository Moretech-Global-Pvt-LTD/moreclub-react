import React from "react";
import {Row } from "react-bootstrap";
import ResturantCard from "../Resturant/RestaurantCard3";
import { useQuery } from "@tanstack/react-query";
import { morefoodhostURL } from "../../../config/config";
import RestaurantCardSkeleton from "../../Skeleton/RestaurantCardSkeleton";
import { morefoodPublicAxios } from "../../../utills/axios/morefoodaxios";

const MorefoodContent = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["More Food Resturant List"],
    queryFn: async () => {
      const response = await morefoodPublicAxios.get(`restaurants/list/`);
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
    return <div className="text-dynamic-white">Error: retriving
    </div>;
  }



  return (
    <>
      <h4 className="mx-auto mt-3 ">Restaurants</h4>
     
      <Row xs={2} sm={2} md={2} lg={3} xl={4} xxl={5} className=" px-2">
        {data?.map((item) => (
          <>
            <ResturantCard key={item.id} link={`${morefoodhostURL}/resturants/${item.id}`} res={item} />
          </>
        ))}
      </Row>
      
       
    </>
  );
};

export default MorefoodContent;
