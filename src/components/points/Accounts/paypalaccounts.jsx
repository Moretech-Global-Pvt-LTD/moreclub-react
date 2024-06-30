import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { axiosInstance } from "../../..";
import { baseURL } from "../../../config/config";
import Paypal from "../../../images/Payments/Paypal.png";
import { useDebounce } from "../../../Hooks/useDebounce";
import { validateEmail } from "../../../validation/addaccountvalidation";
import { useDispatch } from "react-redux";
import { fetchMethodCredentials } from "../../../redux/api/userAccountAPI";
import { message } from "antd";

const AddPaypalaccounts = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError]= useState("");
  const dispatch = useDispatch();

  const debouncedEmail = useDebounce(email, 500);

  useEffect(() => {
    if (debouncedEmail) {
      setEmailError(validateEmail(debouncedEmail));
    } else {
      setEmailError('');
    }
  }, [debouncedEmail, email]);

  async function handleSubmit(event) {
    event.preventDefault();
    const data = {
      payment_method: "paypal",
      email: email,
    };
    try {
      const res = await axiosInstance.post(
        `${baseURL}withdrawal/user/method/`,
        data
      );
      setEmail("");
      setEmailError("");
      dispatch(fetchMethodCredentials());
      message.success("Paypal accound added successfully")
    } catch (error) {
      message.error("Error adding account")
      console.log(error);
    }
  }

  return (
    <div className="card p-2" style={{ maxWidth: "300px" }}>
        <img
          src={Paypal}
          style={{
            width: "45px",
            height: "45px",
            objectFit: "contain",
            backgroundColor: "#fff",
            margin:"auto"
          }}
          alt="paypal"
          className="img-fluid rounded-circle mb-3 profile-image"
          
        />
      <div>
        <h4 className="text-center">Add Paypal</h4>
        <Form onSubmit={handleSubmit}>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {emailError && <p className="text-danger" style={{fontSize:"10px"}}>{emailError} </p>}
          <Button type="submit" disabled={email === ""} className="mt-3">
            Add Paypal Account
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddPaypalaccounts;
