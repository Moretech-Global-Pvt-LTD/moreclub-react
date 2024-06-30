import React from "react";
import Divider from "../../../components/divider/Divider";
import BusinessTabs from "../../../components/transaction/Business/tabs";
import DashboardLayout from "../../../components/Layout/DashboardLayout";
import Unauthorized from "../../../components/unauthorized/unauthorized";
import { useSelector } from "react-redux";
import Loading from "../../../components/loading/loading";

const BusinessTransaction = () => {
  const permission = useSelector((state) => state.permissionReducer);

  return (
    <DashboardLayout title={"My Transactions"}>
      {permission.permission.isLoading ? (
        <Loading />
      ) : (
        <>
          {permission.permission &&
          permission.permission.business_transaction ? (
            <>
              <BusinessTabs />
              <Divider />
            </>
          ) : (
            <Unauthorized />
          )}
        </>
      )}
    </DashboardLayout>
  );
};

export default BusinessTransaction;
