import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Plus from "../../../images/moreclub/plus.png";

const ResturantContent = () => {
  return (
    <div className="" style={{ height: "50vh", width: "100%" }}>
      <Row xs={1} md={2} xl={3} xxl={4} className="g-4">
        <Link to={"/resturant/info"} className="d-flex flex-column">
          <Col className="d-flex flex-column">
            <Card className="p-2 flex-grow-1">
              <Card.Title className="text-dynamic-white text-center"></Card.Title>
              <Card.Body className="d-flex align-items-center justify-content-between">
                <ul>
                  {/* {!business.businessProfile?.business_logo ? (
                    <div
                      className="partner-logo-wrapper ms-0 me-0 d-flex justify-content-center align-items-center text-uppercase"
                      style={{
                        width: "45px",
                        height: "45px",
                        objectFit: "contain",
                        backgroundColor: "#fff",
                      }}
                    >
                      {`${
                        !!business?.businessProfile?.business_name
                          ? business?.businessProfile?.business_name[0]
                          : ""
                      }`}
                    </div>
                  ) : ( */}
                  <img
                    src={Plus}
                    style={{
                      width: "45px",
                      height: "45px",
                      objectFit: "contain",
                      backgroundColor: "#fff",
                    }}
                    alt="logo"
                    className="img-fluid rounded-circle mb-3 profile-image"
                  />
                  {/* )} */}
                  <h3 className="text-dynamic-white text-center">
                    Newari Resturant
                  </h3>
                  <li className="d-flex justify-content-between">
                    {/* <h6>Location</h6> */}
                    <h6>Pokhara chipledhunga</h6>
                  </li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Link>
        <Link to={"/resturant/menu"} className="d-flex flex-column">
          <Col className="d-flex flex-column">
            <Card className="p-2 flex-grow-1">
              <Card.Body className="d-flex flex-column justify-content-center w-full gap-4">
                <h4 className="text-dynamic-white text-center">
                  Add new Resturant
                </h4>
                <img
                  src={Plus}
                  alt="menu"
                  className="px-2 py-1 rounded "
                  style={{ height: "4rem", alignSelf: "center" }}
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
      </Row>
    </div>
  );
};

export default ResturantContent;
