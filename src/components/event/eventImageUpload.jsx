import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import { Button, Form, Placeholder } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { baseURL, imageURL } from "../../config/config";
import { axiosInstance } from "../..";
import { message } from "antd";

import Divider from "../divider/Divider";
import { useQuery } from "@tanstack/react-query";

const EventImageUpload = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: eventId,
    images: [],
  });
  const [serverimages, setServerImage] = useState([{}]);

  const [imagePreviews, setImagePreviews] = useState([]);
  const [Loading, setLoading] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["images", eventId],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `${baseURL}events/event-photos/${eventId}/`
      );
      return res.data.data;
    },
  });

  useEffect(() => {
    if (data) {
      setServerImage(data);
    }
  }, [data]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <Placeholder as="p" animation="glow" className="rounded">
          <Placeholder xs={12} style={{ height: "4rem" }} />
        </Placeholder>
        <Placeholder as="p" animation="glow" className="rounded">
          <Placeholder xs={12} style={{ height: "4rem" }} />
        </Placeholder>

        <Divider />
      </DashboardLayout>
    );
  }

  if (isError) {
    return (
      <DashboardLayout className="text-dynamic-white">
        <Divider />
        <h6 className="text-dynamic-white text-center">Error: reteriving</h6>
        <Divider />
      </DashboardLayout>
    );
  }

  const handleImageChange = (e, index = null) => {
    const files = Array.from(e.target.files);
    let updatedImages = [...formData.images];
    let updatedPreviews = [...imagePreviews];

    if (index !== null) {
      // Updating a specific image
      updatedImages[index] = files[0];
      updatedPreviews[index] = URL.createObjectURL(files[0]);
    } else {
      // Adding new images
      updatedImages = updatedImages.concat(files);
      updatedPreviews = updatedPreviews.concat(
        files.map((file) => URL.createObjectURL(file))
      );
    }

    setFormData({
      ...formData,
      images: updatedImages,
    });
    setImagePreviews(updatedPreviews);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);

    setFormData({
      ...formData,
      images: updatedImages,
    });
    setImagePreviews(updatedPreviews);
  };

  const handleRemoveImageurl = async (id) => {
    try {
      const image = serverimages.filter((image) => image.id !== id);
      await axiosInstance.delete(
        `${baseURL}events/event-photos/${eventId}/${id}/delete/`
      );
      // Remove the image from local state
      setServerImage((prevImages) =>
        prevImages.filter((image) => image.id !== id)
      );
    } catch (error) {
      console.error("Error removing image from server:", error);
    }
  };

  const renderPreview = (image, index, isServerImage = false) => {
    if (isServerImage) {
      return (
        <>
          <img
            src={`${imageURL}${image}`}
            alt={`Preview ${index}`}
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
              marginRight: "10px",
            }}
          />
          <Button variant="danger" onClick={() => handleRemoveImageurl(index)}>
            &times;
          </Button>
        </>
      );
    } else {
      return (
        <>
          <img
            src={URL.createObjectURL(image)}
            alt={`Preview ${index}`}
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
              marginRight: "10px",
            }}
          />
          <Button variant="danger" onClick={() => handleRemoveImage(index)}>
            &times;
          </Button>
        </>
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    setLoading(true);

    try {
      const res = await axiosInstance.post(
        `${baseURL}events/event-photos/${eventId}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("res", res);
      message.success("Event created successfully");
      navigate(`/business-events/`);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout title={"Upload Images"}>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formImages" className="mb-3">
          <Form.Label>Images</Form.Label>
          <div className="mb-3">
            {serverimages.map((items) => (
              <div
                key={items.id}
                style={{
                  display: "inline-block",
                  position: "relative",
                  marginRight: "10px",
                }}
              >
                {renderPreview(items.image, items.id, true)}
              </div>
            ))}
            {formData.images.map((image, index) => (
              <div
                key={index}
                style={{
                  display: "inline-block",
                  position: "relative",
                  marginRight: "10px",
                }}
              >
                {renderPreview(image, index)}
              </div>
            ))}
          </div>
          <Form.Control
            type="file"
            multiple
            onChange={(e) => handleImageChange(e)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {isLoading && (
            <span
              class="spinner-border spinner-border-sm text-primary"
              role="status"
            ></span>
          )}
          Upload Images
        </Button>
      </Form>
    </DashboardLayout>
  );
};

export default EventImageUpload;
