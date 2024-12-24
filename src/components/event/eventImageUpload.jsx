import React from "react";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import EventImageUploadform from "./EventImageUploadform";
import { Col, Row } from "react-bootstrap";


const EventImageUpload = () => {
  

  return (
    <DashboardLayout title={"Upload Images"}>
      <Row>
      <Col xs={12} md={10} xl={6} className=" card p-2">
      <EventImageUploadform />
      </Col>
      </Row>
    </DashboardLayout>
  );
};

export default EventImageUpload;
