import React from "react";
import Header from "../../../components/header/Header";
import Divider from "../../../components/divider/Divider";
import Footer from "../../../components/footer/Footer";
import LoginContent from "./LoginContent";

export default function Login() {
  return (
    <>
      <Header />

      <Divider />

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

      <Divider />

      <Footer />
    </>
  );
}
