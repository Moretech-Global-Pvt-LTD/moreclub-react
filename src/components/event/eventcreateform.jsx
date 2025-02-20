import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { axiosInstance } from "../..";
import { baseURL } from "../../config/config";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useDispatch } from "react-redux";
import MapBoxLocationDisplayAutocomplete from "../Googlemap/MapLocationInput";
import { validateDates, validateRequiredField } from "../../validation/resturantValidation";

const Eventcreateform = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    lng: null,
    lat: null,
    start_date: "",
    end_date: "",
    price: "",
    max_limit: "",
    event_highlights_title: "",
    event_highlights_description: "",
  });

  const navigate = useNavigate();
  const [currencyList, setCurrencyList] = useState([]);
  const [currency, setCurrency] = useState("");
  const [isLoading, setIsloading] = useState(false);

  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const validateForm = (fieldValues = formData) => {
    const tempErrors = { ...errors };
    console.log("validating field errors" , fieldValues);
    if ("name" in fieldValues)
      tempErrors.name = validateRequiredField(fieldValues.name, "name");
    if ("description" in fieldValues)
      tempErrors.description = validateRequiredField(fieldValues.description, "Description");
    if ("location" in fieldValues)
      tempErrors.location = validateRequiredField(fieldValues.location, "Location");
    if ("start_date" in fieldValues){

      const dateErrors = validateDates(fieldValues.start_date, formData.end_date , "start_date")
          
        tempErrors.start_date = dateErrors?.start_date;
      
        tempErrors.end_date = dateErrors?.end_date;
      
    }
     
    if ("end_date" in fieldValues){

      const dateErrors = validateDates(formData.start_date, fieldValues.end_date , "end_date")
        tempErrors.start_date = dateErrors.start_date;  
        tempErrors.end_date = dateErrors.end_date;
    }
    
    if ("price" in fieldValues)
      tempErrors.price = validateRequiredField(fieldValues.price, "Price");
    if ("max_limit" in fieldValues)
      tempErrors.max_limit = validateRequiredField(fieldValues.max_limit, "Max Limit");
    if ("event_highlights_title" in fieldValues)
      tempErrors.event_highlights_title = validateRequiredField(
        fieldValues.event_highlights_title,
        "Event Highlights Title"
      );
    if ("event_highlights_description" in fieldValues)
      tempErrors.event_highlights_description = validateRequiredField(
        fieldValues.event_highlights_description,
        "Event Highlights Description"
      );



    setErrors({ ...tempErrors });
  };

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return validateRequiredField(value, "name");
      case "description":
        return validateRequiredField(value, "Description");
      case "location":
        return validateRequiredField(value, "Location")
      case "price":
        return validateRequiredField(value, "Price");
      case "max_limit":
        return validateRequiredField(value, "Max Limit");
      case "event_highlights_title":
        return validateRequiredField(value, "Event Highlights Title");
      case "event_highlights_description":
        return validateRequiredField(value, "Event Highlights Description");
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    validateForm({ [name]: value });
  };

  const fetchCurrency = async () => {
    try {
      const res = await axiosInstance.get(`/user/currency/`);
      setCurrencyList(res.data.data.currency);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCurrency();
  }, []);

  useEffect(() => {
    const fetchUserCurrency = async () => {
      try {
        if (currencyList.length > 0) {
          const matchedCurrency = currencyList.find(
            (bt) => bt.default === true
          );
          if (matchedCurrency) {
            setCurrency(matchedCurrency.symbol);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserCurrency();
  }, [currencyList, dispatch]);

  const handleCKEditorChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePlaceSelected = async (place, address) => {
    setFormData({
      ...formData,
      location: address,
      lng: place.lon,
      lat: place.lat,
    });
  };



  const validateAllFields = () => {
    const tempErrors = {};
    for (const key in formData) {

      if(key === "start_date" || key === "end_date"){
        if (key === "start_date"){
          const dateErrors = validateDates(formData[key], formData.end_date , "start_date")         
            if(dateErrors.start_date){
            tempErrors.start_date = dateErrors?.start_date;
            }
            if(dateErrors.end_date){
            tempErrors.end_date = dateErrors?.end_date;
            }
        }
         
        if (key ==="end_date"){

          const dateErrors = validateDates(formData.start_date, formData[key] , "end_date")
          if(dateErrors.start_date){
            tempErrors.start_date = dateErrors?.start_date;
            }
            if(dateErrors.end_date){
            tempErrors.end_date = dateErrors?.end_date;
            }
        }
      }

      const error = validateField(key, formData[key]);
      if (error) tempErrors[key] = error;
    }
    setErrors(tempErrors);
    return tempErrors;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateAllFields();
    
    if (Object.keys(validationErrors).length === 0) {
      setIsloading(true);
      try {
        const res = await axiosInstance.post(`${baseURL}events/`, formData);
        const id = res.data.data.id;
        navigate(`/event/upload/${id}`);
      } catch (err) {
        message.error(err?.response.data?.errors?.non_field_errors[0]);
      } finally {
        setIsloading(false);
      }
    } else {
      message.error("Please Provide the valid information");
    }
  };

  return (
    <Row xs={1} md={2}>
      <Col xs={12} md={12} lg={12} xl={10} xxl={10}>
        <Form onSubmit={handleSubmit} className="card p-2">
          <Row>
            <Col xs={12} xl={4} xxl={4}>
              <Form.Group controlId="formName" className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter event name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} md={6} lg={6} xl={4} xxl={4}>
              <Form.Group controlId="formName" className="mb-3">
                <Form.Label>Maximum limit</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your maximum Capacity"
                  name="max_limit"
                  value={formData.max_limit}
                  onChange={handleChange}
                  isInvalid={!!errors.max_limit}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.max_limit}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} md={6} lg={6} xl={4} xxl={4}>
              <Form.Group controlId="formPrice" className="mb-3">
                <Form.Label>Price</Form.Label>
                <div className="d-flex align-items-center gap-1">
                  <div className="form-control" style={{ width: "4rem" }}>
                    {currency}
                  </div>

                  <Form.Control
                    type="number"
                    placeholder="Enter event price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    isInvalid={!!errors.price}
                  />
                </div>
                  <p className="text-danger " style={{ fontSize: "13px" }}>
                    {errors.price}
                  </p>
              </Form.Group>
            </Col>
            <Col xs={12} md={6} lg={6} xl={4} xxl={4}>
              <Form.Group controlId="formDate" className="mb-3">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="start_date"
                  value={formData.date}
                  onChange={handleChange}
                  isInvalid={!!errors.start_date}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.start_date}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formDate" className="mb-3">
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="end_date"
                  value={formData.date}
                  onChange={handleChange}
                  isInvalid={!!errors.end_date}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.end_date}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} md={6} lg={6} xl={8} xxl={8}>
              <Form.Group controlId="formDescription" className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Enter event description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  isInvalid={!!errors.description}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.description}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={12} lg={6} className="order-last order-lg-first">
              <Form.Group controlId="formEventHighlightsTitle" className="mb-3">
                <Form.Label>Event Highlights Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter event highlights title"
                  name="event_highlights_title"
                  value={formData.event_highlights_title}
                  onChange={handleChange}
                  isInvalid={!!errors.event_highlights_title}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.event_highlights_title}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group
                controlId="formEventHighlightsDescription"
                className="mb-3"
              >
                <Form.Label>Event Highlights Description</Form.Label>
                {/* <CKEditor
                name="eventHighlightsDescription"
                data={formData.eventHighlightsDescription}
                onChange={(event) =>
                  handleCKEditorChange(
                    "eventHighlightsDescription",
                    event.editor.getData()
                  )
                }
              /> */}
                <Form.Control
                  as="textarea"
                  rows={10}
                  placeholder="Enter event highlights description"
                  name="event_highlights_description"
                  value={formData.event_highlights_description}
                  onChange={handleChange}
                  isInvalid={!!errors.event_highlights_description}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.event_highlights_description}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} lg={6}>
              <Form.Group controlId="formLocation" className="mb-3">
                <Form.Label>Location</Form.Label>
                <p className="text-danger fs-6" style={{ fontSize: "12px" }}>{errors.location}</p>
                <MapBoxLocationDisplayAutocomplete
                  onPlaceSelected={handlePlaceSelected}
                  initialLat={formData.lat}
                  initialLng={formData.lng}
                  initialAddress={formData.location}
                />
              </Form.Group>
            </Col>
          </Row>
          <Button variant="primary" type="submit">
            {isLoading && (
              <span
                class="spinner-border spinner-border-sm text-primary"
                role="status"
              ></span>
            )}
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default Eventcreateform;
