import React, { useState } from "react";

import OTPPhoneArea from "./OTPPhoneverify";
import OTPPhoneNumbers from "./OTPPhoneNumber";


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
        {otpStep === 1 && <OTPPhoneNumbers handleNext={handleNext} />}
        {otpStep === 2 && <OTPPhoneArea  handleback={handleback} />}
      </div>
      {/* </div> */}
    </div>
  );
};

export default OTPContent;
