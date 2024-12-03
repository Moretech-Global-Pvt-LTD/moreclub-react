import React, { useEffect, useState } from "react";
import { Button, Col, Row, Form, Spinner } from "react-bootstrap";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
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
  Validatelogo,
  validateLongDescription,
  validateResturantName,
  validateWebsiteURL,
} from "../../../validation/resturantValidation";
import MapBoxLocationDisplayAutocomplete from "../../Googlemap/MapLocationInput";
import { moresaloonURL } from "../../../config/config";
import { axiosInstance } from "../../..";
import TagsInput from "../CommonComponents/TagInput";
import { useSelector } from "react-redux";
// import FormSubmissionLoading from "../../Skeleton/FormSubmissionLoading";

const SaloonCreateForm = () => {
  const navigate = useNavigate();
  const businessProfiles = useSelector(
    (state) => state.businessReducer.businessProfile
  );
  const userProfiles = useSelector((state) => state.userReducer.user);
  const [countryList, setCountryList] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);

  const [inputDisplayLogo, setInputDisplayLogo] = useState();
  const [LogoError, setLogoError] = useState("");

  const [inputDisplayImage, setInputDisplayImage] = useState();
  const [bannerError, setBannerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [symbol, setSymbol] = useState("");
  const [formValues, setFormValues] = useState({
    name: businessProfiles?.business_name ?? "",
    address: businessProfiles?.business_address ?? "",
    email: businessProfiles?.business_email ?? "",
    contact_no: businessProfiles?.business_phone ?? "",
    country: "",
    currency: "",
    lat: businessProfiles?.lat ?? 0,
    lng: businessProfiles?.lng ?? 0,
    banner: null,
    logo: null,
    short_description: "",
    long_description: "",
    website_link: "",
    facebook_link: "",
    instagram_link: "",
    amenities: [],
  });

  const [errors, setErrors] = useState({});

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
      tempErrors.short_description = valdateShortDescription(
        fieldValues.short_description
      );
    if ("long_description" in fieldValues)
      tempErrors.long_description = validateLongDescription(
        fieldValues.long_description
      );
    if ("amenities" in fieldValues)
      tempErrors.amenities = validateAnemeties(fieldValues.amenities);
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
      case "short_description":
        return valdateShortDescription(value);
      case "long_description":
        return validateLongDescription(value);
      case "amenities":
        return validateAnemeties(value);
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
      case "banner":
        return Validatebanner(value);
      case "logo":
        return Validatelogo(value);
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
      const res = await axios.get(`${moresaloonURL}country/list/`);
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

  useEffect(() => {
    if (countryList.length > 0) {
      if (userProfiles?.user_profile?.country) {
        handleCountryInitialChange();
      }
    }
  }, [countryList, userProfiles]);

  const handleCountryInitialChange = () => {
    const currency = countryList.filter(
      (co) => co.name === userProfiles?.user_profile?.country
    )[0];
    setSymbol(currency.currency.symbol);

    setFormValues((prevValues) => ({
      ...prevValues,
      currency: currency.currency.id,
      country: currency.id,
    }));
    validateForm({ country: currency.id, currency: currency.currency.id });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: type === "checkbox" ? (checked ? true : false) : value,
    }));
    validateForm({ [name]: type === "checkbox" ? checked : value });
  };

  const handleCountryChange = (e) => {
    const { name, value, type, checked } = e.target;
    const currency = countryList.filter((co) => co.id === parseInt(value))[0];
    setSymbol(currency.currency.symbol);
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: type === "checkbox" ? (checked ? true : false) : value,
    }));
    setFormValues((prevValues) => ({
      ...prevValues,
      currency: currency.currency.id,
    }));
    validateForm({ [name]: type === "checkbox" ? checked : value });
  };

  const handleCurrencyChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: type === "checkbox" ? (checked ? true : false) : value,
    }));
    validateForm({ [name]: type === "checkbox" ? checked : value });
  };

  const handlePlaceSelected = async (place, address) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      address: address,
      lat: place.lat,
      lng: place.lon,
    }));
  };

  const LogohandleChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setInputDisplayLogo(URL.createObjectURL(event.target.files[0]));
      setFormValues((prevValues) => ({
        ...prevValues,
        logo: event.target.files[0],
      }));
      setLogoError("");
    } else {
      setLogoError("Please upload images only");
    }
  };

  const bannerhandleChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setInputDisplayImage(URL.createObjectURL(event.target.files[0]));
      setFormValues((prevValues) => ({
        ...prevValues,
        banner: event.target.files[0],
      }));
      setBannerError("");
    } else {
      setBannerError("Please upload images only");
    }
  };

  const handleTagsChange = (newTags) => {
    setFormValues((prevValues) => ({
      ...prevValues, // Spread the previous state
      amenities: [...newTags], // Set the new tags as the updated amenities array
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateAllFields();

    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true);

      try {
        const res = await axiosInstance.post(
          `${moresaloonURL}moreclub/saloon/setup/`,
          formValues,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        message.success("saloon created");
        const slug = res.data.data.name.replace(/ /g, "-");
        navigate(`/saloon/${res.data.data.id}/${slug}`);
      } catch (err) {
        message.error("Error Creating Saloon");
      } finally {
        setIsLoading(false);
      }
    } else {
      message.error("Please Provide the valid information");
    }
  };

  return (
    <div className="d-flex flex-column gap-4 mt-3">
      <Row>
        <Col xs={12} md={12} lg={12} xl={10} xxl={10}>
          <Form className="restaurant-form  " onSubmit={handleSubmit}>
            <h5>Salon Information</h5>
            <p className="text-warning">All fields are required</p>
            <Col className="card d-flex flex-column gap-4 p-2">
              <Row>
                <Col xs={12} md={6} lg={6} xl={6} xxl={6}>
                  <Form.Group controlId="formSaloonName">
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
                <Col xs={12} md={12} lg={12} xl={6} xxl={6} className="">
                  <Row className="my-xl-4">
                    <Col xs={12} md={6} lg={6} xl={12} xxl={12}>
                      <TagsInput
                        label="Amenities"
                        initialTags={formValues.amenities}
                        onTagsChange={handleTagsChange}
                      />
                      <p className="text-danger">{errors.amenities}</p>
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
            <Row>
              <Col xs={12} md={12} lg={12} xl={6} xxl={6}>
                <div className="col-12 mt-4">
                  <h5>Salon Logo</h5>
                  <div className=" card ">
                    <div
                      className="card-body p-4 p-sm-5"
                      style={{ marginTop: "-25px" }}
                    >
                      <div className=" card-body">
                        <div className="img-wrap text-center">
                          <img
                            src={inputDisplayLogo}
                            alt=""
                            style={{
                              width: "200px",
                              borderRadius: "50px",
                              border: "1px",
                              borderColor: "white",
                            }}
                          />
                        </div>
                      </div>

                      <div className="col-12">
                        <Form.Group className="mb-4">
                          <Form.Control
                            className="bg-transparent"
                            id="formFileMultiple"
                            type="file"
                            accept="image/*"
                            onChange={LogohandleChange}
                          />
                          {LogoError && (
                            <p className="text-danger">{LogoError}</p>
                          )}
                          <p className="text-danger">{errors.logo}</p>
                        </Form.Group>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>

              <Col xs={12} md={12} lg={12} xl={6} xxl={6}>
                <div className="col-12 mb-4 mt-4">
                  <h5>Salon Banner</h5>
                  <div className=" card ">
                    <div
                      className="card-body p-4 p-sm-5"
                      style={{ marginTop: "-25px" }}
                    >
                      <div className=" card-body">
                        <div className="img-wrap text-center">
                          <img
                            src={inputDisplayImage}
                            alt=""
                            style={{
                              width: "200px",
                              borderRadius: "50px",
                              border: "1px",
                              borderColor: "white",
                            }}
                          />
                        </div>
                      </div>

                      <div className="col-12">
                        <Form.Group className="mb-4">
                          <Form.Control
                            className="bg-transparent"
                            id="formFileMultiple"
                            type="file"
                            accept="image/*"
                            onChange={bannerhandleChange}
                          />
                          {bannerError && (
                            <p className="text-danger">{bannerError}</p>
                          )}
                          <p className="text-danger">{errors.banner}</p>
                        </Form.Group>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>

            <Row className="justify-content-end">
              <Col xs={12} md={6} lg={6} xl={6} xxl={4}>
                <Button
                  variant="danger"
                  type="submit"
                  className="mt-4 w-100"
                  disabled={
                    bannerError.trim() !== "" ||
                    LogoError.trim() !== "" ||
                    isLoading
                  }
                >
                  {isLoading && <Spinner animation="border" size="sm" />} Save
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default SaloonCreateForm;
