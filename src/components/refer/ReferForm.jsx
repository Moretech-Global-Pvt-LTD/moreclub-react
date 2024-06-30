import React, { useState} from "react";
import { axiosInstance } from "../..";

import { baseURL } from "../../config/config";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ReferForm = () => {
  const [referCode, setReferCode] = useState("");
  const [referError, setreferError] = useState("");
  const navigate= useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(referCode);
    const data = {
      code: referCode,
    };

    try {
      const res = axiosInstance.post(
        `${baseURL}referral/apply/`,
        data
      );
      navigate('/dashboard')
      console.log("refer", res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSkip = async (e) => {
    e.preventDefault();
   
    try {
      const res = axiosInstance.post(
        `${baseURL}referral/apply/`,
        {
          skip: true,
        }
      );
      console.log("refer", res);
      navigate('/dashboard')
    } catch (err) {
      console.log(err);
    }
  };

  const handleReferchange = async (e) => {
    e.preventDefault();
    const value = e.target.value;
    setReferCode(value);
  };

  const handleReferValidation = async (e) => {
    e.preventDefault();
    const value = e.target.value;
    if (value.trim() !== "") {
      setReferCode(value);
      setreferError("");
    } else {
      setreferError("Code is Required");
    }
  };

  return (
    <div className="refer-card nft-card card p-2">
        <p className="text-warning text-center" >This is one time opprtunity.<br></br> Only Skip if you dont have any Referal Code</p>
      <Form>
        <Form.Group className="mb-4">
          <Form.Label className="mb-3">Refer Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Refer Code"
            value={referCode}
            className="refer-input"
            onChange={handleReferchange}
            onBlur={handleReferValidation}
            required
          />
          {referError && <p className="text-danger">{referError}</p>}
        </Form.Group>
        <div className="d-flex g-2 items-center justify-content-end">
        <button className="btn btn-secondary btn-sm me-4" onClick={handleSkip}>Skip</button>
        <button className="btn btn-primary btn-sm " onClick={handleSubmit} disabled={referCode.trim()==="" || referError.trim()===""} >
          Submit
        </button>
        </div>
      </Form>
    </div>
  );
};

export default ReferForm;
