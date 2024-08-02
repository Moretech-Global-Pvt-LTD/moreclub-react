import React from "react";
import { Badge, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const OfferCard = ({
  id,
  food_item,
  name,
  banner,
  price,
  description,
  start_offer,
  end_offer,
  currency_Symbol,
  restaurant,
}) => {
  return (
    <Link
      to={`#`}
      className="d-flex flex-column"
      style={{ height: "100%" }}
    >
      <Card className="nearby-offers-card flex-grow-1">
        <img
          src={banner}
          style={{
            width: "100%",
            maxHeight: "14rem",
            objectFit: "cover",
            backgroundColor: "#fff",
          }}
          alt="Profile"
          className="img-fluid  mb-3 profile-image"
        />
        <Card.Body className="row ">
          <Col xs={9}>
            <Card.Title className="text-dynamic-white text-start line">
              {name}
            </Card.Title>
            <Card.Text className="text-dynamic-white text-start line-clamp-2">
              {description},
            </Card.Text>
            <div className="d-flex flex-wrap gap-2 my-2">
              {food_item &&
                food_item?.map((item) => (
                  <Badge className="text-dynamic-white text-end">
                    {item.name}
                  </Badge>
                ))}
            </div>
            <Card.Text className="text-dynamic-white text-start">
              Starts at {start_offer}& upto {end_offer}
            </Card.Text>
            <Card.Text className="text-warning text-start">
              {currency_Symbol}&nbsp;{price}
            </Card.Text>
          </Col>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default OfferCard;
