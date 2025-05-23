import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import {
  currentStep,
  updateFormData,
} from "../../../../redux/slices/RegisterSlice";
import axios from "axios";
import { baseURL } from "../../../../config/config";
import PhoneNumberInput from "../../../../components/ui/PhoneInput2";

const UserBasicForm = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.registerReducer.formData);
  const [fullName, setFullName] = useState(formData?.fullName ?? "");
  const [email, setEmail] = useState(formData?.email ?? "");
  const [phone_number, setPhoneNumber] = useState(formData?.phone_number ?? "");
  const [prefixs, setPrefixs] = useState(formData?.phone_prefix ?? "+46");

  const [phoneInputInfo, setphoneInputInfo] = useState({
    phone_number: formData?.phone_number ?? "",
    phone_prefix: formData?.phone_prefix ?? "+46",
    country: formData?.country ?? "Sweden",
    country_code: formData?.country_code ?? "SE",
  });

  //step 1 variable for Error
  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [gender, setGender] = useState(`${formData?.gender ?? ""}`);
  const [genderError, setGenderError] = useState("");

  const handleFullNameChange = async (event) => {
    setFullName(event.target.value);
    dispatch(updateFormData({ fullName: event.target.value }));
  };

  // for full name validation
  // const handleFullnameValidation = async (event) => {
  //   const value = event.target.value;
  //   if (value.trim() === "") {
  //     setFullNameError("Name is Required");
  //   } else if (value.trim().split(" ").length === 1) {
  //     setFullNameError("Last Name is Required");
  //   } else {
  //     const [firstName, ...lastNameArr] = fullName.split(" ");
  //     const lastName = lastNameArr.join(" ");
  //     dispatch(updateFormData({ firstName: fullName }));
  //     dispatch(updateFormData({ first_name: firstName }));
  //     dispatch(updateFormData({ last_name: lastName }));
  //     setFullNameError("");
  //   }
  // };

  const handleFullnameValidation = async (event) => {
    const value = event.target.value.trim(); // Trim the input to avoid leading/trailing spaces
    if (value === "") {
      setFullNameError("Name is Required");
    } else if (value.split(" ").length === 1) {
      setFullNameError("Last Name is Required");
    } else {
      const [firstName, ...lastNameArr] = value.split(" "); // Use 'value' instead of 'fullName'
      const lastName = lastNameArr.join(" ");
      dispatch(updateFormData({ firstName: value })); // Corrected 'fullName' to 'value'
      dispatch(updateFormData({ first_name: firstName }));
      dispatch(updateFormData({ last_name: lastName }));
      setFullNameError("");
    }
  };

  // for email
  const handleEmailChange = async (event) => {
    setEmail(event.target.value);
    dispatch(updateFormData({ email: event.target.value }));
    let timeout;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      handleemailCheck(event);
    }, 500);
  };

  // email check weather it exist or not
  const handleemailCheck = async (event) => {
    const value = event.target.value;
    const emailpattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailpattern.test(value)) {
      setEmailError("Invalid email");
    } else {
      setEmailError("");
      try {
        const res = await axios.post(`${baseURL}auth/check/username/`, {
          username: `${value}`,
        });
        if (res.status === 200) {
          dispatch(updateFormData({ email: value }));
          setEmailError("");
        }
      } catch (error) {
        setEmailError(error.response?.data?.errors?.username[0]);
      }
    }
  };

  //  phone check weather it exist or not
  const handlePhoneCheck = async (value) => {
    if (value !== "") {
      try {
        const validPhoneNumber = value.replace(/[^+\d]/g, "");
        const res = await axios.post(`${baseURL}auth/check/username/`, {
          username: `${validPhoneNumber}`,
        });
        if (res.status === 200) {
          setPhoneError("");
          await dispatch(updateFormData({ phone_number: value }));
        }
      } catch (error) {
        setPhoneError(error.response.data?.errors?.username[0]);
      }
    }
    else {
      setPhoneError("Phone number is required");
    }
  };

  //for gender change
  const handleGenderChange = async (event) => {
    setGender(event.target.value);
    if (event.target.value === "") {
      setGenderError("Choose your gender");
    } else {
      dispatch(updateFormData({ gender: event.target.value }));
      setGenderError("");
    }
  };

  const handleNextStep = (value) => {
    dispatch(currentStep(value));
  };

  const handlePhoneNumberChange = (data) => {

    if (data.prefix === undefined || data.country === undefined || data.countryCode === undefined) {
      setphoneInputInfo((prevData) => ({
        ...prevData,
        phone_number: data.fullNumber,
      }));
    } else {
      setPhoneNumber(data.fullNumber);
      setPrefixs(data.prefix);
      setphoneInputInfo((prevData) => ({
        ...prevData,
        phone_number: data.fullNumber,
        phone_prefix: data.prefix,
        country_code: data.countryCode,
        country: data.country,
      }));
      dispatch(
        updateFormData({
          phone_number: data.fullNumber,
          phone_prefix: data.prefix,
          country_code: data.countryCode,
          country: data.country,
        })
      );
      if(data.fullNumber.length === 7)
      {
      handlePhoneCheck(data.fullNumber);
      }
    }

  };



  return (
    <>
      <span
        className={`register-form-container  register-form-wrapper register-headings pe-2 ps-2`}
      >
        {/* <h2>Join the Club</h2> */}
        <h1 className="text-center fs-5">
          Register for Exclusive Membership Benifits.
        </h1>
      </span>

      <Form.Group className="register-form-container">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={handleFullNameChange}
          onBlur={handleFullnameValidation}
          required
        />
        {fullNameError && <p className="text-danger">{fullNameError}</p>}
      </Form.Group>
      <Form.Group className="register-form-container">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          onBlur={handleemailCheck}
          // ref={emailRef}
          required
        />
        {emailError && <p className="text-danger">{emailError}</p>}
      </Form.Group>
    
      <Form.Group className="register-form-container">
        <Form.Label>Phone Number</Form.Label>
        <PhoneNumberInput
          onChange={handlePhoneNumberChange}
          initialValue={phone_number}
        />
        {phoneError && <p className="text-danger">{phoneError}</p>}
      </Form.Group>

      
      <Form.Group className="register-form-container">
        <Form.Label>Gender</Form.Label>
        <div>
          <Form.Check
            inline
            type="radio"
            id="male"
            label="Male"
            name="gender"
            value="MALE"
            checked={gender === "MALE"}
            onChange={handleGenderChange}
            required
          />
          <Form.Check
            inline
            type="radio"
            id="female"
            label="Female"
            name="gender"
            value="FEMALE"
            checked={gender === "FEMALE"}
            onChange={handleGenderChange}
            required
          />
          <Form.Check
            inline
            type="radio"
            id="other"
            label="Other"
            name="gender"
            value="OTHER"
            checked={gender === "OTHER"}
            onChange={handleGenderChange}
            required
          />
        </div>
        {genderError && <p className="text-danger">{genderError}</p>}
      </Form.Group>
      <button
        className="btn btn-primary m-4 "
        disabled={
          fullName.trim() === "" ||
          fullNameError !== "" ||
          email.trim() === "" ||
          emailError !== "" ||
          phone_number === "" ||
          phone_number.length < 7 ||
          phoneError !== "" ||
          formData.phonePrefix === "" ||
          formData.country_code === "" ||
          formData.email === "" ||
          gender.trim() === "" ||
          genderError !== ""
        }
        onClick={() => handleNextStep(2)}
      >
        Get Membership
      </button>
    </>
  );
};

export default UserBasicForm;
