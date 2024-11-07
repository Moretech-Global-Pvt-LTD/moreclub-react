import React from "react";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import KYCcontent from "./KYCcontent";
import { axiosInstance } from "../..";
import { baseURL } from "../../config/config";
import { useQuery } from "@tanstack/react-query";
import { Placeholder } from "react-bootstrap";

const KYCFrom = () => {
  const fetchDashboardData = async () => {
    try {
      // Attempt to fetch both user profile and KYC status
      const [kycResponse] = await Promise.allSettled([
        axiosInstance.get(`${baseURL}kyc/status/`),
      ]);
      // Handle the KYC status response
      let kycData = null;
      if (kycResponse.status === "fulfilled") {
        console.log(kycResponse.value);
        kycData = kycResponse.value.data.data;
      } else {
        throw new Error(
          `Failed to fetch KYC data: ${kycResponse.reason.message}`
        );
      }
      return kycData;
    } catch (error) {
      // Handle the error
      throw new Error(`Failed to fetch dashboard data: ${error.message}`);
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["kycStatus"],
    queryFn: fetchDashboardData,
    staleTime: 100,
  });

  if (isLoading) {
    return (
      <>
        <Placeholder as="p" animation="glow" className="rounded">
          <Placeholder xs={12} size="lg" style={{ height: "7rem" }} />
        </Placeholder>
        <Placeholder as="p" animation="glow" className="rounded">
          <Placeholder xs={12} style={{ height: "7rem" }} />
        </Placeholder>
        <Placeholder as="p" animation="glow" className="rounded">
          <Placeholder xs={12} style={{ height: "7rem" }} />
        </Placeholder>
      </>
    );
  }

  if (isError) {
    <div className="text-dynamic white">Error getting page data</div>;
  }

  let initialData = {
    marital_status: "",
    occupation: "",
    state_province: "",
    city: "",
    street: "",
    postal_code: "",
    alt_contact: "",
    alt_email: "",
    agreed_to_terms: false,
  };

  if (data.message !== "KYC verification not found") {
    initialData = {
      marital_status: data.marital_status,
      occupation: data.occupation,
      state_province: data.state_province,
      city: data.city,
      street: data.street,
      postal_code: data.postal_code,
      alt_contact: data.alt_contact,
      alt_email: data.alt_email,
      agreed_to_terms: false,
    };
    return (
      <DashboardLayout title={"KYC"}>
        <KYCcontent initialData={initialData} />
      </DashboardLayout>
    );
  } else {
    return (
      <DashboardLayout title={"KYC"}>
        <KYCcontent />
      </DashboardLayout>
    );
  }
};

export default KYCFrom;
