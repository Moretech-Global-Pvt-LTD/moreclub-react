import React from "react";
import UserProfile from "../../../components/user_profile/UserProfile";
import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "../../../components/Layout/DashboardLayout";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../..";
import { baseURL } from "../../../config/config";
import { userSuccess } from "../../../redux/slices/userSlice";
import { Placeholder } from "react-bootstrap";
import { userMembership } from "../../../redux/api/userMembershipAPI";

const Profile = () => {
  const user = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["user profile"],
    queryFn: async () => {
      const response = await axiosInstance.get(`${baseURL}auth/user/all/details/`);
      const data = await response.data.data;
      await dispatch(userSuccess(data));
      await dispatch(userMembership());
      return data;
    },
  });

  if (isLoading) {
    return (
      <DashboardLayout title={"Profile"}>
        <Placeholder as="p" animation="glow" className="rounded">
          <Placeholder xs={12} size="lg" style={{ height: "7rem" }} />
        </Placeholder>
        <Placeholder as="p" animation="glow" className="rounded">
          <Placeholder xs={12} style={{ height: "7rem" }} />
        </Placeholder>
        <Placeholder as="p" animation="glow" className="rounded">
          <Placeholder xs={12} style={{ height: "7rem" }} />
        </Placeholder>
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
