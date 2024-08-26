import React from "react";
import DashboardLayout from "../../../../components/Layout/DashboardLayout";

import { Button, Col, Placeholder, Row } from "react-bootstrap";

import { Link, useParams } from "react-router-dom";
import { morefoodURL } from "../../../../config/config";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../..";
import OfferCard from "../../../../components/Moreclub/Resturant/Offer/OfferCard";


const RestroOffer = () => {
  const { res_id , slug} = useParams();
 

  const name=slug.replace("-"," ")

  const { data, isLoading, isError } = useQuery({
    queryKey: [`Resturant offer List ${res_id}`],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `${morefoodURL}moreclub/user/offers/${res_id}/`
      );
      const data = await response.data.data;
      return data;
    },
    staleTime: 100,
  });

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className=" card row gap-2">
          <Placeholder as="p" animation="glow" className="rounded w-50 me-2">
            <Placeholder xs={12} style={{ height: "4rem" }} />
          </Placeholder>
          <Placeholder as="p" animation="glow" className="rounded  w-75 me-2">
            <Placeholder xs={12} style={{ height: "4rem" }} />
          </Placeholder>
          <Placeholder as="p" animation="glow" className="rounded  w-100">
            <Placeholder xs={12} style={{ height: "4rem" }} />
          </Placeholder>
        </div>
      </DashboardLayout>
    );
  }

  if (isError) {
    return <div className="text-dynamic-white">Error: retriving</div>;
  }


 

 

  return (
    <DashboardLayout title={`${ name } Offers`}>
      <div>
        <div className="d-flex align-items-center justify-content-between my-2">
          <div></div>
          <Link to={`/resturant/${res_id}/offer/create/${slug}`}>
            <Button variant="warning">
              Add Offers
            </Button>
          </Link>
        </div>

        <Row
          xs={1}
          sm={2}
          md={2}
          lg={2}
          xl={3}
          xxl={3}
          className="gx-3 gy-3 my-4"
        >
          {data.map((item) => (
            <Col className="d-flex flex-column">
              <OfferCard
                id={item.id}
                food_item={item.food_item}
                name={item.name}
                banner={item.banner}
                price={item.price}
                description={item.description}
                start_offer={item.start_offer}
                end_offer={item.end_offer}
                currency_Symbol={item.currency}
                restaurant={item.restaurant}
              />
            </Col>
          ))}
        </Row>
        <Row>
          {data && data.length === 0 && (
            <p className="text-dynamic-white text-center">Add Some Offer for your Resturants</p>
          )}
        </Row>
      </div>
    </DashboardLayout>
  );
};

export default RestroOffer;
