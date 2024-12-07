import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Featuredtext = ({ children }) => {
  return (
    <div className="primary-background py-4">
      <Container>
        <Row className="justify-content-center text-center">
          <Col lg={10}>{children}</Col>
        </Row>
      </Container>
    </div>
  );
};

export default Featuredtext;
