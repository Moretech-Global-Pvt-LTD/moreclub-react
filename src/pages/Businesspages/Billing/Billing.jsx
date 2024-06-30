import React from "react";
import DashboardLayout from "../../../components/Layout/DashboardLayout";
import Unauthorized from "../../../components/unauthorized/unauthorized";
import { useSelector } from "react-redux";
import Loading from "../../../components/loading/loading";
import BillingForm from "../../../components/billing/Billingform";

const BillingPage = () => {
  const permission = useSelector((state) => state.permissionReducer);
  console.log("permission", permission);

  return (
    <DashboardLayout title={"Billing"}>
      { permission.permission.isLoading ? (
        <Loading />
      ) : permission.permission?.billing ? (
        <BillingForm />
      ) : (
        <>
        {permission.permission &&  <Unauthorized />}
        </>
       
      )}
    </DashboardLayout>
  );
};

export default BillingPage;
