import { redirect, useNavigate } from "react-router-dom";
import Divider from "../../../components/divider/Divider";
import Footer from "../../../components/footer/Footer";
import Header from "../../../components/header/Header";
import RegisterContent from "./RegisterContent";
import { useEffect } from "react";

export default function Register() {
  const otp_username = localStorage.getItem("otp_username");
  const navigate = useNavigate();
  useEffect(() => {
    if (otp_username) {
      navigate("/otp");
    }
  }, [otp_username, navigate]);


  return (
    <>
      <Header />

      <Divider />

      <RegisterContent
        title="Create your free account"
        subTitle="Already have an account?"
        button={[
          {
            text: "Log In",
            path: "/login",
          },
        ]}
        image="img/illustrator/4.png"
      />

      <Divider />

      <Footer />
    </>
  );
}
