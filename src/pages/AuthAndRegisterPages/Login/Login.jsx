import React from "react";
import Divider from "../../../components/divider/Divider";
import LoginContent from "./LoginContent";
import ThemeToggler from "../../../components/header/themeToggler";
import Logos from "../../../components/header/Logos";
import Navbutton from "../../../components/header/Navbutton";

export default function Login() {
  return (
    <div className="postion-relative w-100">
      {" "}
      <nav className="navbar navbar-header position-absolute w-100">
        <div className="container">
          <div className="w-100 d-flex justify-content-between border-0">
            <div className="d-flex align-items-center">
              <Logos link="/" />
            </div>
            <div className="header-meta d-flex align-items-center">
              <ThemeToggler />
              <Navbutton register={true} />
            </div>
          </div>
        </div>
      </nav>
      <div className="login-container">
        <Divider />
        <div className="divider-mobile" />
        <LoginContent
          title="Welcome Back!"
          subTitle="Didn't have an account?"
          button={[
            {
              text: "Register now!",
              path: "/register-membership",
            },
          ]}
          image="img/illustrator/4.png"
        />
      </div>
    </div>
  );
}
