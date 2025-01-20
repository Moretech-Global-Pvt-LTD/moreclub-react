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
import { LoadingJsx } from "../Network/NetworkPage";

const fetchLeads = async (page, limit=20 , offset=0, q = "",
  time = "",
  date_from = "",
  date_to = "" ) => {
  const res = await axiosInstance.get(
    // `${baseURL}referral/user/?page=${page}`
    `${baseURL}leads/business/?query=${q}&limit=${limit}&page=${page}&offset=${offset}&time=${time}&date_from=${date_from}&date_to=${date_to}`

  );
  return res.data;
};

const LeadPage = () => {
  const { search } = useLocation();
  const page = new URLSearchParams(search).get("page") || 1;
  const limit = new URLSearchParams(search).get("limit") || 20;
  const offset = new URLSearchParams(search).get("offset") || 0;
  const q = new URLSearchParams(search).get("q") || "";
  const time = new URLSearchParams(search).get("time") || "";
  const date_from = new URLSearchParams(search).get("date_from") || "";
  const date_to = new URLSearchParams(search).get("date_to") || "";


  const permission = useSelector((state) => state.permissionReducer);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["leads", page ,limit, offset , q, time, date_from, date_to ],
    queryFn: async () => fetchLeads(page ,limit , offset , q, time, date_from, date_to),
    keepPreviousData: true,
  });

  if (isLoading) {
    return (
      <DashboardLayout title={"Leads"}> 
        <LoadingJsx/>
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
