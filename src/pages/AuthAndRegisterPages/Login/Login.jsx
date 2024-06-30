import React from "react";
import Header from "../../../components/header/Header";
import Divider from "../../../components/divider/Divider";
import Footer from "../../../components/footer/Footer";
import LoginContent from "./LoginContent";
// import { useNavigate } from "react-router-dom";


export default function Login() {

//     const otp_username = localStorage.getItem("otp_username");
//     const navigate = useNavigate();
//     useEffect(() => {
//       if (otp_username) {
//         navigate("/otp");
//     }
// }, [otp_username, navigate]);

    return(
        <>
            <Header />

            <Divider />

            <LoginContent
                title="Welcome Back!" 
                subTitle="Didn't have an account?" 
                button={[
                    {
                        text: "Register now!",
                        path: "/register-membership"
                    }
                ]} 
                image="img/illustrator/4.png"
            />

            <Divider />

            <Footer />
        </>
    )
}