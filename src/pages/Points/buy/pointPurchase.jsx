import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";

import { baseURL, stripePublicKey } from "../../../config/config";
import PurchasePaymentContent from "./PurchasePaymentContent";
import DashboardLayout from "../../../components/Layout/DashboardLayout";
import SkeletonPayment from "../../../components/Skeleton/Skeleton";
import { useSelector } from "react-redux";

const stripePromise = loadStripe(`${stripePublicKey}`);

const PointPurchase = () => {
  const [clientsecret, setClientSecret] = useState("");
  const purchaseData = useSelector((state)=>state.purchaseReducer)
  const createPaymentIntent = async () => {
    
    try {
      
      const url = window.location.href;
      const extractedId = url.substring(url.lastIndexOf('/') + 1);
      const rate = parseFloat(extractedId.substring(5, extractedId.length - 5)) 
      fetch(`${baseURL}payments/stripe/create-payment-intent/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: [{ id: "buy-points",  price: rate , currency:purchaseData.currency }],
        }),
      })
        .then((res) => res.json())
        .then((data) => {setClientSecret(data.clientSecret)});
    } catch (err) { 
      console.log("error creating payment intent", err);
    }
  };

  useEffect(() => {
    createPaymentIntent();
  }, []);

  const options = {
    clientSecret: clientsecret,
  };

  return (
    <DashboardLayout>
      {clientsecret && (
        <Elements stripe={stripePromise} options={options}>
          <PurchasePaymentContent  />
        </Elements>
      )}
      {!clientsecret && <SkeletonPayment/>}

    </DashboardLayout>
  );
};

export default PointPurchase;
