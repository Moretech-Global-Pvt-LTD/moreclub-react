import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { login } from "../../../redux/api/loginAPI";
import LoginImage from "../../../images/auth/login.png";
import { message } from "antd";
import { Zoom } from "react-awesome-reveal";

import LoginPhoneContent from "./LoginPhoneContent";
import { useCookies } from "react-cookie";
import { useDebounce } from "../../../Hooks/useDebounce";
import { baseURL } from "../../../config/config";
import axios from "axios";

const LoginContent = (props) => {
  const dispatch = useDispatch();
  const { title, subTitle, button } = props;
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShow, setPasswordShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginType, setLoginType] = useState("email");
  const [failedAttempts, setFailedAttempts] = useState(0);
  const maxAttempts = 5;
  const expirationTime = 1 * 60 * 60 * 1000;
  const [cookies, setCookie] = useCookies(["failedAttempts"]);

  const debouncedEmail = useDebounce(email, 1000);

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

  // useEffect(() => {
  //   const storedAttempts = cookies.get('failedAttempts');
  //   if (storedAttempts) {
  //     setFailedAttempts(parseInt(storedAttempts, 10));
  //   }
  // }, []);

  useEffect(() => {
    const storedAttempts = cookies.failedAttempts;
    if (storedAttempts) {
      setFailedAttempts(parseInt(storedAttempts, 10));
    }
  }, [cookies]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const result = await dispatch(login(email, password));
      if (result?.status === 200) {
        setLoading(false);
        redirect("/dashboard");
      } else {
        message.warning(`${5 - failedAttempts - 1} attempt remaining`);
        message.error("invalid credentials");
        setFailedAttempts((prev) => {
          const newAttempts = prev + 1;
          setCookie("failedAttempts", newAttempts, {
            path: "/",
            expires: new Date(Date.now() + expirationTime),
          });
          return newAttempts;
        });
      }
    } catch (err) {
      message.warning(`${5 - failedAttempts - 1} attempt remaining`);
      message.error("invalid credentials");
      setFailedAttempts((prev) => {
        const newAttempts = prev + 1;
        setCookie("failedAttempts", newAttempts, {
          path: "/",
          expires: new Date(Date.now() + expirationTime),
        });
        return newAttempts;
      });
    } finally {
      setLoading(false);
    }
  };

  const togglePassword = () => {
    setPasswordShow(!passwordShow);
  };

  const handleLoginTypeChange = (type) => {
    setLoginType(type);
  };

  return (
    <div className="welcome-area">
      <div className="container">
        <div className="row g-4 g-lg-5 align-items-center justify-content-between ">
          <div className="col-12 col-md-6 col-xl-5 ">
            <div className="register-card">
              <h2>{title}</h2>
              <p>
                {subTitle}
                <Link className="ms-1 hover-primary" to={button[0].path}>
                  {button[0].text}
                </Link>
              </p>
              <p>
                login with
                {loginType === "email" && (
                  <button
                    className={`btn btn-success ms-2 rounded-pill btn-sm ${
                      loginType === "email" ? "block" : "hidden"
                    }`}
                    onClick={() => handleLoginTypeChange("phoneNumber")}
                  >
                    <i className="bi bi-phone"></i>&nbsp;Phone Number
                  </button>
                )}
                {loginType === "phoneNumber" && (
                  <button
                    className={`btn  btn-sm rounded-pill btn-success ms-2 ${
                      loginType === "phoneNumber" ? "block" : "hidden"
                    }`}
                    onClick={() => handleLoginTypeChange("email")}
                  >
                    <i className="bi bi-envelope"></i>&nbsp;Email
                  </button>
                )}
              </p>

              {/* Login Form */}
              <Zoom delay={500}>
                {loginType === "email" && (
                  <div className="register-form mt-5">
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-4">
                        <Form.Control
                          type="email"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        {emailError && (
                          <p className="text-danger">{emailError}</p>
                        )}
                      </Form.Group>

                      <Form.Group className="mb-4 form-group">
                        <label
                          className="label-psswd"
                          onClick={togglePassword}
                          htmlFor="registerPassword"
                        >
                          {" "}
                          {passwordShow ? "Hide" : "Show"}
                        </label>
                        <Form.Control
                          type={passwordShow ? "text" : "password"}
                          id="registerPassword"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </Form.Group>

                      {failedAttempts >= maxAttempts && (
                        <p className="text-danger text-center mt-0 mb-0">
                          You have reached failedAttempts more than 5 times
                        </p>
                      )}

                      <button
                        className="btn btn-success w-100"
                        type="submit"
                        disabled={
                          loading ||
                          failedAttempts >= maxAttempts ||
                          emailError.trim() !== ""
                        }
                      >
                        {loading && (
                          <span className="spinner-border spinner-border-sm text-danger"></span>
                        )}{" "}
                        Log In
                      </button>
                    </Form>

                    <div className="login-meta-data d-flex align-items-center justify-content-between">
                      <Form.Check
                        className="mt-4"
                        type="checkbox"
                        id="keepMeLogin"
                        label="Keep me logged in"
                        defaultChecked
                      />
                      <Link
                        className="forgot-password mt-4 text-primary fz-16"
                        to="/forgot/password/"
                      >
                        Forgot Password?
                      </Link>
                    </div>
                  </div>
                )}
                {loginType === "phoneNumber" && <LoginPhoneContent />}
              </Zoom>
            </div>
          </div>

          <div className="col-12 col-md-6 d-none d-md-block">
            <div className="register-thumbnail mt-5 mt-md-0">
              <img src={LoginImage} alt="Login" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginContent;
