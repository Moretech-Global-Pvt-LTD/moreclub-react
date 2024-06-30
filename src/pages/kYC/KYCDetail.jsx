import React from "react";
import { axiosInstance } from "../..";
import { baseURL } from "../../config/config";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { userSuccess } from "../../redux/slices/userSlice";
import KYCdetailcontent from "./KYCdetailcontent";
import { Button, Placeholder } from "react-bootstrap";
import KYCIMAGE from "../../images/Home/KYC.png";
import { Link, useNavigate } from "react-router-dom";

const KYCDetail = () => {
  const user = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const navigate= useNavigate();

  const fetchDashboardData = async () => {
    try {
      // Attempt to fetch both user profile and KYC status
      const [userResponse, kycResponse] = await Promise.allSettled([
        axiosInstance.get(`${baseURL}auth/user/all/details/`),
        axiosInstance.get(`${baseURL}kyc/status/`),
      ]);

      // Handle the user profile response
      let userData = null;
      if (userResponse.status === "fulfilled") {
        userData = userResponse.value.data.data;
      } else {
        throw new Error(
          `Failed to fetch user data: ${userResponse.reason.message}`
        );
      }

      // Handle the KYC status response
      let kycData = null;
      if (kycResponse.status === "fulfilled") {
        console.log(kycResponse.value);
        kycData = kycResponse.value.data.data;
      } else {
        throw new Error(
          `Failed to fetch KYC data: ${kycResponse.reason.message}`
        );
      }

      // Dispatch the user data to the store
      await dispatch(userSuccess(userData));

      // Return the combined data
      return { user: userData, kyc: kycData };
    } catch (error) {
      // Handle the error
      throw new Error(`Failed to fetch dashboard data: ${error.message}`);
    }
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["userProfile", "kycStatus"],
    queryFn: fetchDashboardData,
    staleTime: 100,
  });

  if (isLoading) {
    return (
      <>
        <Placeholder as="p" animation="glow" className="rounded">
          <Placeholder xs={12} size="lg" style={{ height: "7rem" }} />
        </Placeholder>
        <Placeholder as="p" animation="glow" className="rounded">
          <Placeholder xs={12} style={{ height: "7rem" }} />
        </Placeholder>
        <Placeholder as="p" animation="glow" className="rounded">
          <Placeholder xs={12} style={{ height: "7rem" }} />
        </Placeholder>
      </>
    );
  }

  if (isError) {
    <div className="text-dynamic white">Error getting page data</div>;
  }
  if(data.kyc.message ==="KYC verification not found"){
    navigate("/KYC/update")
  }
  
  return (
    <>
      {data.kyc.message !== "KYC verification not found" ? (
        <KYCdetailcontent data={data} />
      ) : (
        <div className="row">
          {/* <img
            src={KYCIMAGE}
            alt="Kyc"
            style={{
              maxWidth: "400px",
              height: "auto",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
          <div className="d-flex justify-content-center">
            <Link to={"/KYC/update"} className="mx-auto">
              <Button variant="primary" className="mx-auto">
                Add Your KYC
              </Button>
            </Link>
          </div> */}
        </div>
      )}
    </>
  );
};

export default KYCDetail;
