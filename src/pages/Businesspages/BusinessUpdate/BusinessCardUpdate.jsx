import React, { useEffect, useState } from "react";
import {  Form } from "react-bootstrap";
import { axiosInstance } from "../../..";
import { baseURL } from "../../../config/config";
import {
  validateAccountName,
  validateCVC,
  validateCardNumber,
} from "../../../validation/addaccountvalidation";
import { useDebounce } from "../../../Hooks/useDebounce";
import { message } from "antd";

const BussinessCardaccounts = ({ business }) => {
  const [accountNameHolder, setAccountNameHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvc, setCvc] = useState("");
  const [expiry, setExpiry] = useState("");
  const [accountNameHolderError, setAccountNameHolderError] = useState("");
  const [cardNumberError, setCardNumberError] = useState("");
  const [cvcError, setCvcError] = useState("");
  const [expiryError, setExpiryError] = useState("");
  const [expired, setExpired] = useState("");
  const [alreadyExists, setAlreadyExits] = useState(false);

  const fetchCardDetail = async () => {
    try {
      const res = await axiosInstance.get(`${baseURL}business/card/details/`);
      setAccountNameHolder(res.data?.data?.account_name_holder ?? "");
      setCardNumber(res.data.data.account_number ?? "");
      const expirydata = `${res.data.data.expiry_month ?? ""}/${
        res.data.data.expiry_year ?? ""
      }`;
      setExpiry(expirydata);
      setAlreadyExits(res.data.data.account_number ? true : false);
    } catch (err) {
      console.error("error", err);
    }
  };

  useEffect(() => {
    fetchCardDetail();
  }, []);

  const debouncedAccountName = useDebounce(accountNameHolder, 2000);
  const debouncedCardNumber = useDebounce(cardNumber, 2000);
  const debouncedCvc = useDebounce(cvc, 2000);
  const debouncedExpiry = useDebounce(expiry, 2000);

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
      validateExpiry(debouncedExpiry);
    } else {
      setExpiryError("");
    }
  }, [debouncedExpiry, expiry]);

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
    if (isExpired(expiry)) {
      setExpiryError("Expiry date has passed");
      return;
    }
    setExpiryError("");
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
      account_name_holder: accountNameHolder,
      account_number: cardNumber,
      cvc: cvc,
      expiry_month: month,
      expiry_year: year,
    };
    if (alreadyExists) {
      try {
        const res = await axiosInstance.patch(
          `${baseURL}business/card/details/`,
          data
        );
        message.success("card detail updated");
        setCvc("");

        // console.log(res);
      } catch (error) {
        message.success("error updating card detail");

        // console.log(error);
      }
    } else {
      try {
        const res = await axiosInstance.post(
          `${baseURL}business/card/details/`,
          data
        );
        message.success("card detail added");
        setCvc("");
      } catch (error) {
        message.success("error updating card detail");
      }
    }
  }

  return (
    <div className="card p-2 col-12 col-sm-10 col-md-8">
      <div>
        <h4 className="text-start">Card Detail</h4>
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

          <div className="col-12 mt-4">
            <button
              className="btn btn-primary w-100 rounded-pill"
              type="submit"
              disabled={accountNameHolderError !== ""||
                cardNumberError !== ""|| 
                cvcError !==""||
                expiryError !==""|| cvc === ""}
            >
              <i className="bi bi-sd-card-fill me-1" />
              Save card detail
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default BussinessCardaccounts;
