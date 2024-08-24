import { useNavigate } from "react-router-dom";
import RegisterContent from "./RegisterContent";
import { useEffect } from "react";
import Divider from "../../../components/divider/Divider";
import ThemeToggler from "../../../components/header/themeToggler";
import Logos from "../../../components/header/Logos";
import Navbutton from "../../../components/header/Navbutton";

export default function Register() {
  const otp_username = localStorage.getItem("otp_username");
  const navigate = useNavigate();

  useEffect(() => {
    if (otp_username) {
      navigate("/otp");
    }
  }, [otp_username, navigate]);

  return (
    <div className="">
      <div
        className="login-container postion-relative"
        style={{ overflowY: "auto" }}
      >
        <nav className="navbar navbar-header  w-100">
          <div className="container">
            <div className="w-100 d-flex justify-content-between border-0">
              <div className="d-flex align-items-center">
                <Logos link={"/"} />
              </div>

              <div className="header-meta d-flex align-items-center">
                <ThemeToggler />
                <Navbutton signin={true} />
              </div>
            </div>
          </div>
        </nav>
        {/* <Divider /> */}

        {/* <div className="divider-mobile" /> */}
        <div className="mt-4 mb-4 w-100" style={{ height: "100%" }}>
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
        </div>
      </div>
    </div>
  );
}
