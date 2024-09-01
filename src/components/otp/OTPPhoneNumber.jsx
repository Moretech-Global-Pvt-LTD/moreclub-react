import React, { useEffect, useState } from "react";

import { Form, Spinner } from "react-bootstrap";
import { useDebounce } from "../../Hooks/useDebounce";
import PhoneNumberInput from "../ui/PhoneInput2";
import { message } from "antd";
import { baseURL } from "../../config/config";
import { axiosInstance } from "../..";

const OTPPhoneNumbers = ({ handleNext, errorMessage }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const debouncedPhoneNumber = useDebounce(phoneNumber, 500);
  const [loading, setLoading]= useState(false)

  useEffect(() => {
    if (debouncedPhoneNumber) {
      setPhoneError(validatePhoneNumber(debouncedPhoneNumber));
    } else {
      setPhoneError("");
    }
  }, [debouncedPhoneNumber, phoneNumber, ]);

  const validatePhoneNumber = (phoneNumber) => {
    if (phoneNumber.trim() === "") {
      return "Phone Number is required";
    } else {
      return "";
    }
  };




  const handlePhoneNumberChange = async (data) => {
    setPhoneNumber(data.fullNumber);
    setPhoneNumber(data.fullNumber);
    const error = await validatePhoneNumber(data.fullNumber)
    if (error.trim() !== "") {
      setPhoneError(error);
    } else {
      setPhoneError("");
    }

  };

  async function handleSendOTP() {
    setLoading(true)
    try {
      const res = await axiosInstance.post(`${baseURL}auth/otp/phone/verify/`, {
        phone_number:phoneNumber,
      });
      message.success("OTP has been sent");
      handleNext()
    } catch (err) {
     
      setPhoneError(err.response?.data?.errors["phone_number"]);
    }
    setLoading(false)


  }


  const handleSubmit = (e) => {
    e.preventDefault();
   
    if (phoneNumber.trim() === "") {
      setPhoneError("Phone Number is required");
    } else {
      localStorage.setItem("otp_phonenumber", `${phoneNumber}`);
      handleSendOTP()
     
    }
  };

  return (
 
    <div className="col-12 ">
      <div className="register-card">
        <h5>Phone Verify</h5>
        <p>
          Confirm your Phone Number. OTP will be send to your registered phone
          number.
        </p>
        <div className="register-form mt-4">
          <Form.Group className="register-form-container">
            <Form.Label>Phone Number</Form.Label>
            <PhoneNumberInput
              onChange={handlePhoneNumberChange}
              initialValue={phoneNumber}
            />
            {phoneError && <p className="text-danger">{phoneError}</p>}
            
          </Form.Group>
          <button
            className="btn btn-primary mt-4 rounded"
            onClick={handleSubmit}
            disabled={phoneError !== "" || phoneNumber.trim() === ""}
          >
            {loading && <Spinner variant="danger" animation="border" size="sm" /> }  Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPPhoneNumbers;
