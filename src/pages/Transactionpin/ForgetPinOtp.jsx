import { Form, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forget_pin_otp_verify, otpResend } from "../../redux/api/loginAPI";
import DashboardLayout from "../../components/Layout/DashboardLayout";

const ForgetPinOTP = () => {
  const [timer, setTimer] = useState(120);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isResending, setIsResending] = useState(true);
  const [loading, setLoading] = useState(false);

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
    const result = await dispatch(
      otpResend(localStorage.getItem("otp_username"))
    );
    message.success("OTP has been sent");
    setIsResending(true);
  }

  async function handlebackOTP() {
    localStorage.removeItem("otp_username");
    navigate("/forget/pin");
  }

  const formRef = React.createRef();
  const onFinish = async (values) => {
    setLoading(true);
    const formData = {
      code: values.code,
    };
    const result = await dispatch(forget_pin_otp_verify(formData));
    console.log(result);
    if (result.data.success) {
      localStorage.setItem("pin_otp", values.code);
      message.success(result.data.message);
      localStorage.removeItem("otp_username");
      navigate("/reset/pin/");
    } else {
      if (result.data.success === false) {
        if (result?.data?.message) {
          message.error(result?.data?.message);
        } else {
          message.error(result.data?.errors?.non_field_errors[0]);
        }
      }
    }
    setLoading(false);
  };

  return (
    <DashboardLayout>
      <div className="register-area">
        <div className="row g-4 g-lg-5 align-items-center justify-content-between">
          <div className="col-12 col-md-6 col-xl-7 d-none d-xl-block d-lg-block">
            <div className="register-thumbnail mt-5 mt-md-0">
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
                phone number.(Please check your spam folder if you don't find it
                in inbox)
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
                    <Input.OTP
                      level={6}
                      style={{ height: "100px", width: "300px" }}
                      placeholder="*"
                    />
                  </Form.Item>
                  <Form.Item>
                    <button
                      onClick={handlebackOTP}
                      className="btn btn-sm btn-link"
                    >
                      {"Back"}
                    </button>

                    <Button type="submit" className="btn btn-sm pull-right">
                      {loading && (
                        <span className="spinner-border spinner-border-sm text-danger"></span>
                      )}
                      Verify OTP
                    </Button>
                  </Form.Item>
                </Form>
                <p>The OTP code valid for only 5 minutes.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ForgetPinOTP;
