import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Dropdown from "react-bootstrap/Dropdown";
import useStickyHeader from "./StickyHeader";

import { useDispatch, useSelector } from "react-redux";
import { baseURL, imageURL } from "../../config/config";
import { logout } from "../../redux/api/loginAPI";
import { getWallet } from "../../redux/api/wallets";
import DropNotificationContent from "../Notifications/DropNotificationContent";
import HeaderDashboardMenu from "./HeaderDashboardMenu";
import HeaderUserInfo from "./HeaderUserInfo";
import ThemeToggler from "./themeToggler";
import { axiosInstance } from "../..";
import { businessProfileSucess } from "../../redux/slices/businessSlice";
import { setMembershipType, userSuccess } from "../../redux/slices/userSlice";
import { useQuery } from "@tanstack/react-query";
import { CurrencySet } from "../../redux/api/CurrencyConvertorAPI";
import { Placeholder } from "react-bootstrap";
// import Notification from "../Notifications/Notification";

const HeaderDashboard = () => {
  let [check] = useState(true);
  const sticky = useStickyHeader(10);
  const stickyClass = `${sticky && check ? "sticky-on" : ""}`;

  const [isActive, setActive] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const wallet = useSelector((state) => state.walletReducer);
  const metainfo = useSelector((state) => state.metaReducer);
  const currency = useSelector((state) => state.currencyReducer.currencyDetail);

  // const dispatch = useDispatch();

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

  if (isLoading) {
    <p>loading....</p>;
  }
  if (error) {
    <p>error...</p>;
  }

  useEffect(() => {
    dispatch(getWallet());
  }, [dispatch]);

  const handleToggle = () => {
    setActive(!isActive);
  };


  const user = useSelector((state) => state.userReducer);

  const logOut = () => {
    dispatch(logout());
    navigate("/login");
  };

  const userDropdownData = [
    {
      path: "/profile",
      icon: "bi-person-circle",
      text: "Profile",
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
    <>
      <header
        className={`header-area ${stickyClass} dashboard-header px-0 px-sm-0`}
      >
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <div className="d-flex align-items-center">
              {/* Brand Logo */}
              <div className="admin-logo me-2 me-sm-3">
                <Link className="d-flex align-items-center" to="/dashboard">
                  <img
                    className="nav-light-logo dashboard-header-logo "
                    src={`${metainfo.meta?.black_logo}`}
                    alt="Light"
                  />
                  <img
                    className="nav-dark-logo dashboard-header-logo "
                    src={`${metainfo.meta?.white_logo}`}
                    alt="Dark"
                  />
                </Link>
              </div>
            </div>
            {/* Header Meta */}
            <div className="header-meta d-flex align-items-center  ">
              <ThemeToggler />
              <Link
                className="btn btn-sm btn-danger rounded-pill me-2 me-sm-3 "
                to="/wallet"
              >
                {currency.loading ? (
                  <span className="fs-6 fw-bold">
                    <Placeholder animation="glow" className="rounded">
                      <Placeholder
                        xs={12}
                        style={{ height: "12px", width: "1rem" }}
                      />
                    </Placeholder>
                    &nbsp;
                  </span>
                ) : (
                  <span className="fs-6 fw-bold">{currency.symbol}&nbsp;</span>
                )}

                <span className="fs-6 fw-bold ">
                  {wallet.wallet?.balance ?? "0.00"}
                </span>
              </Link>
              {/* <Notification/> */}
              {/* notification */}
              <Dropdown className="user-dropdown me-2 points-show">
                <Dropdown.Toggle className="user-btn" id="userDropdown">
                  <i className="bi bi-bell" />
                </Dropdown.Toggle>

                <Dropdown.Menu
                  className="mt-3 noti-dd-menu"
                  align="end"
                  style={{ maxHeight: "400px", overflowY: "auto" }}
                >
                  <DropNotificationContent />
                </Dropdown.Menu>
              </Dropdown>

              {/* User Dropdown */}
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

              {/* Menu Toggler */}
              <div
                className="menu-toggler ms-1 ms-sm-3 menu-show"
                onClick={handleToggle}
              >
                <i className="bi bi-list fs-6" />
              </div>
            </div>
          </div>
        </nav>
      </header>

      <div className={`admin-sidebar-wrap sidebar-hidden `}>
        <div className="overflowY-scroll  ">
          <HeaderUserInfo />
          <HeaderDashboardMenu/>
        </div>
      </div>

      {isActive && (
        <>
          <div
            className={`admin-sidebar-wrap  ${
              isActive ? "sidebar-active" : "sidebar-disabled"
            }`}
          >
            <div className="overflowY-scroll"
            
            >
              <HeaderUserInfo />
              
              <HeaderDashboardMenu />
            </div>
          </div>
          <div
            className="sidebar-overlay"
            onClick={() => {
              isActive && handleToggle();
            }}
          />
        </>
        
      )}
    </>
  );
};

export default HeaderDashboard;
