import React from "react";
import { baseURL } from "../../config/config";
import { axiosInstance } from "../..";

import { useSelector } from "react-redux";

import { useLocation } from "react-router-dom";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import Unauthorized from "../../components/unauthorized/unauthorized";
import Loading from "../../components/loading/loading";
import { useQuery } from "@tanstack/react-query";
import { Placeholder, Table } from "react-bootstrap";
import LeadTable from "./LeadTable";

const fetchReferals = async (page, limit=20 , offset=0) => {
  const res = await await axiosInstance.get(
    // `${baseURL}referral/user/?page=${page}`
    `${baseURL}referral/user/?limit=${limit}&page=${page}&offset=${offset}`

  );
  return res.data;
};

const LeadPage = () => {
  const { search } = useLocation();
  const page = new URLSearchParams(search).get("page") || 1;
  const limit = new URLSearchParams(search).get("limit") || 20;
  const offset = new URLSearchParams(search).get("offset") || 0;
  const permission = useSelector((state) => state.permissionReducer);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["referals", page ,limit, offset],
    queryFn: async () => fetchReferals(page ,limit , offset),
    keepPreviousData: true,
  });

  if (isLoading) {
    return (
      <DashboardLayout title={"Leads"}> 
        <Table responsive className="bg-white">
          <thead className="border-bottom-0">
            <tr className="pricingcard-premium">
              <th className="text-white"> Name</th>
              <th className="text-white">Email</th>
              <th className="text-white">Phone</th>
              <th className="text-white text-center">Action</th>
            </tr>
          </thead>

        </Table>
        <div className="row gap-2">

          <Placeholder as="p" animation="glow" className="rounded my-1 w-100">
            <Placeholder xs={12} style={{ height: "2rem" }} />
          </Placeholder>
          <Placeholder as="p" animation="glow" className="rounded my-2 w-100">
            <Placeholder xs={12} style={{ height: "2rem" }} />
          </Placeholder>
          <Placeholder as="p" animation="glow" className="rounded my-2 w-100">
            <Placeholder xs={12} style={{ height: "2rem" }} />
          </Placeholder>
          <Placeholder as="p" animation="glow" className="rounded my-2 w-100">
            <Placeholder xs={12} style={{ height: "2rem" }} />
          </Placeholder>
          <Placeholder as="p" animation="glow" className="rounded my-2 w-100">
            <Placeholder xs={12} style={{ height: "2rem" }} />
          </Placeholder>

        </div>
      </DashboardLayout>
    );
  }
  if (isError) {
    return (
      <DashboardLayout title={"Leads"}>
        <p className="text-dynamic-white">Error retriving the data...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title={"Leads"}>
      {permission.permission.isLoading ? (
        <Loading />
      ) : (
        <>
          {permission.permission && permission.permission.my_network ? (
            <LeadTable list={data.data} meta={data.meta} />
          ) : (
            <Unauthorized />
          )}
        </>
      )}
    </DashboardLayout>
  );
};

export default LeadPage
