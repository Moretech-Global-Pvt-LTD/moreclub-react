import React, { useEffect, useState } from "react";
import { Button, Col, Row, Form, InputGroup, Spinner } from "react-bootstrap";

import { message } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import {
  valdateShortDescription,
  validateAddress,
  validateAnemeties,
  Validatebanner,
  validateContactNumber,
  validateCountry,
  validateCurrency,
  validateEmail,
  validateFacebookURL,
  validateInstagramURL,
  validateLongDescription,
  validateResturantName,
  validateTimeZone,
  validateWebsiteURL,
} from "../../../validation/resturantValidation";
import MapBoxLocationDisplayAutocomplete from "../../Googlemap/MapLocationInput";
import TagsInput from "../CommonComponents/TagInput";
import { moresalonAuthenticatedAxios, moresalonPublicAxios } from "../../../utills/axios/moresalonaxios";
import moment from "moment-timezone";
import TimezoneSelector from "../CommonComponents/TimeZoneInput";

const SaloonUpdateInfoForm = ({ data }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);
  const [formValues, setFormValues] = useState({
    name: data.name ?? "",
    address: data.address ?? "",
    email: data.email ?? "",
    contact_no: data.contact_no ?? "",
    short_description: data.short_description ?? "",
    country: data.country ?? "",
    currency: data.currency ?? "",
    lat: data.lat ?? 0,
    lng: data.lng ?? 0,
    long_description: data.long_description ?? "",
    website_link: data.website_link ?? "",
    facebook_link: data.facebook_link ?? "",
    instagram_link: data.instagram_link ?? "",
    amenities: data.amenities ?? [],
    timezone: data.timezone || moment.tz.guess() || "",
  });
  const [errors, setErrors] = useState({});
  const queryClient = useQueryClient();

  const validateForm = (fieldValues = formValues) => {
    const tempErrors = { ...errors };
    if ("name" in fieldValues)
      tempErrors.name = validateResturantName(fieldValues.name);

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
      tempErrors.website_link = validateWebsiteURL(fieldValues.website_link);
    if ("facebook_link" in fieldValues)
      tempErrors.facebook_link = validateFacebookURL(fieldValues.facebook_link);
    if ("instagram_link" in fieldValues)
      tempErrors.instagram_link = validateInstagramURL(
        fieldValues.instagram_link
      );
    if ("contact_no" in fieldValues)
      tempErrors.contact_no = validateContactNumber(fieldValues.contact_no);
    if ("email" in fieldValues)
      tempErrors.email = validateEmail(fieldValues.email);
     if ("timezone" in fieldValues)
              tempErrors.timezone = validateTimeZone(fieldValues.timezone);
    setErrors({ ...tempErrors });
  };

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return validateResturantName(value);
      case "country":
        return validateCountry(value);
      case "currency":
        return validateCurrency(value);
      case "address":
        return validateAddress(value);
      case "amenities":
        return validateAnemeties(value);
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
      case "timezone":
        return validateTimeZone(value);
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
      const res = await moresalonPublicAxios.get(`country/list/`);
      setCountryList(res.data.data);
      const uniqueCurrencies = new Map();

      res.data.data.forEach((country) => {
        if (country.currency && country.currency.id) {
          uniqueCurrencies.set(country.currency.id, country.currency);
        }
      });

      // Convert Map values to Array
      const currencyList = Array.from(uniqueCurrencies.values());
      setCurrencyList(currencyList);
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
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: type === "checkbox" ? checked : value,
    }));
    
  };

  const handleCurrencyChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: type === "checkbox" ? (checked ? true : false) : value,
    }));
  };

  const handleTimezoneChange = (timezone) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      timezone: timezone,
    }));
    validateForm({ timezone: timezone });
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
      try {
        setIsLoading(true);
        await moresalonAuthenticatedAxios.patch(
          `moreclub/users/saloon/${data.id}/`,
          formValues
        );
        message.success("Your changes was Uploaded ");
        queryClient.invalidateQueries([`Saloon List ${data.id}`]);
      } catch (err) {
        console.log(err);
        message.error("Error uploading your changes ");
      } finally {
        setIsLoading(false);
      }
    } else {
      message.error("Please Provide the valid information");
    }
  };

  const handleTagsChange = (newTags) => {
    setFormValues((prevValues) => ({
      ...prevValues, // Spread the previous state
      amenities: [...newTags], // Set the new tags as the updated amenities array
    }));
  };

  return (
    <div className="d-flex flex-column gap-4 mt-3">
      <Row xs={1} md={2}>
        <Col xs={12} md={12} lg={12} xl={10} xxl={10}>
          <Form className="restaurant-form card p-2" onSubmit={handleSubmit}>
            <h3>Salon Information</h3>
            <Col className="card d-flex flex-column gap-4 p-2">
              <Row>
                <Col xs={12} md={6} lg={6} xl={6} xxl={6}>
                  <Form.Group controlId="formRestaurantName">
                    <Form.Label>Salon Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder={"Salon Name"}
                      value={formValues.name}
                      onChange={handleChange}
                    />
                    <p className="text-danger">{errors.name}</p>
                  </Form.Group>
                </Col>
                <Col xs={12} md={6} lg={6} xl={6} xxl={6}>
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
                <Col xs={12} md={6} lg={6} xl={6} xxl={6}>
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
                <Col xs={12} md={6} lg={6} xl={6} xxl={6}>
                  {/* <Form.Group controlId="formmin_order ">
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
                  </Form.Group> */}
                  <div className="row row-cols-2">
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
                    <Form.Group>
                      <Form.Label>Currency</Form.Label>
                      <Form.Control
                        as="select"
                        name="currency"
                        value={formValues.currency}
                        onChange={handleCurrencyChange}
                      >
                        <option value={""} disabled>
                          {"Currency"}
                        </option>
                        {currencyList.map((bt) => (
                          <option value={bt.id} key={bt.name}>
                            {bt.name} ({bt.symbol})
                          </option>
                        ))}
                      </Form.Control>
                      <p className="text-danger">{errors.currency}</p>
                    </Form.Group>
                  </div>
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
                <Col xs={12} md={12} lg={12} xl={6} xxl={6}>
                  <Col xs={12} md={6} lg={6} xl={12} xxl={12}>
                    <TagsInput
                      label="Amenities"
                      initialTags={formValues.amenities}
                      onTagsChange={handleTagsChange}
                    />
                    <p className="text-danger">{errors.amenities}</p>
                  </Col>

                  <Col xs={12} md={6} lg={6} xl={12} xxl={12}>
                  <Form.Group controlId="formDeliveryTime">
                    <TimezoneSelector
                      selectedTimezone={formValues.timezone}
                      onTimezoneChange={handleTimezoneChange}
                    />
                    <p className="text-danger">{errors.timezone}</p>
                  </Form.Group>
                </Col>
                  <h6 className="mt-3">Social Media Links</h6>
                  <Col xs={12} md={6} lg={6} xl={12} xxl={12}>
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
                  <Col xs={12} md={6} lg={6} xl={12} xxl={12}>
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
                  <Col xs={12} md={6} lg={6} xl={12} xxl={12}>
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
                  disabled={isLoading}
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

export default SaloonUpdateInfoForm;
