import React, { useEffect } from "react";
import { Form } from "react-bootstrap";
import { forget_password } from "../../redux/api/loginAPI";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDebounce } from "../../Hooks/useDebounce";
import axios from "axios";
import { baseURL } from "../../config/config";
import { message } from "antd";

const ForgetPasswordEmail = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);

  const debouncedEmail = useDebounce(email, 500);

  const validateEmail = async (email) => {
    const emailpattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailpattern.test(email)) {
      return "Invalid email";
    }
    try {
      const res = await axios.post(`${baseURL}auth/check/username/`, {
        username: `${email}`,
      });
      if (res.status === 200) {
        return "Username not found";
      }
    } catch (error) {
      if (error.response.data?.errors?.username[0] === "Already Exists") {
        return ""; // No error
      } else {
        return error.response.data?.errors?.username[0];
      }
    }
    return "";
  };

  useEffect(() => {
    const validateAndCheckPhone = async () => {
      if (debouncedEmail) {
        const error = await validateEmail(debouncedEmail);
        setEmailError(error);
      } else {
        setEmailError("");
      }
    };
    validateAndCheckPhone();
  }, [debouncedEmail]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      username: email,
      reset_type: "email",
    };

    try{
        setLoading(true);
        const res = await axios.post(`${baseURL}auth/password/reset/`, formData);
    
        if(res.data.success){
            localStorage.setItem("otp_username", email);
            navigate("/forgot/password/otp");
        }
      } catch (error) {
        message.error(error.response.data.message || "Request failed");
      }finally{
        setLoading(false);
      }


   
  };
  return (
    <div className="register-form ">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-4">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email to reset password"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {emailError && <p className="text-danger">{emailError}</p>}
        </Form.Group>
        <button
          className="btn btn-warning btn-sm mt-4"
          type="submit"
          disabled={emailError.trim() !== ""}
        >
          {loading && <span className="spinner-border spinner-border-sm"></span>}Reset Password
        </button>
      </Form>
    </div>
  );
};

export default ForgetPasswordEmail;
