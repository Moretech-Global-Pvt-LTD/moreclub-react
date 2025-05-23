import React from "react";
import { Button, Card, Col, Image, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

const Setuppage = ({ data }) => {
  const { id , slug} = useParams();

  const name = slug.replace(/ /g, "-");

 

  return (
    <div>
      <Row className="mt-4 align-items-center">
        <Col xs={12} md={6} xl={7} className="restaurant-info">
          <div className="px-2 py-1  rounded-circle profile-image bg-white d-flex align-items-center justify-content-center overflow-hidden"
          style={{ height: "5rem", width: "5rem",  }}
          >
          <img
            src={data.logo}
            alt="setup"
            className="rounded-circle"
            style={{ height: "100%", objectFit: "cover", width: "100%", placeSelf: "center" }}
          />
          </div>
          <div className="restaurant-details">
            <h2>{data.name}</h2>
            <p>
              <i class="bi bi-geo-alt"></i>&nbsp; {data.address}
            </p>
            <p>
              {data.is_delivery && "Free Delivery |"}{" "}
              {data.is_pickup && "Pick up |"} {data.is_dine && "Dine In |"}{" "}
              {data.currency_code}&nbsp;
              {data.min_order} Minimum | {data.delivery_time} service
            </p>
            <div className="d-flex gap-2">
              {data.website_link && (
                <a href={data.website_link} target="_blank" rel="noreferrer"><Button variant="primary" className="border-primary border-2"><i class="bi bi-globe"></i>&nbsp;&nbsp;Website</Button></a>
              )}
              {data.facebook_link && (
                <a href={data.facebook_link} target="_blank" rel="noreferrer"><Button variant="primary" className="border-primary border-2"><i class="bi bi-facebook"></i>&nbsp; &nbsp; Facebook</Button></a>
              )}
              {data.instagram_link && (
                <a href={data.instagram_link} target="_blank" rel="noreferrer"><Button variant="primary" className="border-primary border-2"><i class="bi bi-instagram"></i>&nbsp; &nbsp; Instagram</Button></a>
              )}
            </div>
            <p>{data.short_description}</p>
          </div>
          <Link to={`/resturant/update/${id}/${name}-update`}>
            <Button variant="warning">{"Edit"}</Button>
          </Link>
        </Col>
        <Col xs={12} md={6} xl={5}>
          <Image
            src={data.banner}
            alt="banner"
            className="px-2 py-1 rounded-3"
            style={{ placeSelf: "center", maxHeight: "20rem" }}
          />
        </Col>
      </Row>

      <Row xs={2} sm={2} md={3} lg={4} xl={5} xxl={6}  className="mt-4">
        <Link to={`/resturant/${id}/menu/${name}-menu`} className="d-flex flex-column my-2 ">
          <Col className="d-flex flex-column my-2 ">
            <Card className="p-2 flex-grow-1">
              <Card.Body className="d-flex justify-content-center">
                <img
                  src={'/images/moreclub/morefood/menus.png'}
                  alt="menu"
                  className="px-2 py-1 rounded  "
                  style={{ height: "5rem", width: "5rem" }}
                />
              </Card.Body>
              <Card.Title className="text-dynamic-white text-center fs-6">
                Menus
              </Card.Title>
            </Card>
          </Col>
        </Link>
        {/* <Link
          to={`/resturant/${id}/cuisine/${name}-cuisine`}
          className="d-flex flex-column my-2 "
        >
          <Col className="d-flex flex-column my-2">
            <Card className="p-2 flex-grow-1">
              <Card.Body className="d-flex justify-content-center">
                <img
                  src={'/images/moreclub/morefood/cuisine.png'}
                  alt="cuisine"
                  className="px-2 py-1 rounded "
                  style={{ height: "5rem", width: "5rem" }}
                />
              </Card.Body>
              <Card.Title className="text-dynamic-white text-center fs-6">
                Cuisine
              </Card.Title>
            </Card>
          </Col>
        </Link> */}
        <Link
          to={`/resturant/${id}/offer/${name}-offers`}
          className="d-flex flex-column my-2 "
        >
          <Col className="d-flex flex-column my-2">
            <Card className="p-2 flex-grow-1">
              <Card.Body className="d-flex justify-content-center">
                <img
                  src={'/images/moreclub/morefood/offers.png'}
                  alt="offer"
                  className="px-2 py-1 rounded "
                  style={{ height: "5rem", width: "5rem" }}
                />
              </Card.Body>
              <Card.Title className="text-dynamic-white text-center fs-6">
                Offers
              </Card.Title>
            </Card>
          </Col>
        </Link>
        <Link
          to={`/resturant/${id}/orders/${name}-orders`}
          className="d-flex flex-column my-2 "
        >
          <Col className="d-flex flex-column my-2">
            <Card className="p-2 px-2 flex-grow-1">
              <Card.Body className="d-flex justify-content-center">
                <img
                  src={'/images/moreclub/morefood/orders.png'}
                  alt="orders"
                  className="  rounded "
                  style={{ height: "5rem", width: "5rem" }}
                />
              </Card.Body>
              <Card.Title className="text-dynamic-white text-center fs-6">
                Orders
              </Card.Title>
            </Card>
          </Col>
        </Link>
        <Link
          to={`/resturant/${id}/gallery/${name}-gallery`}
          className="d-flex flex-column my-2 "
        >
          <Col className="d-flex flex-column my-2">
            <Card className="p-2 flex-grow-1">
              <Card.Body className="d-flex justify-content-center">
                <img
                  src={'/images/moreclub/morefood/galleries.png'}
                  alt="gallery"
                  className="px-2 py-1 rounded "
                  style={{ height: "5rem", width: "5rem" }}
                />
              </Card.Body>
              <Card.Title className="text-dynamic-white text-center fs-6">
                Gallery
              </Card.Title>
            </Card>
          </Col>
        </Link>
        <Link
          to={`/resturant/${id}/opening-duration/${name}-opening-duration`}
          className="d-flex flex-column my-2 "
        >
          <Col className="d-flex flex-column my-2">
            <Card className="p-2 flex-grow-1">
              <Card.Body className="d-flex justify-content-center">
                <img
                  src={'/images/moreclub/morefood/workinghour.png'}
                  alt="working"
                  className="px-2 py-1 rounded "
                  style={{ height: "5rem", width: "5rem" }}
                />
              </Card.Body>
              <Card.Title className="text-dynamic-white text-center fs-6">
                Opening Duration
              </Card.Title>
            </Card>
          </Col>
        </Link>
        <Link
          to={`/restaurant/${id}/table/${data.slug}`}
          className="d-flex flex-column my-2 "
        >
          <Col className="d-flex flex-column my-2">
            <Card className="p-2 flex-grow-1">
              <Card.Body className="d-flex justify-content-center">
                <img
                  src={'/images/moreclub/morefood/table.png'}
                  alt="working"
                  className="px-2 py-1 rounded "
                  style={{ height: "5rem", width: "5rem" }}
                />
              </Card.Body>
              <Card.Title className="text-dynamic-white text-center fs-6">
                Tables
              </Card.Title>
            </Card>
          </Col>
        </Link>
        <Link
          to={`/station/${id}/nearby?lat=${data.lat}&lng=${data.lng}`}
          className="d-flex flex-column my-2"
        >
          <Col className="d-flex flex-column my-2">
            <Card className="p-2 flex-grow-1">
              <Card.Body className="d-flex justify-content-center">
                <img
                  src={'/images/moreclub/morefood/station.png'}
                  alt="working"
                  className="px-2 py-1 rounded "
                  style={{ height: "5rem", width: "5rem" }}
                />
              </Card.Body>
              <Card.Title className="text-dynamic-white text-center fs-6">
                Nearby Station
              </Card.Title>
            </Card>
          </Col>
        </Link>
        <Link
          to={`/station/${id}/stationorders/${name}-Station-Orders`}
          className="d-flex flex-column my-2"
        >
          <Col className="d-flex flex-column my-2">
            <Card className="p-2 flex-grow-1">
              <Card.Body className="d-flex justify-content-center">
                <img
                  src={'/images/moreclub/morefood/StationOrders2.png'}
                  alt="working"
                  className="px-2 py-1 rounded "
                  style={{ height: "5rem", width: "5rem" }}
                />
              </Card.Body>
              <Card.Title className="text-dynamic-white text-center fs-6">
                Station Orders
              </Card.Title>
            </Card>
          </Col>
        </Link>
        <Link
          to={`/resturant/${id}/station/allOrders/${name}-Station-All-Orders`}
          className="d-flex flex-column my-2"
        >
          <Col className="d-flex flex-column my-2">
            <Card className="p-2 flex-grow-1">
              <Card.Body className="d-flex justify-content-center">
                <img
                  src={'/images/moreclub/morefood/stationOrders.png'}
                  alt="working"
                  className="px-2 py-1 rounded "
                  style={{ height: "5rem", width: "5rem" }}
                />
              </Card.Body>
              <Card.Title className="text-dynamic-white text-center fs-6">
                Station Orders Summary
              </Card.Title>
            </Card>
          </Col>
        </Link>
      </Row>

    </div>
  );
};

export default Setuppage;
