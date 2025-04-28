import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import HeaderUserInfo from "../header/HeaderUserInfo";
import { useSelector } from "react-redux";
import DashboardMenu from "../header/Dashboardmenu";
import HomePrimary from "../../images/svg/dashboard/Home.svg";
import HomeWhite from "../../images/svg/dashboard/HomeWhite.svg";
import Transactions from "../../images/svg/Transaction.svg";
import UserDashboardMenu from "../header/uerdashboardmenu";
import Profile from "../header/userdashboard/userProfile";
import ReferralBox from "../header/userdashboard/referalbox";

const Footbar = () => {
  const loaction = useLocation();
  const [isActive, setActive] = useState(false);
  const notification = useSelector((state) => state.notification);
  const user = useSelector((state) => state.userReducer);

  const Menus = [
    {
      id: 101,
      name: "Dashboard",
      icon: "bi-speedometer",
      lightIcon: HomePrimary,
      darkIcon: HomeWhite,
      href: "/dashboard",
    },
    {
      id: 102,
      name: "Transaction",
      icon: "bi-currency-exchange",
      darkIcon: Transactions,
      lightIcon: Transactions,
      href: "/transactions",
    },
    // {
    //   id: 103,
    //   name: "Wallet",
    //   icon: "bi-wallet2",
    //   href: "/wallet",
    // },
    // {
    //   id: 104,
    //   name: "Notification",
    //   icon: "bi-bell",
    //   href: "/notification",
    // },
  ];

  const handleToggle = () => {
    setActive(!isActive);
  };

  return (
    <>
      <div class="footbar-container ">
        <div class="footbar-menu">
          {Menus.map((item) => (
            <Link to={item.href} className="">
              <div
                className={`footbar-menu-item  ${
                  loaction.pathname === item.href
                    ? "footbar-active "
                    : "footbar-inactive"
                }`}
              >
                <span class="footbar-item-icon">
                  <img
                    src={item.darkIcon}
                    alt={item.name}
                    className={` small-footbar-icon menu-icon dark-logo dashboard-menus-dark-icon ${
                      loaction.pathname === item.href
                        ? "active-footbar-icon "
                        : "inactive-footbar-icon"
                    }`}
                  />
                  <img
                    src={item.lightIcon}
                    alt={item.name}
                    className={` small-footbar-icon menu-icon dashboard-menus-light-icon  ${
                      loaction.pathname === item.href
                        ? "active-footbar-icon "
                        : "inactive-footbar-icon"
                    }`}
                  />
                </span>
                <span class="footbar-item-name">&nbsp;{item.name}</span>
              </div>
            </Link>
          ))}
          <Link to={"/scan"} className="">
            <div
              className={`footbar-menu-central-item  ${
                loaction.pathname === "/scan"
                  ? "footbar-active "
                  : "footbar-inactive"
              }`}
            >
              <span class="footbar-item-icon">
                <i className={`bi bi-qr-code `}></i>
              </span>
              {/* <span class="footbar-item-name">&nbsp;{item.name}</span> */}
            </div>
          </Link>

          <Link to={"/notification"} className="">
            <div
              className={`footbar-menu-item  ${
                loaction.pathname === "/notification"
                  ? "footbar-active "
                  : "footbar-inactive"
              }`}
            >
              <span class="footbar-item-icon position-relative">
                <i
                  className={`bi ${
                    loaction.pathname === "/notification"
                      ? "bi-bell-fill "
                      : "bi-bell "
                  } `}
                ></i>
                {notification.unreadCount > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style={{ fontSize: "10px" }}
                  >
                    {notification.unreadCount}
                  </span>
                )}
              </span>
              <span class="footbar-item-name">&nbsp;Notification</span>
            </div>
          </Link>

          <div className="footbar-menu-item">
            <span class="footbar-item-icon" onClick={handleToggle}>
              <i className={`bi bi-list `}></i>
            </span>
            <span class="footbar-item-name">&nbsp;{"More"}</span>
          </div>
        </div>
      </div>
      {isActive && (
        <>
          <div
            className={`admin-sidebar-wrap  ${
              isActive ? "sidebar-active" : "sidebar-disabled"
            }`}
          >
            <div className="overflowY-scroll">
              {user?.user?.user_type !== "NORMAL" ? (
                <>
                  <HeaderUserInfo />
                  <DashboardMenu />
                </>
              ) : (
                <>
                  <Profile />
                  <UserDashboardMenu />
                  <ReferralBox />
                </>
              )}
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

export default Footbar;
