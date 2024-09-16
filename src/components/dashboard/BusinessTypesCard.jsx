import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const BusinessTypesCard = ({ id, logo, name, banner }) => {

    const slug = name.replace(" ", "-");

    return (
        <Link to={`/partners/${id}/${slug}`} className="d-flex flex-column" style={{ height: "100%", backgroundImage: `url(${banner?? ""})` }}>
            <Card className="nearby-offers-card flex-grow-1 " style={{
                height: "100%", width: "100%", backgroundImage: `url(${banner ?? ""})`, backgroundSize: "cover", backgroundPosition: "center",    
    backgroundRepeat: "no-repeat" }}>
                <div className="mx-auto mt-2 mb-0">
                    {!logo ? (
                        <div
                            className="partner-logo-wrapper ms-0 me-0 mb-3 d-flex justify-content-center align-items-center text-uppercase"
                            style={{
                                width: "60px",
                                height: "60px",
                                objectFit: "contain",
                                backgroundColor: `${banner ? "gray" : "white"}`,
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
                                backgroundColor: `${banner ? "#ffc106" : "white"}`,
                            }}
                            alt="logo"
                            className="img-fluid rounded-circle mb-3  profile-image"
                        />
                    )}
                </div>
                <Card.Body className="pt-0">
                    <p className={`${banner ? "text-black" : "text-dynamic-white"}  text-center fw-bold line`}>
                        {name}
                    </p>
                </Card.Body>
            </Card>
        </Link>
    );
};

export default BusinessTypesCard;
