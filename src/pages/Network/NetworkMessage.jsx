import React from "react";
import MessageContent from "./MessageContent";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import { Col, Row } from "react-bootstrap";

const NetworkMessage = () => {
  return (
    <DashboardLayout title={"Send Message"}>
      <Row>
        <Col xs={12} md={10}  lg={8} xl={6}> 
          <MessageContent />
        </Col>
      </Row>
    </DashboardLayout>
  );
};

export default NetworkMessage;
