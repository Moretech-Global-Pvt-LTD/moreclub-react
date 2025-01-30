import React from "react";
import { Col, Container, Placeholder, Row } from "react-bootstrap";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseURL } from "../../config/config";
import UniversalErrorbox from "../Layout/UniversalErrorBox";
import { Link } from "react-router-dom";





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
    <Container className="my-4">
      <Row className="justify-content-center text-center">
        {/* <div className="d-flex justify-content-between align-items-center"> */}
            <h4 className="mt-4 mb-5">Best Deals in Town </h4>
            {/* <Link to="/morefood">
              <Button variant="link">View All</Button>
            </Link> */}
        {/* </div> */}
        {data.map((partner, index) => {
            const slug = partner.name.replace(/ /g, "-");
          return(
          <Col xs={6} sm={3} lg={3} xxl={2} key={index} className="partner-logo">
            
            <Link to={`/partners/${partner.id}/${slug}`}>
            <img
              className="partner-logo "
              src={`${partner.banner}`}
              alt="Light"
              style={{ height: "100px",  width: "100px", objectFit: "cover", borderRadius: "50%" }}
            />
            <p>{partner.name}</p>
              </Link>
          </Col>
        )})}
      </Row>
    </Container>
  );
};

export default PartnerSection;
