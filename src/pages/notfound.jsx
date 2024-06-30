import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import LandingLayout from "../components/Layout/LandingLayout";
import { Link } from "react-router-dom";
import Notfounimage from "../images/Home/404image.png";
import Divider from "../components/divider/Divider";

const NotFound = () => {
  //   const handleGoBack = () => {
  //     history.push('/');
  //   };

  return (
    <LandingLayout>
      <Container
        fluid
        className="d-flex justify-content-center align-items-center  text-dynamic-white"
      >
        <Row className="text-center">
          <Col>
            <img
            src={Notfounimage}
            alt="notfound"
            className="w-25"
            />
            <h2>Page Not Found</h2>
            <p>The page you are looking for does not exist.</p>
            <Link to="/">
              <Button variant="primary">Go Back Home</Button>
            </Link>
          </Col>
        </Row>
      </Container>
      <Divider/>
    </LandingLayout>
  );
};

export default NotFound;
