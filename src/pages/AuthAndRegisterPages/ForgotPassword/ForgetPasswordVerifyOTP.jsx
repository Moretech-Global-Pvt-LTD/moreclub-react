import React from 'react'
import Header from '../../../components/header/Header'
import Breadcrumb from '../../../components/breadcrumb/Breadcrumb'
import Divider from '../../../components/divider/Divider'
import Footer from '../../../components/footer/Footer'
import ForgetPasswordOTP from '../../../components/forgot_password/ForgetPasswordOTP'
// import ForgetPasswordContent from '../../components/forgot_password/ForgetPasswordContent'


const ForgetPasswordVerifyOTP = () => {
  return (
    <>
        <Header />
        <Divider />
        <Breadcrumb 
            breadcrumbTitle="Forget Password" 
            breadcrumbNav={[
                {
                    navText: "Home",
                    path: "/"
                }
            ]}
        />

        <ForgetPasswordOTP />

        <Divider />

        <Footer />
    </>
  )
}

export default ForgetPasswordVerifyOTP