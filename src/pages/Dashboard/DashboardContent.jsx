import React, { useEffect } from "react";
import { Button, Row } from "react-bootstrap";
import QuickLinks from "../../components/dashboard/quickLinks";
import { get_transaction } from "../../redux/api/transactionAPI";
import { useDispatch, useSelector } from "react-redux";
// import Walletlinks from "../../components/dashboard/Walletlinks";
import { Link } from "react-router-dom";
import EventDashboardDisplay from "../../components/event/EventDashboardDisplay";
import PopularResturant from "../../components/Moreclub/morefood/PopularResturant";
import BusinessTypes from "../../components/dashboard/BusinessTypes";
import PopularSaloon from "../../components/Moreclub/Saloon/PopularSaloon";
import Popularhotels from "../../components/Moreclub/moreliving/popularHotels";
import Newdashboard from "../NewHomePage/newdashboard";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../..";
import { baseURL } from "../../config/config";
import { userSuccess } from "../../redux/slices/userSlice";
import { CurrencySet } from "../../redux/api/CurrencyConvertorAPI";
import NewUserDashboard from "../NewHomePage/newuserdashboard";

const DashboardContent = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer);

  const fetchUsersdashboardData = async () => {
    try {
      // Attempt to fetch both business and user data
      const [userResponse] = await Promise.allSettled([
        axiosInstance.get(`${baseURL}auth/user/all/details/`),
      ]);

      // Handle the responses

      if (userResponse.status === "fulfilled") {
        const userData = userResponse.value.data.data;
        await dispatch(userSuccess(userData));
        return {
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
    queryKey: ["userdatas"],
    queryFn: fetchUsersdashboardData,
    staleTime: 420000,
  });

  if (isLoading) {
    <p>loading....</p>;
  }
  if (error) {
    <p>error...</p>;
  }

  useEffect(() => {
    dispatch(get_transaction());
  }, [dispatch]);

  if (user && user?.user?.user_type !== "NORMAL") {
    return (
      <>
        <Row>
          <BusinessTypes />
        </Row>
        <Row>
          <EventDashboardDisplay />
        </Row>
        <Row className="mt-4">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="mt-4 mb-3">Popular Restaurants </h4>
            <Link to="/morefood">
              <Button variant="link">View All</Button>
            </Link>
          </div>
          <PopularResturant />
        </Row>
        <Row className="mt-4">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="mt-4 mb-3">Popular Hotels </h4>
            <Link to="/moreliving">
              <Button variant="link">View All</Button>
            </Link>
          </div>
          <Popularhotels />
        </Row>
        <Row className="mt-4">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="mt-4 mb-3">Popular Salons </h4>
            <Link to="/moresalons">
              <Button variant="link">View All</Button>
            </Link>
          </div>
          <PopularSaloon />
        </Row>

        <Row className="align-items-center">
          {/* <Col>
              <div className="nft-card card shadow-sm mt-4 mb-4 p-4">
                <Walletlinks />
              </div>
            </Col> */}
          <QuickLinks />
        </Row>
      </>
    );
  } else {
    return (
      // <Newdashboard />
      <NewUserDashboard />
      // <div>New Dashboard</div>
    );
  }
};

export default DashboardContent;
