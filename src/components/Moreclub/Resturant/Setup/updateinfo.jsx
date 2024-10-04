import React, { useEffect, useState } from "react";
import { Button, Col, Row, Form, InputGroup, Spinner } from "react-bootstrap";
import AddressInputWithAutocomplete from "../../../Googlemap/LocationInputonly";
import axios from "axios";
import { morefoodURL } from "../../../../config/config";
import { axiosInstance } from "../../../..";
import { message } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { valdateShortDescription, validateAddress, validateContactNumber, validateCountry, validateFacebookURL, validateInstagramURL, validateLongDescription, validateMin_order, validateResturantName, validateWebsiteURL } from "../../../../validation/resturantValidation";
import { validateEmail } from "../../../../validation/addaccountvalidation";
import MapBoxLocationDisplayAutocomplete from "../../../Googlemap/MapLocationInput";

const UpdateInfoForm = ({ data }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [countryList, setCountryList] = useState([]);
  const [symbol, setSymbol] = useState(data.currency_code);
  const [formValues, setFormValues] = useState({
    name: data.name ?? "",
    address: data.address ?? "",
    min_order: data.min_order ?? 0,
    delivery_time: data.delivery_time ?? "15 min",
    email: data.email ?? "",
    contact_no: data.contact_no ?? "",
    short_description: data.short_description ?? "",
    country: data.country ?? "",
    currency: data.currency ?? "",
    is_delivery: data.is_delivery ?? false,
    is_pickup: data.is_pickup ?? false,
    is_dine: data.is_dine ?? false,
    lat: data.lat ?? 0,
    lng: data.lng ?? 0,
    long_description: data.long_description ?? "",
    website_link: data.website_link ?? "",
    facebook_link: data.facebook_link ?? "",
    instagram_link: data.instagram_link ?? "",
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
        if ("short_description" in fieldValues)
          tempErrors.description = valdateShortDescription(fieldValues.description);
         if ("long_description" in fieldValues)
           tempErrors.long_description = validateLongDescription(
             fieldValues.long_description
           );
         if ("website_link" in fieldValues)
           tempErrors.website_link = validateWebsiteURL(
             fieldValues.website_link
           );
         if ("facebook_link" in fieldValues)
           tempErrors.facebook_link = validateFacebookURL(
             fieldValues.facebook_link
           );
         if ("instagram_link" in fieldValues)
           tempErrors.instagram_link = validateInstagramURL(
             fieldValues.instagram_link
           );
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
          case "short_description":
            return valdateShortDescription(value);
          case "long_description":
            return validateLongDescription(value);
          case "contact_no":
            return validateContactNumber(value);
          case "email":
            return validateEmail(value);
          case "website_link":
            return validateWebsiteURL(value);
          case "facebook_link":
            return validateFacebookURL(value);
          case "instagram_link":
            return validateInstagramURL(value);
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
      lng: place.lon,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add form submission logic here
       const validationErrors = validateAllFields();
    

    if (Object.keys(validationErrors).length === 0) {
      
      // const datas = {
      //   name: formValues.name ,
      //   address: formValues.address ,
      //   min_order: formValues.min_order ,
      //   delivery_time: formValues.delivery_time ,
      //   email: formValues.email ,
      //   contact_no: formValues.contact_no ,
      //   short_description: formValues.short_description ,
      //   country: formValues.country,
      //   currency: formValues.currency,
      //   is_delivery: formValues.is_delivery ,
      //   is_pickup: formValues.is_pickup ,
      //   is_dine: formValues.is_dine ,
      //   lat: formValues.lat ,
      //   lng: formValues.lng ,
      //   long_description: formValues.long_description,
      //   ...(formValues.website_link !== "" && { website_link : formValues.website_link }),
      //   ...(formValues.facebook_link !== "" && { facebook_link: formValues.facebook_link }),
      //   ...(formValues.instagram_link !== "" && { instagram_link: formValues.instagram_link }),
        
      // }

      try {
        setIsLoading(true);
        const res = await axiosInstance.patch(
          `${morefoodURL}moreclub/user/restaurants/${data.id}/`,
          formValues
        );
        message.success("Your changes was Uploaded ")
        queryClient.invalidateQueries([`Resturant List ${data.id}`]);
      
      } catch (err) {
        console.log(err);
        message.error("Error uploading your changes ");
      }finally{
        setIsLoading(false);
      }
    } else {
      message.error("Please Provide the valid information")
    }
  };

  return (
    <div className="d-flex flex-column gap-4 mt-3">
      <Row xs={1} md={2}>
        <Col xs={12} md={12} lg={12} xl={10} xxl={10}>
          <Form className="restaurant-form card p-2" onSubmit={handleSubmit}>
            <h3>Restaurant Information</h3>
            <Col className="card d-flex flex-column gap-4 p-2">
              <Row>
                <Col xs={12} md={6} lg={6} xl={6} xxl={4}>
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
                </Col>
                <Col xs={12} md={6} lg={6} xl={6} xxl={4}>
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
                </Col>
                <Col xs={12} md={6} lg={6} xl={6} xxl={4}>
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
                </Col>
                <Col xs={12} md={6} lg={6} xl={6} xxl={4}>
                  <Form.Group controlId="formmin_order ">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                      as="select"
                      name="country"
                      value={formValues.country}
                      onChange={handleCountryChange}
                    >
                      <option value={""} disabled>
                        {"Select Country"}
                      </option>
                      {countryList.map((bt) => (
                        <option value={bt.id} key={bt.name}>
                          {bt.name}
                        </option>
                      ))}
                    </Form.Control>
                    <p className="text-danger">{errors.country}</p>
                  </Form.Group>
                </Col>
                <Col xs={12} md={6} lg={6} xl={6} xxl={4}>
                  <Form.Group>
                    <Form.Label>Minimum Order</Form.Label>
                    <InputGroup className="">
                      <InputGroup.Text>{symbol}</InputGroup.Text>
                      <Form.Control
                        type="number"
                        name="min_order"
                        placeholder={"500"}
                        value={formValues.min_order}
                        onChange={handleChange}
                      />
                    </InputGroup>
                    <p className="text-danger">{errors.min_order}</p>
                  </Form.Group>
                </Col>
                <Col xs={12} md={6} lg={6} xl={6} xxl={4}>
                  <Form.Group controlId="formDeliveryTime">
                    <Form.Label>Maximum Delivery Time</Form.Label>
                    <Form.Control
                      as="select"
                      name="delivery_time"
                      value={formValues.delivery_time}
                      onChange={handleChange}
                      required
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

                <Col xs={12} md={12} lg={12} xl={6} xxl={6}>
                  <Form.Group>
                    <Form.Label>Location</Form.Label>
                    <MapBoxLocationDisplayAutocomplete
                      onPlaceSelected={handlePlaceSelected}
                      initialLat={formValues.lat}
                      initialLng={formValues.lng}
                      initialAddress={formValues.address}
                    />
                    <p className="text-danger">{errors.address}</p>
                  </Form.Group>
                </Col>

                <Col xs={12} md={12} lg={12} xl={6} xxl={6} className="">
                  <Row className="my-xl-4" >
                  <Form.Group
                    className="d-flex  gap-2"
                    style={{ height: "100%", alignItems: "center" }}
                  >
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
                  
                <h6 className="mt-3">Social Media Links</h6>
                <Col xs={12} md={6} lg={6} xl={6} xxl={12}>
                  <Form.Group controlId="formWebsitelink">
                    <Form.Label>Website Link (optional)</Form.Label>
                    <Form.Control
                      type="text"
                      name="website_link"
                      placeholder={"https://example.com"}
                      value={formValues.website_link}
                      onChange={handleChange}
                    />
                    <p className="text-danger">{errors.website_link}</p>
                  </Form.Group>
                </Col>
                <Col xs={12} md={6} lg={6} xl={6} xxl={12}>
                  <Form.Group controlId="formFacebookLink">
                    <Form.Label>Facebook Link (optional)</Form.Label>
                    <Form.Control
                      type="text"
                      name="facebook_link"
                      placeholder={"Facebook Link"}
                      value={formValues.facebook_link}
                      onChange={handleChange}
                    />
                    <p className="text-danger">{errors.facebook_link}</p>
                  </Form.Group>
                </Col>
                <Col xs={12} md={6} lg={6} xl={6} xxl={12}>
                  <Form.Group controlId="formInstagramLink">
                    <Form.Label>Instagram Link (optional)</Form.Label>
                    <Form.Control
                      type="text"
                      name="instagram_link"
                      placeholder={"Instagram Link"}
                      value={formValues.instagram_link}
                      onChange={handleChange}
                    />
                    <p className="text-danger">{errors.instagram_link}</p>
                  </Form.Group>
                </Col>
                  
                  
                  
                  </Row>

                </Col>
              </Row>

              <Form.Group controlId="formDescription">
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="short_description"
                  placeholder={"Short Description"}
                  value={formValues.short_description}
                  onChange={handleChange}
                />
                <p className="text-danger">{errors.short_description}</p>
              </Form.Group>
              <Form.Group controlId="formDescription">
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="long_description"
                  placeholder={"Long Description"}
                  value={formValues.long_description}
                  onChange={handleChange}
                />
                <p className="text-danger">{errors.long_description}</p>
              </Form.Group>
            </Col>
            <Row className="justify-content-end">
              <Col xs={12} md={6} lg={6} xl={6} xxl={4}>
                <Button
                  variant="danger"
                  type="submit"
                  className="mt-4 w-100"
                  disabled={
                    isLoading
                  }
                >
                  {isLoading && <Spinner animation="border" size="sm" />} Update
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default UpdateInfoForm;
