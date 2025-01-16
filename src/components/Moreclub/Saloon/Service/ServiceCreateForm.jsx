import React, { useState } from "react";
import { Form, Button, Row } from "react-bootstrap";
import { useQueryClient } from "@tanstack/react-query";
import { moresalonAuthenticatedAxios } from "../../../../utills/axios/moresalonaxios";

const ServiceForm = ({ id, onFinish, onCancel, initialValues = {} }) => {
  const [formData, setFormData] = useState({
    name: initialValues.name || "",
    image: null,
    imageURL: initialValues.icon || "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const queryClient = useQueryClient();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files[0]) {
      setFormData({
        ...formData,
        image: files[0],
        imageURL: URL.createObjectURL(files[0]),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    if (!formData.name.trim() || (!formData.image && !initialValues.id)) {
      setErrorMessage("Both service name and image are required for creation.");
      setLoading(false);
      return;
    }

    if (
      initialValues.id &&
      formData.name === initialValues.name &&
      !formData.image
    ) {
      setErrorMessage("You haven’t updated any fields.");
      setLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      if (formData.image) formDataToSend.append("icon", formData.image);
      const endpoint = initialValues.id
        ? `moreclub/users/saloons/${id}/services/${initialValues.id}/`
        : `moreclub/users/saloons/${id}/services/`;
      const method = initialValues.id ? "patch" : "post";

      await moresalonAuthenticatedAxios[method](endpoint, formDataToSend ,{
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });

      queryClient.invalidateQueries({ queryKey: [`Saloon service List ${id}`] });
      onFinish();
    } catch (error) {
      console.error("Error submitting the service form:", error);
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3">
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      <Form onSubmit={handleSubmit}>
        <Row className="gy-3">
          <Form.Group controlId="formServiceName">
            <Form.Label>Service Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Service name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formServiceImage">
            <Form.Label>Service Image</Form.Label>
            <div
              className="mx-3 my-3 d-flex align-items-center justify-content-center"
              style={{
                height: "8rem",
                border: "1px solid #6c757e",
                borderRadius: "0.25rem",
              }}
            >
              {formData.imageURL ? (
                <img
                  src={formData.imageURL}
                  alt="Service"
                  style={{ height: "7rem", width: "auto" }}
                />
              ) : (
                <p className="text-center m-0">No image selected</p>
              )}
            </div>
            <Form.Control
              type="file"
              name="image"
              onChange={handleChange}
              className="mt-2"
            />
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={onCancel} disabled={loading}>
              Cancel
            </Button>
            <Button
              variant="success"
              type="submit"
              disabled={loading || (!formData.name.trim() && !formData.image)}
            >
              {loading && (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              )}
              &nbsp; {initialValues.id ? "Update Service" : "Add Service"}
            </Button>
          </div>
        </Row>
      </Form>
    </div>
  );
};

export default ServiceForm;
