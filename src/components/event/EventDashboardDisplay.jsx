import React from "react";
import { Button, Placeholder } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseURL } from "../../config/config";
import Divider from "../../components/divider/Divider";
import EventCarousel from "./EventCarousel";
import { Link } from "react-router-dom";

const EventDashboardDisplay = () => {
  const { data, isLoading, isError } = useQuery({
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
    <div className="mb-5">
      <div className="d-flex justify-content-between align-item-center mb-3">
        <h2 className="mt-4 mb-3">Popular events </h2>
        <Link to="/event">
          <Button variant="link">View All</Button>
        </Link>
      </div>
      <EventCarousel data={data} />
    </div>
  );
};

export default EventDashboardDisplay;
