import React from 'react'
import Header from '../../../components/header/Header'
import Breadcrumb from '../../../components/breadcrumb/Breadcrumb'
import Divider from '../../../components/divider/Divider'
import Footer from '../../../components/footer/Footer'
import ForgetPasswordContent from '../../../components/forgot_password/ForgetPasswordContent'


const ForgotPassword = () => {
  return (
    <>
        <Header />
        <Divider />
        <div className="divider-mobile"/>
        <Breadcrumb 
            breadcrumbTitle="Forget Password" 
            breadcrumbNav={[
                {
                    navText: "Home",
                    path: "/"
                }
            ]}
        />
  

        <ForgetPasswordContent 
            title="Reset your Password" 
            subTitle="Already have an account?" 
        />
        

        <Divider />
                
        <Footer />
    </>
  )
}

export default ForgotPassword