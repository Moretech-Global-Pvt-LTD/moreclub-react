import React from "react";
import { baseURL } from "../../config/config";
import { axiosInstance } from "../..";

import { useSelector } from "react-redux";

import NetworkTable from "./NetworkTable";
import { useLocation } from "react-router-dom";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import Unauthorized from "../../components/unauthorized/unauthorized";
// import Loading from "../../components/loading/loading";
import { useQuery } from "@tanstack/react-query";
import { Placeholder, Table } from "react-bootstrap";
import NetworkLeadFilter from "../../components/leads/NetworkLeadFilter";

const fetchReferals = async (
  page,
  limit = 20,
  offset = 0,
  q = "",
  time = "",
  date_from = "",
  date_to = ""
) => {
  const res = await await axiosInstance.get(
    // `${baseURL}referral/user/?page=${page}`
    `${baseURL}referral/user/?query=${q}&limit=${limit}&page=${page}&offset=${offset}&time=${time}&date_from=${date_from}&date_to=${date_to}`
  );
  return res.data;
};

const NetworkPage = () => {
  const { search } = useLocation();
  const page = new URLSearchParams(search).get("page") || 1;
  const limit = new URLSearchParams(search).get("limit") || 20;
  const offset = new URLSearchParams(search).get("offset") || 0;
  const q = new URLSearchParams(search).get("q") || "";
  const time = new URLSearchParams(search).get("time") || "";
  const date_from = new URLSearchParams(search).get("date_from") || "";
  const date_to = new URLSearchParams(search).get("date_to") || "";
  const permission = useSelector((state) => state.permissionReducer);



  const { data, isLoading, isError } = useQuery({
    queryKey: ["referals", page, limit, offset, q, time, date_from, date_to],
    queryFn: async () =>
      fetchReferals(page,  limit, offset, q, time, date_from, date_to),
    keepPreviousData: true,
  });

  if (isLoading) {
    return (
      <DashboardLayout title={"Networks"}>
      <LoadingJsx/>
      </DashboardLayout>
    );
  }
  if (isError) {
    return (
      <DashboardLayout title={"Networks"}>
        <NetworkLeadFilter />
        <Table responsive className="bg-white">
          <thead className="border-bottom-0">
            <tr className="pricingcard-premium">
              <th className="text-white"> Name</th>
              <th className="text-white">Email</th>
              <th className="text-white">Phone</th>
              <th className="text-white text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="">
              <td colSpan={4}>
                <p className="text-center ">Error retriving data...</p>
              </td>
              
            </tr>
          </tbody>
        </Table>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title={"Networks"}>
      {permission.permission.isLoading ? (
        <LoadingJsx/>
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

export const LoadingJsx = () => {
  return (
    <>
      <NetworkLeadFilter />
      <Table responsive className="bg-white">
        <thead className="border-bottom-0">
          <tr className="pricingcard-premium">
            <th className="text-white"> Name</th>
            <th className="text-white">Email</th>
            <th className="text-white">Phone</th>
            <th className="text-white text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className="">
            <td>
              <Placeholder
                as="p"
                animation="glow"
                className="rounded my-1 w-100"
              >
                <Placeholder xs={12} style={{ height: "2rem" }} />
              </Placeholder>
              <Placeholder
                as="p"
                animation="glow"
                className="rounded my-2 w-100"
              >
                <Placeholder xs={12} style={{ height: "2rem" }} />
              </Placeholder>
              <Placeholder
                as="p"
                animation="glow"
                className="rounded my-2 w-100"
              >
                <Placeholder xs={12} style={{ height: "2rem" }} />
              </Placeholder>
              <Placeholder
                as="p"
                animation="glow"
                className="rounded my-2 w-100"
              >
                <Placeholder xs={12} style={{ height: "2rem" }} />
              </Placeholder>
              <Placeholder
                as="p"
                animation="glow"
                className="rounded my-2 w-100"
              >
                <Placeholder xs={12} style={{ height: "2rem" }} />
              </Placeholder>
            </td>
            <td>
              <Placeholder
                as="p"
                animation="glow"
                className="rounded my-1 w-100"
              >
                <Placeholder xs={12} style={{ height: "2rem" }} />
              </Placeholder>
              <Placeholder
                as="p"
                animation="glow"
                className="rounded my-2 w-100"
              >
                <Placeholder xs={12} style={{ height: "2rem" }} />
              </Placeholder>
              <Placeholder
                as="p"
                animation="glow"
                className="rounded my-2 w-100"
              >
                <Placeholder xs={12} style={{ height: "2rem" }} />
              </Placeholder>
              <Placeholder
                as="p"
                animation="glow"
                className="rounded my-2 w-100"
              >
                <Placeholder xs={12} style={{ height: "2rem" }} />
              </Placeholder>
              <Placeholder
                as="p"
                animation="glow"
                className="rounded my-2 w-100"
              >
                <Placeholder xs={12} style={{ height: "2rem" }} />
              </Placeholder>
            </td>
            <td>
              <Placeholder
                as="p"
                animation="glow"
                className="rounded my-1 w-100"
              >
                <Placeholder xs={12} style={{ height: "2rem" }} />
              </Placeholder>
              <Placeholder
                as="p"
                animation="glow"
                className="rounded my-2 w-100"
              >
                <Placeholder xs={12} style={{ height: "2rem" }} />
              </Placeholder>
              <Placeholder
                as="p"
                animation="glow"
                className="rounded my-2 w-100"
              >
                <Placeholder xs={12} style={{ height: "2rem" }} />
              </Placeholder>
              <Placeholder
                as="p"
                animation="glow"
                className="rounded my-2 w-100"
              >
                <Placeholder xs={12} style={{ height: "2rem" }} />
              </Placeholder>
              <Placeholder
                as="p"
                animation="glow"
                className="rounded my-2 w-100"
              >
                <Placeholder xs={12} style={{ height: "2rem" }} />
              </Placeholder>
            </td>
            <td>
              <Placeholder
                as="p"
                animation="glow"
                className="rounded my-1 w-100"
              >
                <Placeholder xs={12} style={{ height: "2rem" }} />
              </Placeholder>
              <Placeholder
                as="p"
                animation="glow"
                className="rounded my-2 w-100"
              >
                <Placeholder xs={12} style={{ height: "2rem" }} />
              </Placeholder>
              <Placeholder
                as="p"
                animation="glow"
                className="rounded my-2 w-100"
              >
                <Placeholder xs={12} style={{ height: "2rem" }} />
              </Placeholder>
              <Placeholder
                as="p"
                animation="glow"
                className="rounded my-2 w-100"
              >
                <Placeholder xs={12} style={{ height: "2rem" }} />
              </Placeholder>
              <Placeholder
                as="p"
                animation="glow"
                className="rounded my-2 w-100"
              >
                <Placeholder xs={12} style={{ height: "2rem" }} />
              </Placeholder>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}
