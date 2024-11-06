import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
 
  Placeholder,
} from "react-bootstrap";
import DashboardLayout from "../../../../components/Layout/DashboardLayout";
import { axiosInstance } from "../../../..";
import { morefoodURL } from "../../../../config/config";
import { useQuery } from "@tanstack/react-query";
import OrderDetailsContent from "./OrderDetailContent";

const OrderDetails = () => {
  const { ord_id, slug } = useParams();
  const name = slug.replace("-", " ");

  const { data, isLoading, isError } = useQuery({
    queryKey: [`Resturant order detail ${ord_id}`],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `${morefoodURL}orders/order/${ord_id}/`
      );
      const data = await response.data.data;
      return data;
    },
    staleTime: 100,
  });

  if (isLoading) {
    return (
      <DashboardLayout>
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
      </DashboardLayout>
    );
  }

  if (isError) {
    return (
      <DashboardLayout className="text-dynamic-white">
        Error: retriving
      </DashboardLayout>
    );
  }

  // Sample data, replace with actual data fetching logic



  return (
    <DashboardLayout title={`${name} order`}>
      <OrderDetailsContent item={data} />
    </DashboardLayout>
  );
};

export default OrderDetails;
