import React from 'react'
import { Form } from 'react-bootstrap'
import { forget_password } from '../../redux/api/loginAPI';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { baseURL } from '../../config/config';
import PhoneNumberInput from '../ui/PhoneInput2';
import { message } from 'antd';

const ForgetPasswordPhoneNumber = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [loading, setLoading] = useState(false);
  
   

    const validatePhoneNumber = async (phone) => {
        if(!phone.match(/^[0-9]+$/)) return "";
        try {
          const res = await axios.post(`${baseURL}auth/check/username/`, {
            username: `${phone}`,
          });
          if (res.status === 200) {
            return "Username not found";
          }
        } catch (error) {
          if (error.response.data?.errors?.username[0] === "Already Exists") {
            return ""; 
          } else {
            return error.response.data?.errors?.username[0];
          }
        }
    
        return ""; 
      };



    const handlePhoneNumberChange =async (data) => {
        setPhoneNumber(data.fullNumber);
        
      
        setPhoneNumber(data.fullNumber);
    
        const error = await validatePhoneNumber(data.fullNumber)
        if (error.trim() !== "") { 
          setPhoneError(error);
        } else {
          setPhoneError("");
        }
    
      };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const formData = {
        username: phoneNumber,
        reset_type: "phone_number",
      };

      try{
        setLoading(true);
            const res = await axios.post(`${baseURL}auth/password/reset/`, formData);
        
            if(res.data.success){
                localStorage.setItem("otp_username", phoneNumber);
                navigate("/forgot/password/otp");
            }
          } catch (error) {
            message.error(error.response.data.message || "Request failed");
          }finally{
            setLoading(false);
          }
    };
  return (
    <div className="register-form mb-5">
                <Form onSubmit={handleSubmit}>
                <Form.Group className="register-form-container">
          <Form.Label>Phone Number</Form.Label>
          <PhoneNumberInput
            onChange={handlePhoneNumberChange}
            initialValue={phoneNumber}
          />
          {phoneError && <p className="text-danger">{phoneError}</p>}
        </Form.Group>
                  <button
                    className="btn btn-warning btn-sm mt-4"
                    type="submit"
                    disabled={phoneError.trim() !== ""}
                  >
                    {loading && <span className="spinner-border spinner-border-sm"></span>}Reset Password
                  </button>
                </Form>
              </div>
  )
}

export default ForgetPasswordPhoneNumber
