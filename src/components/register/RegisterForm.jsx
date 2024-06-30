import React, { useState, useRef } from "react";
import PhoneInput, { parsePhoneNumber } from "react-phone-number-input";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {  register } from "../../redux/api/loginAPI";
import { businessType } from "../../redux/api/userDetailAPI";

import axios from "axios";
import { baseURL } from "../../config/config";
import { useEffect } from "react";
import Select from "react-select";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  console.log("location",location)

  //State variable for multistep form navigation
  const [step, setStep] = useState(1);
  const [buttonDisable, setButtonDisable] = useState(false);

  // State variables for form fields
  //step 1
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const [phonePrefix, setPhonePrefix] = useState("");
  //step 1 variable for Error
  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  // step 2
  const [gender, setGender] = useState("");
  const [user_type, setUserType] = useState("");
  //step 2 variable for Error
  const [genderError, setGenderError] = useState("");
  const [user_typeError, setUser_typeError] = useState("");

  //step 3
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  //step 3 variable for Error
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  // const [agreedToTermsError, setAgreedToTermsError] = useState("");

  // state variable to determine for which type the user is registering
  const [business, setbusiness] = useState(false);

  //step 4
  const [companyName, setCompanyName] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [address, setAddress] = useState("");
  // const [document, setDocument] = useState([]);
  // const [inputBusinessDocument, setInputBusinessDocument] = useState("");

  //step 4 variable for error
  const [companyNameError, setcompanyNameError] = useState("");
  const [registrationNumberError, setRegistrationNumberError] = useState("");
  const [addressError, setAddressError] = useState("");
  // const [documentError, setDocumentError] = useState("");

  //step 5
  const [selectedBusinessType, setSelectedBusinessType] = useState([]);
  const [selectedBusinessDiscounts, setSelectedBusinessDiscounts] = useState(
    []
  );
  const [options, setOptions] = useState([]);

  // setting options for the BusinessTypes
  const bt = useSelector((state) => state.businessReducer);
  useEffect(() => {
    dispatch(businessType());
  }, [dispatch]);

  useEffect(() => {
    if (bt.businessTypeList && bt.businessTypeList.length > 0) {
      const formattedOptions = bt.businessTypeList.map((option) => ({
        value: option.id,
        label: option.name,
      }));
      setOptions(formattedOptions);
    }
  }, [bt.businessTypeList]);

  // useEffect(() => {
  //   if (phone_number.trim() !== "") {
  //     const phoneNumber = parsePhoneNumber(phone_number);
  //     setCountry(phoneNumber.country);
  //     setPhonePrefix(phoneNumber.countryCallingCode);
  //   }
  // },[phone_number]);

  //handling form navigation
  const handleformNavigation = async (value) => {
    if (value === "NEXT") {
      if (step === 1) {
      }
      setStep((prevStep) => prevStep + 1);
    } else if (value === "PREVIOUS" && step > 1) {
      setStep((prevStep) => prevStep - 1);
    }
  };

  const stepValidation = async (value) => {
    if (step === 1) {
      const step1Errors = [fullName, email, phone_number];
      if (step1Errors.some((error) => error.trim() === "")) {
        setButtonDisable(true);
      } else {
        setButtonDisable(false);
      }
    } else if (step === 2) {
      const step2Errors = [user_type, gender];
      if (step2Errors.some((error) => error.trim() === "")) {
        setButtonDisable(true);
      } else {
        setButtonDisable(false);
      }
    } else if (step === 3) {
      const step3Errors = [password, confirmPassword];
      if (
        step3Errors.some((error) => error.trim() === "") &&
        agreedToTerms !== true
      ) {
        setButtonDisable(true);
      } else {
        setButtonDisable(false);
      }
    } else if (step === 4) {
      const step4Errors = [companyName, registrationNumber, address];
      if (step4Errors.some((error) => error.trim() === "")) {
        setButtonDisable(true);
      } else {
        setButtonDisable(false);
      }
    } else if (step === 5) {
      if (!selectedBusinessType) {
        setButtonDisable(true);
      } else {
        setButtonDisable(false);
      }
    }
  };

  useEffect(() => {
    stepValidation();
  }, [
    step,
    fullName,
    email,
    phone_number,
    user_type,
    gender,
    password,
    confirmPassword,
    agreedToTerms,
    companyName,
    registrationNumber,
    address,
    selectedBusinessType,
  ]);

  // Handler functions for form field changes

  //for fullname
  const handleFullNameChange = async (event) => {
    setFullName(event.target.value);
  };

  // for full name validation
  const handleFullnameValidation = async (event) => {
    const value = event.target.value;
    if (value.trim() === "") {
      setFullNameError("Name is Required");
    } else {
      setFullNameError("");
    }
  };

  // for email
  const handleEmailChange = async (event) => {
    setEmail(event.target.value);
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
        await axios.post(`${baseURL}auth/check/username/`, {
          username: `${value}`,
        });
        setEmailError("");
      } catch (error) {
        setEmailError(error.response.data.errors.username[0]);
      }
    }
  };

  //for phone number
  const handlePhoneNumberChange = async (value) => {
    if (value) {
      console.log(value);
      setPhoneNumber(value);
      console.log(parsePhoneNumber(value));
    }
  };

  //  phone check weather it exist or not
  const handlePhoneCheck = async (event) => {
    const value = event.target.value;
    console.log("check", value);
    if (value !== "") {
      try {
        const res = await axios.post(`${baseURL}auth/check/username/`, {
          username: `${value}`,
        });
        console.log(res)
        if(res.status === 200){
          setPhoneError("");
          const phoneNumber = parsePhoneNumber(phone_number);
  
          setCountry(phoneNumber.country);
          setPhonePrefix(phoneNumber.countryCallingCode);
        }
      } catch (error) {
        setPhoneError(error.response.data.errors.username[0]);
      }
    } else {
      setPhoneError("Phone number is required");
    }
  };

  // for user_type
  const handleUserTypeChange = async (event) => {
    setUserType(event.target.value);
    if (event.target.value === "NORMAL") {
      setbusiness(false);
    } else {
      setbusiness(true);
    }
  };

  //for user_type validation
  const handleUserTypeValidation = async (event) => {
    const value = event.target.value;
    if (value.trim() === "") {
      setUser_typeError("Please choose User Type");
    } else {
      setUser_typeError("");
    }
  };

  //for gender change
  const handleGenderChange = async (event) => {
    setGender(event.target.value);
    if (event.target.value === "") {
      setGenderError("Choose your gender");
    } else {
      setGenderError("");
    }
  };

  // for password
  const handlePasswordChange = async (event) => {
    setPassword(event.target.value);
  };

  // for password validation
  const handlePasswordValidation = async (event) => {
    const value = event.target.value;
    const passwordPattern = /^(?!.*[\s`\-_+=<>]).{8,}$/;
    if (!passwordPattern.test(value)) {
      setPasswordError("At least 8 character long is required");
    } else {
      setPasswordError("");
    }
  };

  //handle confirm password
  const handleConfirmPasswordChange = async (event) => {
    setConfirmPassword(event.target.value);
  };

  // for confirm password validation
  const handleConfimrPasswordblur = async (event) => {
    if (event.target.value !== password) {
      setConfirmPasswordError("Confirm Password doesnot match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleAgreementChange = (event) => {
    setAgreedToTerms(event.target.checked);
  };

  // for company name
  const handleCompanyNameChange = async (event) => {
    setCompanyName(event.target.value);
  };

  //for comapany validation
  const handleCompanyNameValidation = async (event) => {
    const value = event.target.value;
    if (value.trim() === "") {
      setcompanyNameError("Comapny Name is Required");
    } else {
      setcompanyNameError("");
    }
  };

  // for handle registrtaion number
  const handleRegistrationNumberChange = async (event) => {
    setRegistrationNumber(event.target.value);
  };

  // for registration number validation
  const handleRegistrationValidation = async (event) => {
    const value = event.target.value;
    if (value.trim() === "") {
      setRegistrationNumberError("Registration number is Required");
    } else {
      setRegistrationNumberError("");
    }
  };

  // for handleAddress
  const handleAddressChange = async (event) => {
    setAddress(event.target.value);
  };

  const handleAddressValidation = async (event) => {
    const value = event.target.value;
    if (value.trim() === "") {
      setAddressError("Address is Required");
    } else {
      setAddressError("");
    }
  };

  // // for document
  // const handleDocumentChange = async (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     setInputBusinessDocument(URL.createObjectURL(file));
  //     setDocument((prevfile)=> ({...prevfile, file}));
      
  //   }
  // };

  // // for documentvalidation
  // const handleDocumentValidation = async (event) => {
  //   const value = event.target.files[0];
  //   if (value) {
  //     setDocumentError("");
  //   } else {
  //     setDocumentError("Document is Required");
  //   }
  // };

  const handleBusinessTypeChange = (selectedOptions) => {
    setSelectedBusinessType(selectedOptions);
  };

  // Form submission handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    const [first_name, ...lastNameArr] = fullName.split(" ");
    const last_name = lastNameArr.join(" ");
    const businessTypes = selectedBusinessType.map((type) => type.value);
    const businessDiscounts = selectedBusinessDiscounts.map((discount) => ({
      business_type: discount.business_type,
      discount: discount.discount,
    }));
    // const businessDoc = document.map((items)=>items);

    if (business) {
      const combinedFormData = {
        first_name: first_name,
        last_name: last_name,
        email,
        phone_number,
        password,
        user_type,
        user_profile: {
          phone_prefix: phonePrefix,
          country_code: country,
          country: country,
          gender,
        },
        business_profile: {
          business_types: businessTypes,
          business_name: companyName,
          business_address: address,
          business_email: email,
          business_phone: phone_number,
          business_registration_number: registrationNumber,
        },
        business_discount: businessDiscounts
      };
      const result = await dispatch(register(combinedFormData));
      if (result.status === 200) {
        localStorage.setItem("otp_username", email);
        navigate("/otp");
      } else {
        if (result.errors.phone_number) {
          setPhoneError(result.errors.phone_number);
          if (phoneRef.current) phoneRef.current.focus();
        }
        if (result.errors.email) {
          setEmailError(result.errors.email);
          if (emailRef.current) emailRef.current.focus();
        }
      }
    } else {
      const combinedFormData = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone_number: phone_number,
        password: password,
        user_type,
        user_profile: {
          phone_prefix: phonePrefix,
          country_code: country,
          country: country,
          gender: gender,
        },
      };

      const result = await dispatch(register(combinedFormData));
      if (result.status === 200) {
        localStorage.setItem("otp_username", email);
        navigate("/otp");
      } else {
        if (result.errors.phone_number) {
          setPhoneError(result.errors.phone_number);
          if (phoneRef.current) phoneRef.current.focus();
        }
        if (result.errors.email) {
          setEmailError(result.errors.email);
          if (emailRef.current) emailRef.current.focus();
        }
      }
    }

    // Reset form fields after submission if needed
    // setFullName("");
    // setEmail("");
    // setPhoneNumber("");
    // setPassword("");
    // setGender("");
    // setUserType("");
    // setAgreedToTerms(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <>
        {step === 1 ? (
          <></>
        ) : (
          <button
            className="btn btn-Link"
            onClick={() => handleformNavigation("PREVIOUS")}
          >
            Back
          </button>
        )}
      </>
      <>
        {step === 1 && (
          <>
            <Form.Group className="mb-4">
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
            <Form.Group className="mb-4">
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                onBlur={handleemailCheck}
                ref={emailRef}
                required
              />
              {emailError && <p className="text-danger">{emailError}</p>}
            </Form.Group>
            <Form.Group className="mb-4">
              <PhoneInput
                placeholder="Enter phone number"
                defaultCountry="SE"
                className="form-control"
                value={phone_number}
                onChange={handlePhoneNumberChange}
                onBlur={handlePhoneCheck}
                ref={phoneRef}
                numberInputProps={{
                  required: true,
                  className: "phone-input ",
                }}
                required
              />
              {phoneError && <p className="text-danger">{phoneError}</p>}
            </Form.Group>
          </>
        )}
      </>
      <>
        {step === 2 && (
          <>
            <Form.Group controlId="userSelect" className="mb-4">
              <Form.Label>User Type</Form.Label>
              <Form.Control
                as="select"
                value={user_type}
                onChange={handleUserTypeChange}
                onBlur={handleUserTypeValidation}
                required
              >
                <option value="">Select User Type</option>
                <option value="NORMAL">Normal</option>
                <option value="BUSINESS">Business</option>
              </Form.Control>
              {user_typeError && (
                <p className="text-danger">{user_typeError}</p>
              )}
            </Form.Group>
            <Form.Group className="mb-4">
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
          </>
        )}
      </>
      <>
        {step === 3 && (
          <>
            <Form.Group className="mb-4 form-group">
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                onBlur={handlePasswordValidation}
                required
              />
              {passwordError && <p className="text-danger">{passwordError}</p>}
            </Form.Group>

            <Form.Group className="mb-4 form-group">
              <Form.Control
                type="password"
                placeholder="Confirm-Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                onBlur={handleConfimrPasswordblur}
                required
              />
              {confirmPasswordError && (
                <p className="text-danger">{confirmPasswordError}</p>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Check
                className="mb-4"
                type="checkbox"
                id="rememberMe"
                label="I agree to all terms & conditions."
                checked={agreedToTerms}
                onChange={handleAgreementChange}
                required
              />
            </Form.Group>
          </>
        )}
      </>
      <>
        {step === 4 && business && (
          <>
            <Form.Group className="mb-4 form-group">
              <Form.Control
                type="text"
                placeholder="Company Name"
                value={companyName}
                onChange={handleCompanyNameChange}
                onBlur={handleCompanyNameValidation}
                required
              />
              {companyNameError && (
                <p className="text-danger">{companyNameError}</p>
              )}
            </Form.Group>

            <Form.Group className="mb-4 form-group">
              <Form.Control
                type="text"
                placeholder="Company Registration Number"
                value={registrationNumber}
                onChange={handleRegistrationNumberChange}
                onBlur={handleRegistrationValidation}
                required
              />
              {registrationNumberError && (
                <p className="text-danger">{registrationNumberError}</p>
              )}
            </Form.Group>
            <Form.Group className="mb-4 form-group">
              <Form.Control
                type="text"
                placeholder="Company Address"
                value={address}
                onChange={handleAddressChange}
                onBlur={handleAddressValidation}
                required
              />
              {addressError && <p className="text-danger">{addressError}</p>}
            </Form.Group>
{/* 
            <Form.Group className="mb-4 form-group">
              <Form.Control
                type="File"
                placeholder="Documents"
                onChange={handleDocumentChange}
                onBlur={handleDocumentValidation}
                multiple
                required
              />
              {documentError && <p className="text-danger">{documentError}</p>}
              {document && (
                <div className="img-wrap my-4">
                  <img src={inputBusinessDocument} alt="preview" />
                </div>
              )}
            </Form.Group> */}
          </>
        )}
      </>
      <>
        {step === 5 && business && (
          <>
            <Form.Group className="mb-4">
              <Form.Label className="mb-2 fz-16">Business Types</Form.Label>
              <Select
                className="mb-4 form-control"
                styles={{ background: "transparent" }}
                value={selectedBusinessType}
                onChange={handleBusinessTypeChange}
                options={options}
                isMulti={true}
                required
              />
            </Form.Group>

            {/* {selectedBusinessType &&
              selectedBusinessType.length > 0 &&
              selectedBusinessType.map((item) => (
                <Form.Group className="mb-4">
                  <div className="d-flex flex-row align-items-center row-gap-3">
                    <Form.Label className="inline-label-layout">
                      {item.label}
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Discount"
                      value={selectedBusinessDiscounts[item.value] || ""}
                      onChange={(e) => {
                        setSelectedBusinessDiscounts((prevValues) => ({
                          ...prevValues,
                          [item.value]: e.target.value,
                        }));
                      }}
                      // value={}
                      // onChange={handleFullNameChange}
                      // onBlur={handleFullnameValidation}
                      required
                    />
                  </div>
                </Form.Group>
              ))} */}
            {selectedBusinessType.map((type) => (
              <div key={type.value} className="mb-4">
                <label>{type.label}</label>
                <input
                  type="text"
                  value={
                    selectedBusinessDiscounts.find(
                      (d) => d.business_type === type.value
                    )?.discount || ""
                  }
                  onChange={(e) => {
                    const updatedDiscounts = [...selectedBusinessDiscounts];
                    const index = updatedDiscounts.findIndex(
                      (d) => d.business_type === type.value
                    );
                    if (index !== -1) {
                      updatedDiscounts[index] = {
                        ...updatedDiscounts[index],
                        discount: e.target.value,
                      };
                    } else {
                      updatedDiscounts.push({
                        business_type: type.value,
                        discount: e.target.value,
                      });
                    }
                    setSelectedBusinessDiscounts(updatedDiscounts);
                  }}
                />
              </div>
            ))}
          </>
        )}
      </>

      <>
        {step === 3 && !business ? (
          <button
            className="btn btn-primary w-100"
            type="submit"
            disabled={buttonDisable}
          >
            Register Now
          </button>
        ) : (
          <>
            {step === 5 ? (
              <button
                className="btn btn-primary w-100"
                type="submit"
                disabled={buttonDisable}
              >
                Register Now
              </button>
            ) : (
              <button
                className="btn btn-primary w-100"
                onClick={() => handleformNavigation("NEXT")}
                disabled={buttonDisable}
              >
                Next
              </button>
            )}
          </>
        )}
      </>
    </Form>
  );
};

export default RegisterForm;
