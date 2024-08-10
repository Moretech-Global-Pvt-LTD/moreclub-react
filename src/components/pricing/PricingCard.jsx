import React from "react";
import { Row, Col, Card, Button, Container, CardFooter } from "react-bootstrap";
import FreeButton from "../home/FreeButton";

const pricingData = [
  {
    plan: "Starter",
    price: "$97",
    currency: "USD",
    period: "Per Month",
    features: [
      "ALL THE TOOLS TO CAPTURE MORE LEADS",
      "NURTURE & CLOSE LEADS INTO CUSTOMERS",
      "FULL ONLINE BOOKING, PIPELINES, SOCIAL CAL, WEBSITE BUILDER, AND MORE!",
      "UNLIMITED CONTACTS & USERS, ADD AS MANY CONTACTS & USERS AS YOU NEED!",
      "SET UP TO THREE SUB-ACCOUNTS",
    ],
    button: "14 DAY FREE TRIAL",
    buttonText: "TAKE YOUR MARKETING TO THE NEXT LEVEL",
    cardClass: "pricingcard-starter",
  },
  {
    plan: "Unlimited",
    price: "$297",
    currency: "USD",
    period: "Per Month",
    features: [
      "EVERYTHING IN THE STARTER PLAN",
      "API ACCESS - INTEGRATE WITH ANYTHING",
      "UNLIMITED SUB-ACCOUNTS - AS MANY CLIENT ACCOUNTS AS YOU NEED FOR ONE PRICE!",
      "BRANDED DESKTOP APP - CUSTOM DOMAINS AND COMPLETE CONTROL OVER THE LOOK AND FEEL OF THE PLATFORM!",
    ],
    button: "14 DAY FREE TRIAL",
    buttonText: "TAKE YOUR MARKETING TO THE NEXT LEVEL",
    cardClass: "pricingcard-other",
  },
];

const PricingCards = ({mst}) => {
  return (
    <Container>
      <Row>
        {pricingData.map((item, index) => (
          <Col xs={12} md={4} xl={3} key={index} className="mb-4">
            <Card
              className={`pricingcard ${
                item.plan === "Starter"
                  ? "pricingcard-starter"
                  : "pricingcard-other"
              } px-0`}
            >
              <Card.Body>
                <Card.Title className="">
                  <h4
                    className={`pricingcard ${
                      item.plan === "Starter"
                        ? "pricing-text-color"
                        : "text-white"
                    }`}
                  >
                    {item.plan}
                  </h4>
                </Card.Title>
                <div
                  className={` ${
                    item.plan === "Starter"
                      ? "bg-gray text-warning"
                      : "bg-warning text-white"
                  } mb-1 `}
                >
                  <h1
                    className={` ${
                      item.plan === "Starter"
                        ? "text-dynamic-white"
                        : "pricing-text-color"
                    } text-center  mb-0 mt-0 `}
                  >
                    {/* <small>{item.currency}</small> */}
                    {item.price}
                  </h1>
                  <small>{item.period}</small>
                </div>

                <ul className="pricingcard-features">
                  {item.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>{feature}</li>
                  ))}
                </ul>
              </Card.Body>
              <div className="mx-1">
                <FreeButton />
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PricingCards;
