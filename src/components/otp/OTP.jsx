import { Form, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, redirect, useNavigate } from "react-router-dom";
import { otpResend, otpVerify } from "../../redux/api/loginAPI";

const OTPArea = () => {
  const [timer, setTimer] = useState(5);
  const [messageApi, contextHolder] = message.useMessage();
  const key = "updatable";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isResending, setIsResending] = useState(true);

  useEffect(() => {
    let interval;
    if (isResending) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 0) {
            clearInterval(interval);
            setIsResending(false);
            return 120;
          } else {
            return prevTimer - 1;
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isResending]);



  const handleBack=async(e)=>{
    e.preventDefault();
    localStorage.removeItem("otp_username")
    navigate('/register-membership')  
  }




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
    console.log(values);
    const result = await dispatch(
      otpVerify(localStorage.getItem("otp_username"), values.code)
    );
    console.log(result);
    if (result.status === 200) {
      message.success(result.data.message);
      localStorage.removeItem('otp_username');
      redirect("/dashboard");
    } else {
      if (result.success === false) {
        if (result.errors.username) {
          message.warning(result.errors.username[0]);
        } else {
          message.warning(result.message);
        }
      }
    }
  };

  return (
    <div className="register-area">
      <div className="container">
        <div className="row g-4 g-lg-5 align-items-center justify-content-between">
          <div className="col-12 col-md-6 col-xl-7 ">
            <div className="register-thumbnail mt-5 mt-md-0 ">
              <img
                src="https://thumbs.dreamstime.com/b/otp-one-time-password-step-authentication-data-protection-internet-security-concept-otp-one-time-password-step-authentication-data-254434939.jpg"
                alt="Register"
              />
            </div>
          </div>
          <div className="col-12 col-md-6 col-xl-5">
            <div className="register-card">
              <h2>OTP Verify</h2>
              <p>
                Confirm your otp here. OTP is send to your registered email and
                phone number.
              </p>
              
              <div className="register-form mt-4">
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
                    <Input.OTP level={6} style={{ height: "100px" }} />
                  </Form.Item>
                  <Form.Item  className="d-flex gap-2">

                  <Button variant="link" onClick={handleBack}>Back</Button>

                    <Button type="submit" className="btn btn-sm pull-right">
                      Verify OTP
                    </Button>
                  </Form.Item>
                </Form>
                <p>
                
              </p>
                <p>The OTP code valid for only 2 minutes.</p>
                <p>{isResending ? `Resend OTP in ${timer} seconds` : ""}</p>
                <button
                  onClick={handleResendOTP}
                  disabled={isResending}
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
