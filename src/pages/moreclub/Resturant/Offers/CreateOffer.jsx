import React from "react";
import { Col, Row } from "react-bootstrap";
import OfferForm from "../../../../components/Moreclub/Resturant/Offer/AddOffer";
import RestaurantLayout from "../../../../components/Layout/RestaurantLayout";

const RestroOfferCreate = () => {
  return (
    <RestaurantLayout>      
      <Row>
        <h4 className="my-3">Add new offer</h4>
          <Col xs={12} lg={8} xxl={6}>
             <OfferForm />
          </Col>
        </Row>
      
    </RestaurantLayout>
  );
};

export default RestroOfferCreate;
