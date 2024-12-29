import React from 'react'
import Login from '../pages/AuthAndRegisterPages/Login/Login';
import Register from '../pages/AuthAndRegisterPages/Register/Register';
import OTP from '../pages/AuthAndRegisterPages/OTP/OTP';
import ForgotPassword from '../pages/AuthAndRegisterPages/ForgotPassword/ForgotPassword';
import ForgetPasswordVerifyOTP from '../pages/AuthAndRegisterPages/ForgotPassword/ForgetPasswordVerifyOTP';
import BusinessProfile from '../components/user_profile/BusinessProfile';
import BusinessRegister from '../pages/Businesspages/BusinessRegister/BusinessRegister';


const authRoutes = [
    
    {
      path: "/login",

      page: <Login />,
    },
    {
      path: "/register-membership",

      page: <Register />,
    },
    {
      path: "/otp",

      page: <OTP />,
    },
    {
      path: "/forgot/password/",

      page: <ForgotPassword />,
    },
    {
      path: "/forgot/password/otp/",

      page: <ForgetPasswordVerifyOTP />,
    },
    {
      path: "/register-business",

      page: <BusinessProfile />,
    },
    {
      path: "/business/register/",

      page: <BusinessRegister />,
    },
  ];



export default authRoutes
