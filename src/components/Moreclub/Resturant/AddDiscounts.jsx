import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";

const DiscountForm = ({ addDiscount }) => {
  const [discount, setDiscount] = useState({
    discountPercentage: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDiscount({ ...discount, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addDiscount(discount);
    setDiscount({ discountPercentage: "", description: "" });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formDiscountPercentage">
          <Form.Label>Discount Percentage</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter discount percentage"
            name="discountPercentage"
            value={discount.discountPercentage}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter description"
            name="description"
            value={discount.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="success" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default DiscountForm;
