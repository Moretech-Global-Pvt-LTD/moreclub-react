import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { baseURL, imageURL } from "../../config/config";
import { Placeholder } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../..";
import { setMembershipType, userSuccess } from "../../redux/slices/userSlice";
import { userMembership } from "../../redux/api/userMembershipAPI";
import { businessProfileSucess } from "../../redux/slices/businessSlice";

const HeaderUserInfo = () => {
  const user = useSelector((state) => state.userReducer);
  const business = useSelector((state) => state.businessReducer);

  const dispatch = useDispatch();

  const fetchUsersdashboardData = async () => {
    try {
      // Attempt to fetch both business and user data
      const [businessResponse, userResponse, membership] =
        await Promise.allSettled([
          axiosInstance.get(`${baseURL}business/profile/`),
          axiosInstance.get(`${baseURL}auth/user/all/details/`),
          axiosInstance.get(`${baseURL}members/user/membership/`),
        ]);

      // Handle the responses
      let businessData = null;
      if (businessResponse.status === "fulfilled") {
        businessData = businessResponse.value.data.data;
        await dispatch(businessProfileSucess(businessData));
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
        await dispatch(userSuccess(data));
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
    queryKey: ["dashboarddatas"],
    queryFn: fetchUsersdashboardData,
    staleTime: 100,
  });

  function capitalizeFirstLetterOfEachWord(str) {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  const userInfo = [
    {
      thumbnail: `${user.user?.user_profile?.display_picture}`,
      username: `${user.user?.first_name} ${user.user?.last_name ?? ""}`,
      userType: `${user?.membershipType?.membership_type?.name ?? ""}`,
    },
  ];

  const businessInfo = [
    {
      thumbnail: `${business?.businessProfile?.business_logo}`,
      username: `${business?.businessProfile?.business_name ?? ""}`,
      userType: `${user?.membershipType?.membership_type?.name ?? ""}`,
    },
  ];

  return (
    <div className="user-profile">
      {/* User Name */}
      <div className="user-name mb-1">
        {user.user?.user_type === "NORMAL" ? (
          <div className="d-flex align-items-center user-profile">
            {!user.user?.user_profile?.display_picture ? (
              <div
                className="partner-logo-wrapper ms-0 me-0 d-flex justify-content-center align-items-center text-uppercase"
                style={{
                  width: "45px",
                  height: "45px",
                  objectFit: "contain",
                  backgroundColor: "#fff",
                }}
              >
                {user.user?.first_name[0]}
                {user.user?.last_name[0]}
              </div>
            ) : (
              <img
                src={`${imageURL}${userInfo[0].thumbnail}`}
                style={{
                  width: "45px",
                  height: "45px",
                  objectFit: "contain",
                  backgroundColor: "#fff",
                }}
                alt="Profile"
                className="img-fluid rounded-circle mb-3 profile-image"
              />
            )}
            <div className="ms-3">
              <Link to="/profile">
                <h6 className="lh-1 text-dark fz-18">
                  {capitalizeFirstLetterOfEachWord(userInfo[0].username)}
                </h6>
              </Link>
              <Link to="/pricing">
                <span className="badge bg-primary fz-12">
                  {userInfo[0].userType}
                </span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="d-flex align-items-center">
            {!business.businessProfile?.business_logo ? (
              <div
                className="partner-logo-wrapper ms-0 me-0 d-flex justify-content-center align-items-center text-uppercase"
                style={{
                  width: "45px",
                  height: "45px",
                  objectFit: "contain",
                  backgroundColor: "#fff",
                }}
              >
                {businessInfo[0].username[0]}
              </div>
            ) : (
              <img
                src={`${businessInfo[0].thumbnail}`}
                style={{
                  width: "45px",
                  height: "45px",
                  objectFit: "contain",
                  backgroundColor: "#fff",
                }}
                alt="Profile"
                className="img-fluid rounded-circle mb-3 profile-image"
              />
            )}

            <div className="ms-3">
              <Link to="/business-profile">
                <h6 className="lh-1 text-dark fz-18 line-clamp-1 ">
                  {capitalizeFirstLetterOfEachWord(businessInfo[0].username)}
                </h6>
              </Link>
              <Link to="/pricing">
                <span className="badge bg-primary fz-12">
                  {businessInfo[0].userType}
                </span>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Balance */}
    </div>
  );
};

export default HeaderUserInfo;

const Skeletons = () => {
  return (
    <div className="user-name mb-1">
      <div className="d-flex align-items-center user-profile">
        <Placeholder as="div" animation="glow">
          <Placeholder
            xs={2}
            style={{ height: "20px", width: "20px", borderRadius: "50%" }}
          />
        </Placeholder>
        <div className="ms-3">
          <Placeholder as="a" animation="glow">
            <Placeholder xs={6} className="lh-1 text-dark fz-18" />
          </Placeholder>
          <Placeholder as="a" animation="glow">
            <Placeholder xs={4} className="badge bg-primary fz-12" />
          </Placeholder>
        </div>
      </div>
    </div>
  );
};
