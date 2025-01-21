import React from "react";
import { Col, Container, Placeholder, Row } from "react-bootstrap";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseURL } from "../../config/config";
import UniversalErrorbox from "../Layout/UniversalErrorBox";





const PartnerSection = () => {

  const { data, isLoading, isError } = useQuery({
    queryKey: ["business types"],
    queryFn: async () => {
      const response = await axios.get(`${baseURL}business/all/types/`);
      return response.data.data;
    },
    staleTime: 200000,
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
      return <UniversalErrorbox message="Something went wrong while fetching the Partner data" 
      retry={["business types"]}
      />
    }


  return (
    <Container>
      <Row className="justify-content-center text-center">
        {data.map((partner, index) => (
          <Col xs={6} sm={3} lg={3} xxl={2} key={index} className="partner-logo">
            
            {/* <a href={partner.web_link} target="_blank" rel="noreferrer"> */}
            <img
              className="partner-logo "
              src={`${partner.banner}`}
              alt="Light"
              style={{ height: "100px",  width: "100px", objectFit: "cover", borderRadius: "50%" }}
            />
            <p>{partner.name}</p>
              {/* </a> */}
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PartnerSection;
