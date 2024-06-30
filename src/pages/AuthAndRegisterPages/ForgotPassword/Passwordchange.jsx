import React from 'react'
import Header from '../../../components/header/Header'
import Breadcrumb from '../../../components/breadcrumb/Breadcrumb'
import Divider from '../../../components/divider/Divider'
import Footer from '../../../components/footer/Footer'
import ForgetPasswordChange from './ForgetPasswordChange'
// import ForgetPasswordContent from '../../components/forgot_password/ForgetPasswordContent'


const PasswordChangeContent = () => {
  return (
    <>
        <Header />
        <Divider />
        <Breadcrumb 
            breadcrumbTitle="Change Password" 
            breadcrumbNav={[
                {
                    navText: "Home",
                    path: "/"
                }
            ]}
        />

        <ForgetPasswordChange />

        <Divider />

        <Footer />
    </>
  )
}

export default PasswordChangeContent