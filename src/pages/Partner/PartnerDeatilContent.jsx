import React from "react";
import { Card, Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import MapComponent from "../../components/Googlemap/LocationViewer";
import MapboxComponent from "../../components/Googlemap/MapboxComponent";

const PartnerDeatilContent = ({ company }) => {
  return (
    <div className="mt-5">
      <Row>
        <Col md={4}>
          <Card className="mb-3">
            <div className="d-flex justify-content-center mt-3 ">
              {!company?.business_logo ? (
                <div
                  className="partner-logo-wrapper ms-0 me-0 d-flex justify-content-center align-items-center text-uppercase"
                  style={{
                    width: "8rem",
                    height: "8rem",
                    objectFit: "contain",
                    backgroundColor: "#fff",
                    fontSize: "6rem",
                  }}
                >
                  {company?.business_name[0]}
                </div>
              ) : (
                <img
                  src={company?.business_logo}
                  style={{
                    width: "8rem",
                    height: "8rem",
                    objectFit: "contain",
                    backgroundColor: "#fff",
                  }}
                  alt="Profile"
                  className="img-fluid rounded-circle mb-3 profile-image"
                />
              )}
            </div>
            {/* <Card.Img variant="top" src={company?.business_logo} alt={`${company?.business_name} logo`} /> */}
            <Card.Body>
              <Card.Title className="text-dynamic-white text-center text-warning">
                {company?.business_name}
              </Card.Title>
              <Card.Text>
                <strong>Address:</strong> {company?.business_address}
              </Card.Text>
              <Card.Text>
                <strong>Phone:</strong> {company?.business_phone}
              </Card.Text>
              <Card.Text>
                <strong>Email:</strong> {company?.business_email}
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="my-2">
            <Card.Body>
              <Card.Title className="text-dynamic-white text-center text-warning">
                {"Discounts Offered At"}
              </Card.Title>
              {company?.business_discounts &&
                company.business_discounts.map((item) => (
                  <Card.Text>
                    <strong>{item?.business_type.name}:</strong>{" "}
                    {item?.discount}%
                  </Card.Text>
                ))}
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card>
            <Card.Body>
              {/* <Card.Title>Company Details</Card.Title> */}
              <div className="d-flex gap-2 align-items-center">
                <img src={company.qr_code} alt="qr" className="w-25" />
                <ListGroup className="list-group-flush w-75">
                  <ListGroupItem>
                    <strong>Location:</strong> {company.business_address}
                  </ListGroupItem>
                  <ListGroupItem>
                    <strong>Referrals:</strong> {company.no_of_refer}
                  </ListGroupItem>
                </ListGroup>
              </div>
              <div className="mt-4">
                <h5>Google Map Location</h5>
                <MapboxComponent
                  lat={company.lat}
                  lng={company.lng}
                  detail={company.business_address}
                  title={company.business_name}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PartnerDeatilContent;
