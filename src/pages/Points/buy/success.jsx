import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import DashboardLayout from "../../../components/Layout/DashboardLayout";
import { Link } from "react-router-dom";

const Success = () => {
  
  const queryParams = new URLSearchParams(window.location.search);
  const amount = queryParams.get("amount");

  
  return (
    <DashboardLayout>
      <div className="text-center my-5 ">
        <Row>
          <Col>
                <i
                  className="bi bi-check-circle text-success p-3 rounded-pill"
                  style={{ fontSize: "4rem", backgroundColor: "White" }}
                ></i>
                <h1 className="mb-4 text-success mt-4">Payment Successful!</h1>
            <p className="mb-4 fs-5">{amount} is Loaded in your wallet</p>
                <p className="mb-4">
                  Thank you for your payment.
                </p>
                <Link to={'/wallet'}>
                  <Button variant="danger" className="mb-3" href={'/wallet'}>
                  Go Back to Wallet
                  </Button>
                </Link>
          </Col>
        </Row>
      </div>
    </DashboardLayout>
  );
};

export default Success;
