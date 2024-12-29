import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setCard,
  setConversion,
  setMethod,
  setPaypal,
  setSwiss,
  setWithdrawalAmount,
  setWithdrawalStep,
} from "../../../redux/slices/WithDrawalSlice";

import { message } from "antd";

import { baseURL } from "../../../config/config";
import { axiosInstance } from "../../..";
import { getWallet } from "../../../redux/api/wallets";
import { useNavigate } from "react-router-dom";
import PINInput from "../../ui/GridPinInput";
import { fetchNewNotifications } from "../../../redux/api/notificationApi";

const ConfirmationForm = () => {
  const dispatch = useDispatch();
  const withdrawaldata = useSelector((state) => state.withdrawalReducer);
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState("");

  const currencyData = useSelector(
    (state) => state.currencyReducer.currencyDetail
  );

  

  const handlePInChange = async (newPin) => {
    const value = newPin;
    setPin(value)
    let timeOut
    setTimeout(()=>{
      if (value.trim() !== "") {
        setPinError("");
      } else {
        setPinError("Pin required");
      }
    },2000)

    clearTimeout(timeOut)

  };

  

  const uploadWithDrawalreq = async (data) => {
    try {
      setIsLoading(true);
      await axiosInstance.post(
        `${baseURL}withdrawal/withdraw/`,
        data
      );
      
      message.success("Money withdrawn successfully")
      setIsLoading(false);
      dispatch(setConversion(""));
      dispatch(setMethod(""));
      dispatch(setWithdrawalAmount(0));
      dispatch(setSwiss(""))
      dispatch(setPaypal(""));
      dispatch(setCard(null));
      dispatch(setWithdrawalStep(1));
      dispatch(getWallet());
      navigate('/wallet')
      dispatch(fetchNewNotifications())
    } catch (err) {
      setIsLoading(false);
      const errors = err.response?.data?.errors?.non_field_errors[0];
      message.error(errors);
      dispatch(getWallet());
    }
  };

  const handleTransferSubmit = async (e) => {
    e.preventDefault();

    if (withdrawaldata.method === "paypal") {
      const data = {
        currency_code: withdrawaldata.currency,
        amount: withdrawaldata.withdrawalAmount,
        payment_method: withdrawaldata.method,
        paypal: { email: withdrawaldata.paypal },
        pin: pin,
      };
      await uploadWithDrawalreq(data);
    } else if (withdrawaldata.method === "swish") {
      const data = {
        currency_code: withdrawaldata.currency,
        amount: withdrawaldata.withdrawalAmount,
        payment_method: withdrawaldata.method,
        swish: { phone_number: withdrawaldata.swiss },
        pin: pin,
      };
      await uploadWithDrawalreq(data);
    } else if (withdrawaldata.method === "card") {
      const data = {
        currency_code: withdrawaldata.currency,
        amount: withdrawaldata.withdrawalAmount,
        payment_method: withdrawaldata.method,
        card: {
          account_holder: withdrawaldata.card.account_holder,
          card_no: withdrawaldata.card.card_no,
          cvc: withdrawaldata.card.cvc,
          expiry_month: withdrawaldata.card.expiry_month,
          expiry_year: withdrawaldata.card.expiry_year,
        },
        pin: pin,
      };
      await uploadWithDrawalreq(data);
    }
  };

  return (
    <Form onSubmit={handleTransferSubmit} style={{ maxWidth: "500px" }}>
      <div className="nft-card card p-2 col-12 col-md-8 mb-2 ms-1 me-1 mx-auto mx-md-0">
        <div className="bg-dynamic-black mb-1">
          <p
            className=" mb-0 mt-0 text-center text-success"
            style={{ fontSize: "12px" }}
          >
            You are Withdrawing
          </p>
          <h1 className="text-center mb-0 mt-0">
            <span style={{ fontSize: "12px" }}>
              {withdrawaldata.currency}&nbsp;
            </span>
            {withdrawaldata.withdrawalAmount}
          </h1>
          <p
            className=" mb-0 mt-0 text-center text-success"
            style={{ fontSize: "12px" }}
          >
            Withdraw Money{currencyData.symbol}&nbsp;{withdrawaldata.conversion}
          </p>
        </div>
        <div className="d-flex justify-content-between">
          {" "}
          <p className="mb-0 fw-bold">Method:</p>
          <p className="mb-0">{withdrawaldata.method}</p>
        </div>
        {withdrawaldata.method === "paypal" && (
          <div className="d-flex justify-content-between">
            {" "}
            <p className="mb-0 fw-bold">Paypal Account:</p>
            <p className="mb-0">{withdrawaldata.paypal}&nbsp;</p>{" "}
          </div>
        )}
        {withdrawaldata.method === "swish" && (
          <div className="d-flex justify-content-between">
            {" "}
            <p className="mb-0 fw-bold">Swish Account:</p>
            <p className="mb-0">{withdrawaldata.swiss}&nbsp;</p>{" "}
          </div>
        )}
        {withdrawaldata.method === "card" && (
          <>
            <div className="d-flex justify-content-between">
              <p className="mb-0 fw-bold">Account:</p>
              <p className="mb-0">
                {withdrawaldata.card.account_holder}&nbsp;
              </p>{" "}
            </div>
            <div className="d-flex justify-content-between">
              <p className="mb-0 fw-bold">Card No:</p>
              <p className="mb-0">{withdrawaldata.card.card_no}&nbsp;</p>{" "}
            </div>
          </>
        )}
      </div>

      <Form.Group controlId="pin">
        <Form.Label>Enter PIN</Form.Label>
        <PINInput length={4} value={pin} onChange={handlePInChange} error={pinError} />
      </Form.Group>
      <Button
        variant="secondary"
        className="mt-4 me-2"
        onClick={(e) => {
          e.preventDefault();
          dispatch(setWithdrawalStep(2));
        }}
      >
        Back
      </Button>
      <Button
        variant="primary"
        type="submit"
        className="mt-4 me-2"
        disabled={pin?.trim() === "" || pinError?.trim() !== ""}
      >
        {isLoading && (
          <span className="spinner-border spinner-border-sm text-danger"></span>
        )}
        &nbsp;Confirm
      </Button>
    </Form>
  );
};

export default ConfirmationForm;
