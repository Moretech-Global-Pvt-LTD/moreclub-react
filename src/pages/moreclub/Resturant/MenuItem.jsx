import React from "react";
import DashboardLayout from "../../../components/Layout/DashboardLayout";
import Divider from "../../../components/divider/Divider";

import MenuItem from "../../../components/Moreclub/Resturant/MenuItem";
import { Placeholder } from "react-bootstrap";
import { axiosInstance } from "../../..";
import { morefoodURL } from "../../../config/config";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const RestroMenuItem = () => {
const { res_id, slug } = useParams();

const { data, isLoading, isError } = useQuery({
  queryKey: [`Resturant List ${res_id}`],
  queryFn: async () => {
    const response = await axiosInstance.get(
      `${morefoodURL}moreclub/user/restaurants/details/${res_id}/`
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
  



  return (
    <DashboardLayout title={data.name} >
      <MenuItem slug={slug} />
      <Divider />
    </DashboardLayout>
  );
};

export default RestroMenuItem;
