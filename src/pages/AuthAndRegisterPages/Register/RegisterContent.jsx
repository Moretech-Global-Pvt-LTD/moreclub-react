import React from "react";
import { Link } from "react-router-dom";
import RegisterPic from "../../../images/auth/register.png";
import RegistrationForm from "./RegisterForm";

const RegisterContent = (props) => {
  const { title, subTitle, button } = props;
  const url = new URL(window.location.href);
  const nextParam = url.searchParams.get("next");

  return (
    // <div className="d-flex w-100 mt-md-4 mt-lg-0" style={{ height: "70vh" }}>
    <div className="container">
      <div className="row g-4 g-lg-5 align-items-start justify-content-between">
        <div className="col-12 col-md-6 col-lg-6 col-xl-6  mt-0">
          <div className="register-thumbnail mt-0  mt-md-2 mt-lg-5">
            <h2>{title}</h2>
            <p>
              {subTitle}
              {nextParam ? (
                <Link className="ms-1 hover-primary" to={`/login?next=${encodeURIComponent(nextParam)}`}>
                  {button[0].text}
                </Link>  
              ): (
              <Link className="ms-1 hover-primary" to={button[0].path}>
                {button[0].text}
              </Link>
              )
            
            }
            </p>
            <div className="row justify-content-center">
              <div className="col-md-12 col-lg-10 col-xl-10   ">
                <img
                  src={RegisterPic}
                  alt="Register"
                  className="d-none d-md-block"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-xl-6 mt-3 mt-md-2 mt-lg-5">
          <div className="row justify-content-start">
            <div className="col-12 col-xl-12 ">
              <RegistrationForm subTitle={subTitle} button={button} />
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default RegisterContent;
