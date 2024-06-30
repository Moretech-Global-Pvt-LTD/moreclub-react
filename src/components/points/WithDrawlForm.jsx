import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { currencyConvertor } from "../../redux/api/CurrencyConvertorAPI";
import { axiosInstance } from "../..";
import { baseURL } from "../../config/config";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { getWallet } from "../../redux/api/wallets";
import CurrencyInput from "../ui/CurrencyInput";

const WithDrawalForm = () => {
  const [step, setStep] = useState(1);
  const [withDrawalAmount, setTransferAmount] = useState("");
  const [withdrawError, setwithdrawError] = useState("");
  const [convertedRate, setCovertedRate] = useState();
  const [currency, setCurrency] = useState("");
  const [method, setMethod] = useState("");
  const [methodList, setMethodList] = useState(null);

  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(" ");

  const [ConfirmationData, setConfirmationData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [transferdata, setTransferdata] = useState(null);
  const currencyData = useSelector(
    (state) => state.currencyReducer.currencyDetail
  );

  // const user = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const fetchMethod = async () => {
    try {
      const res = await axios.get(`${baseURL}withdrawal/methods/`);
      setMethodList(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMethod();
    // fetchCountry();
  }, []);

  const handleMethodchange = async (event) => {
    const value = event.target.value;
    setMethod(value);
  };

  const handleTransferSubmit = async (event) => {
    event.preventDefault();

    const data = {
      currency_code: currency,
      amount: withDrawalAmount,
      payment_method: method,
      pin,
    };

    try {
      setIsLoading(true);
      const res = await axiosInstance.post(`${baseURL}wallets/wallet/`, data);
      setTransferdata(res.data.data);
      setIsLoading(false);
      setStep(3);
      dispatch(getWallet());
    } catch (err) {
      setIsLoading(false);
      const errors = err.response?.data?.errors?.non_field_errors;
      message.error(errors[0]);
      dispatch(getWallet());
      // console.log(errors[0]);
    }
  };

  const handleConfirmation = async () => {
    const data = {
      currency_code: currency,
      amount: withDrawalAmount,
    };

    // Reset form fields
    try {
      setIsLoading(true);
      const res = await axiosInstance.post(`${baseURL}withdrawal/check/`, data);
      setConfirmationData(res.data.data);
      setIsLoading(false);
      setStep(2);
    } catch (err) {
      const errors = err.response.data.errors.non_field_errors;
      message.error(errors);
      message.error(errors);
      setIsLoading(false);
    }
  };

  const handlePIn = async (e) => {
    const value = e.target.value;
    if (value.trim() !== "") {
      setPinError("");
    } else {
      setPinError("Pin required");
    }
  };

  // const handlePrint = () => {
  //   const content = document.getElementById("coin-receipt").innerHTML;
  //   const originalDocument = document.body.innerHTML;

  //   document.body.innerHTML = content;
  //   window.print();
  //   document.body.innerHTML = originalDocument;
  // };

  return (
    <Form onSubmit={handleTransferSubmit}>
      {step === 1 && (
        <>
          <Form.Group controlId="withDrawalAmount">
            <Form.Label>Amount to Withdraw</Form.Label>
            <CurrencyInput
              amount={withDrawalAmount}
              setAmount={setTransferAmount}
              convertedRate={convertedRate}
              setConvertedRate={setCovertedRate}
              currency={currency}
              setCurrency={setCurrency}
              error={withdrawError}
              setError={setwithdrawError}
            />

            {/* <div className="d-flex  align-items-center">
              <Form.Control
                as="select"
                value={currency}
                onChange={handleCurrencychange}
                style={{ width: "4rem", marginRight: "4px" }}
                required
              >
                {currencyList &&
                  currencyList.map((bt) => (
                    <option value={bt.code} key={bt.id}>
                      {bt.code}
                    </option>
                  ))}
              </Form.Control>
              <Form.Control
                type="number"
                value={withDrawalAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                required
              />
              <div
                className="text-dynamic-white"
                style={{ width: "8rem", marginLeft: "4px", marginRight: "4px" }}
              >
                {showConversion && (
              <>
                {"="}&nbsp;{currencyData.symbol};&nbsp;{convertedRate}
              </>
            )}

              </div>
            </div> */}
          </Form.Group>

          <Form.Group controlId="withDrawalmethod">
            <Form.Label>WithDraw Method</Form.Label>
            <Form.Control
              as="select"
              value={method}
              onChange={handleMethodchange}
              required
            >
              <option value="">select the method</option>
              {methodList &&
                methodList.map((bt) => (
                  <option value={bt.code} key={bt.name}>
                    {bt.name}
                  </option>
                ))}
            </Form.Control>
          </Form.Group>

          <Button variant="primary" onClick={handleConfirmation}>
            WithDraw
          </Button>
        </>
      )}
      {step === 2 && (
        <>
          <div className="nft-card card p-2 col-12 col-md-8 mb-2 ms-1 me-1 mx-md-auto">
            <div className="bg-dynamic-black mb-1">
              <p
                className=" mb-0 mt-0 text-center text-success"
                style={{ fontSize: "12px" }}
              >
                You are Withdrawing
              </p>
              <h1 className="text-center mb-0 mt-0">
                <span style={{ fontSize: "12px" }}>{currency}&nbsp;</span>
                {ConfirmationData?.amount}
              </h1>
              <p
                className=" mb-0 mt-0 text-center text-success"
                style={{ fontSize: "12px" }}
              >
                Withdrawal Money {"="}&nbsp;{currencyData.symbol}&nbsp;
                {convertedRate}
              </p>
            </div>
            <div className="d-flex justify-content-between">
              {" "}
              <p className="mb-0 fw-bold">Username:</p>
              <p className="mb-0">{ConfirmationData?.username}</p>
            </div>
            <div className="d-flex justify-content-between">
              {" "}
              <p className="mb-0 fw-bold">Receiver:</p>
              <p className="mb-0">
                {ConfirmationData?.first_name}&nbsp;
                {ConfirmationData?.last_name}
              </p>{" "}
            </div>
            <div className="d-flex justify-content-between">
              {" "}
              <p className="mb-0 fw-bold">Payment method:</p>
              <p className="mb-0">{method}</p>{" "}
            </div>
          </div>
          <div className="nft-card card p-2 col-12 col-md-8 ms-1 me-1 mx-md-auto">
            <div className="d-flex justify-content-between">
              {" "}
              <p className="mb-0 fw-bold">Total Paying Money:</p>
              <p className="mb-0">
                {currency}&nbsp;{ConfirmationData?.amount}
              </p>{" "}
            </div>
          </div>
          <Form.Group controlId="pin">
            <Form.Label>Enter PIN</Form.Label>
            <Form.Control
              type="number"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              onBlur={handlePIn}
              min={0}
              maxLength={4}
              max={9999}
              required
            />
            {pinError && <p className="text-danger">{pinError}</p>}
          </Form.Group>
          <Button variant="primary" type="submit">
            {isLoading && (
              <span className="spinner-border spinner-border-sm text-danger"></span>
            )}
            &nbsp;Confirm Pin
          </Button>
        </>
      )}
      {step === 3 && <>handleBlurConfirmPin</>}
    </Form>
  );
};

export default WithDrawalForm;
