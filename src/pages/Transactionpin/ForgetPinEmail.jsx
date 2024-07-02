import React from "react";

import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { forget_password, forget_pin } from "../../redux/api/loginAPI";
import { useDispatch } from "react-redux";
import Forget from "../../images/auth/forget.png";
import { useDebounce } from "../../Hooks/useDebounce";
import { baseURL } from "../../config/config";
import axios from "axios";

export default function ForgetPasswordEmail(props) {
  const { title, subTitle } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

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

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      username: email,
    };
    const res = dispatch(forget_pin(formData));
    if (res) {
      localStorage.setItem("otp_username", email);
      navigate("/forgot/pin/otp");
    }
  };

  return (
    <div className="register-area">
      <div className="container">
        <div className="row g-4 g-lg-5 align-items-center justify-content-between">
          <div className="col-12 col-md-6 col-xl-5">
            <div className="register-card">
              <h2>{title}</h2>
              <p>{subTitle}</p>

              <div className="register-form mt-5">
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
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
                    className="btn btn-warning btn-sm"
                    type="submit"
                    disabled={emailError.trim() !== ""}
                  >
                    Reset Pin
                  </button>
                </Form>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="register-thumbnail mt-5 mt-md-0">
              <img
                src={Forget}
                alt="Forget"
                style={{ width: "60%", height: "auto", margin: "auto" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
