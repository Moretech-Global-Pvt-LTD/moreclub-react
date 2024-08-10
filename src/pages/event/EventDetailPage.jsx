import React, { useEffect, useState, createContext } from "react";
import {
  Container,
  Row,
  Col,
  Carousel,
  Card,
  Placeholder,
  Button,
} from "react-bootstrap";
import LandingLayout from "../../components/Layout/LandingLayout";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseURL } from "../../config/config";
import Divider from "../../components/divider/Divider";
import moment from "moment";
import { axiosInstance } from "../..";

import { message } from "antd";
import { useSelector } from "react-redux";
import { Modal, Space } from "antd";
import PINInput from "../../components/ui/PinInput";
import LocationDisplay from "../../components/Googlemap/LocationViewer";
import MapComponent from "../../components/Googlemap/LocationViewer";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import MapboxComponent from "../../components/Googlemap/MapboxComponent";

const EventDetailPage = () => {
  const { eventId } = useParams();
  const [showDetails, setShowDetails] = useState();
  const currencyData = useSelector(
    (state) => state.currencyReducer.currencyDetail
  );
  const [isModalOpen, setIsModalOpen] = useState([false, false]);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState("");

  const toggleModal = (idx, target) => {
    setIsModalOpen((p) => {
      p[idx] = target;
      return [...p];
    });
  };

  const fetchEventData = async () => {
    try {
      // Attempt to fetch both business and user data
      const [events, userResponse, membership] = await Promise.allSettled([
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

  return (
    <DashboardLayout>
      <div class="welcome-area" style={{ marginTop: "10px" }}>
        <div class="row align-items-center">
          <div class="col-12 col-sm-12 col-md-6">
            <div className="row  bg-white mb-4">
              <Carousel>
                {data.eventdata.event_photo &&
                  data.eventdata.event_photo.map((item) => (
                    <Carousel.Item key={item.id}>
                      <img
                        className="d-block w-100"
                        src={item.image}
                        alt="First slide"
                        style={{ objectFit: "fit" }}
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
                <div class="hero-btn-group">
                  <button
                    className="btn btn-success rounded-pill mt-3 me-3"
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
                  {data.userdata.booked ? (
                    <button
                      className="btn btn-warning rounded-pill mt-3 me-3 "
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Booked
                    </button>
                  ) : (
                    <>
                      <Space>
                        <button
                          className="btn btn-danger rounded-pill mt-3 me-3 "
                          style={{ whiteSpace: "nowrap" }}
                          // onClick={()=>{handleBooking(data.eventdata.id)}}
                          onClick={() => toggleModal(0, true)}
                        >
                          Book Now
                        </button>
                      </Space>
                      <Modal
                        title="Book your Ticket"
                        open={isModalOpen[0]}
                        onOk={() => toggleModal(0, false)}
                        onCancel={() => toggleModal(0, false)}
                        footer=""
                        // classNames={classNames}
                        // styles={modalStyles}
                      >
                        <form onSubmit={handleBooking}>
                          <PINInput
                            pin={pin}
                            setPin={setPin}
                            pinError={pinError}
                            setPinError={setPinError}
                          />
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
                        </form>
                      </Modal>
                    </>
                  )}
                </div>
                <p className="my-4">
                  Price&nbsp;
                  <span style={{ fontSize: "24px" }}>
                    {data.eventdata.currency?.symbol}&nbsp;
                    {data.eventdata.price}
                  </span>
                </p>
              </div>
            </div>
          </div>
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
                    <p>{data.eventdata.event_highlights_description}</p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        )}
      </div>
      <div>
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
