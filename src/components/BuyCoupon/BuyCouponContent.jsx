import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { baseURL, hostURL } from "../../config/config";

import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import { message } from "antd";
import CouponCard from "../coupon/CouponCard";

const BuyCouponContent = ({ couponId, paymentIntent }) => {
  const coupon = useSelector((state) => state.couponReducer);

  const stripe = useStripe();
  const elements = useElements();
  const [messages, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);

    const getPaymentMethodID = async () => {
      try {
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: "card",
          // card: elements.getElement(CardElement),
          card: elements.getElement(PaymentElement),
        });
        console.log("payment method", paymentMethod);
        return paymentMethod.id;
      } catch (error) {
        console.log("error of catch", error);
        throw new Error(error);
      }
    };

    try {
      // const paymentMethod = await getPaymentMethodID();
      // const response = await axiosInstance.post(
      //   `${baseURL}payments/stripe/confirm-payment-intent/`,
      //   {
      //     payment_method: paymentMethod,
      //     payment_intent: elements._commonOptions.clientSecret.id,
      //   },
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );
      // const data = response.data;
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${hostURL}/points/buy/success`,
        },
        redirect: "if_required",
      });

      if (error) {
        console.error("Error creating payment intent:", error);
        message.error(error.message);
        setIsLoading(false);
      }

      // if (paymentIntent) {
      //   const url = new URL(`${hostURL}/coupon/success`);
      //   url.searchParams.set("payment_intent",paymentIntent.id);
      //   url.searchParams.set(
      //     "payment_intent_client_secret",
      //     elements._commonOptions.clientSecret.id
      //   );
      //   url.searchParams.set("redirect_status", "succeeded");
      //   window.location.href = url.toString();
      // }else{
      //   const url = new URL(`${hostURL}/coupon/success`);
      //   url.searchParams.set("redirect_status", "failed");
      //   window.location.href = url.toString();
      // }
      if (paymentIntent) {
        const url = new URL(`${hostURL}/points/buy/success`);
        url.searchParams.set("payment_intent", paymentIntent.id);
        url.searchParams.set(
          "payment_intent_client_secret",
          elements._commonOptions.clientSecret.id
        );
        url.searchParams.set("redirect_status", "succeeded");

        window.location.href = url.toString();
      } else {
        const url = new URL(`${hostURL}/points/buy/success`);
        url.searchParams.set("redirect_status", "failed");
        window.location.href = url.toString();
      }

      // if (paymentIntent) {
      //   console.log(paymentIntent);
      //   const buy_coupon = await axiosInstance.post(
      //     `${baseURL}coupons/buy/created/`,
      //     {
      //       payment_intent: elements._commonOptions.clientSecret.id,
      //       coupon: coupon.couponDetail.id,
      //     }
      //   );
      // if (buy_coupon.data.success) {
      //   message.success("Coupon purchased successfully");
      //   navigate("/my-coupons");
      //   }
      // }
    } catch (error) {
      console.error("Error creating payment intent:", error);
      message.error("something went wrong");
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="row flex-reverse">
        <div class="col-12 col-xxl-4 col-xl-4 col-lg-4 mt-2">
          <div class="animated fadeInUp" style={{ animationDuration: "1s" }}>
            <CouponCard
              key={coupon.couponDetail.id}
              coupon={coupon.couponDetail}
            />
          </div>
        </div>
        <div class="col-12 col-xxl-8 col-xl-8 col-lg-8 mb-2 mt-2">
          <div class="animated fadeInUp" style={{ animationDuration: "1s" }}>
            <div class="card border-0 shadow-sm dashboard-activity-tab">
              <div class="card-body">
                <h5>Buy Coupon</h5>
                {/* <div className="radio-body mb-3">
                  {plan.membershipList.map((mst, index) => (
                  <div class="radio-card" key={index}>
                    <input 
                      type="radio" 
                      name="pricing" 
                      checked={mst.id === id} 
                      onChange={() => handleRadioChange(mst.id)}
                      id={mst.id} 
                    />
                    <label className="radio-label" for={`${mst.id}`}>
                        <h5 className="radio-h5" style={{color:"#363742"}}>{mst.name}</h5>
                        <h2 className="radio-h2">
                            <span className="radio-span">$</span>
                            <span className="text-danger radio-span-price">{mst.price}</span>
                            <span className="radio-span">/month</span>
                        </h2>
                    </label>
                  </div>
                  ))}
                  </div> */}
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
                  {messages && <div id="payment-message">{messages}</div>}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyCouponContent;
