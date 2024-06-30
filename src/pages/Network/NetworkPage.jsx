import React, { useEffect, useState } from "react";

import { baseURL } from "../../config/config";
import { axiosInstance } from "../..";

import { useSelector } from "react-redux";
// import Tree from "../../components/tree/tree";
// import NetworkTree from "../../components/tree/tree";
import NetworkTable from "./NetworkTable";
import { useLocation } from "react-router-dom";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import Unauthorized from "../../components/unauthorized/unauthorized";
import Loading from "../../components/loading/loading";
import { useQuery } from "@tanstack/react-query";
import { Placeholder } from "react-bootstrap";

const fetchReferals = async (page) => {
  const res = await await axiosInstance.get(
    `${baseURL}referral/user/?page=${page}`
  );
  return res.data;
};

const NetworkPage = () => {
  const { search } = useLocation();
  const page = new URLSearchParams(search).get("page") || 1;
  const permission = useSelector((state) => state.permissionReducer);

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["referals", page],
    queryFn: async () => fetchReferals(page),
    keepPreviousData: true,
  });

  if (isLoading) {
    return (
      <DashboardLayout title={"Networks"}>
        <Placeholder as="p" animation="glow" className="rounded">
          <Placeholder xs={12} size="lg" style={{ height: "7rem" }} />
        </Placeholder>
        <Placeholder as="p" animation="glow" className="rounded">
          <Placeholder xs={12} style={{ height: "7rem" }} />
        </Placeholder>
      </DashboardLayout>
    );
  }
  if (isError) {
    return (
      <DashboardLayout title={"Networks"}>
        <p className="text-dynamic-white">Error retriving the data...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title={"Networks"}>
      {permission.permission.isLoading ? (
        <Loading />
      ) : (
        <>
          {permission.permission && permission.permission.my_network ? (
            <NetworkTable list={data.data} meta={data.meta} />
          ) : (
            <Unauthorized />
          )}
        </>
      )}

      {/* <div className="user-profile card col-5 col-md-3 col-lg-3 mx-auto p-1 mb-4 mt-4">
          <div className="user-name mb-1">
            <div className="d-flex align-items-center">
              <img
                src={
                  !user.user?.user_profile?.display_picture
                    ? `${imageURL}/media/user_profile/default.png`
                    : `${imageURL}${user.user?.user_profile?.display_picture}`
                }
                alt=""
              />
              <div className="ms-3">
                <a href="/profile">
                  <h6 className="lh-1 text-dark fz-18">
                    {userInfo[0].username}
                  </h6>
                </a>
                <a href="/pricing">
                  <span className="badge bg-primary fz-12">
                    {userInfo[0].userType}
                  </span>
                </a>
              </div>
            </div>
          </div>

          </div> */}
      {/* <div className="d-flex justify-content-evenly flex-wrap"> */}
      {/* {referallist &&
              referallist.map((refers) => (
                <div className="user-profile card col-5 col-md-3 col-lg-3 m-2 p-1">
                
                  <div className="user-name mb-1">
                    <div className="d-flex align-items-center">
                      <img
                        src={
                          !refers.thumbnail
                            ? `${imageURL}/media/user_profile/default.png`
                            : `${imageURL}${refers?.thumbnail}`
                        }
                        alt=""
                      />
                      <div className="ms-3">
                        <h6 className="lh-1 text-dark fz-18">
                          {refers.user.first_name}&nbsp;{refers.user.last_name}
                        </h6>
                        <span className="badge bg-primary fz-12">
                          {refers.user.username}
                        </span>
                      </div>
                    </div>
                  </div>

                 
                </div>
              ))} */}

      {/* {!referallist  &&
              <h4>No referrals Found</h4>              
              } */}
      {/* </div> */}

      {/* <NetworkTree/> */}
      {/* <Tree/> */}
    </DashboardLayout>
  );
};

export default NetworkPage;
