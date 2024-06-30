import React from "react";
import CustomTabs from "../../components/transaction/tabs";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import Unauthorized from "../../components/unauthorized/unauthorized";
import Loading from "../../components/loading/loading";
import { useSelector } from "react-redux";


const UserTransaction = () => {

  const permission = useSelector((state) => state.permissionReducer);

  return (
    <DashboardLayout title={"Transactions"}> 
        {permission.permission.isLoading ? (
          <Loading />
        ) : (
          <>
            {permission.permission && permission.permission.transaction ? (
              <CustomTabs />
              
            ) : (
              <Unauthorized />
            )}
          </>
        )}
    </DashboardLayout>
  )
};

export default UserTransaction;
