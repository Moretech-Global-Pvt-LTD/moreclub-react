// unused 

import React from "react";

import Breadcrumb from "../../../components/breadcrumb/Breadcrumb";

import { useSelector } from "react-redux";
import ProfileChangeContent from "../../../components/user_profile/ProfileChangeContent";
import DashboardLayout from "../../components/Layout/DashboardLayout";

const ProfileChange = () => {
  const user = useSelector((state) => state.userReducer);
  return (
    <DashboardLayout>
      <Breadcrumb
        breadcrumbTitle="Profile Update Settings"
        breadcrumbNav={[
          {
            navText: "Home",
            path: "/",
          },
        ]}
      />
      {user.user ? <ProfileChangeContent user={user} /> : <div>Loading</div>}
    </DashboardLayout>
  );
};
export default ProfileChange;
