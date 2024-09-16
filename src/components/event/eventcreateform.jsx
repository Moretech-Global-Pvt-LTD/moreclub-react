import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { axiosInstance } from "../..";
import { baseURL } from "../../config/config";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useDispatch } from "react-redux";
import MapBoxLocationDisplayAutocomplete from "../Googlemap/MapLocationInput";
// import CKEditor from "ckeditor4-react";

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

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
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
                  placeholder="Enter your maximum Capacity"
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

              <Form.Group controlId="formDate" className="mb-3">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="start_date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formDate" className="mb-3">
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="end_date"
                  value={formData.date}
                  onChange={handleChange}
                />
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
                {/* <LocationDisplayWithAutocomplete
                  onPlaceSelected={handlePlaceSelected}
                  initialLat={formData.lat}
                  initialLng={formData.lng}
                  initialAddress={formData.location}
                /> */}

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
