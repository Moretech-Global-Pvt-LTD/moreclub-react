import React from "react";
import IDCardForm from "../../components/user_profile/IDCardUpdate";
import { Placeholder } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../..";
import { baseURL } from "../../config/config";

const KYCDocument = () => {
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

  const { data, isLoading, isError} = useQuery({
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

  let initialData;

  if (data) {
    initialData = data.document;

    return (
      <div className="card p-4" style={{ maxWidth: "600px" }}>
        <h5>Document Upload</h5>
        <IDCardForm initialData={initialData} />
      </div>
    );
  } else {
    return (
      <div className="card p-4" style={{ maxWidth: "600px" }}>
        <h5>Document Upload</h5>
        <IDCardForm />
      </div>
    );
  }
};

export default KYCDocument;
