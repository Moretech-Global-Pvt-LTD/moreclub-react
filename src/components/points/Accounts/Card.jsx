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
import { set } from "lodash";

const AddCardaccounts = ({ onfinish }) => {
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
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
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
      message.success("Card Added Successfully");
      onfinish();
    } catch (error) {
      message.error(error.response?.data?.errors?.non_field_errors[0] || "Error adding Card")
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
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
      <div className="d-flex justify-content-end gap-2">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() => {
            onfinish();
          }}
          className="mt-3"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          size="sm"
          disabled={
            loading ||
            accountNameHolderError ||
            cardNumberError ||
            cvcError ||
            expiryError ||
            accountNameHolder === "" ||
      cardNumber === ""||
      cvc === ""||
      expiry=== "" 
          }
          className="mt-3"
        >
          {loading && (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          )}{" "}
          Add Card
        </Button>
      </div>
    </Form>
  );
};

export default AddCardaccounts;
