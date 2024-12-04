import { Form, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { otpEmailResend, otpEmailVerify } from "../../redux/api/loginAPI";

const OTPEmailArea = ({ handleback }) => {
  const [timer, setTimer] = useState(5);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isResending, setIsResending] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

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
    try {
      const result = await dispatch(
        otpEmailResend(localStorage.getItem("otp_email"))
      );
      if(result.success){
      message.success("OTP has been sent");
      setIsResending(true);
    }
      else{
        throw new Error(result.message)
      }
    } catch (err) {
      message.error("error sending otp");
    } finally{
      setIsLoading(false)
    }
  }


  const formRef = React.createRef();
  const onFinish = async (values) => {
    setIsLoading(true);
    const result = await dispatch(
      otpEmailVerify(localStorage.getItem("otp_email"), values.code)
    );
    if (result.status === 200) {
      message.success(result.data.message);
      localStorage.removeItem("otp_email");
      navigate("/dashboard");
    } else {
      if (result.success === false) {
        if (result.errors.username) {
          message.warning(result.errors.username[0]);
        } else {
          message.warning(result.message);
        }
      }
    }
    setIsLoading(false);
  };

  const handleBack = () => {
    handleback();
  }

  return (
    // <div className="col-12 col-md-6 col-xl-6">
    <div className="col-12 ">
      <div className="register-card">
        <h5>OTP Verify</h5>
        <p>
          Confirm your otp here. OTP is send to your email address. (please check your spam folder as well) 
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
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input.OTP level={6} style={{ height: "90px" }} />
            </Form.Item>
            <Form.Item>
              <Button  variant="outline" onClick={handleBack}  className="btn btn-sm pull-right">
                Back
              </Button>
              <Button type="submit" disabled={isLoading} className="btn btn-sm pull-right">
                {isLoading && <Spinner variant="danger" animation="border" size="sm" />}  Verify OTP
              </Button>
            </Form.Item>
          </Form>
          <p>The OTP code valid for only 5 minutes.</p>
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
  );
};

export default OTPEmailArea;
