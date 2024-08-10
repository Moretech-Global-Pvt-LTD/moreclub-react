import React, { useState } from "react";
import DashboardLayout from "../../../components/Layout/DashboardLayout";

import { Button, Col, Row } from "react-bootstrap";
import MenuCard from "../../../components/Moreclub/Resturant/Menu/MenuCard";

import DiscountForm from "../../../components/Moreclub/Resturant/AddDiscounts";

const RestroDiscount = () => {
  const [showForm, setShowForm] = useState(false);

  async function showAddCategory() {
    setShowForm(true);
  }

  async function hideAddCategory() {
    setShowForm(false);
  }
  return (
    <DashboardLayout>
      <div>
        <div className="d-flex align-items-center justify-content-between my-2">
          <h3>Discounts</h3>
          {showForm ? (
            <Button variant="danger" onClick={() => hideAddCategory()}>
              Cancel
            </Button>
          ) : (
            <Button variant="warning" onClick={() => showAddCategory()}>
              Add Offers
            </Button>
          )}
        </div>
        <Row>
          <Col xs={12} lg={8} xxl={6}>
            {showForm && <DiscountForm />}
          </Col>
        </Row>

        <Row
          xs={2}
          sm={3}
          md={4}
          lg={4}
          xl={5}
          xxl={6}
          className="gx-3 gy-3 my-4"
        >
          {[1, 2, 2, 3, 5, 4, 5, 5, 6, 4].map((item) => (
            <Col className="d-flex flex-column">
              <MenuCard
                id={item}
                logo={item.business_logo}
                name={item.business_name}
                item={item.business_address}
              />
            </Col>
          ))}
        </Row>
      </div>
    </DashboardLayout>
  );
};

export default RestroDiscount;
