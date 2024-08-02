import React, { useEffect, useState } from "react";
import { Button, Col, Row, Form, InputGroup, Spinner } from "react-bootstrap";
import AddressInputWithAutocomplete from "../../Googlemap/LocationInputonly";
import axios from "axios";
import { morefoodURL } from "../../../config/config";
import { axiosInstance } from "../../..";
import { message } from "antd";
import { valdateDescription, validateAddress, Validatebanner, validateContactNumber, validateCountry, validateEmail, Validatelogo, validateMin_order, validateResturantName } from "../../../validation/resturantValidation";
import { useNavigate } from "react-router-dom";

const InfoForm = () => {
  const navigate = useNavigate();
  const [countryList, setCountryList] = useState([]);
  const [inputDisplayLogo, setInputDisplayLogo] = useState();
  const [LogoError, setLogoError] = useState("");

  
  const [inputDisplayImage, setInputDisplayImage] = useState();
  const [bannerError, setBannerError] = useState("");
const [isLoading, setIsLoading]= useState(false)
  const [symbol, setSymbol] = useState("");
  const [formValues, setFormValues] = useState({
    name: "",
    address: "",
    min_order: "",
    delivery_time: "15 min",
    email: "",
    contact_no: "",
    description: "",
    country: "",
    currency: "",
    is_delivery: false,
    is_pickup: false,
    is_dine: false,
    lat: 0,
    lng: 0,
    banner: null,
    logo: null,
  });

  const [errors, setErrors] = useState({});


    const validateForm = (fieldValues = formValues) => {
      const tempErrors = { ...errors };
      if ("name" in fieldValues)
        tempErrors.name = validateResturantName(fieldValues.name);
      if ("min_order" in fieldValues)
        tempErrors.min_order = validateMin_order(fieldValues.min_order);
      if ("country" in fieldValues)
        tempErrors.country = validateCountry(fieldValues.country);
      if ("address" in fieldValues)
        tempErrors.address = validateAddress(fieldValues.address , formValues.lat, formValues.lng);
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




  const handlePlaceSelected = async (place, address) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      address: address,
      lat: place.lat,
      lng: place.lng,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateAllFields();
    

    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true);
      try {
        const res = await axiosInstance.post(
          `${morefoodURL}moreclub/restaurant/setup/`,
          formValues,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        message.success("Resturant created");
        navigate(`/resturant/setup/${res.data.data.id}`);
      } catch (err) {
        console.log(err);
        message.error("Error Creating Resturant");
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
        <Form className="restaurant-form  " onSubmit={handleSubmit}>
          <h3>Resturant Information</h3>
          <p className="text-warning">
            All fields are required 
          </p>
          <Col className="card d-flex flex-column gap-4 p-2">
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
            </div>
            <Form.Group>
              <Form.Label>Location</Form.Label>
              <AddressInputWithAutocomplete
                onPlaceSelected={handlePlaceSelected}
                initialLat={formValues.lat}
                initialLng={formValues.lng}
                initialAddress={formValues.address}
              />
              <p className="text-danger">{errors.address}</p>
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

          <div className="col-12 mt-4">
            <h4>Resturant Logo</h4>
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
                    {LogoError && <p className="text-danger">{LogoError}</p>}
                    <p className="text-danger">{errors.logo}</p>
                  </Form.Group>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 mb-4 mt-4">
            <h4>Resturant Banner</h4>
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

          <Button variant="primary" type="submit" className="mt-4" disabled={bannerError.trim() !== ""|| LogoError.trim() !=="" || isLoading}>
            {isLoading && <Spinner animation="border" size="sm" />} Save
          </Button>
        </Form>
      </Row>
    </div>
  );
};

export default InfoForm;
