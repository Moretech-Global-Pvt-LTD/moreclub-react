import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const BusinessTypesCard = ({ id, logo, name }) => {

    const slug = name.replace(" ", "-");

    return (
        <Link to={`/partners/${id}/${slug}`} className="d-flex flex-column" style={{ height: "100%" }}>
            <Card className="nearby-offers-card flex-grow-1">
                <div className="mx-auto mt-2 mb-0">
                    {!logo ? (
                        <div
                            className="partner-logo-wrapper ms-0 me-0 mb-3 d-flex justify-content-center align-items-center text-uppercase"
                            style={{
                                width: "60px",
                                height: "60px",
                                objectFit: "contain",
                                backgroundColor: "#fff",
                            }}
                        >
                            {name[0]}
                        </div>
                    ) : (
                        <img
                            src={logo}
                            style={{
                                width: "60px",
                                height: "60px",
                                objectFit: "contain",
                                backgroundColor: "#fff",
                            }}
                            alt="logo"
                            className="img-fluid rounded-circle mb-3 profile-image"
                        />
                    )}
                </div>
                <Card.Body className="pt-0">
                    <Card.Title className="text-dynamic-white text-center line">
                        {name}
                    </Card.Title>
                </Card.Body>
            </Card>
        </Link>
    );
};

export default BusinessTypesCard;
