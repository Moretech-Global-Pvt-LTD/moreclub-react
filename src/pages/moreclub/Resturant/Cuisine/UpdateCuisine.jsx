import React from "react";
import { Col, Placeholder, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../..";
import { morefoodURL } from "../../../../config/config";

import DashboardLayout from "../../../../components/Layout/DashboardLayout";
import UpdateCuisineForm from "../../../../components/Moreclub/Resturant/Cuisine/UpdateCuisine";
import Divider from "../../../../components/divider/Divider";
import RestaurantLayout from "../../../../components/Layout/RestaurantLayout";

const UpdateCuisineItem = () => {
  const { res_id, cuisine_id } = useParams();


  const { data, isLoading, isError } = useQuery({
    queryKey: [`Resturant Cuisine Detail ${ res_id } ${ cuisine_id }`],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `${morefoodURL}moreclub/user/cuisines/update/${cuisine_id}/${res_id}/`
      );
      const data = await response.data.data;
      return data;
    },
    staleTime: 100,
  });

  if (isLoading) {
    return (
      <RestaurantLayout className="">
        <div className="row gap-2">
          <Placeholder as="p" animation="glow" className="rounded w-25">
            <Placeholder xs={12} style={{ height: "4rem" }} />
          </Placeholder>
          <Placeholder as="p" animation="glow" className="rounded  w-25">
            <Placeholder xs={12} style={{ height: "4rem" }} />
          </Placeholder>
          <Placeholder as="p" animation="glow" className="rounded  w-25">
            <Placeholder xs={12} style={{ height: "4rem" }} />
          </Placeholder>
          <Placeholder as="p" animation="glow" className="rounded w-25">
            <Placeholder xs={12} style={{ height: "4rem" }} />
          </Placeholder>
          <Placeholder as="p" animation="glow" className="rounded  w-25">
            <Placeholder xs={12} style={{ height: "4rem" }} />
          </Placeholder>
          <Placeholder as="p" animation="glow" className="rounded  w-25">
            <Placeholder xs={12} style={{ height: "4rem" }} />
          </Placeholder>
          <Divider />
          <Divider />
        </div>
      </RestaurantLayout>
    );
  }

  if (isError) {

    return(
    <RestaurantLayout>

        <div className="text-dynamic-white">Error: retriving</div>;
        <Divider />
        <Divider />
      </RestaurantLayout>
    )
  }

  


  return (
    <RestaurantLayout>
      {/* <div className="d-flex align-items-center justify-content-between my-2"> */}
        <h4> Cuisines</h4>
      <Row>
        <Col>
          <UpdateCuisineForm res_id={res_id} data={data} />
        </Col>
      </Row>

     
        
     
    </RestaurantLayout>
  );
};

export default UpdateCuisineItem;
