import React, { useCallback} from "react";

import { useSelector } from "react-redux";
import WalletContent from "./WalletContent";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import Unauthorized from "../../components/unauthorized/unauthorized";
import Loading from "../../components/loading/loading";
import { baseURL } from "../../config/config";
import { axiosInstance } from "../..";
import { useQuery } from "@tanstack/react-query";
import TransactionPinForm from "../../components/points/TransactionPinForm";
import { Placeholder } from "react-bootstrap";

const Wallet = () => {
 
  const permission = useSelector((state) => state.permissionReducer);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["transactionpin status check"],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `${baseURL}notifications/user/pin/alert/`
      );
      const data = await response.data.data;
      return data;
    },
  });

  const handlePinSet = useCallback(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <Placeholder as="p" animation="glow" className="rounded">
          <Placeholder xs={12} size="lg" style={{ height: "7rem" }} />
        </Placeholder>
      </DashboardLayout>
    );
  }

  if (isError) {
    return <div>error reteriveing transaction pin status</div>;
  }

 

  if (data.status) {
    return (
      <DashboardLayout title={"Wallet"}>
        {permission.permission.isLoading ? (
          <Loading />
        ) : (
          <>
            {permission.permission && permission.permission.my_wallet ? (
              <WalletContent />
            ) : (
              <Unauthorized />
            )}
          </>
        )}
      </DashboardLayout>
    );
  } else {
    return (
      <DashboardLayout title={"Transaction PIN"}>
        <TransactionPinForm onPinSet={handlePinSet}/>
      </DashboardLayout>
    );
  }
};

export default Wallet;
