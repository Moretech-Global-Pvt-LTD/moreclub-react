import React from "react";

import ProjectContent from "../../components/project/ProjectContent";

import { useSelector } from "react-redux";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";

import Divider from "../../components/divider/Divider";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import LandingLayout from "../../components/Layout/LandingLayout";

const ProjectPage = () => {
  const user = useSelector((state) => state.userReducer);
  if (user.isAuthenticated) {
    return (
      <DashboardLayout title={"Products"}>
        <ProjectContent />
        <Divider />
      </DashboardLayout>
    );
  } else {
    return (
      <LandingLayout>
        <Breadcrumb
          breadcrumbTitle="Products"
          breadcrumbNav={[
            {
              navText: "Home",
              path: "/",
            },
          ]}
        />
        <div className="container">

        <ProjectContent />
        </div>
        <Divider />
      </LandingLayout>
    );
  }
};

export default ProjectPage;
