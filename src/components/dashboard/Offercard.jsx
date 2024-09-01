import React from "react";
import { Card} from "react-bootstrap";
import { Link } from "react-router-dom";

const OffersCard = ({ id, logo, name, address, email, phone, discounts }) => {
  const slug = name.replace(" ", "-");
  return (
    <Link to={`/partner/detail/${id}/${slug}`} className="d-flex flex-column" style={{height:"100%"}}>
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
              alt="Profile"
              className="img-fluid rounded-circle mb-3 profile-image"
            />
          )}
        </div>
        <Card.Body className="pt-0">
          <Card.Title className="text-dynamic-white text-center line">
            {name}
          </Card.Title>
          <Card.Text className="line-clamp-1">
            <i class="bi bi-geo-alt"></i>&nbsp;&nbsp;{address}
          </Card.Text>
          {/* <Card.Text className="line-clamp-1"><a className='fs-6 fw-light text-white' href={`mailto:${email}`} rel='noreferrer' target="_blank"><i class="bi bi-envelope"></i>&nbsp;{email}</a></Card.Text> */}
          <Card.Text>
            <a
              className="fs-6 fw-light text-dynamic-white"
              href={`href=${phone}`}
            >
              <i class="bi bi-telephone"></i>&nbsp;&nbsp;{phone}
            </a>
          </Card.Text>
          {discounts &&
            discounts.map((dics) => (
              <>
                {dics.discount !==  0 && 
              <Card.Text className="text-warning">
                {dics.discount}% discounts
              </Card.Text>
              }
              </>
            ))}
        </Card.Body>
      </Card>
    </Link>
  );
};

export default OffersCard;
