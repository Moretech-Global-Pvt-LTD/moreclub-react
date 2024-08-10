import React from "react";
import { Button, Card, Col, Image, Row } from "react-bootstrap";
import Menu from "../../../../images/moreclub/menus.png";
import Offers from "../../../../images/moreclub/offers.png";
import Orders from "../../../../images/moreclub/orders.png";
import Gallery from "../../../../images/moreclub/galleries.png";
import { Link, useParams } from "react-router-dom";

const Setuppage = ({ data }) => {
  const { id } = useParams();

  const slug = data.name.replace(" ", "-");
  return (
    <div>
      <Row className="mt-4 align-items-center">
        <Col xs={12} md={6} className="restaurant-info">
          <img
            src={data.logo}
            alt="setup"
            className="px-2 py-1 rounded-circle profile-image"
            style={{ height: "5rem", placeSelf: "center" }}
          />
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
            <p>{data.description}</p>
          </div>
          <Link to={`/resturant/info/${id}`}>
            <Button variant="warning">{"Edit"}</Button>
          </Link>
        </Col>
        <Col xs={12} md={6}>
          <Image
            src={data.banner}
            alt="banner"
            className="px-2 py-1 rounded-3"
            style={{ placeSelf: "center", maxHeight: "15rem" }}
          />
        </Col>
      </Row>

      <Row xs={2} sm={3} md={4} lg={5} xl={6} xxl={10} className="mt-4">
        <Link to={`/resturant/${id}/menu/`} className="d-flex flex-column ">
          <Col className="d-flex flex-column ">
            <Card className="p-2 flex-grow-1">
              <Card.Body className="d-flex justify-content-center">
                <img
                  src={Menu}
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
        <Link
          to={`/resturant/${id}/offer/${slug}`}
          className="d-flex flex-column "
        >
          <Col className="d-flex flex-column">
            <Card className="p-2 flex-grow-1">
              <Card.Body className="d-flex justify-content-center">
                <img
                  src={Offers}
                  alt="menu"
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
          to={`/resturant/${id}/orders/${slug}`}
          className="d-flex flex-column "
        >
          <Col className="d-flex flex-column">
            <Card className="p-2 px-2 flex-grow-1">
              <Card.Body className="d-flex justify-content-center">
                <img
                  src={Orders}
                  alt="menu"
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
          to={`/resturant/${id}/gallery/${slug}`}
          className="d-flex flex-column "
        >
          <Col className="d-flex flex-column">
            <Card className="p-2 flex-grow-1">
              <Card.Body className="d-flex justify-content-center">
                <img
                  src={Gallery}
                  alt="menu"
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
      </Row>
    </div>
  );
};

export default Setuppage;
