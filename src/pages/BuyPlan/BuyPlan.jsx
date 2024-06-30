import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import BuyPlanContent from "../../components/BuyPlan/BuyPlanContent";
import Divider from "../../components/divider/Divider";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { load_plan_detail } from "../../redux/api/membershipTypeAPI";
import { baseURL, stripePublicKey } from "../../config/config";
import BuyFreePlanContent from "../../components/BuyPlan/BuyFreePlanContent";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import SkeletonPayment from "../../components/Skeleton/Skeleton";
import PointsPayment from "../Payment/PointsPayment";

const stripePromise = loadStripe(`${stripePublicKey}`);

const BuyPlan = () => {
  // const { planId, planTime } = useParams();
  // const [clientsecret, setClientSecret] = useState("");
  // // const [activePlanTime, setActivePlanTime] = useState(planTime);
  // const [price, setPrice] = useState(0);
  // const dispatch = useDispatch();

  // const plan = useSelector((state) => state.membershipTypeReducer);
  // const currency = useSelector((state)=>state.currencyReducer.currencyDetail)

  // useEffect(() => {
  //   dispatch(load_plan_detail(planId));
  // }, [dispatch, planId]);

  // useEffect(() => {
  //   if (plan && plan.planDetail.price) {
  //     if (planTime === "monthly") {
  //       setPrice(plan.planDetail.price);
  //     } else {
  //       setPrice(plan.planDetail.yearly_price);
  //     }
  //     fetch(`${baseURL}payments/stripe/create-payment-intent/`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         items: [{ id: "membership-plan", planId:planId, price: price , planTime:planTime, currency:currency.currencyCode }],
  //       }),
  //     })
  //       .then((res) => res.json())
  //       .then((data) => setClientSecret(data.clientSecret));
  //   }
  // }, [plan , planTime, price]);

  // const appearance = {
  //   theme: "stripe",
  // };
  // const options = {
  //   clientSecret: clientsecret,
  // };

  return (
    <DashboardLayout title={"Buy Membership Plan"}>
      {/* {clientsecret && plan.planDetail.price !== 0 && (
        <Elements stripe={stripePromise} options={options}>
          <BuyPlanContent
            planId={planId}
            planTime={planTime}
            price={price}
          />
        </Elements>
      )} */}

      {/* {plan.planDetail.price === 0 && (
        <>
          <BuyFreePlanContent
            planId={planId}
            planTime={planTime}
            price={price}
          />
        </>
      )} */}
      <PointsPayment />
      {/* {!clientsecret && plan.planDetail.price !== 0 && <SkeletonPayment/>} */}
      <Divider />
    </DashboardLayout>
  );
};

export default BuyPlan;
