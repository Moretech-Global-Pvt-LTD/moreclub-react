import React, { useEffect, useState } from "react";
import { baseURL, hostURL } from "../../config/config";
import axios from "axios";
import { message } from "antd";
import { useDebounce } from "../../Hooks/useDebounce";
import { validateEmail } from "../../validation/addaccountvalidation";

const getQueryParams = () => {
  const currentUrl = window.location.href;

  const queryString = new URL(currentUrl);
  const urlParams = new URLSearchParams(queryString);
  console.log("urlparams", urlParams);
  return urlParams;
};

// Function to handle unsubscription
const handleUnsubscribed = async (email) => {
  try {
    const res = await axios.post(`${baseURL}subscription/added/`, {
      email: email,
      action: "unSubscribe",
    });
    message.success(res.data.message);
  } catch (err) {
    message.error(err?.response?.data?.email[0]);
  }
};

const SubscriptionMailForm = () => {
  const [subscription, setSubscription] = useState("");
  const [subscriptionError, setSubscriptionError] = useState("");

  const url = new URL(window.location.href);
  const unsubscribeEmail = url.searchParams.get("unsubscribe");

  useEffect(() => {
    const unsubscribe = async () => {
      if (unsubscribeEmail && unsubscribeEmail.trim() !== "") {
        handleUnsubscribed(unsubscribeEmail);
      }
    };
    unsubscribe();
  }, [unsubscribeEmail]);

  const debouncedEmail = useDebounce(subscription, 500);

  useEffect(() => {
    if (debouncedEmail) {
      setSubscriptionError(validateEmail(debouncedEmail));
    } else {
      setSubscriptionError("");
    }
  }, [debouncedEmail, setSubscription]);

  const handleSubscription = async () => {
    if (subscription !== "" || subscription.trim() !== "") {
      try {
        const res = await axios.post(`${baseURL}subscription/added/`, {
          email: subscription,
          action: "subscribe",
        });
        message.success(res.data.message);
      } catch (err) {
        console.log(err);
        message.error(err?.response?.data?.email[0]);
      }
    } else {
      console.log("email not found");
    }
  };

  return (
    <>
      <form
        className="d-flex align-items-stretch"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubscription();
        }}
      >
        <input
          className="form-control"
          type="email"
          value={subscription}
          onChange={(e) => setSubscription(e.target.value)}
          placeholder="Enter email"
        />
        <button className="btn btn-warning px-3" type="submit">
          Subscribe
        </button>
      </form>
      {subscriptionError && (
        <p className="text-danger" style={{ fontSize: "11px" }}>
          {subscriptionError}
        </p>
      )}
    </>
  );
};

export default SubscriptionMailForm;
