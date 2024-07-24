import React from "react";
import { Col, Container, Placeholder, Row } from "react-bootstrap";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseURL } from "../../config/config";





const PartnerSection = () => {

    const { data, isLoading, isError } = useQuery({
      queryKey: ["partnerlogos"],
      queryFn: async () => {
        const response = await axios.get(
          `${baseURL}partners/list/`
        );
        const data = await response.data.data;
        return data;
      },
      staleTime: 100,
    });

    if (isLoading) {
      return (
        <div className="container">
          <div className="row gap-2">
            <Placeholder
              as="p"
              animation="glow"
              className="rounded  me-2"
              style={{ width: "4rem", height: "4rem" }}
            >
              <Placeholder xs={6} style={{ height: "4rem" }} />
            </Placeholder>
            <Placeholder
              as="p"
              animation="glow"
              className="rounded  me-2"
              style={{ width: "4rem", height: "4rem" }}
            >
              <Placeholder xs={6} style={{ height: "4rem" }} />
            </Placeholder>
            <Placeholder
              as="p"
              animation="glow"
              className="rounded  me-2"
              style={{ width: "4rem", height: "4rem" }}
            >
              <Placeholder xs={6} style={{ height: "4rem" }} />
            </Placeholder>
            <Placeholder
              as="p"
              animation="glow"
              className="rounded  me-2"
              style={{ width: "4rem", height: "4rem" }}
            >
              <Placeholder xs={6} style={{ height: "4rem" }} />
            </Placeholder>
          </div>
        </div>
      );
    }

    if (isError) {
      return <div className="text-dynamic-white">Error: retriving</div>;
    }


  return (
    <Container>
      <Row className="justify-content-center text-center">
        {data.map((partner, index) => (
          <Col xs={6} sm={3} lg={3} xxl={2} key={index} className="partner-logo">
            
            <a href={partner.web_link} target="_blank" rel="noreferrer">
            <img
              className="nav-light-logo partner-logo"
              src={`${partner.black_logo}`}
              alt="Light"
            />
            <img
              className=" nav-dark-logo partner-logo "
              src={`${partner.white_logo}`}
              alt="Dark"
              />
              </a>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PartnerSection;
