import React, { useState, useCallback, useEffect } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import debounce from "lodash/debounce";
import { axiosInstance } from "../..";
import { KycTerms, baseURL } from "../../config/config";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const initialFormValues = {
  marital_status: "",
  occupation: "",
  state_province: "",
  city: "",
  street: "",
  postal_code: "",
  alt_contact: "",
  alt_email: "",
  agreed_to_terms: false,
};

const validateField = (name, value) => {
  let errorMsg = "";
  switch (name) {
    case "marital_status":
    case "occupation":
    case "state_province":
    case "city":
    case "street":
    case "postal_code":
      if (!value) {
        errorMsg = "This field is required";
      }
      break;
    case "alt_contact":
      if (!value) {
        errorMsg = "This field is required";
      } else if (!/^\d+$/.test(value)) {
        errorMsg = "Alternate contact number is invalid";
      }
      break;
    case "alt_email":
      if (!value) {
        errorMsg = "This field is required";
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        errorMsg = "Email address is invalid";
      }
      break;
    case "agreed_to_terms":
      if (!value) {
        errorMsg = "You must agree to the terms";
      }
      break;
    default:
      break;
  }
  return errorMsg;
};

const KYCcontent = ({ initialData }) => {
  const user = useSelector((state) => state.userReducer);
  const [values, setValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (initialData) {
      setValues(initialData);
    }
  }, [initialData]);

  const debouncedValidate = useCallback(
    debounce((name, value) => {
      const errorMsg = validateField(name, value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: errorMsg,
      }));
    }, 300),
    []
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setValues({
      ...values,
      [name]: fieldValue,
    });
    debouncedValidate(name, fieldValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = {};
    Object.keys(values).forEach((key) => {
      const errorMsg = validateField(key, values[key]);
      if (errorMsg) {
        formErrors[key] = errorMsg;
      }
    });

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true);
      // Simulate an API call
      const data = JSON.stringify(values, null, 2);
      if (initialData) {
        try {
          const res = await axiosInstance.patch(`${baseURL}kyc/update/`, data);

          setIsSubmitting(false);

          if (user.user.is_verified_user) {
            navigate("/KYC");
          } else {
            navigate("/KYC/document/update");
          }
        } catch (err) {
          message.error(err?.response?.data?.non_field_errors[0]);
          setIsSubmitting(false);
        }
      } else {
        try {
          const res = await axiosInstance.post(`${baseURL}kyc/create/`, data);

          setIsSubmitting(false);
          navigate("/KYC/document/update");
        } catch (err) {
          console.log(err.response.data.non_field_errors[0]);
          message.error(err?.response?.data?.non_field_errors[0]);
          setIsSubmitting(false);
        }
      }
    }
  };

  return (
    <div style={{ maxWidth: "800px" }}>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formMaritalStatus">
              <Form.Label>Marital Status</Form.Label>
              <Form.Control
                as="select"
                name="marital_status"
                value={values.marital_status}
                onChange={handleChange}
                required
              >
                <option value="">Select Maritial Status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="divorced">Divorced</option>
              </Form.Control>

              {errors.marital_status && (
                <p className="text-danger">{errors.marital_status}</p>
              )}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formOccupation">
              <Form.Label>Occupation</Form.Label>
              <Form.Control
                as="select"
                name="occupation"
                value={values.occupation}
                onChange={handleChange}
                required
              >
                <option value="">Select occupation</option>
                <option value="student">student</option>
                <option value="employed">employed</option>
                <option value="self-employed">self-employed</option>
                <option value="unemployed">unemployed</option>
                <option value="retired">retired</option>
              </Form.Control>
              {errors.occupation && (
                <p className="text-danger">{errors.occupation}</p>
              )}
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="formStateProvince">
              <Form.Label>State/Province</Form.Label>
              <Form.Control
                name="state_province"
                value={values.state_province}
                onChange={handleChange}
              />
              {errors.state_province && (
                <p className="text-danger">{errors.state_province}</p>
              )}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                name="city"
                value={values.city}
                onChange={handleChange}
              />
              {errors.city && <p className="text-danger">{errors.city}</p>}
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="formStreet">
          <Form.Label>Street</Form.Label>
          <Form.Control
            name="street"
            value={values.street}
            onChange={handleChange}
          />
          {errors.street && <p className="text-danger">{errors.street}</p>}
        </Form.Group>

        <Form.Group controlId="formPostalCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            name="postal_code"
            value={values.postal_code}
            onChange={handleChange}
          />
          {errors.postal_code && (
            <p className="text-danger">{errors.postal_code}</p>
          )}
        </Form.Group>

        <Form.Group controlId="formAltContact">
          <Form.Label>Alternate Contact</Form.Label>
          <Form.Control
            name="alt_contact"
            value={values.alt_contact}
            onChange={handleChange}
          />
          {errors.alt_contact && (
            <p className="text-danger">{errors.alt_contact}</p>
          )}
        </Form.Group>

        <Form.Group controlId="formAltEmail">
          <Form.Label>Alternate Email</Form.Label>
          <Form.Control
            name="alt_email"
            type="email"
            value={values.alt_email}
            onChange={handleChange}
          />
          {errors.alt_email && (
            <p className="text-danger">{errors.alt_email}</p>
          )}
        </Form.Group>

        <div
          style={{
            width: "300px",
            height: "200px",
            marginTop: "1rem",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <iframe
            src={KycTerms}
            title="Terms and Conditions"
            style={{
              width: "100%",
              height: "100%",
              border: "none",
            }}
          ></iframe>
        </div>

        <Form.Group controlId="formAgreedToTerms">
          <Form.Check
            type="checkbox"
            name="agreed_to_terms"
            label="I agree to the terms and conditions"
            checked={values.agreed_to_terms}
            onChange={handleChange}
          />
          {errors.agreed_to_terms && (
            <p className="text-danger">{errors.agreed_to_terms}</p>
          )}
        </Form.Group>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && (
            <span
              class="spinner-border spinner-border-sm text-danger"
              role="status"
            ></span>
          )}
          {initialData ? "Update" : "Submit"}
        </Button>
      </Form>
    </div>
  );
};

export default KYCcontent;
