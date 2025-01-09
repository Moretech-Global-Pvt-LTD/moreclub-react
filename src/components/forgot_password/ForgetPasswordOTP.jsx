import { Form, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  forget_password_otp_verify,
  load_user,
  otpChangePasswordResend,
} from "../../redux/api/loginAPI";
import { setAccessToken, setRefressToken } from "../../utills/token";

const ForgetPasswordOTP = () => {
  const [timer, setTimer] = useState(120);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isResending, setIsResending] = useState(true);
  const [verifying , setVerifying] = useState(false)
  const [loading, setLoading] = useState(false);
  const emailpattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  
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

  // Function to handle resend OTP
  async function handleResendOTP() {
    setLoading(true)
    
    message.success("OTP has been sent");
    setIsResending(true);
    const username = localStorage.getItem("otp_username")
    const formData = {
      username: localStorage.getItem("otp_username"),
      reset_type: emailpattern.test(username) ? "email" : "phone_number"
    }

    try {
      setLoading(true)
      const result = await dispatch(
        otpChangePasswordResend(formData)
      );
      if(result.data.success){
      message.success("OTP has been sent");
      setIsResending(true);
    }
      else{
        throw new Error(result.message)
      }
    } catch (err) {
      message.error("error sending otp");
    } finally{
      setLoading(false)
    }
  }
  const formRef = React.createRef();
  const onFinish = async (values) => {
    setVerifying(true);
    const formData = {
      username: localStorage.getItem("otp_username"),
      code: values.code,
    };
    const result = await dispatch(forget_password_otp_verify(formData));
    if (result.status === 200) {
      setAccessToken(result.data.data.token);
      setRefressToken(result.data.data.refresh_token);
      dispatch(load_user());
      
      message.success(result.data.message);
      navigate("/change-password");
    } else {
      if (result.success === false) {
        if (result.errors.username) {
          message.warning(result.errors.username[0]);
        } else {
          message.warning(result.message);
        }
      }
    }
    setVerifying(false);
  };

  return (
    <div className="d-flex w-100 mt-md-4 mt-lg-0">
      <div className="container">
        <div className="row g-4 g-lg-5 align-items-center justify-content-between">
          <div className="col-12 col-md-6 col-lg-6 col-xl-5 col-xxl-6 d-none d-xl-block d-md-block">
            <div className="register-thumbnail mt-5 mt-md-0 ">
              <img
                src="https://thumbs.dreamstime.com/b/otp-one-time-password-step-authentication-data-protection-internet-security-concept-otp-one-time-password-step-authentication-data-254434939.jpg"
                alt="Register"
                className="otp-image"
              />
            </div>
          </div>
          <div className="col-12 col-md-6 col-xl-6">
            <div className="register-card">
              <h2>OTP Verify</h2>
              <p>
                Confirm your otp here. OTP is send to your registered Email address.
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
                    <Input.OTP
                      level={6}
                      style={{ height: "90px", width: "300px" }}
                      placeholder="*"
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button type="submit" className="btn btn-sm pull-right">
                     {verifying && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>} Verify OTP
                    </Button>
                  </Form.Item>
                </Form>
                <p>The OTP code valid for only 5 minutes.</p>
                <button
                  onClick={handleResendOTP}
                  disabled={isResending}
                  className="btn btn-sm btn-danger"
                >
                  
                  {loading && <span className="spinner-border spinner-border-sm"></span>}{isResending ? loading ? "Resending...":`Wait ${timer} seconds to Resend OTP` : "Resend OTP"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordOTP;
