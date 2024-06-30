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
  const [messages, setMessage] = useState("");
  const [navlinks, setNavLinks] = useState("/dashboard");
  const [buttonMessage, setButtonMessage] = useState("");

  const [status, setStatus] = useState("");

  const [requestCompleted, setRequestCompleted] = useState(false);
  const navigate = useNavigate();

  // const url = window.location.href;
  const queryParams = new URLSearchParams(window.location.search);
  const payment_intent = queryParams.get("payment_intent");
  const client_secret = queryParams.get("payment_intent_client_secret");
  const redirectStatus = queryParams.get("redirect_status");

  useEffect(() => {
    if (queryParams.get("redirect_status") === "succeeded") {
      setStatus(queryParams.get("redirect_status"));
    }
    if (queryParams.get("redirect_status") === "failed") {
      setStatus(queryParams.get("redirect_status"));
      navigate(window.location.pathname);
    }
  }, [redirectStatus]);

  const shouldFetch = Boolean(
    redirectStatus !== "failed" &&
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
      if (data) {
        if (data.meta_data.id === "buy-points") {
          const res = await buyPoints({
            payment_intent: data.payment_intent,
            amount: data.amount,
            currency_code: data.currency_code,
            payment_method: data.payment_method,
          });
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
            setStatus("failed");
          }
        }
        setRequestCompleted(true);
        navigate(window.location.pathname);
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

                <Link to={"/points/buy"}>
                  <Button variant="danger" className="mb-3">
                    Try again
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
