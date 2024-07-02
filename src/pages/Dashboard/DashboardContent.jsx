import React, { useEffect } from "react";

import { Card, Col, Placeholder, Row } from "react-bootstrap";
import Chart from "../../components/dashboard/chart";
import QuickLinks from "../../components/dashboard/quickLinks";
import Topcards from "../../components/dashboard/topcards";
import AlertNotification from "../../components/alert_notification/AlertNotification";
import { axiosInstance } from "../..";
import { baseURL } from "../../config/config";
import { get_transaction } from "../../redux/api/transactionAPI";
import { useDispatch, useSelector } from "react-redux";

import { useQuery } from "@tanstack/react-query";
import UserChart from "../../components/dashboard/ChartUser";
import DashboardOffers from "../../components/dashboard/dashboardoffers";
import RefrealChart from "../../components/dashboard/RefrealChart";
import Walletlinks from "../../components/dashboard/Walletlinks";
import { setMembershipType } from "../../redux/slices/userSlice";
import { Link } from "react-router-dom";
import Blackqr from "../../images/Qr/qrblack.png";
import Whiteqr from "../../images/Qr/qrwhite.png";
import EventDashboardDisplay from "../../components/event/EventDashboardDisplay";

const DashboardContent = () => {
  const user = useSelector((state) => state.userReducer);
  const business = useSelector((state) => state.businessReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_transaction());
  }, [dispatch]);

  const fetchDashboardData = async () => {
    try {
      // Attempt to fetch both business and user data
      const [businessResponse, userResponse, membership] =
        await Promise.allSettled([
          axiosInstance.get(`${baseURL}dashboard/user/business/`),
          axiosInstance.get(`${baseURL}dashboard/user/`),
          axiosInstance.get(`${baseURL}members/user/membership/`),
        ]);

      // Handle the responses
      let businessData = null;
      if (businessResponse.status === "fulfilled") {
        businessData = businessResponse.value.data.data;
      } else if (
        businessResponse.status === "rejected" &&
        businessResponse.reason.response.status === 403
      ) {
        console.warn(
          "User is not registered as a business, skipping business data."
        );
      } else {
        throw new Error(
          `Failed to fetch business data: ${businessResponse.reason.message}`
        );
      }

      if (membership.status === "fulfilled") {
        await dispatch(setMembershipType(membership.value.data.data));
      } else {
        throw new Error(
          `Failed to fetch user data: ${membership.reason.message}`
        );
      }
      if (userResponse.status === "fulfilled") {
        const userData = userResponse.value.data.data;
        return {
          businessData,
          userData,
        };
      } else {
        throw new Error(
          `Failed to fetch user data: ${userResponse.reason.message}`
        );
      }
    } catch (error) {
      // Handle the error, for example by throwing it so it can be caught by react-query
      throw new Error(`Failed to fetch dashboard data: ${error.message}`);
    }
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["dashboard data"],
    queryFn: fetchDashboardData,
    staleTime: 100,
  });

  if (isLoading) {
    return (
      <div>
        <Placeholder as="p" animation="glow" className="rounded">
          <Placeholder xs={12} size="lg" style={{ height: "7rem" }} />
        </Placeholder>
        <Placeholder as="p" animation="glow" className="rounded">
          <Placeholder xs={12} style={{ height: "7rem" }} />
        </Placeholder>
        <Placeholder as="p" animation="glow" className="rounded">
          <Placeholder xs={12} style={{ height: "7rem" }} />
        </Placeholder>
      </div>
    );
  }

  if (isError) {
    <div className="text-dynamic white">Error getting page data</div>;
  }

  return (
    <div>
      <AlertNotification />
      <div>
        <>
          {data.businessData && data.userData && (
            <Row sm={2} md={4} className=" gx-3 gy-3 gb-3 mb-3">
              <Topcards
                title={"Coupons"}
                subtitle={"Total coupon"}
                description={data?.businessData?.coupon}
                href={"/my-coupons"}
              />
              <Topcards
                title={"Transaction"}
                subtitle={"With Coupon "}
                description={data?.businessData?.billing_transaction_by_coupon}
                href={"/transactions"}
              />
              {/* <Topcards
                title={"Transaction"}
                subtitle={"With Membership"}
                description={
                  data?.businessData?.billing_transaction_by_membership
                }
                href={"/business-transactions"}
              /> */}
              <Topcards
                title={"Refers"}
                subtitle={"Total referals"}
                description={data?.businessData?.referral}
                href={"/my-network"}
              />
              <Col>
                <Link to={"/profile"}>
                  <Card>
                    <Card.Body>
                      <Card.Title className="text-dynamic-white fs-6">
                        {"Membership QR"}
                      </Card.Title>
                      <Card.Text className="text-center">
                        <img
                          className="nav-light-logo"
                          src={Blackqr}
                          alt="Light"
                          style={{
                            height: "3.5rem",
                            width: "auto",
                          }}
                        />
                        <img
                          className="nav-dark-logo"
                          src={Whiteqr}
                          alt="Dark"
                          style={{
                            height: "3.5rem",
                            width: "auto",
                          }}
                        />
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            </Row>
          )}
        </>

        {!data.businessData && data.userData && (
          <Row sm={2} md={4} className=" gx-3 gy-3 gb-3">
            <Topcards
              title={"Coupons"}
              subtitle={"Total coupon"}
              description={data.userData?.coupon}
              href={"/my-coupons"}
            />
            <Topcards
              title={"Transaction"}
              subtitle={"With Coupon "}
              description={data.userData?.billing_transaction_by_coupon}
              href={"/transactions"}
            />
            {/* <Topcards
              title={"Transaction"}
              subtitle={"With Membership"}
              description={data.userData?.billing_transaction_by_membership}
              href={"/business-transactions"}
            /> */}
            <Topcards
              title={"Refers"}
              subtitle={"Total refers"}
              description={data.userData?.referral}
              href={"/my-network"}
            />
            <Col>
              <Link to={"/profile"}>
                <Card>
                  <Card.Body>
                    <Card.Title className="text-dynamic-white fs-6">
                      {"Membership QR"}
                    </Card.Title>
                    <Card.Text className="text-center">
                      <img
                        className="nav-light-logo"
                        src={Blackqr}
                        alt="Light"
                        style={{
                          height: "3.5rem",
                          width: "auto",
                        }}
                      />
                      <img
                        className="nav-dark-logo"
                        src={Whiteqr}
                        alt="Dark"
                        style={{
                          height: "3.5rem",
                          width: "auto",
                        }}
                      />
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          </Row>
        )}

        <Row>
          {user &&
            user.user?.user_type === "BUSINESS" &&
            data?.businessData && (
              <>
                <Chart
                  billingsData={
                    data?.businessData?.billing_transactions_chart_data
                  }
                  pointsdata={
                    data?.businessData?.points_transactions_chart_data
                  }
                />
                <RefrealChart
                  refersData={data?.businessData?.referrals_chart_data}
                />
              </>
            )}
          {user && user.user?.user_type === "NORMAL" && (
            <>
              <UserChart
                pointsdata={data.userData?.points_transactions_chart_data}
              />
              <RefrealChart refersData={data.userData?.referrals_chart_data} />
            </>
          )}
        </Row>
        <Row xs={1} sm={1} md={2} lg={3} className="align-items-center">
          <Col>
            <div className="nft-card card shadow-sm mt-4 mb-4 p-4">
              <Walletlinks />
            </div>
          </Col>
          <QuickLinks />
        </Row>
        <Row>
          {/* {user && user.user?.user_type === "BUSINESS" && (
            <>
              {business && business.businessProfile.is_verified && (
                <RecentTransaction />
              )}
            </>
          )} */}
          {/* <PointsTransaction /> */}
        </Row>
        <Row>
          <EventDashboardDisplay />
        </Row>

        <Row>
          <DashboardOffers />
        </Row>
        {/* <Row>
            <h2 className="mt-4 mb-3">Offers Nearby</h2>
            <Row sm={2} md={4} className="gx-3 gy-3">
              <Col>
                <OffersCard
                  logo={BrandLogo}
                  name={"Navin Business"}
                  offer="<p><span class='text-warning text-center'>20% <span>off on min 2000<p>"
                />
              </Col>
              <Col>
                <OffersCard
                  logo={BrandLogo}
                  name={"Navin Business"}
                  offer="<p><span class='text-warning text-center'>20% <span>off on min 2000<p>"
                />
              </Col>
              <Col>
                <OffersCard
                  logo={BrandLogo}
                  name={"Navin Business"}
                  offer="<p><span class='text-warning text-center'>20% <span>off on min 2000<p>"
                />
              </Col>
              <Col>
                <OffersCard
                  logo={BrandLogo}
                  name={"Navin Business"}
                  offer="<p><span class='text-warning text-center'>20% <span>off on min 2000<p>"
                />
              </Col>
              <Col>
                <OffersCard
                  logo={BrandLogo}
                  name={"Navin Business"}
                  offer="<p><span class='text-warning text-center'>20% <span>off on min 2000<p>"
                />
              </Col>
              <Col>
                <OffersCard
                  logo={BrandLogo}
                  name={"Navin Business"}
                  offer="<p><span class='text-warning text-center'>20% <span>off on min 2000<p>"
                />
              </Col>
              <Col>
                <OffersCard
                  logo={BrandLogo}
                  name={"Navin Business"}
                  offer="<p><span class='text-warning text-center'>20% <span>off on min 2000<p>"
                />
              </Col>
              <Col>
                <OffersCard
                  logo={BrandLogo}
                  name={"Navin Business"}
                  offer="<p><span class='text-warning text-center'>20% <span>off on min 2000<p>"
                />
              </Col>
        
            </Row>
          </Row> */}
      </div>
    </div>
  );
};

export default DashboardContent;
