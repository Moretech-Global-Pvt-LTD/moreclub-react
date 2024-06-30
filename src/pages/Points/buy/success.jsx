import React, { useEffect, useState } from "react";
import { Button, Col, Placeholder, Row } from "react-bootstrap";
import { baseURL } from "../../../config/config";
import { axiosInstance } from "../../..";
import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "../../../components/Layout/DashboardLayout";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { setMessage } from "../../../redux/slices/userSlice";
import Dashboard from "../../Dashboard/Dashboard";
import { getWallet } from "../../../redux/api/wallets";
import { message } from "antd";
import { userMembership } from "../../../redux/api/userMembershipAPI";

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
  console.log("points", res);
  return res.data;
};

const buyCoupon = async (data) => {
  const buy_coupon = await axiosInstance.post(
    `${baseURL}coupons/buy/created/`,
    data
  );
  return buy_coupon.data;
};

const register_membership = async (data) => {
  const res = await axiosInstance.post(
    `${baseURL}members/register/membership/`,
    data
  );
  return res.data;
};

const Success = () => {
  const purchaseData = useSelector((state) => state.purchaseReducer);
  const [messages, setMessage] = useState("");
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

            setMessage(`Coupon purchased successfully`);
            setNavLinks("/my-coupons");
            setButtonMessage("view Membership");
            dispatch(getWallet());
          } else {
            message.error("Error buying coupon ");
            setMessage(`Error buying Coupon purchased`);
            setNavLinks("/coupon");
            setButtonMessage("/Try again");
            setStatus("failed");
          }
        }

        if (data.meta_data.id === "buy-points") {
          const res = await buyPoints({
            payment_intent: data.payment_intent,
            amount: data.amount,
            currency_code: data.currency_code,
            payment_method: data.payment_method,
          });
          console.log("in points", res);
          if (res.success) {
            message.success("Money loaded successfully");
            setMessage(
              `${data.currency_code}${data.amount} loaded with ${data?.payment_method_type} successfully`
            );
            setNavLinks("/wallet");
            setButtonMessage("View Wallet");
          } else {
            setStatus("failed");
            message.error("Error loading Money ");
            setMessage(`Error loading Money with ${data?.payment_method_type}`);
            setNavLinks("/points/buy");
            setButtonMessage("Try again");
            setStatus("failed");
            console.error("Error buying points:", error);
          }
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
            await dispatch(userMembership())
          } else {
            message.error("Error buying Membership Plan");
            setMessage(`Error buying Buying Membership plan `);
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
                <Placeholder
                  xs={2}
                  size="xs"
                  style={{ height: "4rem", width: "4rem" }}
                />
              </Placeholder>
              <Placeholder as="p" animation="glow" className="rounded">
                <Placeholder xs={6} size="xs" style={{ height: "2rem" }} />
              </Placeholder>
              <Placeholder as="p" animation="glow" className="rounded">
                <Placeholder xs={6} size="xs" style={{ height: "2rem" }} />
              </Placeholder>
              <Placeholder as="p" animation="glow" className="rounded">
                <Placeholder
                  xs={6}
                  size="xs"
                  style={{ height: "3rem", width: "7rem" }}
                />
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
              ></i>
              <br />
              <p className="text-dynamic-white">{error?.message}</p>
              <h1 className="mb-4 text-danger mt-4">Payment Failed!</h1>
              <Link to={"/dashboard"}>
                <Button variant="danger" className="mb-3">
                  Dashboard
                </Button>
              </Link>
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
                <p className="mb-4 fs-5">{messages}</p>
                <p className="mb-4">
                  Thank you for your payment. Your transaction has been
                  completed successfully.
                </p>
                <Link to={navlinks}>
                  <Button variant="success" className="mb-3" href={navlinks}>
                    {buttonMessage}
                  </Button>
                </Link>
              </>
            )}
            {status === "failed" && (
              <>
                <i
                  className="bi bi-x-circle text-danger p-3 rounded-pill"
                  style={{ fontSize: "4rem", backgroundColor: "White" }}
                ></i>
                <br />
                {messages}
                <h1 className="mb-4 text-danger mt-4">Payment Failed!</h1>
                <p className="mb-4">
                  Please try again. Your transaction has not been completed.
                </p>

                <Link to={navlinks}>
                  <Button variant="success" className="mb-3" href={navlinks}>
                    {buttonMessage}
                  </Button>
                </Link>
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
