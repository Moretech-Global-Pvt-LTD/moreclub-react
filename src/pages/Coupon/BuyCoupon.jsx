import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Divider from "../../components/divider/Divider";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { load_coupon_detail } from "../../redux/api/couponAPI";
import BuyCouponContent from "../../components/BuyCoupon/BuyCouponContent";
import { baseURL, stripePublicKey } from "../../config/config";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import SkeletonPayment from "../../components/Skeleton/Skeleton";
import PointsPayment from "../Payment/PointsPayment";

const stripePromise = loadStripe(`${stripePublicKey}`);

const BuyCoupon = () => {
  // const { couponId } = useParams();
  // const [clientsecret, setClientSecret] = useState("");
  // const [paymentIntent, setPaymentIntent]= useState("");
  // const coupon = useSelector((state) => state.couponReducer);
  // const currency = useSelector((state)=>state.currencyReducer.currencyDetail);

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(load_coupon_detail(couponId));
  // }, [dispatch, couponId]);

  // useEffect(() => {
  //   if (coupon && coupon.couponDetail.balance) {
  //     fetch(`${baseURL}payments/stripe/create-payment-intent/`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         items: [{ id: "coupon-buy",  couponId:couponId, price: coupon.couponDetail.balance, currency:currency.currencyCode}],
  //       }),
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {setClientSecret(data.clientSecret);
  //         setPaymentIntent(data.payment_intent)
  //       });
  //   }
  // }, [coupon]);

  // // const appearance = {
  // //   theme: "stripe",
  // // };
  // const options = {
  //   clientSecret: clientsecret,
  // };

  return (
    <DashboardLayout title={"Buy Coupon"}>
      {/* {clientsecret && paymentIntent &&(
        <Elements stripe={stripePromise} options={options}>
          <BuyCouponContent couponId={couponId}  paymentIntent={paymentIntent}/>
        </Elements>
      )} */}
      
      <PointsPayment/>
      {/* {!clientsecret && paymentIntent && <SkeletonPayment/>} */}
      <Divider />
    </DashboardLayout>
  );
};

export default BuyCoupon;
