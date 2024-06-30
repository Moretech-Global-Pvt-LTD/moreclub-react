import { Form, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, redirect, useNavigate } from "react-router-dom";
import { otpPhoneResend, otpPhoneVerify, otpResend, otpVerify } from "../../redux/api/loginAPI";

const OTPPhoneArea = () => {
    const [timer, setTimer] = useState(5);
    const [messageApi, contextHolder] = message.useMessage();
    const key = 'updatable';
    const dispatch = useDispatch();
    const navigate = useNavigate();
  const [isResending, setIsResending] = useState(true);

    useEffect(() => {
        let interval;
        if (isResending) {
          interval = setInterval(() => {
            setTimer(prevTimer => {
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
    
      // Function to handle resend OTP
      async function handleResendOTP() {
        try{
          const result = await dispatch(otpPhoneResend(localStorage.getItem('otp_phonenumber'),));
          message.success('OTP has been sent');
          setIsResending(true);
        }catch(err){
          message.error("error sending otp")
        }
      }
    const formRef = React.createRef();
    const onFinish = async values => {
        const result = await dispatch(otpPhoneVerify(localStorage.getItem('otp_phonenumber'), values.code));
        if(result.status === 200){
            message.success(result.data.message);
            localStorage.removeItem('otp_phonenumber');
            navigate('/dashboard');
        }
        else{
            if (result.success === false){
                if(result.errors.username){
                    message.warning(result.errors.username[0]);
                }
                else{
                    message.warning(result.message);
                }
            }
        }
    }
    
  return (
    <div className="col-12 col-md-6 col-xl-5">
    <div className="register-card">
      <h2>OTP Verify</h2>
      <p>
        Confirm your otp here. OTP is send to your registered phone number.
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
          { required: true, message: "Please input your name!" }
        ]}
      >
        <Input.OTP level={6} style={{height:"100px"}}/>
      </Form.Item>
      <Form.Item>
        <Button type="submit" className="btn btn-sm pull-right">
          Verify OTP
        </Button>
      </Form.Item>
        </Form>
        <p>The OTP code valid for only 2 minutes.</p>
        <p>{isResending ? `Resend OTP in ${timer} seconds` : ""}</p>
        <button onClick={handleResendOTP} disabled={isResending} className="btn btn-sm btn-danger">
            {isResending ? "Resending..." : "Resend OTP"}
        </button>
      </div>
    </div>
  </div>
  );
};

export default OTPPhoneArea;
