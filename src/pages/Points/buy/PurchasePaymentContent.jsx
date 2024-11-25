import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BrandLogo from "../../../images/logo/MembersClubblack.png";

import { message } from "antd";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { baseURL } from "../../../config/config";
import SkeletonPayment from "../../../components/Skeleton/Skeleton";
import { axiosInstance } from "../../..";
import { useNavigate } from "react-router-dom";
import { fetchNewNotifications } from "../../../redux/api/notificationApi";

const PurchasePaymentContent = ({ buyAmount, currency }) => {
  const [clientSecret, setClientSecret] = useState("");
  const [paymentIntent, setPaymentIntent] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const purchaseData = useSelector((state) => state.purchaseReducer);
  const currencyData = useSelector(
    (state) => state.currencyReducer.currencyDetail
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    fetch(`${baseURL}payments/stripe/create-payment-intent/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [{ id: "buy-points", price: buyAmount, currency: currency }],
      }),

    })
      .then((res) => res.json())

      .then((data) => {
        setClientSecret(data.clientSecret);
        setPaymentIntent(data.payment_intent);
      })
      .catch((error) =>
        setErrorMessage(`Error fetching client secret: ${error.message}`)
      );
  }, [buyAmount, currency]);


  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (!stripe || !elements) {
      setErrorMessage("Stripe or elements not loaded.");
      setIsLoading(false);
      return;
    }
    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setIsLoading(false);
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      elements,
    });


    try {
      const newOrderData = {
        payment_intent: paymentIntent,
        amount: buyAmount,
        currency_code: currency,
        payment_method: paymentMethod?.id ?? ""
      };

      const response = await axiosInstance.post(`${baseURL}wallets/buy/points/`, newOrderData);


      if (response.status !== 200) {
        setErrorMessage(`${response.data.message}`);
      } else {
        message.success("Payment Success");
        dispatch(fetchNewNotifications());
        navigate(`/points/buy/success?amount=${response.data.data.currency_symbol}${response.data.data.amount}`);
      }

    } catch (error) {
      message.error("Payment Failed");
      const errorMessage = error?.response?.data?.errors?.non_field_errors[0];
      navigate(`/points/buy/failed?error=${errorMessage}`);
      setErrorMessage(error.message || "An unknown error occurred.");
    }

    setIsLoading(false);
  };



  return (
    <>
      <div className="row">
        <div class="col-12 col-xxl-8 col-xl-8 col-lg-8 mb-2">
          <div class="animated fadeInUp" style={{ animationDuration: "1s" }}>
            <div class="card border-0 shadow-sm dashboard-activity-tab">
              <div class="card-body">
                <h5>Load Money</h5>
                {(!clientSecret || !paymentIntent || !stripe || !elements) ? (
                  <SkeletonPayment />
                )
                  : (
                    <form onSubmit={handleSubmit} className="payment-form ">
                      {clientSecret && <PaymentElement />}
                      {errorMessage && <div className="text-danger">{errorMessage}</div>}
                      <button
                        disabled={!stripe || isLoading}
                        className="btn btn-danger btn-sm mt-2"
                        style={{ float: "right" }}
                      >
                        {isLoading ? <div
                          class="spinner-border spinner-border-sm text-primary"
                          role="status"
                        >

                        </div> : `Load ${currency} ${buyAmount}`}
                      </button>
                    </form>
                  )
                }
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
                        <b>&nbsp;{"Load Money"}</b>
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
