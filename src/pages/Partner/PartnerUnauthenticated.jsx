import React from "react";
import { Col, Placeholder, Row } from "react-bootstrap";

import { baseURL } from "../../config/config";
import { useQuery } from "@tanstack/react-query";
import OffersCard from "../../components/dashboard/Offercard";
import axios from "axios";

const PartnerUnauthenticatedContent = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["partners data"],
    queryFn: async () => {
      const response = await axios.get(
        `${baseURL}business/our/partners/`
      );
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
    <div className="mt-4">
      <Row sm={2} md={4} className="gx-3 gy-3">
        {data.map((item) => (
          <Col className="d-flex flex-column">
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

export default PartnerUnauthenticatedContent;
