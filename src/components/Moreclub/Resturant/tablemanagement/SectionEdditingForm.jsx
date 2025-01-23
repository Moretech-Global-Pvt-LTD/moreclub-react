import { message } from "antd";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { validateRequiredField } from "../../../../validation/resturantValidation";

const SectionEditingform = ({ onSubmit, onCancel , initialValues}) => {
  const [section, setSection] = useState({
    id: initialValues.id,
    name: initialValues.name ?? "",
    code: initialValues.code ?? "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = (fieldValues = section) => {
    const tempErrors = { ...errors };
    if ("name" in fieldValues)
      tempErrors.name = validateRequiredField(fieldValues.name, "name");
    if ("code" in fieldValues)
      tempErrors.code = validateRequiredField(fieldValues.code, "Code");
    setErrors({ ...tempErrors });
  };

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return validateRequiredField(value, "name");
      case "code":
        return validateRequiredField(value, "code");
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSection((prevValues) => ({
      ...prevValues,
      [name]: type === "checkbox" ? checked : value,
    }));
    validateForm({ [name]: type === "checkbox" ? checked : value });
  };

  const validateAllFields = () => {
    const tempErrors = {};
    for (const key in section) {
      const error = validateField(key, section[key]);
      if (error) tempErrors[key] = error;
    }

    setErrors(tempErrors);
    return tempErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateAllFields();
    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        const res = await onSubmit(section);
        if (res.data.success) {
          message.success("Section added successfully");
          setSection({ name: "", code: "" });
          onCancel();
        } else {
          throw new Error("Failed to submit form");
        }
      } catch (error) {
        console.error("There was an error submitting the form:", error);
        message.error("Error adding Section");
      } finally {
        setLoading(false);
      }
    } else {
      message.error("All fields are required.");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formSectionName">
        <Form.Label>Section Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Section Name Eg: Ground Floor"
          name="name"
          value={section.name}
          onChange={handleChange}
          isInvalid={!!errors.name}
        />
        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formSectionCode">
        <Form.Label>Section Code</Form.Label>
        <Form.Control
          type="text"
          placeholder="Section Code Eg: GF"
          name="code"
          value={section.code}
          onChange={handleChange}
          isInvalid={!!errors.code}
        />
        <Form.Control.Feedback type="invalid">{errors.code}</Form.Control.Feedback>
      </Form.Group>
      <div className="d-flex justify-content-end gap-2">
        <Button className="btn btn-secondary" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button className="btn btn-primary" type="submit" disabled={loading}>
          {loading && <span className="spinner-border spinner-border-sm"></span>}
          Update
        </Button>
      </div>
    </Form>
  );
};

export default SectionEditingform;


