import React, { useEffect, useState } from "react";

import { Form } from "react-bootstrap";
import axios from "axios";
import { baseURL } from "../../config/config";
import { useSelector } from "react-redux";
import { message } from "antd";
import { useDebounce } from "../../Hooks/useDebounce";

const OTPPhoneNumbers = ({ handleNext }) => {
  const user = useSelector((state) => state.userReducer);
  const userphonenumber = user.user.phone_number;
  const phone_prefix = user.user.user_profile.phone_prefix;
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [chooseCountry, setChooseCountry] = useState(phone_prefix);

  const debouncedPhoneNumber = useDebounce(phoneNumber, 500);

  useEffect(() => {
    if (debouncedPhoneNumber) {
      setPhoneError(validatePhoneNumber(debouncedPhoneNumber));
    } else {
      setPhoneError("");
    }
  }, [debouncedPhoneNumber, phoneNumber, chooseCountry]);

  const validatePhoneNumber = (phoneNumber) => {
    if (phoneNumber.trim() === "") {
      return "Phone Number is required";
    } else if (`${chooseCountry}${phoneNumber}` !== userphonenumber) {
      return "Phone number doesnot match";
    } else {
      //   message.success("phone Number matched");
      //   localStorage.setItem("otp_phonenumber", `${chooseCountry}${phoneNumber}`);
      return "";
    }
  };

  const [countryList, setCountryList] = useState(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const res = await axios.get(`${baseURL}country/list/`);
        setCountryList(res.data.data);
        console.log("countrylist", res.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCountry();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phoneNumber.trim() === "") {
      setPhoneError("Phone Number is required");
    } else if (`${chooseCountry}${phoneNumber}` !== userphonenumber) {
      setPhoneError("Phone number doesnot match");
    } else {
      localStorage.setItem("otp_phonenumber", `${chooseCountry}${phoneNumber}`);
      // message.success("phone Number matched");
      setPhoneError("");
    }
    handleNext();
  };

  return (
    // <div className="col-12 col-md-6 col-xl-6">
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
            <div className="d-flex gap-1" style={{ width: "100%" }}>
              <Form.Control
                as="select"
                value={chooseCountry}
                onChange={(e) => setChooseCountry(e.target.value)}
                style={{ width: "4rem", backgroundColor: "transparent" }}
                className="text-dynamic-white focus-select "
                required
              >
                {countryList &&
                  countryList.map((cou) => (
                    <option value={cou.prefix_number}>
                      <img
                        src={cou.icon}
                        alt={`flag-${cou.name}`}
                        style={{ width: "6px", height: "6px" }}
                      />
                      <span>{cou.code}</span>
                    </option>
                  ))}
              </Form.Control>
              <Form.Control
                type="number"
                placeholder="Enter phone number"
                required
                onChange={(e) => setPhoneNumber(e.target.value)}
                value={phoneNumber}
              />
            </div>
            {phoneError && <p className="text-danger">{phoneError}</p>}
          </Form.Group>
          <button
            className="btn btn-primary mt-4 rounded"
            onClick={handleSubmit}
            disabled={phoneError !== "" || phoneNumber.trim() === ""}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPPhoneNumbers;
