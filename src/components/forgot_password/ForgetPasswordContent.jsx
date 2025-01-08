import { Zoom } from "react-awesome-reveal";
import Forget from "../../images/auth/forget.png";
import ForgetPasswordEmail from "./ForgetPasswordEmail";
import ForgetPasswordPhoneNumber from "./ForgetPasswordhoneNumber";
import { useState } from "react";


export default function ForgetPasswordContent(props) {
  const { title, subTitle } = props;
  //   const [inputUsername, setInputUsername] = useState();
  const [loginType, setLoginType] = useState("email");


  const handleLoginTypeChange = (type) => {
    setLoginType(type);
  };


  return (
    <div className="register-area">
      <div className="container">
        <div className="row g-4 g-lg-5 align-items-center justify-content-between">
          <div className="col-12 col-md-6 col-xl-5 ">
            <div className="register-card">
              <h2>{title}</h2>
              <p>{subTitle}</p>

              <p>
              Change with
              {loginType === "email" && (
                <button
                  className={`btn btn-success ms-2 rounded-pill btn-sm ${
                    loginType === "email" ? "block" : "hidden"
                  }`}
                  onClick={() => handleLoginTypeChange("phoneNumber")}
                >
                  <i className="bi bi-phone"></i>&nbsp;Phone Number
                </button>
              )}
              {loginType === "phoneNumber" && (
                <button
                  className={`btn  btn-sm rounded-pill btn-success ms-2 ${
                    loginType === "phoneNumber" ? "block" : "hidden"
                  }`}
                  onClick={() => handleLoginTypeChange("email")}
                >
                  <i className="bi bi-envelope"></i>&nbsp;Email
                </button>
              )}
            </p>

            {/* Login Form */}
            <Zoom delay={500}>
              {loginType === "email" && (
                <ForgetPasswordEmail />
              )}
              {loginType === "phoneNumber" && <ForgetPasswordPhoneNumber />}
            </Zoom>


            </div>
          </div>

          <div className="col-12 col-md-6 ">
            <div className="register-thumbnail mt-5 mt-md-0 d-none d-md-block">
              <img
                src={Forget}
                alt="Forget"
                style={{ width: "70%", height: "auto", margin: "auto" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
