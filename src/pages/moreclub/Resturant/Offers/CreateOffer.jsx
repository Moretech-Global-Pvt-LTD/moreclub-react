import React from "react";
import DashboardLayout from "../../../../components/Layout/DashboardLayout";

import { Col, Row } from "react-bootstrap";

import OfferForm from "../../../../components/Moreclub/Resturant/Offer/AddOffer";
import { useParams } from "react-router-dom";

const RestroOfferCreate = () => {
  const { slug } = useParams();
  const name = slug.replace("-", " ");
 
  return (
    <DashboardLayout title={`${name} Offer`}>      
      <Row>
        <h4 className="my-3">Add new offer</h4>
          <Col xs={12} lg={8} xxl={6}>
             <OfferForm />
          </Col>
        </Row>
      
    </DashboardLayout>
  );
};

export default RestroOfferCreate;
