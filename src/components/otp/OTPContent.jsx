import React, { useState } from "react";

import OTPPhoneArea from "./OTPPhoneverify";
import OTPPhoneNumbers from "./OTPPhoneNumber";
import { useDispatch } from "react-redux";
import { otpPhoneSend } from "../../redux/api/loginAPI";
import { message } from "antd";

const OTPContent = () => {
  const [otpStep, setOtpStep] = useState(1);
  const dispatch = useDispatch();

  async function handleSendOTP() {
    try {
      const result = await dispatch(
        otpPhoneSend(localStorage.getItem("otp_phonenumber"))
      );
      if (result.status === 200) message.success("OTP has been sent");
    } catch (err) {
      message.error("error sending otp");
    }
  }

  const handleNext = async () => {
    if (otpStep === 1) {
      if (localStorage.getItem("otp_phonenumber") !== "") {
        await handleSendOTP();
        setOtpStep((prevValue) => prevValue + 1);
      } else {
        setTimeout(async () => {
          if (localStorage.getItem("otp_phonenumber") !== "") {
            await handleSendOTP();
            setOtpStep((prevValue) => prevValue + 1);
          }
        }, 5000);
      }
    }
  };

  return (
    <div className="d-flex w-100 mt-md-4 mt-lg-0">
      {/* <div className="container"> */}
      <div className="row g-4 g-lg-5  pt-2 align-items-center justify-content-between">
        {/* <div className="col-12 col-md-6 col-lg-5 col-xl-5 d-none d-xl-block d-md-block">
          <div className="register-thumbnail mt-5 mt-md-0 ">
            <img
              src="https://thumbs.dreamstime.com/b/otp-one-time-password-step-authentication-data-protection-internet-security-concept-otp-one-time-password-step-authentication-data-254434939.jpg"
              alt="Register"
            />
          </div>
        </div> */}
        {otpStep === 1 && <OTPPhoneNumbers handleNext={handleNext} />}
        {otpStep === 2 && <OTPPhoneArea />}
      </div>
      {/* </div> */}
    </div>
  );
};

export default OTPContent;
