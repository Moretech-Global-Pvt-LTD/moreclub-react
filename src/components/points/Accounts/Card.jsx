import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { axiosInstance } from "../../..";
import { baseURL } from "../../../config/config";
import Card from "../../../images/Payments/cards.png";
import {
  validateAccountName,
  validateCVC,
  validateCardNumber,
} from "../../../validation/addaccountvalidation";
import { useDebounce } from "../../../Hooks/useDebounce";
import { useDispatch } from "react-redux";
import { fetchMethodCredentials } from "../../../redux/api/userAccountAPI";
import { message } from "antd";

const AddCardaccounts = () => {
  const [accountNameHolder, setAccountNameHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvc, setCvc] = useState("");
  const [expiry, setExpiry] = useState("");
  const [accountNameHolderError, setAccountNameHolderError] = useState("");
  const [cardNumberError, setCardNumberError] = useState("");
  const [cvcError, setCvcError] = useState("");
  const [expiryError, setExpiryError] = useState("");
  const [expired, setExpired] = useState("");
  const dispatch = useDispatch();

  const debouncedAccountName = useDebounce(accountNameHolder, 500);
  const debouncedCardNumber = useDebounce(cardNumber, 500);
  const debouncedCvc = useDebounce(cvc, 500);
  const debouncedExpiry = useDebounce(expiry, 500);

  useEffect(() => {
    if (debouncedAccountName) {
      setAccountNameHolderError(validateAccountName(debouncedAccountName));
    } else {
      setAccountNameHolderError("");
    }
  }, [debouncedAccountName, accountNameHolder]);

  useEffect(() => {
    if (debouncedCardNumber) {
      setCardNumberError(validateCardNumber(debouncedCardNumber));
    } else {
      setCardNumberError("");
    }
  }, [debouncedCardNumber, cardNumber]);

  useEffect(() => {
    if (debouncedCvc) {
      setCvcError(validateCVC(debouncedCvc));
    } else {
      setCvcError("");
    }
  }, [debouncedCvc, cvc]);

  useEffect(() => {
    if (debouncedExpiry) {
      setExpiryError(validateExpiry(debouncedExpiry));
    } else {
      setExpiryError("");
    }
  }, [debouncedExpiry, expiry]);

  // useEffect(() => {
  //   validateExpiry(debouncedExpiry);
  // }, [debouncedExpiry]);

  const handleExpiryChange = (e) => {
    let expiryValue = e.target.value;
    expiryValue = expiryValue.replace(/\D/g, "");
    if (expiryValue.length > 2 && expiryValue.charAt(2) !== "/") {
      expiryValue = expiryValue.slice(0, 2) + "/" + expiryValue.slice(2);
    }
    setExpiry(expiryValue);
  };

  const validateExpiry = (expiry) => {
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiry) {
      setExpiryError("Expiry date is required");
      return;
    }
    if (!expiryRegex.test(expiry)) {
      setExpiryError("Invalid expiry date");
      return;
    }
    setExpiryError("");
    setExpired(isExpired(expiry));
  };

  const isExpired = (expiry) => {
    if (!expiry) return false;
    const [month, year] = expiry.split("/");
    
    const expiryDate = new Date(parseInt("20" + year), parseInt(month) - 1, 1);
    const currentDate = new Date();
    return expiryDate < currentDate;
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const [month, year] = expiry.split("/");
    const data = {
      payment_method: "card",
      account_holder: accountNameHolder,
      card_no: cardNumber,
      cvc: cvc,
      expiry_month: month,
      expiry_year: year,
    };
    
    try {
      const res = await axiosInstance.post(
        `${baseURL}withdrawal/user/method/`,
        data
      );
      dispatch(fetchMethodCredentials());
      setAccountNameHolder("");
      setCardNumber("");
      setCvc("");
      setExpiry("");
      setAccountNameHolderError("");
      setCardNumberError("");
      setCvcError("");
      setExpiryError("");
      setExpired("");
      message.success("Card Added Successfully")
    } catch (error) {
      message.error("error Adding card ")
      console.log(error);
    }
  }

  return (
    <div className="card p-2" style={{ maxWidth: "300px" }}>
      <img
        src={Card}
        style={{
          width: "45px",
          height: "45px",
          objectFit: "contain",
          backgroundColor: "#fff",
          margin: "auto",
        }}
        alt="paypal"
        className="img-fluid rounded-circle mb-3 profile-image"
      />
      <div>
        <h4 className="text-center">Add Card</h4>
        <Form onSubmit={handleSubmit}>
          <Form.Label>Account Name </Form.Label>
          <Form.Control
            type="text"
            value={accountNameHolder}
            onChange={(e) => setAccountNameHolder(e.target.value)}
            required
          />
          {accountNameHolderError && (
            <p className="text-danger" style={{ fontSize: "10px" }}>
              {accountNameHolderError}
            </p>
          )}
          <Form.Label>Card Number</Form.Label>
          <Form.Control
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />
          {cardNumberError && (
            <p className="text-danger" style={{ fontSize: "10px" }}>
              {cardNumberError}
            </p>
          )}
          <Form.Label>CVC Number</Form.Label>
          <Form.Control
            type="number"
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
            required
          />
          {cvcError && (
            <p className="text-danger" style={{ fontSize: "10px" }}>
              {cvcError}
            </p>
          )}
          <Form.Label>ExpiryDate</Form.Label>
          <Form.Control
            type="text"
            value={expiry}
            onChange={handleExpiryChange}
            placeholder="MM/YY"
            maxLength={5}
            required
          />
          {expiryError && (
            <p className="text-danger" style={{ fontSize: "10px" }}>
              {expiryError}
            </p>
          )}
          {expired && (
            <p className="text-danger" style={{ fontSize: "10px" }}>
              {"date seems to be expired"}
            </p>
          )}
          <Button type="submit" className="mt-3">
            Add Paypal Account
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddCardaccounts;

// const useDebounce = (value, delay) => {
//     const [debouncedValue, setDebouncedValue] = useState(value);

//     useEffect(() => {
//       const handler = setTimeout(() => {
//         setDebouncedValue(value);
//       }, delay);

//       return () => {
//         clearTimeout(handler);
//       };
//     }, [value, delay]);

//     return debouncedValue;
//   };

//   // Validation functions
//   const validateAccountName = (name) => {
//     if (!name) return "Account name is required";
//     if (name.length < 3) return "Account name must be at least 3 characters";
//     return "";
//   };

//   const validateCardNumber = (number) => {
//     const regex = /^\d{16}$/;
//     if (!number) return "Card number is required";
//     if (!regex.test(number)) return "Card number must be 16 digits";
//     return "";
//   };

//   const validateCVC = (cvc) => {
//     const regex = /^\d{3,4}$/;
//     if (!cvc) return "CVC is required";
//     if (!regex.test(cvc)) return "CVC must be 3 or 4 digits";
//     return "";
//   };

//   const validateExpiry = (expiry) => {
//     if (!expiry) return "Expiry date is required";
//     const now = new Date();
//     const expDate = new Date(expiry);
//     if (expDate < now) return "Expiry date must be in the future";
//     return "";
//   };
