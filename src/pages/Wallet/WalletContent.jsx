import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import Wallet from "../../images/wallet/coins.png";
import { useDispatch, useSelector } from "react-redux";
import { getWallet } from "../../redux/api/wallets";
import { axiosInstance } from "../..";
import { baseURL, stripePublicKey } from "../../config/config";
import { currencyConvertor } from "../../redux/api/CurrencyConvertorAPI";
import Walletlinks from "../../components/dashboard/Walletlinks";
import { loadStripe } from "@stripe/stripe-js";
import { useStripe } from "@stripe/react-stripe-js";

const WalletContent = () => {
  const dispatch = useDispatch();
  const wallets = useSelector((state) => state.walletReducer);
  const currencyData = useSelector(
    (state) => state.currencyReducer.currencyDetail
  );
  const [currency, setCurrency] = useState("");
  const [rate, setRate] = useState(0);



  useEffect(() => {
    const fetchUserCurrency = async () => {
      try {
        const res = await axiosInstance.get(`${baseURL}user/currency/`);
        if (res.data.data && res.data.data.length > 0) {
          const matchedCurrency = res.data.data.find(
            (bt) => bt.default === true
          );
          setCurrency(matchedCurrency.code);
          const currency_res = await currencyConvertor(
            res.data.data.code,
            currencyData.currencyCode
          );
          setRate(currency_res);
        }
      } catch (err) {
        console.error(err);
      }
    };
    
    fetchUserCurrency();
  }, []);

  useEffect(() => {
    dispatch(getWallet());
  }, [dispatch]);

  const walletInfo = [
    {
      userName: wallets.wallet?.user?.username,
      balanceCard: wallets.wallet?.balance,
      currency: wallets.wallet?.symbol,
    },
  ];

  return (
    <div className="row mt-4">
      <div className=" col-12 col-md-4  card shadow mb-5">
        <div className="card-body text-start p-4 position-relative">
          {/* <p
            className="text-warning text-end position-absolute top-0 end-0 "
            style={{ fontSize: "12px" }}
          >
            {walletInfo[0].currency}&nbsp;1 = {currencyData.symbol}&nbsp;
            {rate?.toFixed(3)}{" "}
          </p> */}
          <h6 className="mb-2">username: {walletInfo[0].userName}</h6>
          <h5 className="mb-0 row text-dark d-flex align-items-center justify-content-center">
            <img
              className="me-1 col-4"
              src={Wallet}
              alt=""
              style={{ width: "auto", height: "50px" }}
            />
            <span className="counter col-8 fs-6">
              <span className="fs-6">Balance :</span>&nbsp;
              {walletInfo[0].currency}&nbsp;{walletInfo[0].balanceCard}
            </span>
          </h5>

          {/* Recharge Button */}
          <Walletlinks />
        </div>
      </div>
      <div className="col-12 col-md-4">
        {/* <div className="card text-white p-4 "> */}
        {/* <Link to={"/points/send"}>
            <h6 className=" mt-2 mb-2  pb-2 border-bottom ">
              <i class="bi bi-send"></i>&nbsp;&nbsp;Send Points
            </h6>
          </Link> */}
        {/* <Link to={'/points/buy'}><h6 className=' mt-2 mb-2  pb-2 border-bottom '><i class="bi bi-plus-circle"></i>&nbsp;&nbsp;Buy Points</h6></Link> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default WalletContent;
