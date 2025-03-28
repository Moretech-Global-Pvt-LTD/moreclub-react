import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { message } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { moresalonAuthenticatedAxios } from "../../../../utills/axios/moresalonaxios";

const ServiceVariationUpdateForm = ({
  ser_id,
  sal_id,
  data,
  onFinish,
  onCancel,
}) => {
  const queryClient = useQueryClient();

  const [serviceVariation, setServiceVariation] = useState({
    name: data.name,
    price: data.price,
    discount_price: data.discount_price || "",
    description: data.description,
    duration: data.duration.split(":").slice(0, 2).join(":"),
    image: null,
  });
  const [imagePreviews, setImagePreviews] = useState(data.images && data.images[0] && data.images[0].image);
  const [loading, setLoading] = useState(false);

  const [offerError, setOfferError] = useState("");
  const [durationError, setDurationError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "discount_price") {
      if (value === "" || parseFloat(value) < parseFloat(serviceVariation.price)) {
        setServiceVariation((prev) => ({ ...prev, [name]: value }));
        setOfferError("");
      } else {
        setOfferError("Discount price must be less than the original price.");
      }
    } else {
      setServiceVariation((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    const files = e.target.files[0];
    const newPreviews =  URL.createObjectURL(files);

    setServiceVariation((prev) => ({
      ...prev,
      image: files,
    }));
    setImagePreviews(newPreviews);
  };

  

  const handleDurationChange = async (e) => {
    let { value } = e.target;

    // Remove any non-numeric characters except for ":"
    value = value.replace(/[^\d]/g, "");

    // Automatically add colon for HH:MM format
    if (value.length > 2) {
      value = value.slice(0, 2) + ":" + value.slice(2);
    }

    // Restrict input to 5 characters in total (HH:MM)
    if (value.length > 5) {
      return; // Stop accepting input if exceeds HH:MM format
    }

    // Set valid input
    setServiceVariation({ ...serviceVariation, duration: value });
    setDurationError(""); // Reset error on valid input
  };



const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);


    const datas = {
      ...(data.name !== serviceVariation.name && { name: serviceVariation.name}),
      ...(data.price !== serviceVariation.price && { price: serviceVariation.price}),
      ...(data.discount_price !== serviceVariation.offerPrice && { discount_price: serviceVariation.offerPrice ?? null}),
      ...(data.description !== serviceVariation.description && { description: serviceVariation.description}),      
      duration: `${serviceVariation.duration}:00`,      
      ...(serviceVariation.image  && { image: serviceVariation.image }),
    };

    moresalonAuthenticatedAxios
      .patch(
        `moreclub/users/saloons/${sal_id}/services/${ser_id}/variations/${data.id}/`,
        datas,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        message.success("Service Variation updated Successfully");
        
        setServiceVariation({
          name: response.data.data.name,
          price: response.data.data.price,
          discount_price: response.data.data.discount_price,
          description: response.data.data.description,
          duration: response.data.data.duration,
          image: null,
        });
        setImagePreviews(response.data.data.images[0].image);
         queryClient.invalidateQueries({
            queryKey: [`Saloon variation List ${sal_id} ${ser_id}`],
          });
        onFinish();
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the updated variation!",
          error
        );
        message.error("error updating service variation");

        // message.success("Service Variation Added Successfully");
        // queryClient.invalidateQueries({
        //     queryKey: [`Saloon variation List ${sal_id} ${ser_id}`],
        //   });
        // onFinish();
      })
      .finally(() => {
        setLoading(false);
      });
  };  

const isSubmitDisabled =
    loading ||
    !serviceVariation.name.trim() ||
    !serviceVariation.price.trim() ||
    !serviceVariation.description.trim() ||
    durationError ||
    offerError;

  return (
    <div className="p-3">
      <Form onSubmit={handleSubmit}>
        <Row xs={1} sm={2}>
          <Col>
            <Form.Group controlId="formItemName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={serviceVariation.name}
                onChange={handleChange}
                placeholder="Enter name"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formItemDuration">
              <Form.Label>Duration</Form.Label>
              <Form.Control
                type="text"
                name="duration"
                value={serviceVariation.duration}
                onChange={handleDurationChange}
                placeholder="HH:MM"
              />
              {durationError && (
                <p className="text-danger" style={{ fontSize: "11px" }}>
                  {durationError}
                </p>
              )}
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formItemPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                name="price"
                value={serviceVariation.price}
                onChange={handleChange}
                placeholder="Enter price"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formItemDiscountPrice">
              <Form.Label>Discount Price (optional)</Form.Label>
              <Form.Control
                type="text"
                name="discount_price"
                value={serviceVariation.discount_price}
                onChange={handleChange}
                placeholder="Enter discount price"
              />
              {offerError && (
                <p className="text-danger" style={{ fontSize: "11px" }}>
                  {offerError}
                </p>
              )}
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="my-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={serviceVariation.description}
            onChange={handleChange}
            placeholder="Enter description"
          />
        </Form.Group>
        <Form.Group className="my-3">
          <Form.Label>Images</Form.Label>
          <div className="d-flex flex-wrap">
            {/* {serverImage.map((img) => (
              <div key={img.id} className="m-2">
                <img
                  src={img.image}
                  alt="server"
                  style={{ width: "5rem", height: "5rem" }}
                /> */}
                {/* <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleRemoveServerImage(img.id)}
                >
                  &times;
                </Button> */}
              {/* </div> */}
            {/* ))} */}
            {imagePreviews && (
              <div className="m-2">
                <img
                  src={imagePreviews}
                  alt="preview"
                  style={{ width: "5rem", height: "5rem" }}
                />
                {/* <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleRemoveImage(index)}
                >
                  &times;
                </Button> */}
              </div>
            )}
          </div>
          <Form.Control type="file"  onChange={handleImageChange} />
        </Form.Group>
        <div className="d-flex justify-content-end gap-2">
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="success" type="submit" disabled={isSubmitDisabled}>
            {loading && (
              <span
                className="spinner-border spinner-border-sm text-warning"
                role="status"
              ></span>
            )}
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ServiceVariationUpdateForm;
