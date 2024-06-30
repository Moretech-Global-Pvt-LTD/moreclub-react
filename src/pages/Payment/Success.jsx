import React, { useEffect, useState } from "react";
import { Button, Col, Placeholder, Row } from "react-bootstrap";
import { baseURL } from "../../../config/config";
import { axiosInstance } from "../../..";
import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "../../../components/Layout/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { setMessage } from "../../../redux/slices/userSlice";
import Dashboard from "../../Dashboard/Dashboard";
import { getWallet } from "../../../redux/api/wallets";

const fetchPaymentIntent = async ({ queryKey }) => {
  const [key, { payment_intent, client_secret }] = queryKey;
  const res = await axiosInstance.post(
    `${baseURL}payments/stripe/confirm-payment-intent/`,
    { payment_intent, client_secret }
  );
  return res.data.data;
};

const buyPoints = async (data) => {
  const res = await axiosInstance.post(`${baseURL}wallets/buy/points/`, data);
  return res.data.data;
};

const buyCoupon = async (data) => {
  const buy_coupon = await axiosInstance.post(
    `${baseURL}coupons/buy/created/`,
    data
  );
  return buy_coupon.data.data;
};

const register_membership = async (data) => {
  const res = await axiosInstance.post(
    `${baseURL}members/register/membership/`,
    data
  );
  return res.data.data;
};

const Success = () => {
  const purchaseData = useSelector((state) => state.purchaseReducer);
  const [message, setMessage] = useState("");
  const [navlinks, setNavLinks] = useState("/dashboard");
  const [buttonMessage, setButtonMessage] = useState("");

  const [status, setStatus] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [requestCompleted, setRequestCompleted] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const url = window.location.href;
  const queryParams = new URLSearchParams(window.location.search);
  const payment_intent = queryParams.get("payment_intent");
  const client_secret = queryParams.get("payment_intent_client_secret");
  const redirectStatus = queryParams.get("redirect_status");


  useEffect(()=>{
    if(redirectStatus === "succeeded"){
      setStatus(redirectStatus)
    }
    if(redirectStatus === "failed"){
      setStatus(redirectStatus)
    }

  },[redirectStatus])


  const shouldFetch = Boolean(
    redirectStatus === "succeeded" &&
      !requestCompleted &&
      payment_intent &&
      client_secret
  );

  const { data, error, isLoading } = useQuery({
    queryKey: ["fetchPaymentIntent", { payment_intent, client_secret }],
    queryFn: fetchPaymentIntent,
    enabled: shouldFetch,
  });

  useEffect(() => {
    async function payment_confirm() {
      setAmount(data?.amount);
      setCurrency(data?.currency_code);
      setPaymentType(data?.payment_method_type);
      setStatus("succeeded");
      if (data) {
        if (data.meta_data.id === "coupon-buy") {
          const res = await buyCoupon({
            payment_intent: data.payment_intent,
            coupon: data.meta_data?.couponId,
          });
          if (res.success) {
            message.success("Coupon purchased successfully");

            setMessage(`Coupon purchased using ${paymentType}`);
            setNavLinks("/my-coupons");
            setButtonMessage("view Membership");
            dispatch(getWallet());
          } else {
            message.message("Error buying coupon ");
            setMessage(`Error buying Coupon purchased using ${paymentType}`);
            setNavLinks("/coupon");
            setButtonMessage("/Try again");
            setStatus("failed");
          }
        }

        if (data.meta_data.id === "buy-points") {
          buyPoints({
            payment_intent: data.payment_intent,
            amount: data.amount,
            currency_code: data.currency_code,
            payment_method: data.payment_method,
          })
            .then(() => {
              message.success("Money loaded successfully");
              setMessage(
                `${currency}${amount} loaded with ${paymentType} successfully`
              );
              setNavLinks("/wallet");
              setButtonMessage("View Wallet");
            })
            .catch((error) => {
              setStatus("failed");
              message.message("Error loading Money ");
              setMessage(`Error loading Money with ${paymentType}`);
              setNavLinks("/points/buy");
              setButtonMessage("Try again");
              setStatus("failed");
              console.error("Error buying points:", error);
            });
        }

        if (data.meta_data.id === "membership-plan") {
          const res = await register_membership({
            membership_type: data.meta_data.planId,
            payment_intent: data.payment_intent,
            plan_time: data.meta_data.planTime,
          });
          if (res.success) {
            message.success("Membership Plan updated successfully");
            setMessage(`Membership Updated Successfully`);
            setNavLinks("/profile");
            setButtonMessage("view Membership");
          } else {
            message.message("Error buying Membership Plan ");
            setMessage(
              `Error buying Buying Membership plan with ${paymentType}`
            );
            setNavLinks("/pricing");
            setButtonMessage("/Try again");
            setStatus("failed");
          }
        }

        setRequestCompleted(true);
        navigate(window.location.pathname);

        // Call buyPoints function separately
      }
    }
    payment_confirm();
  }, [data, navigate]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="text-center my-5">
          <Row>
            <Col>
              <Placeholder as="p" animation="glow" className="rounded">
                <Placeholder xs={2} size="xs" style={{ height: "4rem" ,width:"4rem" }} />
              </Placeholder>
              <Placeholder as="p" animation="glow" className="rounded">
                <Placeholder xs={6} size="xs" style={{ height: "2rem" }} />
              </Placeholder>
              <Placeholder as="p" animation="glow" className="rounded">
                <Placeholder xs={6} size="xs" style={{ height: "2rem" }} />
              </Placeholder>
              <Placeholder as="p" animation="glow" className="rounded">
                <Placeholder xs={6} size="xs" style={{ height: "3rem", width:"7rem" }} />
              </Placeholder>
            </Col>
          </Row>
        </div>
      </DashboardLayout>
    );
  }
  if (error) {
    return (
      <DashboardLayout>
        <div className="text-center my-5 ">
          <Row>
            <Col>
              <i
                className="bi bi-x-circle text-danger p-3 rounded-pill"
                style={{ fontSize: "4rem", backgroundColor: "White" }}
              ></i><br/>
              <p className="text-dynamic-white">{error?.message}</p>
              <h1 className="mb-4 text-danger mt-4">Payment Failed!</h1>

              <Button variant="danger" className="mb-3" href={'/dashboard'}>
                Dashboard
              </Button>
            </Col>
          </Row>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="text-center my-5 ">
        <Row>
          <Col>
            {status === "succeeded" && (
              <>
                <i
                  className="bi bi-check-circle text-success p-3 rounded-pill"
                  style={{ fontSize: "4rem", backgroundColor: "White" }}
                ></i>
                <h1 className="mb-4 text-success mt-4">Payment Successful!</h1>
                <p className="mb-4 fs-5">{message}</p>
                <p className="mb-4">
                  Thank you for your payment. Your transaction has been
                  completed successfully.
                </p>
                <Button variant="success" className="mb-3" href={navlinks}>
                  {buttonMessage}
                </Button>
              </>
            )}
            {status === "failed" && (
              <>
                <i
                  className="bi bi-x-circle text-danger p-3 rounded-pill"
                  style={{ fontSize: "4rem", backgroundColor: "White" }}
                ></i><br/>
                {message}
                <h1 className="mb-4 text-danger mt-4">Payment Failed!</h1>
                <p className="mb-4">
                  Please try again. Your transaction has not been completed.
                </p>
                <Button variant="danger" className="mb-3" href={navlinks}>
                  {buttonMessage}
                </Button>
              </>
            )}
            {status !== "failed" && status !== "succeeded" && (
              <>
                <h1 className="mb-4">Payment Status Unknown!</h1>

                <p className="mb-4">
                  Please try again. Your transaction status is unknown.
                </p>
                <Button variant="Warning" className="mb-3" href="/dashboard">
                  Dashboard
                </Button>
              </>
            )}
          </Col>
        </Row>
      </div>
    </DashboardLayout>
  );
};

export default Success;
