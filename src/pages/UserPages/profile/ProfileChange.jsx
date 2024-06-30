import React from "react";


import { useSelector } from "react-redux";
import ProfileChangeContent from "../../../components/user_profile/ProfileChangeContent";
import DashboardLayout from "../../../components/Layout/DashboardLayout";

const ProfileChange = () => {
  const user = useSelector((state) => state.userReducer);
  return (
    <DashboardLayout title={"Profile Update "}>
      {user.user ? <ProfileChangeContent user={user} /> : <div>Loading</div>}
    </DashboardLayout>
  );
};
export default ProfileChange;
