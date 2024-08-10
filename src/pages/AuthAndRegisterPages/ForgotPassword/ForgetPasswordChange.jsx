import {useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { useState } from "react";
// import { change_password } from "../../redux/api/loginAPI";
import { useDispatch } from "react-redux";
// import PasswordchangeImage from "../../images/auth/login.png"
import { message } from "antd";

const ForgetPasswordChange = () => {
    // const { subTitle} = props;
    const [inputPassword1, setInputPassword1] = useState();
    const [inputPassword2, setInputPassword2] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = {
            new_password1: inputPassword1,
            new_password2: inputPassword2,
        };
        console.log(formData)
        // const res = dispatch(change_password(formData));
        // if(res){
        //     message.success("Password changed");
        //     navigate("/dashboard");
        //   }else{
        //     message.error("Error changing password");
        //   }
    }
  return (
    
    <div className="register-area">
    <div className="container">
        <div className="row g-4 g-lg-5 align-items-center justify-content-between">
            <div className="col-12 col-md-6 col-xl-5">
                <div className="register-card">
                    <p>{"Set New Password"}</p>

                    <div className="register-form mt-5">
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-4">
                                <Form.Label>New Password</Form.Label>
                                <Form.Control type="text" placeholder="New Password" onChange={e => setInputPassword1(e.target.value)} required />
                            </Form.Group>
                            <Form.Group className="mb-4">
                            <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="text" placeholder="Confirm Password" onChange={e => setInputPassword2(e.target.value)} required />
                            </Form.Group>
                            <button className="btn btn-warning btn-sm" type="submit">Change Password</button>
                        </Form>
                    </div>
                </div>
            </div>

            <div className="col-12 col-md-6">
                <div className="register-thumbnail mt-5 mt-md-0">
                    {/* <img src={PasswordchangeImage} alt="Forget" style={{width:"auto", height:"300px"}} /> */}
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default ForgetPasswordChange

