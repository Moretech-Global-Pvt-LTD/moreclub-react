import React from "react";
import {Row } from "react-bootstrap";
import ResturantCard from "../Resturant/RestaurantCard3";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { morefoodURL } from "../../../config/config";
import RestaurantCardSkeleton from "../../Skeleton/RestaurantCardSkeleton";
import { Link } from "react-router-dom";

const MorefoodContent = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["More Food Resturant List"],
    queryFn: async () => {
      const response = await axios.get(`${morefoodURL}restaurants/list/`);
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
    
      <a href="http://localhost:3000/resturants/75adfd3d-01a8-4507-9b0e-143a8e71eaa0?redirect=true" target="_blank">

        <button
        >{"send user"}</button>
      </a>
    </div>;
  }



  return (
    <>
      <h3 className="mx-auto mt-3 ">Restaurants</h3>
     
      <Row xs={2} sm={2} md={2} lg={3} xl={4} xxl={5} className=" px-2">
        {data?.map((item) => (
          <>
            <ResturantCard key={item.id} link={`https://morefood.se/resturants/${item.id}`} res={item} />
            {/* <ResturantCard key={item.id} link={`http://localhost:3000/resturants/${item.id}?redirect=true`} res={item} /> */}
          </>
        ))}
      </Row>
       
    </>
  );
};

export default MorefoodContent;
