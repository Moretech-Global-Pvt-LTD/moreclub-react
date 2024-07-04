import React from "react";

import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { forget_pin } from "../../redux/api/loginAPI";
import { useDispatch } from "react-redux";
import Forget from "../../images/auth/forget.png";
import { useDebounce } from "../../Hooks/useDebounce";
import { baseURL } from "../../config/config";
import axios from "axios";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import { message } from "antd";

export default function ForgetPinEmail(props) {
  const dispatch = useDispatch();
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
    setLoading(true);
    const formData = {
      email: email,
    };
    const res = await dispatch(forget_pin(formData));
    if (res.data.success) {
      localStorage.setItem("otp_username", email);
      navigate("/forget/pin/otp");
    } else {
      message.error(res.data.errors.non_field_errors[0]);
    }
    setLoading(false);
  };

  return (
    <DashboardLayout title={"Reset Pin"}>
      <div className="register-area">
        <div className="row flex-column-reverse flex-md-row  g-4 g-lg-5 align-items-center justify-content-between">
          <div className="col-12 col-md-6 col-xl-5">
            <div className="register-card">
              <div className="register-form mt-5">
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label className="mb-4">Email address</Form.Label>
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
                    {loading && (
                      <span className="spinner-border spinner-border-sm text-danger"></span>
                    )}
                    Reset Pin
                  </button>
                </Form>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 d-none d-md-block">
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
    </DashboardLayout>
  );
}
