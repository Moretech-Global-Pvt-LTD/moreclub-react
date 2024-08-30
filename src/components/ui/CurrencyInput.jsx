import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setPurchaseCurrency,
  setPurchaseConversion,
} from "../../redux/slices/PurchaseSlice";
import { currencyConvertor } from "../../redux/api/CurrencyConvertorAPI";
import { axiosInstance } from "../..";

const CurrencyInput = ({
  amount,
  setAmount,
  convertedRate,
  setConvertedRate,
  currency,
  setCurrency,
  error,
  setError,
}) => {
  const dispatch = useDispatch();

  const [currencyList, setCurrencyList] = useState([]);
  const [rate, setRate] = useState(1);
  const [showConversion, setShowConversion] = useState(false);

  const currencyData = useSelector(
    (state) => state.currencyReducer.currencyDetail
  );

  const fetchCurrency = async () => {
    try {
      const res = await axiosInstance.get(`/user/currency/`);
      setCurrencyList(res.data.data.currency);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCurrency();
  }, []);

  useEffect(() => {
    const fetchUserCurrency = async () => {
      try {
        if (currencyList.length > 0) {
          const matchedCurrency = currencyList.find(
            (bt) => bt.default === true
          );
          if (matchedCurrency) {
            setCurrency(matchedCurrency.code);
            await dispatch(setPurchaseCurrency(matchedCurrency.code));
            const currency_res = await currencyConvertor(
              matchedCurrency.code,
              currencyData.currencyCode
            );
            setRate(currency_res);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserCurrency();
  }, [currencyList, dispatch, currencyData.currencyCode, setCurrency]);

  useEffect(() => {
    const setShowConvert = () => {
      if (currencyData.currencyCode && currency) {
        setShowConversion(currencyData.currencyCode !== currency);
      }
    };

    setShowConvert();
  }, [currency, currencyData.currencyCode]);

  useEffect(() => {
    if (amount > 0) {
      const convert = Math.ceil(amount * rate * 1000) / 1000;
      setConvertedRate(convert);
      dispatch(setPurchaseConversion(convert));
      setError("");
    } else if (amount === "") {
      setConvertedRate(0);
    } else {
      // setError("Amount must be greater than 0");
      setError("");
    }
  }, [rate, amount, dispatch, setConvertedRate, setError]);

  const handleCurrencyChange = async (event) => {
    const value = event.target.value;
    setCurrency(value);
    await dispatch(setPurchaseCurrency(value));
    const currency_res = await currencyConvertor(
      value,
      currencyData.currencyCode
    );
    setRate(currency_res);
  };

  const handleAmountChange = (event) => {
    const value = event.target.value;
    setAmount(value);
    setError("");  // Clear error on change
  };

  return (
    <>
      <div className="d-flex align-items-center">
        <Form.Control
          as="select"
          value={currency}
          onChange={handleCurrencyChange}
          style={{ width: "4rem", marginRight: "4px" }}
          required
        >
          {currencyList.map((bt) => (
            <option value={bt.code} key={bt.id}>
              {bt.code}
            </option>
          ))}
        </Form.Control>
        <Form.Control
          type="text"
          value={amount}
          onChange={handleAmountChange}
          required
        />
        <div
          className="text-dynamic-white"
          style={{ width: "8rem", marginLeft: "4px", marginRight: "4px" }}
        >
          {showConversion && currencyData.symbol !== currency && (
            <>
              {"="}&nbsp;{currencyData.symbol}&nbsp;{convertedRate}
            </>
          )}
        </div>
      </div>
      {error && <div className="text-danger">{error}</div>}
    </>
  );
};

export default CurrencyInput;
