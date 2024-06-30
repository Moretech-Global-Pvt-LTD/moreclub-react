import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import {
  currentStep,
  updateFormData,
} from "../../../../redux/slices/RegisterSlice";
import { Button } from "react-bootstrap";
import { hostURL } from "../../../../config/config";

const UserSecondForm = ({ handleSubmit, loading }) => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.registerReducer.formData);
  const [passwordShow, setPasswordShow] = useState(false);
  const [cpasswordShow, setcPasswordShow] = useState(false);

  const [user_type, setUserType] = useState(formData?.user_type ?? "");
  //step 2 variable for Error

  const [user_typeError, setUser_typeError] = useState("");

  //step 3
  const [password, setPassword] = useState(formData?.password ?? "");
  const [confirmPassword, setConfirmPassword] = useState(
    formData?.password ?? ""
  );

  // const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  //step 3 variable for Error
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  // const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const timeoutRef = useRef(null);

  // for user_type
  const handleUserTypeChange = async (event) => {
    setUserType(event.target.value);
    dispatch(updateFormData({ user_type: event.target.value }));
  };

  //for user_type validation
  const handleUserTypeValidation = async (event) => {
    const value = event.target.value;
    if (value.trim() === "") {
      setUser_typeError("Please choose User Type");
    } else {
      dispatch(updateFormData({ user_type: value }));
      setUser_typeError("");
    }
  };

  //for gender change

  // for password
  const handlePasswordChange = async (event) => {
    setPassword(event.target.value);
    dispatch(updateFormData({ password: event.target.value }));
    await handlePasswordValidation(event);
  };

  // for password validation
  const handlePasswordValidation = async (event) => {
    const value = event.target.value;
    const passwordPattern = /^(?!.*[\s`\-_+=<>]).{8,}$/;
    if (!passwordPattern.test(value)) {
      setPasswordError("At least 8 character long is required");
    } else {
      dispatch(updateFormData({ password: value }));
      setPasswordError("");
    }
  };

  // handle confirm password
  const handleConfirmPasswordChange = async (event) => {
    setConfirmPassword(event.target.value);
    const cpass = event.target.value;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set a new timeout
    timeoutRef.current = setTimeout(() => {
      handleConfimrPasswordblur(cpass);
    }, 2000);
  };

  // for confirm password validation
  const handleConfimrPasswordblur = async (cpass) => {
    if (cpass !== password) {
      setConfirmPasswordError("Confirm Password doesnot match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleAgreementChange = (event) => {
    setAgreedToTerms(event.target.checked);
  };

  const togglePassword = () => {
    setPasswordShow(!passwordShow);
  };
  const togglecPassword = () => {
    setcPasswordShow(!cpasswordShow);
  };

  const handleNextStep = (value) => {
    dispatch(currentStep(value));
  };

  return (
    <>
      <span
        className={`register-form-container  register-form-wrapper register-headings pe-2 ps-2`}
      >
        <h1>Let&apos;s finish up the registration...</h1>
        <p>You can always change them later.</p>
      </span>
      <button
        className="btn btn-link btn-sm "
        onClick={() => handleNextStep(1)}
      >
        Back
      </button>

      <Form.Group controlId="userSelect" className="register-form-container">
        <Form.Label>User Type</Form.Label>
        <Form.Control
          as="select"
          value={user_type}
          onChange={handleUserTypeChange}
          onBlur={handleUserTypeValidation}
          required
        >
          <option value="">Select User Type</option>
          <option value="NORMAL">Personal</option>
          <option value="BUSINESS">Business</option>
        </Form.Control>
        {user_typeError && <p className="text-danger">{user_typeError}</p>}
      </Form.Group>
      <Form.Group className="register-form-container ">
        <Form.Label>Password</Form.Label>
        <Form.Group className="password-container form-group w-100 ">
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
            onChange={handlePasswordChange}
            required
          />
        </Form.Group>
        {passwordError && <p className="text-danger">{passwordError}</p>}
      </Form.Group>

      <Form.Group className="register-form-container password-container form-group ">
        <label
          className="label-psswd"
          onClick={togglecPassword}
          htmlFor="Confirm-Password"
        >
          {" "}
          {cpasswordShow ? "Hide" : "Show"}
        </label>
        <Form.Control
          type={cpasswordShow ? "text" : "password"}
          id="Confirm-Password"
          placeholder="Confirm-Password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          required
        />
      </Form.Group>
      {confirmPasswordError && (
        <p className="text-danger">{confirmPasswordError}</p>
      )}

      <Form.Group className="d-flex gap-2 align-items-baseline">
        
        <Form.Check
          className="mb-4"
          type="checkbox"
          id="rememberMe"
          label="I agree to all terms & conditions."
          checked={agreedToTerms}
          onChange={handleAgreementChange}
          required
        />
        <a href={`${hostURL}/terms`} target='_blank' className="text-warning" style={{fontSize:"12px"}}>Read&nbsp;<i class="bi bi-eye"></i></a>
      </Form.Group>

      <button
        className="btn btn-primary m-4 "
        disabled={
          loading ||
          user_type.trim() === "" ||
          user_typeError !== "" ||
          password.trim() === "" ||
          confirmPassword.trim() === "" ||
          passwordError !== "" ||
          confirmPasswordError !== "" ||
          agreedToTerms === false ||
          formData.user_type === "" ||
          formData.gender === "" ||
          formData.password === ""
        }
        onClick={handleSubmit}
      >
        {loading ? (
          <span
            class="spinner-border spinner-border-sm text-danger"
            role="status"
          ></span>
        ) : (
          "Register"
        )}
      </button>
    </>
  );
};

export default UserSecondForm;
