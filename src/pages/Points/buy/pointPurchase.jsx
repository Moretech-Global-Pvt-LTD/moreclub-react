import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";

import {stripePublicKey } from "../../../config/config";
import PurchasePaymentContent from "./PurchasePaymentContent";
import DashboardLayout from "../../../components/Layout/DashboardLayout";
import SkeletonPayment from "../../../components/Skeleton/Skeleton";
import { useSelector } from "react-redux";

const stripePromise = loadStripe(`${stripePublicKey}`);

const PointPurchase = () => {
  
  const [buyAmount, setBuyAmount]= useState()
  const purchaseData = useSelector((state)=>state.purchaseReducer)
  const createPaymentIntent = async () => {
    
      const url = window.location.href;
      const extractedId = url.substring(url.lastIndexOf('/') + 1);
      const rate = parseFloat(extractedId.substring(5, extractedId.length - 5)) 
      setBuyAmount(rate)
   
  }

  useEffect(() => {
    createPaymentIntent();
  }, []);



  return (
    <DashboardLayout>
      {buyAmount && 
      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          paymentMethodCreation: "manual",
          amount: buyAmount * 100,
          currency: purchaseData.currency.toLowerCase(),
        }}
        >
          <PurchasePaymentContent buyAmount={buyAmount} currency={purchaseData.currency} />
       
      </Elements>
      
      }
      {!buyAmount && <SkeletonPayment/>}

    </DashboardLayout>
  );
};

export default PointPurchase;
