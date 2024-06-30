import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { message } from "antd";
import Form from "react-bootstrap/Form";
import { useDebounce } from "../../Hooks/useDebounce"; // Adjust the import path as needed
import { update_profile_picture } from "../../redux/api/loginAPI";
import { imageURL } from "../../config/config";


const PANForm = ({user}) => {
  const dispatch = useDispatch();
  const [PANnumber, setPANnumber] = useState("");
  const [PANIssueDate, setPANIssueDate] = useState("");
  const [PANnumberError, setPANnumberError] = useState("");
  const [PANIssueDateError, setPANIssueDateError] = useState("");
  const [inputPAN, setInputPAN] = useState(null);
  const [inputDisplayPAN, setInputDisplayPAN] = useState(`${imageURL}${user.user.user_profile.display_picture}`);
  const [PANError, setPANError] = useState("");

  const [debouncedPANnumber, debouncedPANIssueDate] = useDebounce(
    [PANnumber, PANIssueDate],
    500
  );

  useEffect(() => {
    const validatePANnumber = (number) => {
      if (!number) return "PAN number is required.";
      const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
      if (!panRegex.test(number)) return "Invalid PAN number format.";
      return ""; // No error
    };

    const validatePANIssueDate = (date) => {
      if (!date) return "PAN issue date is required.";
      // Add additional date validation logic if needed
      return ""; // No error
    };

    const validateFields = async () => {
      const panNumberError = validatePANnumber(debouncedPANnumber);
      setPANnumberError(panNumberError);

      const panIssueDateError = validatePANIssueDate(debouncedPANIssueDate);
      setPANIssueDateError(panIssueDateError);
    };

    validateFields();
  }, [debouncedPANnumber, debouncedPANIssueDate]);

  const handlePANnumberChange = (event) => {
    setPANnumber(event.target.value);
  };

  const handlePANIssueDateChange = (event) => {
    setPANIssueDate(event.target.value);
  };

  const PANChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setInputDisplayPAN(URL.createObjectURL(event.target.files[0]));
      setInputPAN(event.target.files[0]);
      setPANError("");
    } else {
      setPANError("Please upload images only");
    }
  };

  const handlePANSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("display_picture", inputPAN);

    const res = await dispatch(update_profile_picture(formData));
    if (res) {
      message.success("PAN Updated Successfully");
    } else {
      message.error("Failed to Update PAN");
    }
  };

  return (
    <Form onSubmit={handlePANSubmit}>
      <div className="card-body">
        <div className="img-wrap text-center">
          <img
            src={inputDisplayPAN}
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

      <Form.Group className="mb-4">
        <Form.Control
          className="bg-transparent"
          id="formFileMultiple"
          type="file"
          accept="image/*"
          onChange={PANChange}
          required
        />
        {PANError && (
          <p className="text-danger">{PANError}</p>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPANnumber">
        <Form.Label>PAN Number</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter PAN number"
          value={PANnumber}
          onChange={handlePANnumberChange}
          disabled
        />
        <Form.Control.Feedback type="invalid">
          {PANnumberError}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPANIssueDate">
        <Form.Label>PAN Issue Date</Form.Label>
        <Form.Control
          type="date"
          value={PANIssueDate}
          onChange={handlePANIssueDateChange}
        />
        <Form.Control.Feedback type="invalid">
          {PANIssueDateError}
        </Form.Control.Feedback>
      </Form.Group>

      <button
        className="btn btn-primary w-100 rounded-pill"
        type="submit"
        disabled={PANError !== ""}
      >
        <i className="bi bi-sd-card-fill me-1" />
        Save changes
      </button>
    </Form>
  );
};

export default PANForm;
