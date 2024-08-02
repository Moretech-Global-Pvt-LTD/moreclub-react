import React from "react";
import { Col, Row } from "react-bootstrap";

const Statcard = () => {
  return (
    <div className="stats">
      <Row>
        <Col xs={6} md={3} className="mb-2">
          <div className="stat-box">
            <h4 className="text-white">60,000+</h4>
            <p>Customers</p>
          </div>
        </Col>
        <Col xs={6} md={3} className="mb-2">
          <div className="stat-box">
            <h4 className="text-white">1.4M+</h4>
            <p>Businesses</p>
          </div>
        </Col>
        <Col xs={6} md={3} className="mb-2">
          <div className="stat-box">
            <h4 className="text-white">622M+</h4>
            <p>Leads</p>
          </div>
        </Col>
        <Col xs={6} md={3} className="mb-2">
          <div className="stat-box">
            <h4 className="text-white">14.7B+</h4>
            <p>Conversations</p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Statcard;
