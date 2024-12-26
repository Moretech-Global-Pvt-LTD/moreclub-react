import React from "react";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import UpdateEventForm from "../../components/event/eventupdateform";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseURL } from "../../config/config";
import { Button, Col, Placeholder, Row } from "react-bootstrap";
import Divider from "../../components/divider/Divider";
import EventImageUploadform from "../../components/event/EventImageUploadform";

const EventUpdate = () => {
  const { eventId } = useParams();

  const [activeTab, setActiveTab] = React.useState("Details");

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
       
          <Placeholder as="p" animation="glow" className="rounded">
            <Placeholder xs={12} style={{ height: "4rem" }} />
          </Placeholder>
          <Placeholder as="p" animation="glow" className="rounded">
            <Placeholder xs={12} style={{ height: "4rem" }} />
          </Placeholder>
     
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
  const openTab = (tabname) => {
    setActiveTab(tabname);
  };

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
      <div className="row">
        <div className="tabs">
          <button
            className={`${
              activeTab === "Details" ? "tablinks active" : "tablinks"
            } rounded-pills`}
            onClick={() => openTab("Details")}
          >
            Event Details
          </button>

          <button
            className={activeTab === "banner" ? "tablinks active" : "tablinks"}
            onClick={() => openTab("banner")}
          >
            Images
          </button>
        </div>
        <div className="content-outside-wrapper">
          <div className="nft-card">
            <div
              id="Details"
              className={`
                ${
                  activeTab === "Details" ? "tabcontent active" : "tabcontent"
                } `}
            >
              <UpdateEventForm existingEventData={existingData} id={data.id} />
            </div>
          </div>
          <div className="nft-card">
            <div
              id="banner"
              className={`
                ${
                  activeTab === "banner" ? "tabcontent active" : "tabcontent"
                } `}
            >
              <Row>
                <Col xs={12} md={10} xl={6} className=" card p-2">
                  <EventImageUploadform datas={data.event_photo}/>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-end">
        <Link to={`/event/upload/${data.id}`}>
          <Button>Update Images</Button>
        </Link>
      </div>
    </DashboardLayout>
  );
};

export default EventUpdate;
