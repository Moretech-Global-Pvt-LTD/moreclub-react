import React from "react";
import { Button} from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseURL } from "../../config/config";
import Divider from "../../components/divider/Divider";
import EventCarousel from "./EventCarousel";
import { Link } from "react-router-dom";
import RestaurantCardSkeleton from "../Skeleton/RestaurantCardSkeleton";
import UniversalErrorbox from "../Layout/UniversalErrorBox";

const EventDashboardDisplay = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["event"],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await axios.get(`${baseURL}events/?page=${pageParam}`);
      return response.data;
    },
    staleTime: 60000,
  });

  if (isLoading) {
    return (
      <>
        <RestaurantCardSkeleton />
      </>
    );
  }

  if (isError) {
    return (
      <>
       <UniversalErrorbox message="Something went wrong while fetching the Popular Events " 
        retry={["event"]}
        />;
        <Divider />
      </>
    );
  }


if(!data.data || data.data.length === 0){
  return(
    <></>
  )
}


  return (
    <div className="mb-5">
      {data.data && data.data.length !== 0 && (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="mt-4 mb-3">Popular events </h4>
            <Link to="/event">
              <Button variant="link">View All</Button>
            </Link>
          </div>
          <EventCarousel data={data} />
        </>
      )}
    </div>
  );
};

export default EventDashboardDisplay;
