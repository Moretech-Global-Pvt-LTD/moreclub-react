import React  from "react";
import { Link } from "react-router-dom";
import "react-phone-number-input/style.css";

import RegisterPic from "../../../images/auth/register.png";
import RegistrationForm from "./RegisterForm";


const RegisterContent = (props) => {
  const { title, subTitle, button } = props;


  return (
    <div className="welcome-area">
      <div className="container">
        <div className="row g-4 g-lg-5 align-items-center justify-content-between">
        <div className="col-12 col-md-6 mt-0">
       
            <div className="register-thumbnail mt-5  mt-md-5">
            <h2>{title}</h2>
              <p>
                {subTitle}
                <Link className="ms-1 hover-primary" to={button[0].path}>
                  {button[0].text}
                </Link>
              </p>
              <img src={RegisterPic} alt="Register"  className="d-none d-md-block"/>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xl-5 mt-0">
          <RegistrationForm subTitle={subTitle} button={button}/>
          
          </div>

         
        </div>
      </div>
    </div>
  );
};

export default RegisterContent;
