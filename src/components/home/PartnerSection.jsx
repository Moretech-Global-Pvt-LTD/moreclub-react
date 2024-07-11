import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Moredeals from "../../images/logo/MembersClubWhite.png";

const PartnerSection = () => {
  return (
    <Container>
      <Row className="justify-content-center text-center">
        {[1, 2, 3, 4].map((partner, index) => (
          <Col xs={6} sm={3} key={index} className="partner-logo">
            <img src={Moredeals} alt={index} className="img-fluid" />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PartnerSection;
