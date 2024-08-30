import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { axiosInstance } from "../../..";
import { baseURL } from "../../../config/config";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useDispatch } from "react-redux";
import {
  setPurchaseConversion,
  setPurchaseCurrency,
  updatePurchaseAmount,
} from "../../../redux/slices/PurchaseSlice";
import CurrencyInput from "../../ui/CurrencyInput";
import PINInput from "../../ui/GridPinInput";

function PurchaseForm() {
  const [purchaseAmount, setPurchaseAmount] = useState("");
  const [purchaseError, setPurchaseError] = useState("");
  const [currency, setCurrency] = useState("");
  const [convertedRate, setConvertedRate] = useState(0);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updatePurchaseAmount(purchaseAmount));
  }, [purchaseAmount, dispatch]);

  useEffect(() => {
    dispatch(setPurchaseCurrency(currency));
  }, [currency, dispatch]);

  useEffect(() => {
    dispatch(setPurchaseConversion(convertedRate));
  }, [convertedRate, dispatch]);

  const handlePInChange = async (newPin) => {
    const value = newPin;
    setPin(value);
    let timeOut;
    setTimeout(() => {
      if (value.trim() !== "") {
        setPinError("");
      } else {
        setPinError("Pin required");
      }
    }, 2000);

    clearTimeout(timeOut);
  };

  const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handlePurchaseSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = {
        currency_code: currency,
        amount: purchaseAmount,
        pin: pin,
      };
      const res = await axiosInstance.post(
        `${baseURL}wallets/verify/points/request/`,
        data
      );
      if (res.data.success) {
        const frontnumber = await generateRandomNumber(11111, 99999);
        const lastnumber = await generateRandomNumber(11111, 99999);
        const encodedid = `${frontnumber}${convertedRate}${lastnumber}`;
        navigate(`/points/buy/${encodedid}`);
      }
    } catch (err) {
      message.error(err.response.data.errors.non_field_errors[0]);
    }
  };

 

  return (
    <Form onSubmit={handlePurchaseSubmit}>
      <Form.Group controlId="purchaseAmount">
        <Form.Label>Amount to Purchase</Form.Label>
        <CurrencyInput
          amount={purchaseAmount}
          setAmount={setPurchaseAmount}
          convertedRate={convertedRate}
          setConvertedRate={setConvertedRate}
          currency={currency}
          setCurrency={setCurrency}
          error={purchaseError}
          setError={setPurchaseError}
        />
      </Form.Group>

      <Form.Group controlId="pin" className="mt-4">
        <Form.Label>Enter PIN</Form.Label>
        <PINInput length={4} value={pin} onChange={handlePInChange} error={pinError}/>
      </Form.Group>

      <Button
        variant="primary"
        className="mt-4"
        type="submit"
        disabled={
          purchaseAmount.trim() === "" ||
          purchaseAmount === "0" ||
          pin.trim() === "" ||
          pinError.trim() !== ""
        }
      >
        Load Money
      </Button>
    </Form>
  );
}

export default PurchaseForm;
