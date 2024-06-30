import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Carousel,
  ListGroup,
  Table,
  Card,
  Placeholder,
} from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
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

const UserEventDetailPage = () => {
  const { eventId } = useParams();
  const [showDetails, setShowDetails] = useState();
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
        <Divider />
        <h6 className="text-dynamic-white text-center">Error: reteriving</h6>
        <Divider />
      </DashboardLayout>
    );
  }

  const handleDelete = async (id) => {
    try {
      const res = await axiosInstance.delete(`${baseURL}events/${id}/delete`);
      message.success("Your event is deleted");
      navigate("/business-events");
    } catch (err) {
      message.error(err?.response.data?.errors?.non_field_errors[0]);
    }
  };

  return (
    <DashboardLayout>
      <div class="welcome-area" style={{ marginTop: "10px" }}>
        {/* <div class="container"> */}
        <div class="row align-items-center">
          <div class="col-12 col-sm-12 col-md-6">
            <div className="row video-container">
              <Carousel>
                {data.eventdata.event_photo &&
                  data.eventdata.event_photo.map((item) => (
                    <Carousel.Item key={item.id}>
                      <img
                        className="d-block w-100"
                        src={item.image}
                        alt="First slide"
                      />
                    </Carousel.Item>
                  ))}
              </Carousel>
            </div>
          </div>
          <div class="col-12 col-sm-10 col-md-6">
            <div class="welcome-content mb-5 mb-md-0">
              <div
                class="animated fadeInUp"
                style={{ animationDuration: "1s" }}
              >
                <h2>{data.eventdata?.name}</h2>
              </div>
              <div
                class="animated fadeInUp "
                style={{ animationDuration: "1s" }}
              >
                <p class="mb-4 ">{data.eventdata.description}</p>
              </div>
              <p className="text-dynamic-white fs-6">
                <i class="ms-2 bi-geo-alt-fill"></i>&nbsp;
                {data.eventdata.location}
              </p>
              <div className="fs-6">
                <i class="bi bi-calendar2-minus text-dynamic-white"></i>&nbsp;
                <span
                  className="text-dynamic-white"
                  style={{ fontSize: "14px" }}
                >
                  Start From:&nbsp;
                  {moment(data.eventdata.start_date).format(
                    "dddd DD MMM, YY"
                  )}{" "}
                  at{" "}
                  {moment
                    .utc(data.eventdata.start_date)
                    .local()
                    .format("h:mm a")}
                  &nbsp;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp; Ends At:&nbsp;
                  {moment(data.eventdata.end_date).format(
                    "dddd DD MMM, YY"
                  )}{" "}
                  till{" "}
                  {moment.utc(data.eventdata.end_date).local().format("h:mm a")}
                </span>
              </div>
              <div
                class="animated fadeInUp"
                style={{ animationDuration: "1s" }}
              >
                <div class="d-flex gap-2 align-items-center">
                  <button
                    className="btn btn-success rounded-pill"
                    style={{ whiteSpace: "nowrap" }}
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
                  </button>
                  <button
                    className="btn btn-danger rounded-pill mt-3 me-3 "
                    style={{ whiteSpace: "nowrap" }}
                    onClick={() => {
                      handleDelete(data.eventdata.id);
                    }}
                  >
                    Delete
                  </button>
                  <p className="my-4">
                    Price&nbsp;
                    <span style={{ fontSize: "24px" }}>
                      {currencyData.symbol}&nbsp;{data.eventdata.price}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
      {showDetails && (
        <div class="animated fadeInUp " style={{ animationDuration: "1s" }}>
          <Row className="my-3">
            <Col>
              <Card>
                <Card.Body>
                  <h3>{data.eventdata.event_highlights_title}</h3>
                  <p>{data.eventdata.event_highlights_description}</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      )}
      <div>
        {/* {bookingShow && ( */}
        <Row>
          <Col>
            <h3>View your Bookings for the events</h3>

            <BookingTable list={data.bookingData} eventId={eventId} />
          </Col>
        </Row>
        {/* )} */}
      </div>
      <Divider />
    </DashboardLayout>
  );
};

export default UserEventDetailPage;
