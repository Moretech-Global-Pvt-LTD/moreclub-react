import React, { useEffect, useState } from "react";
import { Button, Col, Row, Form, InputGroup } from "react-bootstrap";
import AddressInputWithAutocomplete from "../../Googlemap/LocationInputonly";
import axios from "axios";
import { morefoodURL } from "../../../config/config";
import { axiosInstance } from "../../..";
import { message } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { valdateDescription, validateAddress, validateContactNumber, validateCountry, validateMin_order, validateResturantName } from "../../../validation/resturantValidation";
import { validateEmail } from "../../../validation/addaccountvalidation";

const UpdateInfoForm = ({data}) => {
  const [countryList, setCountryList] = useState([]);
  const [symbol, setSymbol] = useState(data.currency_code);
  const [formValues, setFormValues] = useState({
    name: data.name ?? "",
    address: data.address ?? "",
    min_order: data.min_order ?? 0,
    delivery_time: data.delivery_time ?? "15 min",
    email: data.email ?? "",
    contact_no: data.contact_no ?? "",
    description: data.description ?? "",
    country: data.country ?? "",
    currency: data.currency ?? "",
    is_delivery: data.is_delivery ?? false,
    is_pickup: data.is_pickup ?? false,
    is_dine: data.is_dine ?? false,
    lat: data.lat ?? 0,
    lng: data.lng ?? 0,
  });
  const [errors, setErrors] = useState({});
  const queryClient = useQueryClient();
  
      const validateForm = (fieldValues = formValues) => {
        const tempErrors = { ...errors };
        if ("name" in fieldValues)
          tempErrors.name = validateResturantName(fieldValues.name);
        if ("min_order" in fieldValues)
          tempErrors.min_order = validateMin_order(fieldValues.min_order);
        if ("country" in fieldValues)
          tempErrors.country = validateCountry(fieldValues.country);
        if ("address" in fieldValues)
          tempErrors.address = validateAddress(
            fieldValues.address,
            formValues.lat,
            formValues.lng
          );
        if ("description" in fieldValues)
          tempErrors.description = valdateDescription(fieldValues.description);
        if ("contact_no" in fieldValues)
          tempErrors.contact_no = validateContactNumber(fieldValues.contact_no);
        if ("email" in fieldValues)
          tempErrors.email = validateEmail(fieldValues.email);
        setErrors({ ...tempErrors });
      };
  
      const validateField = (name, value) => {
        switch (name) {
          case "name":
            return validateResturantName(value);
          case "min_order":
            return validateMin_order(value);
          case "country":
            return validateCountry(value);
          case "address":
            return validateAddress(value);
          case "description":
            return valdateDescription(value);
          case "contact_no":
            return validateContactNumber(value);
          case "email":
            return validateEmail(value);
          default:
            return "";
        }
      };

      const validateAllFields = () => {
        const tempErrors = {};
        for (const key in formValues) {
          const error = validateField(key, formValues[key]);
          if (error) tempErrors[key] = error;
        }
        setErrors(tempErrors);
        return tempErrors;
      };

  const fetchCountry = async () => {
    try {
      const res = await axios.get(`${morefoodURL}country/list/`);
      setCountryList(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCountry();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleCountryChange = (e) => {
    const { name, value, type, checked } = e.target;
    const currency = countryList.filter((co) => co.id === parseInt(value))[0];
    setSymbol(currency.currency.symbol);
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: type === "checkbox" ? checked : value,
    }));
    setFormValues((prevValues) => ({
      ...prevValues,
      currency: currency.currency.id,
    }));
  };

  const handlePlaceSelected = async (place, address) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      address: address,
      lat: place.lat,
      lng: place.lng,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add form submission logic here
       const validationErrors = validateAllFields();
    

    if (Object.keys(validationErrors).length === 0) {
    

      try {
        const res = await axiosInstance.patch(
          `${morefoodURL}moreclub/user/restaurants/update/${data.id}/`,
          formValues
        );
        message.success("Your changes was Uploaded ")
        queryClient.invalidateQueries([`Resturant List ${data.id}`]);
      
      } catch (err) {
        console.log(err);
        message.error("Error uploading your changes ");
      }
    } else {
      message.error("Please Provide the valid information")
    }
  };

  return (
    <div className="d-flex flex-column gap-4 mt-3">
      <Row xs={1} md={2}>
        <Form className="restaurant-form card p-2" onSubmit={handleSubmit}>
          <h3>Resturant Information</h3>
          <Col className="d-flex flex-column gap-4">
            <Form.Group controlId="formRestaurantName">
              <Form.Label>Resturant Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder={"Resturant Name"}
                value={formValues.name}
                onChange={handleChange}
              />
              <p className="text-danger">{errors.name}</p>
            </Form.Group>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xxl-3 g-2">
              <Col>
                <Form.Group controlId="formMinimumOrder ">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    as="select"
                    name="country"
                    value={formValues.country}
                    onChange={handleCountryChange}
                  >
                    <option value={""}>{"Select Country"}</option>
                    {countryList.map((bt) => (
                      <option value={bt.id} key={bt.name}>
                        {bt.name}
                      </option>
                    ))}
                  </Form.Control>
                  <p className="text-danger">{errors.country}</p>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Minimum Order</Form.Label>
                  <InputGroup className="">
                    <InputGroup.Text>{symbol}</InputGroup.Text>
                    <Form.Control
                      type="number"
                      name="min_order"
                      placeholder={"Minimum Order"}
                      value={formValues.min_order}
                      onChange={handleChange}
                    />
                  </InputGroup>
                  <p className="text-danger">{errors.min_order}</p>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formDeliveryTime">
                  <Form.Label>Maximum Delivery Time</Form.Label>
                  <Form.Control
                    as="select"
                    name="delivery_time"
                    value={formValues.delivery_time}
                    onChange={handleChange}
                  >
                    <option value={"15 min"}>15 min</option>
                    <option value={"20 min"}>20 min</option>
                    <option value={"30 min"}>30 min</option>
                    <option value={"45 min"}>45 min</option>
                    <option value={"1:00 hrs"}>1:00 hrs</option>
                    <option value={"1:30 hrs"}>1:30 hrs</option>
                    <option value={"2:00 hrs"}>2:00 hrs</option>
                  </Form.Control>
                  <p className="text-danger">{errors.delivery_time}</p>
                </Form.Group>
              </Col>
            </div>
            <Form.Group>
              <Form.Label>Location</Form.Label>
              <AddressInputWithAutocomplete
                onPlaceSelected={handlePlaceSelected}
                initialLat={formValues.lat}
                initialLng={formValues.lng}
                initialAddress={formValues.address}
              />
            </Form.Group>
            <Form.Group controlId="formemail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder={"example@example.com"}
                value={formValues.email}
                onChange={handleChange}
              />
              <p className="text-danger">{errors.email}</p>
            </Form.Group>
            <Form.Group controlId="formContactname">
              <Form.Label>Contact no</Form.Label>
              <Form.Control
                type="text"
                name="contact_no"
                placeholder={"+xxxxxxxxxx"}
                value={formValues.contact_no}
                onChange={handleChange}
              />
              <p className="text-danger">{errors.contact_no}</p>
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
              <p className="text-danger">{errors.description}</p>
            </Form.Group>

            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Free Delivery"
                name="is_delivery"
                checked={formValues.is_delivery}
                onChange={handleChange}
              />
              <Form.Check
                type="checkbox"
                label="is_pickup"
                name="is_pickup"
                checked={formValues.is_pickup}
                onChange={handleChange}
              />
              <Form.Check
                type="checkbox"
                label="Dine-In"
                name="is_dine"
                checked={formValues.is_dine}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Button variant="primary" type="submit" className="mt-4">
            Save
          </Button>
        </Form>
      </Row>
    </div>
  );
};

export default UpdateInfoForm;
