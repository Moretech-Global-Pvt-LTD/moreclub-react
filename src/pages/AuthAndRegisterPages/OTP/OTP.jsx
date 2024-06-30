import React, { useEffect } from 'react'
import Header from '../../../components/header/Header'
import { useNavigate } from 'react-router-dom'
import OTPArea from '../../../components/otp/OTP'
import Divider from '../../../components/divider/Divider'
import Footer from '../../../components/footer/Footer'
import LandingLayout from '../../../components/Layout/LandingLayout'

const OTP = () => {
    const navigate = useNavigate()
    // useEffect(() => {
    //     if(!localStorage.getItem('otp_username')){
    //         navigate('/')
    //     }
    // })

    
     

  return (
    <LandingLayout>
   
  
    <OTPArea />
  <Divider/>
    </LandingLayout>
  )
}

export default OTP