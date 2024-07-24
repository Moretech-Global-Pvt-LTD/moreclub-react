import React, { useEffect, useState } from "react";
import { Button, Col, Image, Row, Form } from "react-bootstrap";
import { useDebounce } from "../../../Hooks/useDebounce";
import AddressInputWithAutocomplete from "../../Googlemap/LocationInputonly";

const InfoForm = () => {
  const [formValues, setFormValues] = useState({
    restaurantName: "Restaurant Name",
    location: "Location",
    minimumOrder: "$20 Minimum Order",
    deliveryTime: "1hr Service-Time",
    description: "Some description",
    freeDelivery: false,
    pickup: false,
    dineIn: false,
    lat: 0,
    lng: 0,
  });

  useDebounce();

  //   const debouncedValidation = debounce((values) => {
  //     // Add validation logic here
  //     console.log("Validating", values);
  //   }, 500);

  //   useEffect(() => {
  //     debouncedValidation(formValues);
  //     // Cleanup function to cancel debounce on unmount
  //     return () => debouncedValidation.cancel();
  //   }, [formValues]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handlePlaceSelected = async (place, address) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      location: address,
      lat: place.lat,
      lng: place.lng,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log("Form submitted", formValues);
  };
  return (
    <div className="d-flex flex-column gap-4">
      <Form className="restaurant-form">
        <Row xs={1} md={2}>
          <Col className="d-flex flex-column gap-4">
            <Form.Group controlId="formRestaurantName">
              <Form.Control
                type="text"
                name="restaurantName"
                placeholder={"Resturant Name"}
                value={formValues.restaurantName}
                onChange={handleChange}
              />
            </Form.Group>
            <AddressInputWithAutocomplete
              onPlaceSelected={handlePlaceSelected}
              initialLat={formValues.lat}
              initialLng={formValues.lng}
              initialAddress={formValues.location}
            />
            <Form.Group controlId="formMinimumOrder">
              <Form.Control
                type="text"
                name="minimumOrder"
                placeholder={"Minimum Order"}
                value={formValues.minimumOrder}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formDeliveryTime">
              <Form.Control
                type="text"
                name="deliveryTime"
                placeholder={"Delivery Time"}
                value={formValues.deliveryTime}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                placeholder={"Description"}
                value={formValues.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Free Delivery"
                name="freeDelivery"
                checked={formValues.freeDelivery}
                onChange={handleChange}
              />
              <Form.Check
                type="checkbox"
                label="Pickup"
                name="pickup"
                checked={formValues.pickup}
                onChange={handleChange}
              />
              <Form.Check
                type="checkbox"
                label="Dine-In"
                name="dineIn"
                checked={formValues.dineIn}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formRestaurantName">
              <Form.Label>Restaurant Name</Form.Label>
              <Form.Control type="text" placeholder="Restaurant Name" />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit" className="mt-4">
          Save
        </Button>
      </Form>

      <Row>
        <Col md={6} className="restaurant-info">
          {/* <Image
          src="path_to_your_image.png"
          alt="Restaurant"
          className="restaurant-image"
          fluid
        /> */}
          <div className="restaurant-details">
            <h2>{formValues.restaurantName}</h2>
            <p>From {formValues.location}</p>
            <p>
              {formValues.freeDelivery && "Free Delivery |"}{" "}
              {formValues.pickup && "Pick up |"}{" "}
              {formValues.dineIn && "Dine In |"} $20 Minimum | 1hr service
            </p>
            <p>{formValues.description}</p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default InfoForm;
