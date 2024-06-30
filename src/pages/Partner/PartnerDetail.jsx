import { useQuery } from "@tanstack/react-query";
import React from "react";
import { baseURL } from "../../config/config";
import axios from "axios";
import { Placeholder } from "react-bootstrap";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import LandingLayout from "../../components/Layout/LandingLayout";
import { useSelector } from "react-redux";
import PartnerDeatilContent from "./PartnerDeatilContent";
import { Link, useParams } from "react-router-dom";
import Divider from "../../components/divider/Divider";

const PartnerDetail = () => {
  const { partnerId } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: [`partners ${partnerId}`],
    queryFn: async () => {
      const response = await axios.get(
        `${baseURL}business/our/partners/${partnerId}/`
      );
      return response.data.data;
    },
    staleTime: 1000,
  });
  const user = useSelector((state) => state.userReducer);

  if (isLoading) {
    return (
      <div>
        <Placeholder as="p" animation="glow" className="rounded">
          <Placeholder xs={12} size="lg" style={{ height: "7rem" }} />
        </Placeholder>
        <Placeholder as="p" animation="glow" className="rounded">
          <Placeholder xs={12} style={{ height: "7rem" }} />
        </Placeholder>
        <Placeholder as="p" animation="glow" className="rounded">
          <Placeholder xs={12} style={{ height: "7rem" }} />
        </Placeholder>
      </div>
    );
  }

  if (isError) {
    <div className="text-dynamic white">Error getting data</div>;
  }

  if (user.isAuthenticated) {
    return (
      <DashboardLayout title={data?.business_name}>
        <PartnerDeatilContent company={data} />
      </DashboardLayout>
    );
  } else {
    console.log("partner", data);
    return (
      <LandingLayout>
        <div className="container">
          <div className="d-flex justify-content-between align-item-center">
            <h1>{data?.business_name}</h1>
            <Link to="/partners">
              <button className="btn btn-sm btn-link">Back</button>
            </Link>
          </div>
          <PartnerDeatilContent company={data} />
        </div>

        <Divider />
      </LandingLayout>
    );
  }
};

export default PartnerDetail;
