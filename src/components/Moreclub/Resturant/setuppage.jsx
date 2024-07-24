import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import Menu from "../../../images/moreclub/menu.png";
import Setup from "../../../images/moreclub/setup.png";
import Resturant from "../../../images/moreclub/resturant.png";
import Offers from "../../../images/moreclub/offer.png";
import Check from "../../../images/moreclub/check.png";
import { Link } from "react-router-dom";

const Setuppage = () => {
  return (
    <div>
      <Row xs={1} md={2} xl={3} xxl={4} className="g-4">
        <Link
          to={"/resturant/info"}
          className="col-md-12 col-xl-8 col-xxl-6 d-flex flex-column"
        >
          <Col>
            <Card className="p-2">
              <Card.Title className="text-dynamic-white text-center">
                Resturant Info
              </Card.Title>
              <Card.Body className="d-flex justify-content-between">
                <ul>
                  {/* <div
                  className="partner-logo-wrapper ms-0 me-0 d-flex justify-content-center align-items-center text-uppercase"
                  style={{
                    width: "45px",
                    height: "45px",
                    objectFit: "contain",
                    backgroundColor: "#fff",
                  }}
                >
                  NL
                </div> */}

                  {/* <img
                  src={Check}
                  style={{
                    width: "45px",
                    height: "45px",
                    objectFit: "contain",
                    backgroundColor: "#fff",
                  }}
                  alt="Profile"
                  className="img-fluid rounded-circle mb-3 profile-image"
                /> */}
                  <li className="d-flex justify-content-between">
                    {/* <h6>Name</h6> */}
                    <h6>Newari Resturant</h6>
                  </li>
                  <li className="d-flex justify-content-between">
                    {/* <h6>Location</h6> */}
                    <h6>Pokhara chipledhunga</h6>
                  </li>
                  <li className="d-flex justify-content-between">
                    {/* <h6>Contact</h6> */}
                    <h6>+977 982234232</h6>
                  </li>
                  <li className="d-flex justify-content-between">
                    {/* <h6>Contact</h6> */}
                    <p className="line-clamp-1">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quas incidunt commodi aspernatur vel placeat iste dolorum
                      optio aperiam autem nulla, totam pariatur ad, excepturi
                      facere possimus. Eos impedit amet beatae asperiores
                      aliquam ipsa quod.
                    </p>
                  </li>
                </ul>
                <img
                  src={Check}
                  alt="setup"
                  className="px-2 py-1 rounded "
                  style={{ height: "5rem", placeSelf: "end" }}
                />
                {/* <img
                src={Setup}
                alt="menu"
                className="px-2 py-1 rounded "
                style={{ height: "5rem", placeSelf: "end" }}
              /> */}
              </Card.Body>
            </Card>
          </Col>
        </Link>
        <Link to={"/resturant/menu"} className="d-flex flex-column">
          <Col className="d-flex flex-column">
            <Card className="p-2 flex-grow-1">
              <Card.Title className="text-dynamic-white text-center">
                Menus
              </Card.Title>
              <Card.Body className="d-flex justify-content-between">
                <img
                  src={Menu}
                  alt="menu"
                  className="px-2 py-1 rounded  "
                  style={{ height: "7rem", backgroundColor: "white" }}
                />
                <img
                  src={Setup}
                  alt="menu"
                  className="px-2 py-1 rounded "
                  style={{ height: "5rem", placeSelf: "end" }}
                />
              </Card.Body>
            </Card>
          </Col>
        </Link>
        <Link to={"/resturant/offer"} className="d-flex flex-column">
          <Col className="d-flex flex-column">
            <Card className="p-2 flex-grow-1">
              <Card.Title className="text-dynamic-white text-center">
                Offers
              </Card.Title>
              <Card.Body className="d-flex justify-content-between">
                <img
                  src={Offers}
                  alt="menu"
                  className="px-2 py-1 rounded "
                  style={{ height: "7rem" }}
                />
                <img
                  src={Setup}
                  alt="menu"
                  className="px-2 py-1 rounded "
                  style={{ height: "5rem", placeSelf: "end" }}
                />
              </Card.Body>
            </Card>
          </Col>
        </Link>
        <Link to={"/resturant/discount"} className="d-flex flex-column">
          <Col className="d-flex flex-column">
            <Card className="p-2 flex-grow-1">
              <Card.Title className="text-dynamic-white text-center">
                Discounts
              </Card.Title>
              <Card.Body className="d-flex justify-content-between">
                <img
                  src={Menu}
                  alt="menu"
                  className="px-2 py-1 rounded "
                  style={{ height: "7rem", backgroundColor: "white" }}
                />
                <img
                  src={Setup}
                  alt="menu"
                  className="px-2 py-1 rounded "
                  style={{ height: "5rem", placeSelf: "end" }}
                />
              </Card.Body>
            </Card>
          </Col>
        </Link>
      </Row>
    </div>
  );
};

export default Setuppage;
