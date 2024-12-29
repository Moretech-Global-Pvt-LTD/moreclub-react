import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { load_user } from "../../redux/api/loginAPI";
import { useDispatch } from "react-redux";
import PasswordchangeImage from "../../images/auth/login.png";
import { message } from "antd";
import { baseURL } from "../../config/config";
import { axiosInstance } from "../..";

import PasswordInput from "../ui/passwordInput";

export default function ChangePasswordContent(props) {
  const { title, subTitle } = props;
  const [inputPassword1, setInputPassword1] = useState();
  const [inputPassword2, setInputPassword2] = useState();
  const [loading , setLoading] = useState(false)

  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validatePassword = (password) => {
    const passwordPattern = /^(?!.*[\s`\-_+=<>]).{8,}$/;
    if (!passwordPattern.test(password)) {
      return "Password must be at least 8 characters long";
    }
    return "";
  };

  const handleConfirmPasswordChange = (value) => {
    setInputPassword2(value);
    if (value !== inputPassword1) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = {
      new_password: inputPassword1,
      confirm_password: inputPassword2,
    };
    try {
      const res = await axiosInstance.post(
        `${baseURL}auth/password/change/`,
        formData
      );

      await dispatch(load_user());

      message.success(res.data.detail);
      navigate("/dashboard");
    } catch (error) {
      message.error(error.response.data.new_password2);
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="container">
      <div className="row g-4 g-lg-5 align-items-center justify-content-between">
        <div className="col-12 col-md-6 col-xl-5 ">
          <div className="register-card">
            <h2>{title}</h2>
            <p>{subTitle}</p>

            <div className="register-form mt-3">
              <Form onSubmit={handleSubmit}>
                <div className="row g-2">
                  <PasswordInput
                    label="New Password"
                    id="phoneLoginPassword"
                    value={inputPassword1}
                    onChange={setInputPassword1}
                    validatePassword={validatePassword}
                    errorMessage={passwordError}
                  />
                  <PasswordInput
                    label="Confirm New Password"
                    id="confirmPassword"
                    value={inputPassword2}
                    onChange={handleConfirmPasswordChange}
                    errorMessage={confirmPasswordError}
                  />
                </div>

                <button
                  className="btn btn-warning btn-sm mt-2"
                  disabled={!!confirmPasswordError || !!passwordError}
                  type="submit"
                >
                  {loading && <span className="spinner-border spinner-border-sm"></span>}Change Password
                </button>
              </Form>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6  d-none d-md-block">
          <div className="register-thumbnail mt-5 mt-md-0">
            <img
              src={PasswordchangeImage}
              alt="Forget"
              // style={{ width: "auto", height: "300px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
