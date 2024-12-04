import React, { useEffect, useState } from "react";

import { Form, Spinner } from "react-bootstrap";
import { useDebounce } from "../../Hooks/useDebounce";
import { message } from "antd";
import { baseURL } from "../../config/config";
import { axiosInstance } from "../..";
import { validateEmail } from "../../validation/RegistrationValidation";

const OTPEmailAddress = ({ handleNext, errorMessage }) => {
  const [email, setemail] = useState("");
  const [emailError, setemailError] = useState("");
  const debouncedemail = useDebounce(email, 500);
  const [loading, setLoading]= useState(false)

  useEffect(() => {
    if (debouncedemail) {
      setemailError(validateEmail(debouncedemail));
    } else {
      setemailError("");
    }
  }, [debouncedemail, email, ]);



  const handleEmailChange = async (e) => {
    setemail(e.target.value);
    const error = await validateEmail(e.target.value)
    if (error.trim() !== "") {
      setemailError(error);
    } else {
      setemailError("");
    }
  };

  

  async function handleSendOTP() {
    setLoading(true)
    try {
      const res = await axiosInstance.post(`${baseURL}auth/otp/email/verify/`, {
        email:email,
      });
      message.success("OTP has been sent");
      handleNext()
    } catch (err) {
      setemailError(err.response?.data?.message);
    }
    setLoading(false)


  }


  const handleSubmit = (e) => {
    e.preventDefault();
   
    if (email.trim() === "") {
      setemailError("Email is required");
    } else {
      localStorage.setItem("otp_email", `${email}`);
      handleSendOTP()
    }
  };

  return (
 
    <div className="col-12 ">
      <div className="register-card">
        <h5>Email Verify</h5>
        <p>
          Confirm your Email. OTP will be send to your registered email address .
        </p>
        <div className="register-form mt-4">
          <Form.Group className="register-form-container">
            <Form.Label>Email</Form.Label>
            <Form.Control
             type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your registered email"
              className="form-control"
              required
            />
            {emailError && <p className="text-danger">{emailError}</p>}
            
          </Form.Group>
          <button
            className="btn btn-primary mt-4 rounded"
            onClick={handleSubmit}
            disabled={emailError !== "" || email.trim() === ""}
          >
            {loading && <Spinner variant="danger" animation="border" size="sm" /> }  Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPEmailAddress;
