import React from "react";
import Divider from "../../components/divider/Divider";
import ProjectDetails from "../../components/project/ProjectDetail";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import LandingLayout from "../../components/Layout/LandingLayout";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import { useSelector } from "react-redux";

const ProjectDetail = () => {
  const user = useSelector((state) => state.userReducer);
  if (user.isAuthenticated) {
    return (
      <DashboardLayout title={"Product Detail"}>
        <ProjectDetails />
        <Divider />
      </DashboardLayout>
    );
  } else {
    return (
      <LandingLayout>
     
        <Breadcrumb
          breadcrumbTitle="Product Detail"
          breadcrumbNav={[
            {
              navText: "Home",
              path: "/",
            },
          ]}
        />
      <div className="container">

        <ProjectDetails />
      </div>
        <Divider />
      </LandingLayout>
    );
  }
};

export default ProjectDetail;
