import React from "react";
import { Button, Col, Placeholder, Row } from "react-bootstrap";
import OffersCard from "./Offercard";
import axios from "axios";
import { baseURL } from "../../config/config";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const DashboardOffers = () => {
 
  const { data, isLoading, isError } = useQuery({
    queryKey: ["offers data"],
    queryFn: async () => {
      const response = await axios.get(`${baseURL}business/our/partners/`);
      return response.data.data;
    },
    staleTime: 1000,
  });

  if (isLoading) {
    return (
      <div>
        <Placeholder as="p" animation="glow" className="rounded">
          <Placeholder xs={12} size="lg" style={{ height: "7rem" }} />
        </Placeholder>
        <Placeholder as="p" animation="glow" className="rounded">
          <Placeholder xs={12} style={{ height: "7rem" }} />
        </Placeholder>
        <Placeholder as="p" animation="glow" className="rounded">
          <Placeholder xs={12} style={{ height: "7rem" }} />
        </Placeholder>
      </div>
    );
  }

  if (isError) {
    <div className="text-dynamic white">Error getting data</div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-item-center">
      <h2 className="mt-4 mb-3">Partners Offers </h2>
      <Link to="/partners">
      <Button variant="link">
        View All
      </Button>
      </Link>
          </div>  
      <Row xs={1} sm={2} md={2} lg={4} className="gx-3 gy-3">
        {data.slice(0,4).map((item) => (
          <Col>
            <OffersCard
              id={item.id}
              logo={item.business_logo}
              name={item.business_name}
              address={item.business_address}
              email={item.business_email}
              phone={item.business_phone}
              discounts={item.business_discounts}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default DashboardOffers;
