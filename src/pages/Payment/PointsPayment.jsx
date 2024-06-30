import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import PINInput from "../../components/ui/PinInput";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { load_coupon_detail } from "../../redux/api/couponAPI";
import { load_plan_detail } from "../../redux/api/membershipTypeAPI";
import { baseURL } from "../../config/config";
import { axiosInstance } from "../..";
import { message } from "antd";
import CouponDetail from "./CouponDetail";
import CouponCard from "../../components/coupon/CouponCard";
import PlanDetail from "./PlanDetail";
import { userMembership } from "../../redux/api/userMembershipAPI";

const PointsPayment = () => {
  const { couponId, planId, planTime } = useParams();
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [price, setPrice] = useState(0);

  const coupon = useSelector((state) => state.couponReducer);
  const plan = useSelector((state) => state.membershipTypeReducer);
  const currency = useSelector((state) => state.currencyReducer.currencyDetail);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    if (couponId) {
      dispatch(load_coupon_detail(couponId));
    }
  }, [dispatch, couponId]);

  useEffect(() => {
    if (planId) {
      dispatch(load_plan_detail(planId));
    }
  }, [dispatch, planId]);

  useEffect(() => {
    if (plan && plan.planDetail.price) {
      if (planTime === "monthly") {
        setPrice(plan.planDetail.price);
      } else {
        setPrice(plan.planDetail.yearly_price);
      }
    }
  }, [plan, planTime, price]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (planId && planTime) {
      const data = {
        membership_type: planId,
        planTime: planTime,
        pin: pin,
      };
      try {
        const res = await axiosInstance.post(
          `${baseURL}members/register/membership/`,
          data
        );
        message.success("membership purchase Successfully");
        await dispatch(userMembership());
        navigate("/profile");
      } catch (err) {
        message.error(err.response.data.errors.non_field_errors[0]);
      }
    }

    if (couponId) {
      const data = {
        coupon: couponId,
        pin: pin,
      };
      try {
        const res = await axiosInstance.post(
          `${baseURL}coupons/buy/created/`,
          data
        );
        message.success("Coupon purchase Successfully");
        navigate("/my-coupons");
      } catch (err) {
        message.error(err.response.data.errors.non_field_errors[0]);
      }
    }
  };

  return (
    <div class="col-12 col-xxl-8 col-xl-8 col-lg-8 mb-2 mt-2">
      <div class="animated fadeInUp" style={{ animationDuration: "1s" }}>
        <div class="card border-0 shadow-sm dashboard-activity-tab">
          <div class="card-body">
            <div style={{ maxWidth: "600px" }}>
              <div className="nft-card card p-2 col-12 col-md-8 mb-2 ms-1 me-1 mx-md-auto">
                <div className="bg-dynamic-black mb-1">
                  <p
                    className=" mb-0 mt-0 text-center text-success"
                    style={{ fontSize: "12px" }}
                  >
                    You are paying
                  </p>
                  <h1 className="text-center mb-0 mt-0">
                    <span style={{ fontSize: "12px" }}>
                      {currency.currencyCode}&nbsp;
                    </span>
                    {couponId && <>{coupon?.couponDetail?.balance}</>}
                    {plan && planTime && <>{price}</>}
                  </h1>
                </div>
                <div
                  class="animated fadeInUp"
                  style={{ animationDuration: "1s" }}
                >
                  {couponId && (
                    <CouponCard
                      key={coupon.couponDetail.id}
                      coupon={coupon.couponDetail}
                    />
                  )}
                  {planId && planTime && (
                    <PlanDetail
                      plan={plan}
                      currency={currency}
                      price={price}
                      planTime={planTime}
                    />
                  )}
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <PINInput
                  pin={pin}
                  setPin={setPin}
                  pinError={pinError}
                  setPinError={setPinError}
                />
                <Button variant="primary" type="submit" className="mt-4 ">
                  {isLoading && (
                    <span className="spinner-border spinner-border-sm text-danger"></span>
                  )}
                  &nbsp;Confirm buy
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointsPayment;
