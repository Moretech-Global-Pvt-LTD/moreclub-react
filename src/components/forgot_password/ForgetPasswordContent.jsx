import {useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { forget_password } from "../../redux/api/loginAPI";
import { useDispatch } from "react-redux";
import Forget from "../../images/auth/forget.png";
import { useDebounce } from "../../Hooks/useDebounce";
import { baseURL } from "../../config/config";
import axios from "axios";

export default function ForgetPasswordContent(props) {
  const { title, subTitle } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [debouncedEmails, setDebouncedEmails] = useState("");
  const [debouncedPhones, setDebouncedPhones] = useState("");


  const debouncedEmail = useDebounce(debouncedEmails, 500);
  const debouncedPhone = useDebounce(debouncedPhones, 500);


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email format
  const phoneRegex = /^\+[1-9]\d{1,14}$/;         // E.164 phone number format


  const validateUsername = async (email) => {
    // const emailpattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return "Invalid email";
    }
    return await checkUsername(email);
  };

  const validatePhone = async (email) => {
    // const emailpattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!phoneRegex.test(email)) {
      return "Please enter a valid phone number with country code.";
    }
    return await checkUsername(email);
  };

 

  const checkUsername = async (username) => {
    try {
      const res = await axios.post(`${baseURL}auth/check/username/`, {
        username: `${email}`,
      });
      if (res.status === 200) {
        return "Username not found";
      }
    } catch (error) {
      if (error.response.data?.errors?.username[0] === "Already Exists") {
        return ""; // No error
      } else {
        return error.response.data?.errors?.username[0];
      }
    }
  }

  useEffect(() => {
    const validateAndCheckPhone = async () => {
      if (debouncedEmail) {
        const error = await validateUsername(debouncedEmail);
        setEmailError(error);
      } else {
        setEmailError("");
      }
    };
    validateAndCheckPhone();
  }, [debouncedEmail]);

  useEffect(() => {
    const validateAndCheckPhone = async () => {
      if (debouncedPhone) {
        const error = await validatePhone(debouncedPhone);
        setEmailError(error);
      } else {
        setEmailError("");
      }
    };
    validateAndCheckPhone();
  }, [debouncedPhone]);

  
  const handleInputChange = (value) => {
   
    if (value.trim() === "") {
      setEmail("");
      setEmailError("");
      return;
    }
  
    setEmail(value);
    if (value.length < 3) {
      setEmailError(""); // Don't validate yet
      return;
    }
  
    if (value.includes("@")) {
       setDebouncedEmails(value);
      
    } else if (value.startsWith("+")) {
      // Likely a phone number
      setDebouncedPhones(value);      
    }    
    else {
      setEmailError(""); // Do not prematurely show an error
    }
  };
  


  const handleSubmit = (event) => {
    event.preventDefault();

    if(emailRegex.test(email) || phoneRegex.test(email)){
      setEmailError("");
      const formData = {
        username: email,
      };
      const res = dispatch(forget_password(formData));
      if (res) {
        localStorage.setItem("otp_username", email);
        navigate("/forgot/password/otp");
      }
    }
    else{
      setEmailError("Please enter a valid email address or phone number with country code.");
    }
  };

  return (
    <div className="register-area">
      <div className="container">
        <div className="row g-4 g-lg-5 align-items-center justify-content-between">
          <div className="col-12 col-md-6 col-xl-5 ">
            <div className="register-card">
              <h2>{title}</h2>
              <p>{subTitle}</p>

              <div className="register-form mt-5">
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email to reset password"
                      value={email}
                      onChange={(e) => handleInputChange(e.target.value)}
                      required
                    />
                    {emailError && <p className="text-danger">{emailError}</p>}
                  </Form.Group>
                  {/* <Form.Group className="mb-4">
  <Form.Label>Email Address or Phone Number</Form.Label>
  <Form.Control
    type="text"
    placeholder="Enter email or phone number"
    value={email}
    onChange={(e) => handleInputChange(e.target.value)}
    required
  />
  {emailError && <p className="text-danger">{emailError}</p>}
</Form.Group> */}

                  <button
                    className="btn btn-warning btn-sm"
                    type="submit"
                    disabled={emailError.trim() !== ""}
                  >
                    Reset Password
                  </button>
                </Form>
              </div>
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
