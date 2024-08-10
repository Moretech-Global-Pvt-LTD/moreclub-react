import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { login } from "../../../redux/api/loginAPI";
import axios from "axios";
import { baseURL } from "../../../config/config";
import { useDebounce } from "../../../Hooks/useDebounce";
import { message } from "antd";

import { useCookies } from "react-cookie";
import PhoneNumberInput from "../../../components/ui/PhoneInput2";

const LoginPhoneContent = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [passwordShow, setPasswordShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [failedAttempts, setFailedAttempts] = useState(0);
  const maxAttempts = 5;
  const expirationTime = 1 * 60 * 60 * 1000;
  const [cookies, setCookie] = useCookies(["failedAttempts"]);

  const [phone_number, setPhoneNumber] = useState("");
  const [prefixs, setPrefixs] = useState("+46");
  // const [country, setCountry]= useState("Sweden");
  // const [countryCode, setContryCode]= useState("SE")

  // const [phoneInputInfo, setphoneInputInfo] = useState({
  //   phone_number: phone_number ?? "",
  //   phone_prefix: prefixs ?? "+46",
  //   // country: country ?? "Sweden",
  //   // country_code: countryCode ?? "SE",
  // });

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



  useEffect(() => {
    const storedAttempts = cookies.failedAttempts;
    if (storedAttempts) {
      setFailedAttempts(parseInt(storedAttempts, 10));
    }
  }, [cookies]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const username = `${phone_number}`;
    const result = await dispatch(login(username, password));
    if (result?.status === 200) {
      setLoading(false);
      navigate("/dashboard");
    } else {
      setLoading(false);
      message.warning(`${5 - failedAttempts - 1} attempt remaining`);
      message.error("invalid credentials");
      setFailedAttempts((prev) => {
        const newAttempts = prev + 1;
        setCookie("failedAttempts", newAttempts, {
          path: "/",
          expires: new Date(Date.now() + expirationTime),
        });
        return newAttempts;
      });
   
    }
  };


  const togglePassword = () => {
    setPasswordShow(!passwordShow);
  };


  const handlePhoneNumberChange =async (data) => {
    setPhoneNumber(data.fullNumber);
    
  
    setPhoneNumber(data.fullNumber);
    setPrefixs(data.prefix);

    const error = await validatePhoneNumber(data.fullNumber)
    console.log(error)
    if (error.trim() !== "") { 
      setPhoneError(error);
    } else {
      setPhoneError("");
    }

  };

  // const handlePhoneNumberDataChange = ({
  //   fullNumber,
  //   prefix,
  //   phone,
  //   country,
  //   countryCode,
  // }) => {
  //   setPhoneNumber(phone);
  //   setCountry(country);
  //   setContryCode(countryCode);
  //   setPrefixs(prefix);
  //   setphoneInputInfo({
  //     phone_number: phone,
  //     phone_prefix: prefix,
  //     country: country,
  //     country_code: countryCode,
  //   });
  //   validatePhoneNumber(phone_number, prefix);
  // };


  return (
    <div className="register-form mt-5">
      <Form onSubmit={handleSubmit}>

        <Form.Group className="register-form-container">
          <Form.Label>Phone Number</Form.Label>
          <PhoneNumberInput
            onChange={handlePhoneNumberChange}
            initialValue={phone_number}
          />
          {phoneError && <p className="text-danger">{phoneError}</p>}
        </Form.Group>

        {/* <PhoneNumberInput
          label={"Phone Number"}
          phoneNumber={phone_number}
          prefixs={prefixs}
          setPhoneError={setPhoneError}
          phoneError={phoneError}
          handlePhoneNumberChange={handlePhoneNumberChange}
          formDatas={phoneInputInfo}
          setFormData={setphoneInputInfo}
          onPhoneNumberChange={handlePhoneNumberDataChange} // Pass the callback function
        /> */}

        <Form.Group className="mb-4 form-group">
          <label
            className="label-psswd"
            onClick={togglePassword}
            htmlFor="phoneLoginPassword"
          >
            {" "}
            {passwordShow ? "Hide" : "Show"}
          </label>
          <Form.Control
            type={passwordShow ? "text" : "password"}
            id="phoneLoginPassword"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        {failedAttempts >= maxAttempts && (
          <p className="text-danger text-center mt-0 mb-0">
            You have reached failed attempts more than 5 times
          </p>
        )}

        <button
          className="btn btn-success w-100"
          type="submit"
          disabled={
            phone_number.trim() === "" ||
            phoneError.trim() !== "" ||
            password.trim() === "" ||
            loading ||
            failedAttempts >= maxAttempts
          }
        >
          {loading && (
            <span className="spinner-border spinner-border-sm text-danger"></span>
          )}{" "}
          Log In
        </button>
      </Form>

      <div className="login-meta-data d-flex align-items-center justify-content-between">
        <Form.Check
          className="mt-4"
          type="checkbox"
          id="keepMeLogin"
          label="Keep me logged in"
          defaultChecked
        />
        <Link
          className="forgot-password mt-4 text-primary fz-16"
          to="/forgot/password/"
        >
          Forgot Password?
        </Link>
      </div>
    </div>
  );
};

export default LoginPhoneContent;
