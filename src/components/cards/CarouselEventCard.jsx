import React from "react";
import { Card, Carousel, Button } from "react-bootstrap";
import Image1 from "../../images/Home/404image.png";
import Image2 from "../../images/Home/HeroWhite.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CarouselEventCard = ({ events }) => {
  const user = useSelector((state) => state.userReducer);

  return (
    <Card
      className="d-flex flex-column "
      style={{ width: "300px", border: "1px solid #ddd" }}
    >
      <div className="col-12 p-0">
        <Carousel className="w-100 border" style={{ height: "10rem" }}>
          {events?.event_photo &&
            events?.event_photo.map((imag) => (
              <Carousel.Item key={imag.id} style={{ height: "10rem" }}>
                <img
                  className="d-block w-100"
                  src={imag.image}
                  alt={`${events.title}-${imag.id}`}
                  style={{
                    width: "100%",
                    height: "18rem",
                    objectFit: "cover",
                  }}
                  key={imag.id}
                />
              </Carousel.Item>
            ))}
          {!events?.event_photo && (
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={Image2}
                alt="Second slide"
                style={{ height: "100%", width: "100%", objectFit: "cover" }}
              />
            </Carousel.Item>
          )}
        </Carousel>
      </div>
      <Card.Body className="d-flex flex-column justify-content-between">
        <h5 className="text-start">{events.name}</h5>
        <div className="d-flex flex-column flex-md-row gap-2">
          <div className="col-12  align-self-center">
            {}
            <Card.Text className="text-start text-md-end">
              Seat Available :{events.seat_available} of {events.max_limit}
            </Card.Text>

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

export default CarouselEventCard;
