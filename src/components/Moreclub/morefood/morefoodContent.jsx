import React from "react";
import { Placeholder, Row } from "react-bootstrap";
import ResturantCard from "../Resturant/RestaurantCard3";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { morefoodURL } from "../../../config/config";
import PopularResturant from "./PopularResturant";

const MorefoodContent = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["More Food Resturant List"],
    queryFn: async () => {
      const response = await axios.get(`${morefoodURL}restaurants/list/`);
      const data = await response.data.data;
      return data;
    },
    staleTime: 100,
  });

  if (isLoading) {
    return (
      <div className="row gap-2">
        <Placeholder as="p" animation="glow" className="rounded w-25 me-2">
          <Placeholder xs={12} style={{ height: "10rem" }} />
        </Placeholder>
        <Placeholder as="p" animation="glow" className="rounded  w-25 me-2">
          <Placeholder xs={12} style={{ height: "10rem" }} />
        </Placeholder>
        <Placeholder as="p" animation="glow" className="rounded  w-25">
          <Placeholder xs={12} style={{ height: "10rem" }} />
        </Placeholder>
        <Placeholder as="p" animation="glow" className="rounded w-25 me-2">
          <Placeholder xs={12} style={{ height: "10rem" }} />
        </Placeholder>
      </div>
    );
  }

  if (isError) {
    return <div className="text-dynamic-white">Error: retriving</div>;
  }

  // export const fetchResturant = async () => {
  //   try {
  //     const res = await fetch(
  //       `${process.env.NEXT_PUBLIC_BASEURL}restaurants/list/`,
  //       { next: { tags: [`Resturant List`], revalidate: 100 } }
  //     );
  //     const response = await res.json();
  //     return response.data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className="w-full mx-auto">
      
      <h3 className="mx-auto mt-3 ">Popular Resutaurants</h3>
      <PopularResturant />
      <h3 className="mx-auto mt-3 ">Restaurants</h3>
      <Row xs={2} sm={2} md={2} lg={3} xl={4} xxl={5} className=" px-2">
        {data?.map((item) => (
          <>
          <ResturantCard link={"#"} res={item} />
          </>
        ))}
      </Row>
    </div>
  );
};

export default MorefoodContent;
