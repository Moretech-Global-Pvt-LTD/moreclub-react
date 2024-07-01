import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { baseURL } from "../../config/config";
import CouponCards from "../../components/coupon/CouponCards";
import Divider from "../../components/divider/Divider";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import Unauthorized from "../../components/unauthorized/unauthorized";
import Loading from "../../components/loading/loading";
import { Placeholder } from "react-bootstrap";
import { axiosInstance } from "../..";
import { useQuery } from "@tanstack/react-query";

export default function ViewCoupon() {
  const permission = useSelector((state) => state.permissionReducer);
  const [activeTab, setActiveTab] = useState("active");
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["my-coupons"],
    queryFn: async () => {
      const response = await axiosInstance.get(`${baseURL}coupons/user/list/`);
      const data = await response.data.data;
      return data;
    },
  });

  if (isLoading) {
    return (
      <DashboardLayout title={"My Coupons"}>
        <div className="d-flex  g-2">
          <Placeholder as="p" animation="glow" className="rounded w-25 me-2">
            <Placeholder xs={12} style={{ height: "4rem" }} />
          </Placeholder>
          <Placeholder as="p" animation="glow" className="rounded  w-25 me-2">
            <Placeholder xs={12} style={{ height: "4rem" }} />
          </Placeholder>
          <Placeholder as="p" animation="glow" className="rounded  w-25">
            <Placeholder xs={12} style={{ height: "4rem" }} />
          </Placeholder>
        </div>
      </DashboardLayout>
    );
  }

  if (isError) {
    return <div className="text-dynamic-white">Error: reteriving</div>;
  }

  const filteredCoupons = data.filter((coupon) => {
    if (activeTab === "active") {
      return !coupon.is_expired;
    } else if (activeTab === "expired") {
      return coupon.is_expired;
    }
  });

  const couponsCard = filteredCoupons.map((mst, index) => (
    <CouponCards coupon={mst} key={mst.id} />
  ));

  // Check if there are no coupons or only expired coupons
  const noCouponsFound =
    filteredCoupons.length === 0 ||
    (activeTab === "expired" && couponsCard.length === 0);

  return (
    <DashboardLayout title={"My Coupons"}>
      {permission.permission.isLoading ? (
        <Loading />
      ) : (
        <>
          {permission.permission && permission.permission.my_coupon ? (
            <>
              <div className="featured-nfts-wrap">
                <div
                  className={`d-flex ${
                    noCouponsFound
                      ? "justify-content-end"
                      : "justify-content-between"
                  }  gap-2 my-2`}
                >
                  {!noCouponsFound && (
                    <div>
                      <Link to="/coupon">
                        <button className="btn btn-sm btn-primary">
                          Buy New Coupons
                        </button>
                      </Link>
                      <Link to={`/transactions`} className="mx-auto">
                        <button className="btn btn-secondary btn-sm">
                          Coupons Transaction
                        </button>
                      </Link>
                    </div>
                  )}
                  <div>
                    <button
                      className={`btn btn-${
                        activeTab === "active" ? "success" : "danger"
                      } rounded-pill btn-sm`}
                      onClick={() => handleTabChange("active")}
                    >
                      Active
                    </button>
                    &nbsp;
                    <button
                      className={`btn btn-${
                        activeTab === "expired" ? "success" : "danger"
                      } rounded-pill btn-sm`}
                      onClick={() => handleTabChange("expired")}
                    >
                      Expired
                    </button>
                  </div>
                </div>

                <div className="row mt-2">
                  <div className="col-12">
                    {/* Featured NFT's Slide*/}
                    <div className="featured-nfts-slide">
                      {data ? (
                        <div className="Coupons-containers">
                          {noCouponsFound ? (
                            <div className="d-grid w-100 justify-conten-center gap-4">
                              <h4 className="text-center">No coupons found</h4>
                              <Link to={`/coupon`} className="mx-auto">
                                <button className="btn btn-primary btn-sm">
                                  Buy Coupons
                                </button>
                              </Link>
                            </div>
                          ) : (
                            <>{couponsCard}</>
                          )}
                        </div>
                      ) : (
                        <div className=" row ">
                          <h4 className="text-center">No Coupon Found</h4>
                          <Link to={`/coupon`} className="mx-auto">
                            <button className="btn btn-primary btn-sm">
                              Buy Coupons
                            </button>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <Divider />
              <Divider />
            </>
          ) : (
            <Unauthorized />
          )}
        </>
      )}
    </DashboardLayout>
  );
}
