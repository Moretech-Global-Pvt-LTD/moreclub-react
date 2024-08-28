import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { currencyConvertor } from "../../../redux/api/CurrencyConvertorAPI";
import {
  setWithdrawalAmount,
  setCurrency,
  setMethod,
  setWithdrawalStep,
  setConversion,
} from "../../../redux/slices/WithDrawalSlice";
import { baseURL } from "../../../config/config";
import { axiosInstance } from "../../..";
import { useDebounce } from "../../../Hooks/useDebounce";


const WithdrawalAmountForm = ({ onNext }) => {
  const dispatch = useDispatch();
  const withdrawaldata = useSelector((state) => state.withdrawalReducer);
  const [Amount, setAmount] = useState(withdrawaldata.withdrawalAmount ?? 0);
  const [amountError, setAmountError] = useState("");
  const [currencytype, setcurrencyType] = useState(
    withdrawaldata.currency ?? ""
  );
  const [currencyList, setCurrencyList] = useState(null);
  const [methodList, setMethodList] = useState(null);
  const [convertedRate, setConvertedRate] = useState(0);
  const [convert, setConvert] = useState(0);
  const [showConversion, setShowConversion] = useState(false);

  const wallet = useSelector((state) => state.walletReducer);
  const currencyData = useSelector(
    (state) => state.currencyReducer.currencyDetail
  );

  const fetchCountry = async () => {
    try {
      const res = await axiosInstance.get(`${baseURL}user/currency/`);
      setCurrencyList(res.data.data.currency);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMethod = async () => {
    try {
      const res = await axios.get(`${baseURL}withdrawal/methods/`);
      setMethodList(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCountry();
    fetchMethod();
  }, []);

  useEffect(() => {
    const fetchUserCurrency = async () => {
      if (currencytype === "") {
        try {
          // const res = await axiosInstance.get(`${baseURL}user/currency/`);
          if (currencyList && currencyList.length > 0) {
            const matchedCurrency = currencyList.find(
              (bt) => bt.default === true
            );

            if (matchedCurrency) {
              dispatch(setCurrency(matchedCurrency.code));
              const currency_res = await currencyConvertor(
                currencyData.code,
                matchedCurrency.code
              );
              setConvertedRate(currency_res);
              dispatch(setConversion(currency_res));
            }
          }
        } catch (err) {
          console.error(err);
        }
      } else {
        const currency_res = await currencyConvertor(
          currencytype,
          currencyData.currencyCode
        );
        setConvertedRate(currency_res);
        dispatch(setConversion(currency_res));
        // const currency_res = await currencyConvertor(
        //   currencyData.code,
        //   currencytype
        // );
        // setConvertedRate(currency_res);
        // dispatch(setConversion(currency_res))

        setShowConvert();
      }
    };

    fetchUserCurrency();
  }, [currencyList]);

  const setShowConvert = async () => {
    if (currencyList && currencyList.length > 0) {
      if (currencyData.currencyCode !== currencytype) {
        setShowConversion(true);
      } else {
        setShowConversion(false);
      }
    }
  };

  useEffect(() => {
    setShowConvert();
  }, [currencytype]);

  useEffect(() => {
    const convertcurrency = async () => {
      const converts = Math.ceil(Amount * convertedRate * 1000) / 1000;
      setConvert(converts);
      await dispatch(setConversion(convert));
    };
    convertcurrency();
  }, [convertedRate, Amount]);

  // useEffect(() => {
  //   const fetchCurrencyRate =async()=>{
  //     console.log(withdrawaldata.currency ,"currencyrate")
  //     const currency_res = await currencyConvertor(withdrawaldata.currency, "USD");
  //     console.log(currency_res ,"currencyrate")
  //     setConvertedRate(currency_res);
  //   }
  //   fetchCurrencyRate();
  // }, [withdrawaldata.currency]);

  const handleCurrencyChange = async (event) => {
    const value = event.target.value;
    setcurrencyType(value);
    dispatch(setCurrency(value));
    const currency_res = await currencyConvertor(
      value,
      currencyData.currencyCode
    );
    setConvertedRate(currency_res);
    dispatch(setConversion(currency_res));
  };

  const debouncedAmount = useDebounce(Amount, 500);

  useEffect(() => {
    if (debouncedAmount) {
      handleAmountChange(debouncedAmount);
    } else {
      setAmountError("");
    }
  }, [debouncedAmount, Amount, currencytype]);

  const handleAmountChange = async (Amount) => {
    // setAmount(Amount);
    dispatch(setWithdrawalAmount(Amount));
    if (Amount === "" || Amount === 0) {
      setAmountError("Withdrawal amount is required");
    } else if (convert > wallet.wallet?.balance) {
      setAmountError("Insufficent fund");
    } else {
      setAmountError("");
    }
  };

  const handleMethodChange = (e) => {
    dispatch(setMethod(e.target.value));
  };

  const handleStep = async (value) => {
    if (
      withdrawaldata.withdrawalAmount === 0 ||
      withdrawaldata.withdrawalAmount === ""
    ) {
      setAmountError("withDrawal amount is required");
    } else if (convert > wallet.wallet?.balance) {
      setAmountError("Insufficent fund");
    } else {
      await dispatch(setConversion(convert));
      dispatch(setWithdrawalStep(value));
    }
  };

  return (
    <Form style={{ maxWidth: "500px" }}>
      <Form.Group controlId="withdrawalAmount">
        <Form.Label>Amount to Withdraw</Form.Label>
        <div className="d-flex align-items-center">
          <Form.Control
            as="select"
            defaultValue={currencyList && currencyList[0].code}
            value={withdrawaldata.currency}
            onChange={handleCurrencyChange}
            style={{ width: "4rem", marginRight: "4px" }}
            required
          >
            <option value="">cur</option>
            {currencyList &&
              currencyList.map((bt) => (
                <option value={bt.code} key={bt.id}>
                  {bt.code}
                </option>
              ))}
          </Form.Control>
          <Form.Control
            type="number"
            value={Amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <div
            className="text-dynamic-white"
            style={{ width: "8rem", marginLeft: "4px", marginRight: "4px" }}
          >
            {showConversion && currencyData.symbol !== currencytype && (
              <>
                {"="}&nbsp;{currencyData.symbol}&nbsp;{convert}
              </>
            )}
          </div>
        </div>
        {amountError && (
          <p className="text-danger" style={{ fontSize: "11px" }}>
            {amountError}
          </p>
        )}
      </Form.Group>

      <Form.Group controlId="withDrawalMethod">
        <Form.Label>Withdrawal Method</Form.Label>
        <Form.Control
          as="select"
          value={withdrawaldata?.method}
          onChange={handleMethodChange}
          required
        >
          <option value="">Select the method</option>
          {methodList &&
            methodList.map((bt) => (
              <option value={bt.code} key={bt.name}>
                {bt.name}
              </option>
            ))}
        </Form.Control>
      </Form.Group>
      <Button
        variant="primary"
        className="mt-4"
        disabled={
          withdrawaldata.currency.trim() === "" ||
          withdrawaldata.method.trim() === "" ||
          withdrawaldata.currency.trim() === "" ||
          amountError.trim() !== ""
        }
        onClick={async (e) => {
          e.preventDefault();
          handleStep(2);
        }}
      >
        Withdraw
      </Button>
    </Form>
  );
};

export default WithdrawalAmountForm;
