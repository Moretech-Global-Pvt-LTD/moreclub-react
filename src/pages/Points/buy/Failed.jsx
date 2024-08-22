import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import DashboardLayout from "../../../components/Layout/DashboardLayout";
import { Link } from "react-router-dom";

const Failed = () => {

    const queryParams = new URLSearchParams(window.location.search);
    const error = queryParams.get("error");

    return (
        <DashboardLayout>
            <div className="text-center my-5 ">
                <Row>
                    <Col>
                        <i
                            className="bi bi-check-circle text-success p-3 rounded-pill"
                            style={{ fontSize: "4rem", backgroundColor: "White" }}
                        ></i>
                        <h1 className="mb-4 text-danger mt-4">Payment Failed!</h1>
                        <p className="mb-4 fs-5">{error}</p>
                        <p className="mb-4">
                            Please, Try again.
                        </p>
                        <Link to={'/points/buy'}>
                            <Button variant="warning" className="mb-3" href={'/points/buy'}>
                                Try Again
                            </Button>
                        </Link>

                    </Col>
                </Row>
            </div>
        </DashboardLayout>
    );
};

export default Failed;
