import React, { useState } from "react";
import { Row, Col, Carousel, Card, Placeholder, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseURL } from "../../config/config";
import Divider from "../../components/divider/Divider";
import moment from "moment";
import { axiosInstance } from "../..";
import { message } from "antd";
import { useSelector } from "react-redux";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import BookingTable from "./bookingtable";
import UniversalErrorbox from "../../components/Layout/UniversalErrorBox";

const UserEventDetailPage = () => {
  const { eventId } = useParams();
  const [showDetails, setShowDetails] = useState();
  const [deleting, setDeleting]= useState(false)
  const currencyData = useSelector(
    (state) => state.currencyReducer.currencyDetail
  );
  const navigate = useNavigate();

  const fetchEventDatas = async () => {
    try {
      // Attempt to fetch both business and user data
      const [events, bookings] = await Promise.allSettled([
        axios.get(`${baseURL}events/detail/${eventId}`),
        axiosInstance.get(`${baseURL}events/event-book/${eventId}/`),
      ]);

      // Handle the responses
      let bookingData = null;
      if (bookings.status === "fulfilled") {
        bookingData = bookings.value.data.data;
      } else if (
        bookings.status === "rejected" &&
        bookings.reason.response.status === 403
      ) {
        console.warn("Booking data is forbidden, skipping business data.");
      } else {
        throw new Error(
          `Failed to fetch business data: ${bookings.reason.message}`
        );
      }

      if (events.status === "fulfilled") {
        const eventdata = events.value.data.data;
        return {
          eventdata,
          bookingData,
        };
      } else {
        throw new Error(`Failed to fetch user data: ${events.reason.message}`);
      }
    } catch (error) {
      // Handle the error, for example by throwing it so it can be caught by react-query
      throw new Error(`Failed to fetch event data: ${error.message}`);
    }
  };

  //   const fetchEventDetail = async () => {
  //     const response = await axios.get(`${baseURL}events/detail/${eventId}`);
  //     return response.data.data;
  //   };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["userevent", eventId],
    queryFn: fetchEventDatas,
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
        
        <UniversalErrorbox message="Something went wrong while fetching the data." retry={["userevent", eventId]} />
      </DashboardLayout>
    );
  }

  const handleDelete = async (id) => {
    setDeleting(true);
    try {
      const res = await axiosInstance.delete(`${baseURL}events/${id}/delete`);
      message.success("Your event is deleted");
      navigate("/business-events");
    } catch (err) {
      message.error(err?.response.data?.errors?.non_field_errors[0]);
    }finally{
      setDeleting(false);
    }
  };

  return (
    <DashboardLayout>

      <div className="event-container">
        <Carousel className="carousel-container">
          {data.eventdata.event_photo &&
            data.eventdata.event_photo.map((item) => (
              <Carousel.Item key={item.id}>
                <img
                  className="d-block w-100"
                  src={item.image}
                  alt="First slide"
                  style={{ objectFit: "contain" }}
                />
              </Carousel.Item>
            ))}
        </Carousel>

        <div className="event-details-container">
          <h1 className="event-title">{data.eventdata?.name}</h1>
          <p className="event-description" style={{ whiteSpace: "pre-wrap" }}>
            {data.eventdata.description}
          </p>
          <div className="event-details">
            <p>
              📍 <strong>Location:</strong> {data.eventdata.location}
            </p>
            <p>
              📅 <strong>Start Date & Time:</strong>{" "}
              {moment(data.eventdata.start_date).format("dddd DD MMM, YY")} at{" "}
              {moment.utc(data.eventdata.start_date).local().format("h:mm a")}
            </p>
            <p>
              📅 <strong>End Date & Time:</strong>{" "}
              {moment(data.eventdata.end_date).format("dddd DD MMM, YY")} at{" "}
              {moment.utc(data.eventdata.end_date).local().format("h:mm a")}
            </p>
          </div>
          <div className="event-buttons">
            <Button
              variant="success"
              className="me-2 rounded-pill"
              onClick={() => {
                setShowDetails(!showDetails);
              }}
            >
              {!showDetails ? (
                <>
                  View Detail<i class="ms-2 bi bi-arrow-down"></i>
                </>
              ) : (
                <>
                  View Less<i class="ms-2 bi bi-arrow-up"></i>
                </>
              )}
            </Button>

            <button
              className="btn btn-danger rounded-pill  me-3 "
              style={{ whiteSpace: "nowrap" }}
              disabled={deleting}
              onClick={() => {
                handleDelete(data.eventdata.id);
              }}
            >
             {deleting && <span class="spinner-border spinner-border-sm"></span>} Delete
            </button>
          </div>
          <p className="event-price">Price: Rs. 0.00</p>
        </div>
      </div>

      {showDetails && (
        <div class="animated fadeInUp " style={{ animationDuration: "1s" }}>
          <div className="event-container mt-4">
                  <div className="event-details-container">
                  <h3>{data.eventdata.event_highlights_title}</h3>
                  <p style={{ whiteSpace: "pre-wrap" }}>
                    {data.eventdata.event_highlights_description}
                  </p>

                  </div>
            
          </div>
        </div>
      )}
      <div>
        <Row>
          <Col>
            <BookingTable list={data.bookingData} eventId={eventId} />
          </Col>
        </Row>
      </div>
      <Divider />
    </DashboardLayout>
  );
};

export default UserEventDetailPage;
