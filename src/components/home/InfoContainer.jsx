import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import FreeButton from "./FreeButton";
import InfoDescription from "./InfoDescription";

const InfoContainer = ({ data }) => {
  return (
    <Container>
      {data.map((item, index) => (
        <React.Fragment key={index}>
          <Row
            className="align-items-center d-flex my-2 py-2 position-relative"
            key={index}
          >
            {index % 2 === 0 ? (
              <>
                <Col md={6} className="mt-4">
                  <InfoDescription item={item} />
                </Col>
                <Col
                  md={6}
                  className="position-relative "
                  style={{ zIndex: "50" }}
                >
                  <div>
                    <div className="image-container text-center">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="img-fluid"
                      />
                    </div>
                    <div className="d-flex justify-content-center">
                      <FreeButton />
                    </div>
                  </div>
                </Col>
              </>
            ) : (
              <>
                <Col md={6} className="order-md-2 mt-4">
                  <InfoDescription item={item} />
                </Col>
                <Col
                  md={6}
                  className="order-md-1 position-relative"
                  style={{ zIndex: "50" }}
                >
                  <div className="image-container text-center">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="img-fluid"
                    />
                    <div className="d-flex justify-content-center">
                      <FreeButton />
                    </div>
                  </div>
                </Col>
              </>
            )}
          </Row>
          <div className="d-none d-lg-block">
            {index < data.length - 1 && (
              <div className="connector-container">
                <div
                  className={
                    index % 2 !== 0
                      ? "connector connector-left"
                      : "connector connector-right"
                  }
                >
                  
                  <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path
                      d="M0,50 C15,0 85,100 100,50"
                      stroke="#ccc"
                      strokeWidth="1"
                      fill="none"
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </React.Fragment>
      ))}
    </Container>
  );
};

export default InfoContainer;
