import React from "react";
import BusinessProfile from "../../../components/user_profile/BusinessProfile";
import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "../../../components/Layout/DashboardLayout";
import Unauthorized from "../../../components/unauthorized/unauthorized";
import Loading from "../../../components/loading/loading";
import { useQuery } from "@tanstack/react-query";
import { baseURL } from "../../../config/config";
import { axiosInstance } from "../../..";
import { businessProfileSucess } from "../../../redux/slices/businessSlice";
import { userMembership } from "../../../redux/api/userMembershipAPI";
import ProfileCardSkeleton from "../../../components/Skeleton/ProfileCard";
import UniversalErrorbox from "../../../components/Layout/UniversalErrorBox";

const BusinessProfilePage = () => {
 
  const permission = useSelector((state) => state.permissionReducer);

  const dispatch = useDispatch();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["business profile"],
    queryFn: async () => {
      const response = await axiosInstance.get(`${baseURL}business/profile/`);
      const data = await response.data.data;
      await dispatch(businessProfileSucess(data));
      await dispatch(userMembership());
      return data;
    },
  });

  if (isLoading) {
    return (
      <DashboardLayout title={"Business Profile"}>
        <ProfileCardSkeleton/>
      </DashboardLayout>
    );
  }

  if (isError) {
    <DashboardLayout>
      <UniversalErrorbox 
      retry={["business profile"]}
      />
    </DashboardLayout>;
  }



  return (
    <DashboardLayout title={"Business Profile"}> 
        {permission.permission.isLoading ? (
          <Loading />
        ) : (
          <>
            {permission.permission && permission.permission.business_profile ? (
              <BusinessProfile businessProfiles={data}/>
            ) : (
              <Unauthorized />
            )}
          </>
        )}
    
    </DashboardLayout>
  );
};

export default BusinessProfilePage;
