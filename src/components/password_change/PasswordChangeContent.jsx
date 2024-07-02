import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { load_user } from "../../redux/api/loginAPI";
import { useDispatch } from "react-redux";
import PasswordchangeImage from "../../images/auth/login.png";
import { message } from "antd";
import { baseURL } from "../../config/config";
import { axiosInstance } from "../..";
import { userMembership } from "../../redux/api/userMembershipAPI";
import { loadMembershipType } from "../../redux/api/membershipTypeAPI";
import { getBusinessProfile } from "../../redux/api/userDetailAPI";

export default function ChangePasswordContent(props) {
  const { title, subTitle } = props;
  const [inputPassword1, setInputPassword1] = useState();
  const [inputPassword2, setInputPassword2] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      new_password1: inputPassword1,
      new_password2: inputPassword2,
    };
    try {
      const res = await axiosInstance.post(
        `${baseURL}auth/password/change/`,
        formData
      );

      await dispatch(load_user());
      await dispatch(userMembership());
      await dispatch(loadMembershipType());
      await dispatch(getBusinessProfile());
      message.success(res.data.detail);
      navigate("/dashboard");
    } catch (error) {
      message.error(error.response.data.new_password2);
    }
  };

  return (
    <div className="register-area">
      <div className="container">
        <div className="row g-4 g-lg-5 align-items-center justify-content-between">
          <div className="col-12 col-md-6 col-xl-5">
            <div className="register-card">
              <h2>{title}</h2>
              <p>{subTitle}</p>

              <div className="register-form mt-5">
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="New Password"
                      onChange={(e) => setInputPassword1(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Confirm Password"
                      onChange={(e) => setInputPassword2(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <button className="btn btn-warning btn-sm" type="submit">
                    Change Password
                  </button>
                </Form>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 d-none d-md-block">
            <div className="register-thumbnail mt-5 mt-md-0">
              <img
                src={PasswordchangeImage}
                alt="Forget"
                style={{ width: "auto", height: "300px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
