import React from "react";
import { useParams } from "react-router-dom";
import {
 
  Placeholder,
} from "react-bootstrap";
import { axiosInstance } from "../../../..";
import { morefoodURL } from "../../../../config/config";
import { useQuery } from "@tanstack/react-query";
import OrderDetailsContent from "./OrderDetailContent";
import RestaurantLayout from "../../../../components/Layout/RestaurantLayout";
import { morefoodAuthenticatedAxios } from "../../../../utills/axios/morefoodaxios";

const OrderDetails = () => {
  const { ord_id, } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: [`Resturant order detail ${ord_id}`],
    queryFn: async () => {
      const response = await morefoodAuthenticatedAxios.get(
        `orders/order/${ord_id}/`
      );
      const data = await response.data.data;
      return data;
    },
    staleTime: 60000,
  });

  if (isLoading) {
    return (
      <RestaurantLayout>
        <div className="row gap-2">
          <Placeholder as="p" animation="glow" className="rounded w-50 me-2">
            <Placeholder xs={12} lg={6} style={{ height: "10rem" }} />
          </Placeholder>
          <Placeholder as="p" animation="glow" className="rounded  w-25 me-2">
            <Placeholder xs={12} style={{ height: "10rem" }} />
          </Placeholder>
          <Placeholder as="p" animation="glow" className="rounded  w-25">
            <Placeholder xs={12} style={{ height: "10rem" }} />
          </Placeholder>
          <Placeholder as="p" animation="glow" className="rounded w-25 me-2">
            <Placeholder xs={12} style={{ height: "10rem" }} />
          </Placeholder>
        </div>
      </RestaurantLayout>
    );
  }

  if (isError) {
    return (
      <RestaurantLayout className="text-dynamic-white">
        Error: retriving
      </RestaurantLayout>
    );
  }

  // Sample data, replace with actual data fetching logic



  return (
    <RestaurantLayout>
      <OrderDetailsContent item={data} />
    </RestaurantLayout>
  );
};

export default OrderDetails;
