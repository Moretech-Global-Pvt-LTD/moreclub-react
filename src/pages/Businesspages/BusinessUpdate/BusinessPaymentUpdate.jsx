import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../../config/config";
import { axiosInstance } from "../../..";
import { message } from "antd";
import Visa from "../../../images/Payments/visacard.png";
import MasterCard from "../../../images/Payments/MasterCard_Logo.png";
import DefaultCard from "../../../images/Payments/cards.png";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [cards, setCards] = useState(null);
  const [cardHolderName, setCardHolderName] = useState("");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: theme === "dark" ? "#ffffff" : "#32325d",
        // backgroundColor: theme === 'dark' ? '#0c153b' : '#ffffff',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: theme === "dark" ? "#bbbbbb" : "#aab7c4",
        },
        border: "1px solid",
        borderColor: theme === "dark" ? "#555555" : "#cccccc",
        padding: "50px",
        borderRadius: "4px",
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
        borderColor: "#fa755a",
      },
    },
  };

  const fetchCardDetail = async () => {
    try {
      const res = await axiosInstance.get(`${baseURL}business/card/details/`);
      console.log(res);
      if (res.data.data.message === "No detail found") {
        setCards(null);
      } else {
        setCards(res.data.data);
      }
    } catch (err) {
      message.error("Error getting message");
    }
  };

  useEffect(() => {
    fetchCardDetail();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error(error);
    } else {
      try {
        const response = await axiosInstance.post(
          `${baseURL}business/card/details/`,
          {
            payment_method_id: paymentMethod.id,
            cardholder_name: cardHolderName,
          }
        );

        message.success("Payment method added successfully");
        await fetchCardDetail();
        navigate("/dashboard");
        // console.log("Payment method added successfully:", );
      } catch (err) {
        console.error(error);
        message.error(error?.response?.data.errors.non_field_errors[0]);
      }
    }
    setLoading(false);
  };

  return (
    <Card className="card p-2 col-12 col-sm-10 col-md-8 text-dynamic-white">
      {cards && (
        <Card className="text-dynamic-white">
          <h6 className="mt-1 mx-1">Your card</h6>
          <Card.Body>
            <div>
              <div className="d-flex w-full justify-content-between">
                <p>**** *** *** {cards.card_last4}</p>
                {cards.card_brand === "visa" ? (
                  <img
                    src={Visa}
                    alt={cards.card_brand}
                    style={{ height: "1rem", width: "auto" }}
                  />
                ) : (
                  <>
                    {cards.card_brand === "mastercard" ? (
                      <img
                        src={MasterCard}
                        alt={cards.card_brand}
                        style={{ height: "1rem", width: "auto" }}
                      />
                    ) : (
                      <img
                        src={DefaultCard}
                        alt={cards.card_brand}
                        style={{ height: "1rem", width: "auto" }}
                      />
                    )}
                  </>
                )}
              </div>
              <div className="d-flex w-full justify-content-between">
                <span>{cards?.cardholder_name}</span>
                <span>
                  {cards?.card_exp_month}/{cards?.card_exp_year}
                </span>
              </div>
            </div>
          </Card.Body>
        </Card>
      )}
      <h6 className="mt-1">
        {cards ? `Update Your card` : "Add Your Payments"}
      </h6>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setCardHolderName(e.target.value)}
          className="form-control my-1 mb-4 w-100"
          placeholder="Card Holder Name"
          style={{ width: "100%" }}
        />

        <CardElement options={CARD_ELEMENT_OPTIONS} />
        <div className="d-flex justify-content-end w-100">
          <button
            type="submit"
            className="btn  rounded btn-warning my-2 mt-4 align-self-end "
            disabled={!stripe}
          >
            {loading && (
              <span className="spinner-border spinner-border-sm text-danger"></span>
            )}
            Process
          </button>
        </div>
      </form>
    </Card>
  );
};

export default PaymentForm;
