import React, { useState } from "react";

import OTPEmailArea from "./OTPEmailArea";
import OTPEmailAddress from "./OTPEmailAddress";


const OTPContent = () => {
  const [otpStep, setOtpStep] = useState(1);
 
  const handleNext = async () => {
   
    
      if (otpStep === 1) {
        if (localStorage.getItem("otp_email") !== "") {
          
          setOtpStep((prevValue) => prevValue + 1);
        } else {
          setTimeout(async () => {
            if (localStorage.getItem("otp_email") !== "") {
              setOtpStep((prevValue) => prevValue + 1);
            }
          }, 5000);
        }
      }
    
  };
  const handleback = async () => {
    if (otpStep === 2) {
        localStorage.removeItem("otp_email")
        setOtpStep((prevValue) => prevValue - 1);
      } 
  };

  return (
    <div className="d-flex w-100 mt-md-4 mt-lg-0">
      {/* <div className="container"> */}
      <div className="row g-4 g-lg-5  pt-2 align-items-center justify-content-between">
        {otpStep === 1 && <OTPEmailAddress handleNext={handleNext} />}
        {otpStep === 2 && <OTPEmailArea  handleback={handleback} />}
      </div>
      {/* </div> */}
    </div>
  );
};

export default OTPContent;
