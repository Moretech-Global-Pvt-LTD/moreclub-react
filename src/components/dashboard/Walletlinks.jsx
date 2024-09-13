import { useQuery } from "@tanstack/react-query";
import React from "react";
import { axiosInstance } from "../..";
import { baseURL } from "../../config/config";
import { Col, Placeholder } from "react-bootstrap";
import { Link } from "react-router-dom";
import Send from "../../images/svg/send.png";
import Load from "../../images/svg/load_amount.svg";
import Withdraw from "../../images/svg/withdraw_icon.svg";


const Walletlinks = () => {
  const fetchWalletPermission = async () => {
    try {
      const [pinalert, phoneAlert] = await Promise.allSettled([
        axiosInstance.get(`${baseURL}notifications/user/pin/alert/`),
        axiosInstance.get(`${baseURL}notifications/alert/`),
      ]);

      // Handle the responses
      let pinAlertdata;
      if (pinalert.status === "fulfilled") {
        pinAlertdata = pinalert.value.data.data;
      } else {
        throw new Error(
          `Failed to fetch business data: ${pinalert.reason.message}`
        );
      }

      if (phoneAlert.status === "fulfilled") {
        const phoneAlertdata = phoneAlert.value.data.data?.phone_verified;
        return {
          pinAlertdata,
          phoneAlertdata,
        };
      } else {
        throw new Error(
          `Failed to fetch user data: ${phoneAlert.reason.message}`
        );
      }
    } catch (error) {
      // Handle the error, for example by throwing it so it can be caught by react-query
      throw new Error(`Failed to fetch dashboard data: ${error.message}`);
    }
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["transactionpin status"],
    queryFn: fetchWalletPermission,
    staleTime: 1000,
  });

  if (isLoading) {
    return (
      <Placeholder as="p" animation="glow" className="rounded row gap-1">
        <Placeholder xs={12} size="lg" style={{ height: "1rem" }} />
        <Placeholder xs={12} size="lg" style={{ height: "1rem" }} />
        <Placeholder xs={12} size="lg" style={{ height: "1rem" }} />
      </Placeholder>
    );
  }

  if (isError) {
    return <div>error retriving transaction pin status</div>;
  }

  if (!data.pinAlertdata?.status || !data.phoneAlertdata) {
    return (
      <>
          <div className="text-dynamic-white text-center">
            You need to set {!data.pinAlertdata?.status && "transaction Pin"}{" "}
            {!data.pinAlertdata?.status && !data.phoneAlertdata && "and"}{" "}
            {!data.phoneAlertdata && "verify your phone number"} to access
            wallet permissions
          </div>
          {!data.pinAlertdata?.status && (
            <Link
              className="btn btn-warning rounded-pill btn-sm w-100 mt-3"
              to="/wallet"
            >
              Set Transaction Pin
            </Link>
          )}
          {!data.phoneAlertdata && (
            <Link
              className="btn btn-danger rounded-pill btn-sm w-100 mt-3"
              to="/otp-phone"
            >
              Verify Phone Number
            </Link>
          )}
        </>
      
    );
  } else {
    return (
      <>
        <Link
          className="btn btn-success rounded-pill btn-sm w-100 mt-3"
          to="/points/send"
        >
          <img src={Send} alt="send" className="small-icon" /> Send Money 
        </Link>
        <Link
          className="btn btn-warning rounded-pill btn-sm w-100 mt-3"
          to="/points/buy"
        >
          <img src={Load} alt="send" className="small-icon" /> Load Money
        </Link>
        <Link
          className="btn btn-danger rounded-pill btn-sm w-100 mt-3"
          to="/points/withdraw"
        >
          <img src={Withdraw} alt="send" className="small-icon"  style={{fill:"#fff"}}  />  Withdraw
        </Link>
      </>
    );
  }
};

export default Walletlinks;
