import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { axiosInstance } from "../..";
import { message } from "antd";
import { baseURL } from "../../config/config";
import MapBoxLocationDisplayAutocomplete from "../Googlemap/MapLocationInput";

// import CKEditor from 'ckeditor4-react';

const UpdateEventForm = ({ existingEventData, id }) => {
  const [currencyList, setCurrencyList] = useState([]);
  const [currency, setCurrency] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    lng: null,
    lnt: null,
    start_date: "",
    end_date: "",
    price: "",
    max_limit: "",
    event_highlights_title: "",
    event_highlights_description: "",
  });

  useEffect(() => {
    if (existingEventData) {
      setFormData({
        name:existingEventData.name,
        description:existingEventData.description,
        location:existingEventData.location,
        lat:parseFloat(existingEventData.lat),
        lng:parseFloat(existingEventData.lng),
        start_date:existingEventData.start_date,
        end_date:existingEventData.end_date,
        images:existingEventData.images,
        max_limit:existingEventData.limit,
        price: existingEventData.price,
        event_highlights_title: existingEventData.event_highlights_title,
        event_highlights_description:existingEventData.event_highlights_description,
      });
    }
  }, [existingEventData]);

  const fetchCurrency = async () => {
    try {
      const res = await axiosInstance.get(`/user/currency/`);
      setCurrencyList(res.data.data.currency);
      console.log("user currencies", res.data.data.currency);
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
            console.log("matched symbol", matchedCurrency.symbol);
            setCurrency(matchedCurrency.symbol);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserCurrency();
  }, [currencyList]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePlaceSelected = async (place, address) => {
   console.log("place", place, address);
    setFormData({
      ...formData,
      location: address,
      lng: place.lon,
      lat: place.lat,
    });
  };

  const handleCKEditorChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    if (
      formData.name !== existingEventData.name ||
      formData.description !== existingEventData.description ||
      formData.start_date !== existingEventData.start_date ||
      formData.end_date !== existingEventData.end_date ||
      formData.location !== existingEventData.location ||
      formData.lng !== existingEventData.lng ||
      formData.lat !== existingEventData.lat ||
      formData.price !== existingEventData.price ||
      formData.event_highlights_title !==
        existingEventData.event_highlights_title ||
      formData.event_highlights_description !==
        existingEventData.event_highlights_description
    ) {
      try {
        const res = await axiosInstance.put(
          `${baseURL}events/${id}/update`,
          formData
        );
        message.success("Event detail Updated successfully");
      } catch (err) {
        message.error(err?.response.data?.errors?.non_field_errors[0]);
      }
    } else {
      message.warning("You have not update anything");
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
                />
              </Form.Group>

            </Col>
            <Col xs={12} md={6} lg={6} xl={4} xxl={4}>

              <Form.Group controlId="formName" className="mb-3">
                <Form.Label>Maximum limit</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter event name"
                  name="max_limit"
                  value={formData.max_limit}
                  onChange={handleChange}
                />
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
                  />
                </div>
              </Form.Group>
            </Col>
            <Col xs={12} md={6} lg={6} xl={4} xxl={4}>

              <Col >
                <Form.Group controlId="formDate" className="mb-3">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    name="start_date"
                    value={formData.start_date}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col >
                <Form.Group controlId="formDate" className="mb-3">
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    name="end_date"
                    value={formData.end_date}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              
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
                />
              </Form.Group>

            </Col>
          </Row>
          <Row >
            <Col xs={12} lg={6} className="order-last order-lg-first">
              <Form.Group controlId="formEventHighlightsTitle" className="mb-3">
                <Form.Label>Event Highlights Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter event highlights title"
                  name="event_highlights_title"
                  value={formData.event_highlights_title}
                  onChange={handleChange}
                />
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
                />
              </Form.Group>

            </Col>
            <Col xs={12} lg={6}>
              <Form.Group controlId="formLocation" className="mb-3">
                <Form.Label>Location</Form.Label>
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
              Update Event
            </Button>
          </Form>
        </Col>
      </Row>
 
  );
};

export default UpdateEventForm;
