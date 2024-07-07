import React from "react";
import { Card, Carousel, Button } from "react-bootstrap";
import Image2 from "../../images/Home/HeroWhite.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";

const EventCard = ({ events }) => {
  const user = useSelector((state) => state.userReducer);

  return (
    <Card
      className="d-flex flex-column flex-md-row  mx-auto mx-md-0"
      style={{ maxWidth: "720px", border: "1px solid #ddd" }}
    >
      <div className="col-12 col-md-4 p-0 event-carousel-width">
        <Carousel
          className="border event-carousel-width"
          style={{
            height: "14rem",
            objectFit: "cover",
            backgroundColor: "#0078ff",
          }}
        >
          {events.event_photo &&
            events.event_photo.map((imag) => (
              <Carousel.Item
                key={imag.id}
                className="event-carousel-width"
                style={{ height: "14rem", objectFit: "cover" }}
              >
                <img
                  className="d-block w-100"
                  src={imag.image}
                  alt={`${events.title}-${imag.id}`}
                  style={{
                    width: "20rem",
                    height: "14rem",
                    objectFit: "cover",
                  }}
                  key={imag.id}
                />
              </Carousel.Item>
            ))}
          {!events.event_photo && (
            <Carousel.Item>
              <img
                className="d-block w-100 event-carousel-width"
                src={Image2}
                alt="Second slide"
                style={{ height: "14rem", objectFit: "cover" }}
              />
            </Carousel.Item>
          )}
        </Carousel>
      </div>
      <Card.Body
        className="d-flex flex-column position-relative justify-content-between col col-md-8 card "
        style={{ zIndex: "10" }}
      >
        <h5 className="text-start mt-2">{events.name}</h5>
        <div className="d-flex flex-column flex-md-row-reverse gap-2">
          <div className="col-12 col-md-8">
            <div className="d-flex  flex-column justify-content-between">
              <Card.Text
                className=" text-start text-md-end text-warning"
                style={{ fontSize: "13px" }}
              >
                <i className="bi bi-calendar "></i>{" "}
                {moment(events.end_date).format("dddd DD MMM, YY")}
              </Card.Text>
              <Card.Text className="text-start text-md-end">
                Seat Available :
                <span className="text-warning">
                  {events.seat_available} of {events.max_limit}
                </span>
              </Card.Text>
            </div>
            <Card.Text className="line-clamp-2">{events.description}</Card.Text>
          </div>
          <div className="col-12 col-md-4 align-self-center">
            {}

            <Link to={user.isAuthenticated ? `/event/${events.id}` : "/login"}>
              <Button variant="warning" className="w-100 mb-2">
                Book Ticket
              </Button>
            </Link>
            <span className="text-start text-dynamic-white">
              starts at {events?.currency?.symbol}&nbsp;
              {events.price}
            </span>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default EventCard;
