import React, { useEffect } from "react";
import Header from "../../../components/header/Header";
import { useNavigate } from "react-router-dom";
import OTPArea from "../../../components/otp/OTP";
import Divider from "../../../components/divider/Divider";
import OTPContent from "../../../components/otp/OTPContent";
import LandingLayout from "../../../components/Layout/LandingLayout";

const OTPPhone = () => {
  const navigate = useNavigate();
  // useEffect(() => {
  //     if(!localStorage.getItem('otp_phonenumber')){
  //         navigate('/')
  //     }
  // })
  return (
    <LandingLayout>
      <OTPContent />
      <Divider />
    </LandingLayout>
  );
};

export default OTPPhone;
