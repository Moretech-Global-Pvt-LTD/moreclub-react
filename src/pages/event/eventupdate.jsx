import React from "react";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import UpdateEventForm from "../../components/event/eventupdateform";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseURL } from "../../config/config";
import { Button, Placeholder } from "react-bootstrap";
import Divider from "../../components/divider/Divider";

const EventUpdate = () => {
  const { eventId } = useParams();

  const fetchEventDetail = async () => {
    const response = await axios.get(`${baseURL}events/detail/${eventId}`);
    return response.data.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["event", eventId],
    queryFn: fetchEventDetail,
  });

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="container">
          <Placeholder as="p" animation="glow" className="rounded">
            <Placeholder xs={12} style={{ height: "4rem" }} />
          </Placeholder>
          <Placeholder as="p" animation="glow" className="rounded">
            <Placeholder xs={12} style={{ height: "4rem" }} />
          </Placeholder>
        </div>
        <Divider />
      </DashboardLayout>
    );
  }

  if (isError) {
    return (
      <DashboardLayout className="text-dynamic-white">
        <Divider />
        <h6 className="text-dynamic-white text-center">Error: reteriving</h6>
        <Divider />
      </DashboardLayout>
    );
  }

  const existingData = {
    name: data.name,
    description: data.description,
    location: data.location,
    lat: data.lat,
    lng: data.lng,
    start_date: data.start_date,
    end_date: data.end_date,
    price: data.price,
    max_limit: data.max_limit,
    event_highlights_title: data.event_highlights_title,
    event_highlights_description: data.event_highlights_description,
  };

  return (
    <DashboardLayout title={"Update Event"}>
      <div className="d-flex justify-content-end">
        <Link to={`/event/upload/${data.id}`}>
          <Button>Update Images</Button>
        </Link>
      </div>
      <UpdateEventForm existingEventData={existingData} id={data.id} />
    </DashboardLayout>
  );
};

export default EventUpdate;
