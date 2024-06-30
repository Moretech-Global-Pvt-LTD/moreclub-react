import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { axiosInstance } from "../../..";
import { baseURL } from "../../../config/config";
import Swish from "../../../images/Payments/swish.png";
import { validatePhoneNumber } from "../../../validation/addaccountvalidation";
import { useDebounce } from "../../../Hooks/useDebounce";
import { useDispatch } from "react-redux";
import { fetchMethodCredentials } from "../../../redux/api/userAccountAPI";
import { message } from "antd";

const AddSwishaccounts = () => {
  const [phonenumber, setPhoneNumber] = useState("");

  const [phoneNumberError, setPhoneNumberError]= useState("");

  const debouncedPhoneNumber = useDebounce(phonenumber, 500);
  const dispatch= useDispatch();

  useEffect(() => {
    if (debouncedPhoneNumber) {
      setPhoneNumberError(validatePhoneNumber(debouncedPhoneNumber));
    } else {
      setPhoneNumberError('');
    }
  }, [debouncedPhoneNumber, phonenumber]);


  async function handleSubmit(event) {
    event.preventDefault();
    const data = {
      payment_method: "swish",
      phone_number: phonenumber,
    };
    try {
      const res = await axiosInstance.post(
        `${baseURL}withdrawal/user/method/`,
        data
      );
      dispatch(fetchMethodCredentials());
      setPhoneNumber("");
      setPhoneNumberError("");
      message.success("Swish account added Successfully")
    } catch (error) {
      message.error("Error adding account")
      console.log(error);
    }
  }

  return (
    <div className="card p-2" style={{ maxWidth: "300px" }}>
        <img
          src={Swish}
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
        <h4 className="text-center">Add Swish</h4>
        <Form onSubmit={handleSubmit}>
            <Form.Label>Swish Id</Form.Label>
          <Form.Control
            type="text"
            value={phonenumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Phonenumber with country code"
            required
          />
          {phoneNumberError && <p className="text-danger" style={{fontSize:"10px"}}>{phoneNumberError} </p>}
          <Button type="submit" className="mt-3" disabled={phonenumber === "" || phoneNumberError !== ""}>
            Add Swish Account
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddSwishaccounts;
