import React from "react";
import { useSelector } from "react-redux";
import { QRCode } from "antd";
import { baseURL, hostURL } from "../../../config/config";
import Logos from "../../../images/logo/logoblack.png";
import { axiosInstance } from "../../..";
import { useQuery } from "@tanstack/react-query";
import { Placeholder } from "react-bootstrap";
import { Link } from "react-router-dom";

const QRcontent = () => {
  const user = useSelector((state) => state.userReducer);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["user profile"],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `${baseURL}auth/user/all/details/`
      );
      const data = await response.data.data;

      return data;
    },
  });

  if (isLoading) {
    return (
      <Placeholder as="p" animation="glow" className="rounded">
        <Placeholder xs={12} size="lg" style={{ height: "7rem" }} />
      </Placeholder>
    );
  }

  if (isError) {
    return (
      <div className="row">
        <h1 className="text-center mb">Refer your Friends </h1>
        <div className="qr-container">
          <QRCode
            errorLevel="H"
            value={`${hostURL}/register-membership`}
            icon={Logos}
            style={{ background: "white" }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="row">
      <h1 className="text-center mb">Refer your Friends </h1>

      {user && user.isAuthenticated && (
        <div className="qr-container">
          <img
            src={`${user.user.user_refer_qr}`}
            alt="qr"
            style={{ width: "10rem", height: "auto" }}
          />
        </div>
      )}

      {!user && !user.isAuthenticated && (
        <div className="qr-container">
          <QRCode
            errorLevel="H"
            value={`${hostURL}/register-membership`}
            icon={Logos}
            style={{ background: "white" }}
          />
          <div className="mt-3 d-flex align-items-center">
            <p>Login to get Your Rerefal QR</p>
            <Link to={"/login"}>
              <button className="btn btn-warning btn-sm">Login</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRcontent;
