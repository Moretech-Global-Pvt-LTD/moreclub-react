import React, { useState } from "react";
import {
  Row,
  Col,
  Carousel,
  Card,
  Placeholder,
  Button,
  Modal,
} from "react-bootstrap";
import LandingLayout from "../../components/Layout/LandingLayout";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseURL } from "../../config/config";
import Divider from "../../components/divider/Divider";
import moment from "moment";
import { axiosInstance } from "../..";

import { message } from "antd";
import PINInput from "../../components/ui/GridPinInput";

import DashboardLayout from "../../components/Layout/DashboardLayout";
import MapboxComponent from "../../components/Googlemap/MapboxComponent";
import TextFormator from "./TextFormator";

const EventDetailPage = () => {
  const { eventId } = useParams();
  const [showDetails, setShowDetails] = useState();
  // const currencyData = useSelector(
  //   (state) => state.currencyReducer.currencyDetail
  // );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState("");

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const fetchEventData = async () => {
    try {
      // Attempt to fetch both business and user data
      const [events, userResponse] = await Promise.allSettled([
        axios.get(`${baseURL}events/detail/${eventId}`),
        axiosInstance.get(`${baseURL}events/check-book/${eventId}/`),
      ]);

      // Handle the responses
      let userdata = null;
      if (userResponse.status === "fulfilled") {
        userdata = userResponse.value.data.data;
      } else if (
        userResponse.status === "rejected" &&
        userResponse.reason.response.status === 403
      ) {
        console.warn(
          "User is not registered as has not register, skipping business data."
        );
      } else {
        throw new Error(
          `Failed to fetch business data: ${userResponse.reason.message}`
        );
      }

      if (events.status === "fulfilled") {
        const eventdata = events.value.data.data;
        return {
          eventdata,
          userdata,
        };
      } else {
        throw new Error(`Failed to fetch user data: ${events.reason.message}`);
      }
    } catch (error) {
      // Handle the error, for example by throwing it so it can be caught by react-query
      throw new Error(`Failed to fetch event data: ${error.message}`);
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["event", eventId],
    queryFn: fetchEventData,
  });

  if (isLoading) {
    return (
      <LandingLayout>
        <div className="container">
          <Placeholder as="p" animation="glow" className="rounded">
            <Placeholder xs={12} style={{ height: "4rem" }} />
          </Placeholder>
          <Placeholder as="p" animation="glow" className="rounded">
            <Placeholder xs={12} style={{ height: "4rem" }} />
          </Placeholder>
        </div>
        <Divider />
      </LandingLayout>
    );
  }

  if (isError) {
    return (
      <LandingLayout className="text-dynamic-white">
        <Divider />
        <h6 className="text-dynamic-white text-center">Error: reteriving</h6>
        <Divider />
      </LandingLayout>
    );
  }

  const handlePInChange = async (newPin) => {
    const value = newPin;
    setPin(value);
    let timeOut;
    setTimeout(() => {
      if (value.trim() !== "") {
        setPinError("");
      } else {
        setPinError("Pin required");
      }
    }, 2000);

    clearTimeout(timeOut);
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post(
        `${baseURL}events/event-book/${eventId}/`,
        {
          pin: pin,
        }
      );
      message.success("Your registration is done");
      toggleModal(0, false);
    } catch (err) {
      message.error(err?.response.data?.errors?.non_field_errors[0]);
    }
  };
  const position = { lat: 28.2123042, lng: 83.9721532 };

  // Function to format the text
 

  // const splitText = data.eventdata.description.split(/(?=🎶|🎄|🍷|🎅)/g);
  
  return (
    <DashboardLayout>
      <div className="event-container">
        {/* Carousel for Images Only */}
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

        {/* Static Event Details */}
        <div className="event-details-container">
          <h1 className="event-title">{data.eventdata?.name}</h1>
          <p className="event-description">
            <TextFormator text={data.eventdata.description} />
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

            {data.userdata.booked ? (
              <button
                className="btn btn-warning rounded-pill "
                style={{ whiteSpace: "nowrap" }}
              >
                Booked
              </button>
            ) : (
              <>
                <button
                  className="btn btn-danger rounded-pill  "
                  style={{ whiteSpace: "nowrap" }}
                  // onClick={()=>{handleBooking(data.eventdata.id)}}
                  onClick={() => toggleModal(true)}
                >
                  Book Now
                </button>
                <Modal
                  aria-labelledby="contained-modal-title-vcenter"
                  size="md"
                  centered
                  show={isModalOpen}
                  onHide={toggleModal}
                >
                  <Modal.Header>
                    <Modal.Title
                      id="contained-modal-title-vcenter text-center"
                      className="text-dynamic-white"
                    >
                      Book your Ticket
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <form onSubmit={handleBooking}>
                      <div className="d-flex flex-column justify-content-center">
                        <label className="form-label text-center">
                          Enter PIN
                        </label>
                        <div className=" mx-auto">
                          <PINInput
                            length={4}
                            value={pin}
                            onChange={handlePInChange}
                            error={pinError}
                          />
                        </div>
                      </div>
                      <div className="d-flex justify-content-end my-2 gap-2">
                        <Button
                          variant="secondary"
                          onClick={(e) => {
                            e.preventDefault();
                            toggleModal(false);
                          }}
                          className="mt-4 "
                        >
                          {isLoading && (
                            <span className="spinner-border spinner-border-sm text-danger"></span>
                          )}
                          &nbsp;Cancel
                        </Button>
                        <Button
                          variant="primary"
                          type="submit"
                          className="mt-4 "
                        >
                          {isLoading && (
                            <span className="spinner-border spinner-border-sm text-danger"></span>
                          )}
                          &nbsp;Confirm buy
                        </Button>
                      </div>
                    </form>
                  </Modal.Body>
                </Modal>
              </>
            )}
          </div>
          <p className="event-price">Price: Rs. 0.00</p>
        </div>
      </div>

      <div>
        {showDetails && (
          <div class="animated fadeInUp " style={{ animationDuration: "1s" }}>
            <Row className="my-3">
              <Col>
                <Card>
                  <Card.Body>
                    <h3>{data.eventdata.event_highlights_title}</h3>
                    <TextFormator text={data.eventdata.event_highlights_description} />
                    {/* <p>{data.eventdata.event_highlights_description}</p> */}
                    
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        )}
      </div>
      <div className="my-3">
        <div class="animated fadeInUp " style={{ animationDuration: "1s" }}>
          <MapboxComponent
            lat={data.eventdata.lat}
            lng={data.eventdata.lng}
            title={data.eventdata.name}
            detail={data.eventdata.location}
            extraInfo={`<span
              className="text-dynamic-white"
              style={{ fontSize: "10px" margin:"0px"}}
            >
              Start From:&nbsp;
              ${moment(data.eventdata.start_date).format("dddd DD MMM, YY")}
              at
              ${moment.utc(data.eventdata.start_date).local().format("h:mm a")}
              &nbsp;
              &nbsp;Ends At:&nbsp;
              ${moment(data.eventdata.end_date).format("dddd DD MMM, YY")}
              till
              ${moment.utc(data.eventdata.end_date).local().format("h:mm a")}
            </span>`}
          />
        </div>
      </div>

      <Divider />
    </DashboardLayout>
  );
};

export default EventDetailPage;
