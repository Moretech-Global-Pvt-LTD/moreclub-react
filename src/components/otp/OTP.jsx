import { Form, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { redirect, useNavigate } from "react-router-dom";
import { otpResend, otpVerify } from "../../redux/api/loginAPI";

const OTPArea = () => {
  const [timer, setTimer] = useState(5);
  // const key = "updatable";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isResending, setIsResending] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);

  const nextParam = new URLSearchParams(window.location.search).get("next") ?? "";
  
  
  // navigate(nextUrl.toString());

  useEffect(() => {
    let interval;
    if (isResending) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 0) {
            clearInterval(interval);
            setIsResending(false);
            return 300;
          } else {
            return prevTimer - 1;
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isResending]);

  const handleBack = async (e) => {
    e.preventDefault();
    localStorage.removeItem("otp_username");
    if (nextParam) {
      const targetUrl = `/register-membership?next=${encodeURIComponent(nextParam)}`;
      navigate(targetUrl);
    } else {
      navigate("/register-membership");
    }
  };

  // Function to handle resend OTP
  async function handleResendOTP() {
    const result = await dispatch(
      otpResend(localStorage.getItem("otp_username"))
    );
    message.success("OTP has been sent");
    setIsResending(true);
  }
  const formRef = React.createRef();
  const onFinish = async (values) => {
    setIsVerifying(true);
    const result = await dispatch(
      otpVerify(localStorage.getItem("otp_username"), values.code ,nextParam)
    );
   
    if (result.status === 200) {
      message.success(result.data.message);
      localStorage.removeItem("otp_username");
      if (nextParam) {
        const tokens = result.data.data.callback_url
        const token = tokens;
        const nextUrl = new URL(nextParam, window.location.origin);
        nextUrl.searchParams.append('token', token);
        window.location.href = nextUrl.href;
      } else {
        redirect("/dashboard");
      }
    } else {
      if (result.success === false) {
        if (result.errors.username) {
          message.warning(result.errors.username[0]);
        } else {
          message.warning(result.message);
        }
      }
    }
    setIsVerifying(false)
  };

  return (
    <div className="d-flex w-100 mt-md-4 mt-lg-0">
      <div className="container ">
        <div className="row g-4  g-lg-5 align-items-center justify-content-between ">
          <div className="col-12 col-md-6 col-lg-6 col-xl-5 col-xxl-6 d-none d-xl-block d-md-block">
            <div className="register-thumbnail mt-5 mt-md-0 ">
              <img
                src="https://thumbs.dreamstime.com/b/otp-one-time-password-step-authentication-data-protection-internet-security-concept-otp-one-time-password-step-authentication-data-254434939.jpg"
                alt="Register"
                className="otp-image"
              />
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-6 col-xl-7 col-xxl-6">
            <div className="register-card">
              <h2>OTP Verify</h2>
              <p>
                Confirm your otp here. Check your Phone number or your Email address for the OTP.
              </p>
              <div className="register-form mt-2">
                <Form
                  ref={formRef}
                  name="verify-form"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                >
                  <Form.Item
                    name="code"
                    rules={[
                      { required: true, message: "Please input your name!" },
                    ]}
                  >
                    <Input.OTP level={6} style={{ height: "90px" }} />
                  </Form.Item>
                  <Form.Item className="d-flex gap-2">
                    <Button variant="link" onClick={handleBack}>
                      Back
                    </Button>

                    <Button type="submit" className="btn btn-sm pull-right">
                      {isVerifying && <span className="spinner-border spinner-border-sm"></span>}Verify OTP
                    </Button>
                  </Form.Item>
                </Form>
                <p></p>
                <p>The OTP code valid for only 5 minutes.</p>
                <p>{isResending ? `Resend OTP in ${timer} seconds` : ""}</p>
                <button
                  onClick={handleResendOTP}
                  // disabled={isResending}
                  className="btn btn-sm btn-danger"
                >
                  {isResending ? "Resending..." : "Resend OTP"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPArea;
