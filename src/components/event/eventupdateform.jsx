import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { axiosInstance } from "../..";
import { message } from "antd";
import { baseURL } from "../../config/config";
import LocationDisplayWithAutocomplete from "../Googlemap/LocationInput";
// import CKEditor from 'ckeditor4-react';

const UpdateEventForm = ({ existingEventData, id }) => {
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
        name: existingEventData.name,
        description: existingEventData.description,
        location: existingEventData.location,
        lat: parseFloat(existingEventData.lat),
        lng: parseFloat(existingEventData.lng),
        start_date: existingEventData.start_date,
        end_date: existingEventData.end_date,
        images: existingEventData.images,
        max_limit: existingEventData.limit,
        price: existingEventData.price,
        event_highlights_title: existingEventData.event_highlights_title,
        event_highlights_description:
          existingEventData.event_highlights_description,
      });
    }
  }, [existingEventData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePlaceSelected = async (place, address) => {
    setFormData({
      ...formData,
      location: address,
      lng: place.lng,
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

  // const renderPreview = (image, index) => {
  //   if (typeof image === 'string') {
  //     return (
  //       <>
  //         <img
  //           src={image}
  //           alt={`Preview ${index}`}
  //           style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '10px' }}
  //         />
  //          <Button variant="danger" onClick={() => handleRemoveImage(index)}>&times;</Button>

  //       </>
  //     );
  //   } else {
  //     return (
  //       <>
  //         <img
  //           src={URL.createObjectURL(image)}
  //           alt={`Preview ${index}`}
  //           style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '10px' }}
  //         />
  //          <Button variant="danger" onClick={() => handleRemoveImage(index)}>&times;</Button>

  //       </>
  //     );
  //   }
  // };
  console.log(formData.start_date);

  return (
    <Card className="p-2" style={{ maxWidth: "600px" }}>
      <Row className="justify-content-md-center">
        <Col>
          <Form onSubmit={handleSubmit}>
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

            <Form.Group controlId="formDescription" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter event description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
              {/* <CKEditor
                name="description"
                data={formData.description}
                onChange={(event) => handleCKEditorChange('description', event.editor.getData())}
              /> */}
            </Form.Group>

            <Form.Group controlId="formLocation" className="mb-3">
              <Form.Label>Location</Form.Label>
              <LocationDisplayWithAutocomplete
                onPlaceSelected={handlePlaceSelected}
                initialLat={formData.lat}
                initialLng={formData.lng}
                initialAddress={formData.location}
              />
            </Form.Group>

            {/* <Row>
              <Col md={6}>
                <Form.Group controlId="formDate" className="mb-3">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    name="start_date"
                    value={formData.date}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formTime" className="mb-3">
                  <Form.Label>Start Time</Form.Label>
                  <Form.Control
                    type="time"
                    name="start_time"
                    value={formData.time}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row> */}

            <Row>
              <Col md={6}>
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
              <Col md={6}>
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
            </Row>

            {/* <Form.Group controlId="formImages" className="mb-3">
              <Form.Label>Images</Form.Label>
              <div className="mb-3">
                {formData.images.map((image, index) => (
                  <div key={index} style={{ display: 'inline-block', position: 'relative', marginRight: '10px' }}>
                    {renderPreview(image, index)}
                  </div>
                ))}
              </div>
              <Form.Control
                type="file"
                multiple
                onChange={(e) => handleImageChange(e)}
              />
            </Form.Group> */}

            <Form.Group controlId="formPrice" className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter event price"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Maximum limit</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter event name"
                name="max_limit"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>

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
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter event highlights description"
                name="event_highlights_description"
                value={formData.event_highlights_description}
                onChange={handleChange}
              />
              {/* <CKEditor
                name="eventHighlightsDescription"
                data={formData.eventHighlightsDescription}
                onChange={(event) => handleCKEditorChange('eventHighlightsDescription', event.editor.getData())}
              /> */}
            </Form.Group>

            <Button variant="primary" type="submit">
              Update Event
            </Button>
          </Form>
        </Col>
      </Row>
    </Card>
  );
};

export default UpdateEventForm;
