import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { baseURL } from "../../../config/config";
import { axiosInstance } from "../../..";
import { useSelector } from "react-redux";
import DashboardLayout from "../../../components/Layout/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const fetchPaymentIntent = async ({ queryKey }) => {
  const [key, { payment_intent, client_secret }] = queryKey;
  const res = await axiosInstance.post(
    `${baseURL}payments/stripe/confirm-payment-intent/`,
    { payment_intent, client_secret }
  );
  console.log("function call intent", res.data.data);
  return res.data.data;
};

const buyPoints = async (data) => {
  const res = await axiosInstance.post(`${baseURL}wallets/buy/points/`, data);
  console.log("buy poinst", res.data);
  return res.data;
};

const CouponSuccess = () => {
  const purchaseData = useSelector((state) => state.purchaseReducer);

  const [status, setStatus] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [requestCompleted, setRequestCompleted] = useState(false);
  const navigate = useNavigate();
  
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
  
    if (data) {
      console.log("onSuccess called with:", data); // Debug log
      setAmount(data.amount);
      setCurrency(data.currency_code);
      setPaymentType(data.payment_method_type);
      setStatus("succeeded");

      // Call buyPoints function separately
      buyPoints({
        payment_intent: data.payment_intent,
        amount: data.amount,
        currency_code: data.currency_code,
        payment_method: data.payment_method,
      })
        .then(() => {
          setRequestCompleted(true);
          navigate(window.location.pathname);
        })
        .catch((error) => {
          setStatus("failed");
          console.error("Error buying points:", error);
        });
    }
  }, [data, navigate]);

  if (isLoading){
    return <p>Loading...</p>
  }
  if (error){
    return <p>Error occurred: {error.message}</p>
  } 

  return (
    <DashboardLayout>
      <div className="text-center my-5">
        <Row>
          <Col>
            {status === "succeeded" && (
              <>
                <i
                  className="bi bi-check-circle text-success p-3 rounded-pill"
                  style={{ fontSize: "4rem", backgroundColor: "White" }}
                ></i>
                <h1 className="mb-4 text-success mt-4">Payment Successful!</h1>
                <p className="mb-4 fs-5">
                  Loaded {currency}
                  {amount} from {paymentType}
                </p>
                <p className="mb-4">
                  Thank you for your payment. Your transaction has been
                  completed successfully.
                </p>
                <Button variant="primary" className="mb-3" href="/wallet">
                  Go to Wallet
                </Button>
              </>
            )}
            {status === "failed" && (
              <>
                <i
                  className="bi bi-x-circle text-danger p-3 rounded-pill"
                  style={{ fontSize: "4rem", backgroundColor: "White" }}
                ></i>

                <h1 className="mb-4 text-danger mt-4">Payment Failed!</h1>
                <p className="mb-4">
                  Please try again. Your transaction has not been completed.
                </p>
                <Button variant="primary" className="mb-3" href="/wallet">
                  Try again
                </Button>
              </>
            )}
            {status !== "failed" && status !== "succeeded" && (
              <>
                <h1 className="mb-4">Payment Status Unknown!</h1>

                <p className="mb-4">
                  Please try again. Your transaction status is unknown.
                </p>
                <Button variant="primary" className="mb-3" href="/">
                  Try again
                </Button>
              </>
            )}
          </Col>
        </Row>
      </div>
    </DashboardLayout>
  );
};

export default CouponSuccess;
