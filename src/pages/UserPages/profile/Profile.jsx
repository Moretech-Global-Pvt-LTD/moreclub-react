import React from "react";
import UserProfile from "../../../components/user_profile/UserProfile";
import { useDispatch} from "react-redux";
import DashboardLayout from "../../../components/Layout/DashboardLayout";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../..";
import { baseURL } from "../../../config/config";
import { userSuccess } from "../../../redux/slices/userSlice";
import { userMembership } from "../../../redux/api/userMembershipAPI";
import ProfileCardSkeleton from "../../../components/Skeleton/ProfileCard";

const Profile = () => {
  const dispatch = useDispatch();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["user profile"],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `${baseURL}auth/user/all/details/`
      );
      const data = await response.data.data;
      await dispatch(userSuccess(data));
      await dispatch(userMembership());
      return data;
    },
  });

  if (isLoading) {
    return (
      <DashboardLayout title={"Profile"}>
        <ProfileCardSkeleton/>
      </DashboardLayout>
    );
  }

  if (isError) {
    <div className="text-dynamic white">Error getting page data</div>;
  }
  return (
    <DashboardLayout title={"Profile"}>
      <UserProfile users={data} />
    </DashboardLayout>
  );
};

export default Profile;
