import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggler from "./themeToggler";
import { Dropdown } from "react-bootstrap";
import { logout } from "../../redux/api/loginAPI";
import { setMembershipType, userSuccess } from "../../redux/slices/userSlice";
import { CurrencySet } from "../../redux/api/CurrencyConvertorAPI";
import { baseURL, imageURL } from "../../config/config";
import { axiosInstance } from "../..";
import { useDispatch, useSelector } from "react-redux";
import { businessProfileSucess } from "../../redux/slices/businessSlice";
import { useQuery } from "@tanstack/react-query";
import Logos from "./Logos";

const LoggedHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        await dispatch(userSuccess(userData));
        await dispatch(CurrencySet());
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

  const user = useSelector((state) => state.userReducer);
  const metainfo = useSelector((state) => state.metaReducer);

  const logOut = () => {
    dispatch(logout());
    navigate("/login");
  };

  const userDropdownData = [
    {
      path: "/profile",
      icon: "bi-person-circle",
      text: "profile",
    },
    {
      path: "/settings",
      icon: "bi-gear",
      text: "Settings",
    },
  ];

  const userDropdownList = userDropdownData.map((elem, index) => (
    <>
      <li key={index}>
        <Link className="dropdown-item" to={elem.path}>
          <i className={`me-2 bi ${elem.icon}`} />
          {elem.text}
        </Link>
      </li>
    </>
  ));

  return (
    <header className={`header-area dashboard-header px-0 px-sm-0`}>
      <nav className="container ">
        <div className="w-100 d-flex justify-content-between border-0">
          <div className="d-flex align-items-center">
            {/* Brand Logo */}
            <div className="admin-logo me-2 me-sm-3">
              <div className="admin-logo me-2 me-sm-3">
                <Logos link={"/dashboard"} />
              </div>
            </div>
          </div>

          <div className="header-meta d-flex align-items-center">
            <ThemeToggler />
            <Dropdown className="user-dropdown ">
              <Dropdown.Toggle className="user-btn" id="userDropdown">
                <img
                  src={
                    !user.user?.user_profile?.display_picture
                      ? `${imageURL}/media/user_profile/default.png`
                      : `${user.user?.user_profile?.display_picture}`
                  }
                  alt=""
                  className="user-btn bg-white border border-primary"
                  style={{ padding: "1px" }}
                />
              </Dropdown.Toggle>

              <Dropdown.Menu className="mt-3" align="end">
                {userDropdownList}
                <li onClick={() => logOut()}>
                  <div
                    className="dropdown-item cursor-pointer"
                    onClick={() => logOut()}
                  >
                    <i
                      className={`me-2 bi bi-box-arrow-right`}
                      onClick={() => logOut()}
                    />
                    {"Log out"}
                  </div>
                </li>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default LoggedHeader;
