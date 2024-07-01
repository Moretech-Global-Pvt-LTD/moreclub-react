import React, { useEffect } from "react";
import EventCard from "../../components/cards/Eventcard";
import { Carousel, Col, Placeholder, Row } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseURL } from "../../config/config";
import Divider from "../../components/divider/Divider";

const EventDashboardDisplay = () => {
  const { data, isLoading, isError, fetchNextPage, hasNextPage } = useQuery({
    queryKey: ["event"],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await axios.get(`${baseURL}events/?page=${pageParam}`);
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <>
        <Placeholder as="p" animation="glow" className="rounded">
          <Placeholder xs={12} style={{ height: "4rem" }} />
        </Placeholder>
        <Placeholder as="p" animation="glow" className="rounded">
          <Placeholder xs={12} style={{ height: "4rem" }} />
        </Placeholder>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <div className="text-dynamic-white">Error: reteriving</div>
        <Divider />
      </>
    );
  }

  return (
    <Row>
      <Carousel></Carousel>
      {/* {data.pages.map((data) => (
        <div className="d-flex flex-wrap gap-4 mt-4">
          {data.data.map((event) => (
            <EventCard events={event} />
          ))}
        </div>
      ))} */}
    </Row>
  );
};

export default EventDashboardDisplay;
