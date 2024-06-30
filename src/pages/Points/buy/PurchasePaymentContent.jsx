import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BrandLogo from "../../../images/logo/MembersClubblack.png";

import { message } from "antd";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { baseURL, hostURL } from "../../../config/config";
import { axiosInstance } from "../../..";

const PurchasePaymentContent = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const purchaseData = useSelector((state) => state.purchaseReducer);
  const currencyData = useSelector(
    (state) => state.currencyReducer.currencyDetail
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);

    try {
      // const response = await axiosInstance.post(
      //   `${baseURL}payments/stripe/confirm-payment-intent/`,
      //   {
      //     payment_intent: elements._commonOptions.clientSecret.id,
      //   },
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );

      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${hostURL}/points/buy/success`,
        },
        redirect: "if_required",
      });

      if (error) {
        message.error("error creating payments");
        setIsLoading(false);
      }
    

      if (paymentIntent) {
        const url = new URL(`${hostURL}/points/buy/success`);
        url.searchParams.set("payment_intent",paymentIntent.id);
        url.searchParams.set(
          "payment_intent_client_secret",
          elements._commonOptions.clientSecret.id
        );
        url.searchParams.set("redirect_status", "succeeded");

        window.location.href = url.toString();


        // const url = window.location.href;
        // const extractedId = url.substring(url.lastIndexOf("/") + 1);
        // const rate = parseFloat(
        //   extractedId.substring(5, extractedId.length - 5)
        // );

        // const buy_coupon = await axiosInstance.post(
        //   `${baseURL}wallets/buy/points/`,
        //   {
        //     payment_intent: elements._commonOptions.clientSecret.id,
        //     amount: purchaseData.purchaseAmount,
        //     currency_code: purchaseData.currency,
        //     payment_method: paymentIntent.payment_method,
        //   }
        // );

        // if (buy_coupon.data.success) {
        //   message.success("Money loaded successfully");
        //   navigate("/wallet");
        // }
      }else{
        const url = new URL(`${hostURL}/points/buy/success`);
        url.searchParams.set("redirect_status", "failed");
        window.location.href = url.toString();
      }
    } catch (error) {
      message.error("error creating payments");
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="row">
        <div class="col-12 col-xxl-8 col-xl-8 col-lg-8 mb-2">
          <div class="animated fadeInUp" style={{ animationDuration: "1s" }}>
            <div class="card border-0 shadow-sm dashboard-activity-tab">
              <div class="card-body">
                <h5>Load Money</h5>
                <form id="payment-form" onSubmit={handleSubmit}>
                  <PaymentElement id="payment-element" />

                  <button
                    disabled={isLoading || !stripe || !elements}
                    id="submit"
                    className="btn btn-danger btn-sm mt-2"
                    style={{ float: "right" }}
                  >
                    <span id="button-text">
                      {isLoading ? (
                        <div
                          class="spinner-border spinner-border-sm text-primary"
                          role="status"
                        >
                          {/* <span class="sr-only">Loading...</span> */}
                        </div>
                      ) : (
                        "Pay now"
                      )}
                    </span>
                  </button>
                  {/* Show any error or success messages */}
                  {/* {messages && <div id="payment-message">{messages}</div>} */}
                </form>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-xxl-4 col-xl-4 col-lg-4">
          <div class="animated fadeInUp" style={{ animationDuration: "1s" }}>
            <div class="card border-0 shadow-sm dashboard-activity-tab">
              <div class="card-body">
                <div className="col-12">
                  <div className="author-img position-relative col-span-12 d-flex">
                    <img
                      src={BrandLogo}
                      style={{
                        width: "45px",
                        height: "45px",
                        objectFit: "contain",
                        backgroundColor: "#fff",
                        margin: "auto",
                      }}
                      alt="Profile"
                      className="img-fluid rounded-circle mb-3 profile-image"
                    />
                  </div>
                  <div className="name-info d-flex align-items-center justify-content-center border-bottom ">
                    <div className="name-author">
                      <div
                        className="name d-block hover-primary text-truncate text-center text-dynamic-white"
                        style={{ fontSize: "20px" }}
                      >
                        <b>&nbsp;{"Load Points"}</b>
                      </div>
                    </div>
                  </div>
                </div>
                <h5 className="d-flex justify-content-between text-dynamic-white mt-5">
                  <span>Load Money </span>
                  <span>
                    {purchaseData.currency}&nbsp;{purchaseData.purchaseAmount}
                  </span>
                </h5>

                <div className="d-flex justify-content-between text-dynamic-white mt-5 border-top pt-2">
                  <span>Total Pay (In {currencyData.code}) </span>
                  <span>
                    {currencyData.symbol}&nbsp;{purchaseData.convertedRate}
                  </span>
                </div>
                <div className="d-flex justify-content-between text-dynamic-white mt-2 ">
                  <span>Grand Total</span>
                  <span>
                    {currencyData.symbol}&nbsp;{purchaseData.convertedRate}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PurchasePaymentContent;
