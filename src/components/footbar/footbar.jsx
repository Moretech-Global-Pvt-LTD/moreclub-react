import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import HeaderUserInfo from "../header/HeaderUserInfo";
import HeaderDashboardMenu from "../header/HeaderDashboardMenu";

const Footbar = () => {
  const loaction = useLocation();
  const [isActive, setActive] = useState(false);

  const Menus = [
    {
      id: 101,
      name: "Dashboard",
      icon: "bi-speedometer",
      href: "/dashboard",
    },
    {
      id: 102,
      name: "Transaction",
      icon: "bi-currency-exchange",
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
                  <i className={`bi ${item.icon} `}></i>
                </span>
                <span class="footbar-item-name">&nbsp;{item.name}</span>
              </div>
            </Link>
          ))}
          <Link to={'/scan'} className="">
              <div
                className={`footbar-menu-central-item  ${
                  loaction.pathname === '/scan'
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

            <Link to={'/notification'} className="">
              <div
                className={`footbar-menu-item  ${
                  loaction.pathname === '/notification'
                    ? "footbar-active "
                    : "footbar-inactive"
                }`}
              >
                <span class="footbar-item-icon">
                  <i className={`bi bi-bell `}></i>
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
        <div
          className="sidebar-overlay"
          onClick={() => {
            isActive && handleToggle();
          }}
        >
          <div
            className={`admin-sidebar-wrap  ${
              isActive ? "sidebar-active" : "sidebar-disabled"
            }`}
          >
            <div className="overflowY-scroll ">
              <HeaderUserInfo />
              <HeaderDashboardMenu />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footbar;
