import React from 'react'
import Breadcrumb from '../../../components/breadcrumb/Breadcrumb'
import Divider from '../../../components/divider/Divider'
import Footer from '../../../components/footer/Footer'
import ChangePasswordContent from '../../../components/password_change/PasswordChangeContent'
import Header from '../../../components/header/Header'
import LandingLayout from '../../../components/Layout/LandingLayout'

const PasswordChange = () => {
  return (
    <LandingLayout>
        {/* <Header />
        <div className='welcome-area'>
        <div className='container'>
        <Breadcrumb 
            breadcrumbTitle="Change Password" 
            breadcrumbNav={[
                {
                    navText: "Login",
                    path: "/login"
                }
            ]}
        />

        </div> */}
        <ChangePasswordContent 
            title="Change your Password" 
            subTitle="Already have an account?" 
        />

         <Divider />

        {/* <Footer /> */}

        {/* </div> */}
    </LandingLayout>
  )
}

export default PasswordChange;