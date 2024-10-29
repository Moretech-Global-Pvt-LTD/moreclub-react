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
  const { ord_id, res_id, slug } = useParams();
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

  const intialdata = {
    address: "sujit ko ghar",
    email: "10sujitkhanal@gmail.com",
    full_name: "Sujit Khanal",
    id: "9ca75234-94e0-47d7-bba5-7c4bba385951",
    lat: 30.001,
    lng: 90.878,
    note: "cksiuhbv nsvcshb cvcvshbvc sckjs",
    order_id: "drftgyhuj",
    order_items: [
      {
        food_item: {
          id: "d2dc85d0-5662-40d5-bbac-1ee51dca30fc",
          image: "/media/food_item/eggtoast.jpeg",
          name: "Egg Toast",
          short_description:
            "Newari Khaja includes beaten rice (baji), achar (pickles), chhoyela (spiced meat), egg, soybeans, bara (fried lentil patties), Aalu Tama (fermented bamboo shoots with potatoes), and chhyang (traditional rice beer).",
        },
        order: "fd2cf9f3-e3dd-49df-ae77-e260ab945105",
        price: 200,
        quantity: 1,
      },
    ],
    order_status: "Cooked",
    order_type: "dine-here",
    ordered_date: "2024-07-26T11:39:38",
    phone_no: "+977987654321",
    restaurant: "3fd10479-8b3d-49b9-b738-f54c3d46710d",
  };
  console.log(data)

  return (
    <DashboardLayout title={`${name} order`}>
      <OrderDetailsContent item={data} />
    </DashboardLayout>
  );
};

export default OrderDetails;
