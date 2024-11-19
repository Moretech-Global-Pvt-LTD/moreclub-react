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
import { set } from "lodash";

const AddPaypalaccounts = ({onfinish}) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError]= useState("");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
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
      onfinish();
      dispatch(fetchMethodCredentials());
      message.success("Paypal accound added successfully")
    } catch (error) {
      message.error(error.response?.data?.errors?.non_field_errors[0] || "Error adding account")
    }finally{
      setLoading(false);
    }
  }

  return (      
        <Form onSubmit={handleSubmit}>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {emailError && <p className="text-danger" style={{fontSize:"10px"}}>{emailError} </p>}
          
          <div className="d-flex justify-content-end gap-2">

          <Button type="button" variant="secondary" size="sm" onClick={()=>{onfinish()}}  className="mt-3">
            Cancel
          </Button>
          <Button type="submit" size="sm" disabled={email === ""} className="mt-3">
           {loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>} Add account
          </Button>
          </div>
        </Form>
 
  );
};

export default AddPaypalaccounts;
