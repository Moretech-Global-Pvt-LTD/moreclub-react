import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import Form from "react-bootstrap/Form";
import { useDebounce } from "../../Hooks/useDebounce"; // Adjust the import path as needed

import { imageURL } from "../../config/config";
import {
  update_profile_picture,
  upload_Kyc_document,
} from "../../redux/api/loginAPI";
import { useNavigate } from "react-router-dom";

const IDCardForm = ({ initialData }) => {
  const dispatch = useDispatch();
  const [Idnumber, setIdnumber] = useState(initialData?.document_id ?? "");
  const [Idtype, setIdtype] = useState(initialData?.document_type ?? "");
  const [IDIssueDate, setIDissueDate] = useState(initialData?.issue_date ?? "");
  // const [IDExpiryDate, setIDExpiryDate] = useState("");
  const [IdnumberError, setIdnumberError] = useState("");
  const [IDIssueDateError, setIDissueDateError] = useState("");
  const [IDExpiryDateError, setIDExpiryDateError] = useState("");
  const [inputID, setInputID] = useState("");
  const [inputDisplayID, setInputDisplayID] = useState("");
  const [IDError, setIDError] = useState("");
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const user = useSelector((state) => state.userReducer);
  const [debouncedIdnumber, debouncedIDIssueDate, debouncedIDExpiryDate] =
    useDebounce([Idnumber, IDIssueDate], 500);

  useEffect(() => {
    const validateIdnumber = (number) => {
      if (!number) return "ID number is required.";
      // Add additional ID number validation logic if needed
      return ""; // No error
    };

    const validateIDIssueDate = (date) => {
      if (!date) return "ID issue date is required.";
      // Add additional date validation logic if needed
      return ""; // No error
    };

    const validateIDExpiryDate = (date) => {
      if (!date) return "ID expiry date is required.";
      // Add additional date validation logic if needed
      return ""; // No error
    };

    const validateFields = async () => {
      const idNumberError = validateIdnumber(debouncedIdnumber);
      setIdnumberError(idNumberError);

      const idIssueDateError = validateIDIssueDate(debouncedIDIssueDate);
      setIDissueDateError(idIssueDateError);

      const idExpiryDateError = validateIDExpiryDate(debouncedIDExpiryDate);
      setIDExpiryDateError(idExpiryDateError);
    };

    validateFields();
  }, [debouncedIdnumber, debouncedIDIssueDate, debouncedIDExpiryDate]);

  const handleIDChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setInputDisplayID(URL.createObjectURL(event.target.files[0]));
      setInputID(event.target.files[0]);
      setIDError("");
    } else {
      setIDError("Please upload images only");
    }
  };

  const handleIDSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("document_file", inputID);
    formData.append("document_type", Idtype);
    formData.append("document_id", Idnumber);
    formData.append("issue_date", IDIssueDate);

    const res = await dispatch(upload_Kyc_document(formData));
    if (res) {
      message.success("document Updated Successfully");
      navigate("/KYC");
    } else {
      message.error("Failed to Update ID");
    }
    setIsSubmitting(false);
  };

  return (
    <Form onSubmit={handleIDSubmit}>
      <div className="card-body">
        <Form.Group className="mb-3" controlId="formIdnumber">
          <Form.Label>Document Type</Form.Label>

          <Form.Control
            as="select"
            name="documenttype"
            value={Idtype}
            onChange={(e) => setIdtype(e.target.value)}
            required
          >
            <option value="">Select Document type</option>
            <option value="national_id">National ID</option>
            <option value="passport">Passport</option>
            <option value="driver_license">License</option>
            <option value="pan_no">PAN card</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            {IdnumberError}
          </Form.Control.Feedback>
        </Form.Group>

        <div className="img-wrap text-center">
          {initialData?.document_file ? (
            <img
              src={initialData?.document_file}
              alt=""
              style={{
                width: "200px",
                border: "1px",
                borderColor: "white",
              }}
            />
          ) : (
            <img
              src={inputDisplayID}
              alt=""
              style={{
                width: "200px",
                border: "1px",
                borderColor: "white",
              }}
            />
          )}
        </div>
      </div>

      <Form.Group className="mb-4">
        <Form.Control
          className="bg-transparent"
          id="formFileMultiple"
          type="file"
          accept="image/*"
          onChange={handleIDChange}
          required
        />
        {IDError && <p className="text-danger">{IDError}</p>}
      </Form.Group>

      <div className="row row-cols-1 row-cols-sm-2">
        <Form.Group className="mb-3" controlId="formIdnumber">
          <Form.Label>ID Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter ID number"
            value={Idnumber}
            onChange={(e) => setIdnumber(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            {IdnumberError}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3 col" controlId="formIDIssueDate">
          <Form.Label>ID Issue Date</Form.Label>
          <Form.Control
            type="date"
            value={IDIssueDate}
            onChange={(e) => setIDissueDate(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            {IDIssueDateError}
          </Form.Control.Feedback>
        </Form.Group>

        {/* <Form.Group className="mb-3 col" controlId="formIDExpiryDate">
        <Form.Label>ID Expiry Date</Form.Label>
        <Form.Control
          type="date"
          value={IDExpiryDate}
          onChange={(e) => setIDExpiryDate(e.target.value)}
          
        />
        <Form.Control.Feedback type="invalid">
          {IDExpiryDateError}
        </Form.Control.Feedback>
      </Form.Group> */}
      </div>

      <button
        className="btn btn-primary w-100 rounded-pill"
        type="submit"
        disabled={IDError !== "" || user.user.is_verified_user}
      >
        {isSubmitting && (
          <span
            class="spinner-border spinner-border-sm text-danger"
            role="status"
          ></span>
        )}
        <i className="bi bi-sd-card-fill me-1" />
        Save changes
      </button>
    </Form>
  );
};

export default IDCardForm;
