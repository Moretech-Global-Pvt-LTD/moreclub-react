import React from "react";
import { useSelector } from "react-redux";
import "./userdashboard/user-dashboard.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import CheckUserDiscounts from "./CheckUserDiscounts";
import handleRedirection from "../../utills/redircting";
import SidebarDropDownMenu from "./dropdownmenu";
import MarketplaceLinks from "./MarketplaceLinks";

import HomeWhite from "../../images/svg/dashboard/HomeWhite.svg";
import HomePrimary from "../../images/svg/dashboard/Home.svg";
import NetworkYellow from "../../images/svg/NetworkYellow.svg";
import WalletWhite from "../../images/svg/wallet.svg";
import Events from "../../images/svg/dashboard/events.svg";
import Transactions from "../../images/svg/Transaction.svg";
import BusinessTransactions from "../../images/svg/transactionWhite.svg";

import MoreFood from "../../images/svg/dashboard/morefood.svg";
import MoreSalonWhite from "../../images/svg/dashboard/moresaloonwhite.svg";
import MoreSalonBlack from "../../images/svg/dashboard/moresaloonblack.svg";
import MoreLiving from "../../images/svg/dashboard/morliving.png";

import settingRed from "../../images/svg/dashboard/SettingRed.svg";
import settingWhite from "../../images/svg/dashboard/settingWhite.svg";
import settingBlack from "../../images/svg/dashboard/settingGray.svg";
import BusinessMenu from "../../images/svg/dashboard/businessMenus.svg";
import BusinessProfile from "../../images/svg/dashboard/businessProfile.svg";
import BusinessEvent from "../../images/svg/dashboard/businessEvents.svg";
import Station from "../../images/svg/dashboard/Station.svg";
import Leads from "../../images/svg/leads.svg";
import UserSidebarDropDownMenu from "./userSidebardropdownmenu";

const MoreClubLinks = [
  {
    to: "/restaurant",
    icon: "bi-receipt",
    label: "Resturant",
    permission: true,
  },
  {
    to: "/morefood",
    icon: "bi-receipt",
    label: "MoreFood",
    permission: true,
  },
];

const SalonLinks = [
  {
    to: "/salons",
    icon: "bi-receipt",
    label: "salons",
    permission: true,
  },
  {
    to: "/moresalons",
    icon: "bi-receipt",
    label: "salons",
    permission: true,
  },
];

const NetworkLinks = [
  {
    to: "/my-network",
    icon: "bi-receipt",
    label: "Network",
    permission: true,
  },
  {
    to: "/leads",
    icon: "bi-receipt",
    label: "Leads",
    permission: true,
  },
];

const businessMenuLinks = [
  // {
  //   to: "/billing",
  //   icon: "bi-receipt",
  //   label: "Billing",
  //   permission: 'billing',
  // },
  {
    to: "/business-transactions",
    icon: "bi-journal",
    label: "Business Transactions",
    permission: "business_transaction",
  },
  {
    to: "/business-profile",
    icon: "bi-building",
    label: "Business Profile",
    permission: "business_profile",
  },
  {
    to: "/business-events",
    icon: "bi-calendar2-event",
    label: "Business Events",
    permission: true,
  },
];

const UserDashboardMenu = () => {
  const user = useSelector((state) => state.userReducer);
  const business = useSelector((state) => state.businessReducer);
  const permissions = useSelector((state) => state.permissionReducer);
  const navigate = useNavigate();
  const location = useLocation();

  // const generateMenuItem = (to, lightIcon, darkIcon, label, hasPermission = true, onClick) => (
  //   <li>
  //     {hasPermission ? (
  //       onClick ? (
  //         <div
  //           as
  //           NavLink
  //           onClick={onClick}
  //           className="redirectlink fw-semibold"
  //           style={{ cursor: "pointer" }}
  //         >
  //           <img src={darkIcon} alt={label} className="me-2 small-dashboard-icon" />
  //           {/* <i className={`bi ${icon} fs-5`} /> */}
  //           &nbsp;&nbsp;{label}
  //         </div>
  //       ) : (
  //         <NavLink to={to} className="redirectlink fw-semibold">
  //          <img src={darkIcon} alt={label} className="me-2 small-dashboard-icon " /> {label}
  //         </NavLink>
  //       )
  //     ) : (
  //       <>
  //         <img src={darkIcon} alt={label} className="me-2 small-dashboard-icon" />
  //         &nbsp; {label} &nbsp;<i className="bi bi-lock"></i>
  //       </>
  //     )}
  //   </li>
  // );

  const generateMenuItem = (
    to,
    lightIcon,
    darkIcon,
    label,
    hasPermission = true,
    onClick
  ) => {
    const isActive = location.pathname === to;

    return (
      <li key={label}>
        {hasPermission ? (
          onClick ? (
            <div
              onClick={onClick}
              className="user-dashboard-menu-item"
              style={{ cursor: "pointer" }}
              tabIndex={0}
            >
              <img
                src={darkIcon}
                alt={label}
                className="user-dashboard-menu-icon dark-icon user-dashboard-menu-icon-dark "
              />
              <img
                src={lightIcon}
                alt={label}
                className="user-dashboard-menu-icon user-dashboard-menu-icon-light dashboard-menus-light-icon"
              />
              {label}
            </div>
          ) : (
            <div
              onClick={() => navigate(to)}
              className={`user-dashboard-menu-item ${
                isActive ? "user-dashboard-menu-item-active" : ""
              }`}
              tabIndex={0}
            >
              {label === "Events" || label === "Setup Station" ? (
                <img
                  src={darkIcon}
                  alt={label}
                  className="user-dashboard-menu-icon"
                />
              ) : (
                <>
                  <img
                    src={darkIcon}
                    alt={label}
                    className="user-dashboard-menu-icon user-dashboard-menu-icon-dark dashboard-menus-dark-icon"
                  />
                  <img
                    src={lightIcon}
                    alt={label}
                    className="user-dashboard-menu-icon user-dashboard-menu-icon-light dashboard-menus-light-icon"
                  />
                </>
              )}
              {label}
            </div>
          )
        ) : (
          <div className="user-dashboard-menu-item user-dashboard-menu-disabled">
            <img
              src={darkIcon}
              alt={label}
              className="user-dashboard-menu-icon user-dashboard-menu-icon-dark "
            />
            <img
              src={lightIcon}
              alt={label}
              className="user-dashboard-menu-icon user-dashboard-menu-icon-light"
            />
            &nbsp; {label} &nbsp;<i className="bi bi-lock"></i>
          </div>
        )}
      </li>
    );
  };

  const NwtworkDropdown = () => {
    const isNetworkActive = location.pathname === "/my-network";
    const isleadActive = location.pathname === "/leads";

    return (
      <UserSidebarDropDownMenu
        darkIcon={NetworkYellow}
        lightIcon={NetworkYellow}
        menuTitle="Network"
        links={NetworkLinks}
      >
        
          <div
            onClick={() => navigate("/my-network")}
            className={`user-dashboard-submenu-item ${
              isNetworkActive ? "user-dashboard-submenu-item-active" : ""
            }`}
            tabIndex={0}
          >
            Network
          </div>
        
        
          <div
            onClick={() => navigate("/leads")}
            className={`user-dashboard-submenu-item ${
              isleadActive ? "user-dashboard-submenu-item-active" : ""
            }`}
            tabIndex={0}
          >
            Leads
          </div>
        
      </UserSidebarDropDownMenu>
    );
  };

  const MorefoodDropdown = () => {
    const isSetupRestaurantActive = location.pathname === "/restaurant";
    const isMoreFoodActive = location.pathname === "/morefood";
  
    return (
      <UserSidebarDropDownMenu
        darkIcon={MoreFood}
        lightIcon={MoreFood}
        menuTitle="MORE FOOD"
        links={MoreClubLinks}
      >
        <div
          onClick={() => navigate("/restaurant")}
          className={`user-dashboard-submenu-item ${
            isSetupRestaurantActive ? "user-dashboard-submenu-item-active" : ""
          }`}
          tabIndex={0}
        >
          
          Setup Restaurant
        </div>
  
        <div
          onClick={() => navigate("/morefood")}
          className={`user-dashboard-submenu-item ${
            isMoreFoodActive ? "user-dashboard-submenu-item-active" : ""
          }`}
          tabIndex={0}
        >
          
          MORE FOOD
        </div>
      </UserSidebarDropDownMenu>
    );
  };
  
  const MoreSaloonDropdown = () => {
    const isSetupSalonActive = location.pathname === "/salons";
    const isMoreSalonsActive = location.pathname === "/moresalons";
  
    return (
      <UserSidebarDropDownMenu
        darkIcon={MoreSalonWhite}
        lightIcon={MoreSalonBlack}
        menuIcon={"bi-scissors"}
        menuTitle="MORE SALONS"
        links={SalonLinks}
      >
        <div
          onClick={() => navigate("/salons")}
          className={`user-dashboard-submenu-item ${
            isSetupSalonActive ? "user-dashboard-submenu-item-active" : ""
          }`}
          tabIndex={0}
        >
        
         Setup Salon
        </div>
  
        <div
          onClick={() => navigate("/moresalons")}
          className={`user-dashboard-submenu-item ${
            isMoreSalonsActive ? "user-dashboard-submenu-item-active" : ""
          }`}
          tabIndex={0}
        >
          MORE SALONS
        </div>
      </UserSidebarDropDownMenu>
    );
  };
  

  const BusinessMenuDropdown = ({ permisions }) => {
    const isBusinessTransactionsActive = location.pathname === "/business-transactions";
    const isBusinessProfileActive = location.pathname === "/business-profile";
    const isBusinessEventsActive = location.pathname === "/business-events";
  
    return (
      <UserSidebarDropDownMenu
        darkIcon={BusinessMenu}
        lightIcon={BusinessMenu}
        menuIcon={"BusinessMenu"}
        menuTitle="Business Menu"
        links={businessMenuLinks}
      >
        {permisions.permission && permisions.permission.business_transaction ? (
          <div
            onClick={() => navigate("/business-transactions")}
            className={`user-dashboard-submenu-item ${
              isBusinessTransactionsActive ? "user-dashboard-submenu-item-active" : ""
            }`}
            tabIndex={0}
          >
           Business Transactions
          </div>
        ) : (
          <div className="user-dashboard-submenu-item" tabIndex={0}>
             Business Transactions &nbsp;
            <i className="bi bi-lock"></i>
          </div>
        )}
  
        {permisions.permission && permisions.permission.business_profile ? (
          <div
            onClick={() => navigate("/business-profile")}
            className={`user-dashboard-submenu-item ${
              isBusinessProfileActive ? "user-dashboard-submenu-item-active" : ""
            }`}
            tabIndex={0}
          >
            
            Business Profile
          </div>
        ) : (
          <div className="user-dashboard-submenu-item" tabIndex={0}>
           Business Profile &nbsp;
            <i className="bi bi-lock"></i>
          </div>
        )}
  
        <div
          onClick={() => navigate("/business-events")}
          className={`user-dashboard-submenu-item ${
            isBusinessEventsActive ? "user-dashboard-submenu-item-active" : ""
          }`}
          tabIndex={0}
        >
          Business Events
        </div>
      </UserSidebarDropDownMenu>
    );
  };
  
  
  
  

  const menuItems = [
    {
      to: "/dashboard",
      lightIcon: HomePrimary,
      darkIcon: HomeWhite,
      label: "Dashboard", 
      hasDropdown : false

    },
    user && user.user && permissions.permission?.my_network && {
      to: "/my-network",
      lightIcon: NetworkYellow,
      darkIcon: NetworkYellow,
      label: "My Network",
      hasPermission: permissions.permission.my_network, 
      // hasDropdown: false
      hasDropdown : user.user?.user_type === "BUSINESS" ? true : false,
      dropdownComponent: <NwtworkDropdown />

    },
    permissions.permission?.my_wallet && {
      to: "/wallet",
      lightIcon: WalletWhite,
      darkIcon: WalletWhite,
      label: "My Wallet",
      hasPermission: permissions.permission.my_wallet, 
      hasDropdown : false,
    },
    { to: "/event", lightIcon: Events, darkIcon: Events, label: "Events", 
      hasDropdown : false },
    permissions.permission?.transaction && {
      to: "/transactions",
      lightIcon: Transactions,
      darkIcon: Transactions,
      label: "Transactions",
      hasPermission: permissions.permission.transaction, 
      hasDropdown : false
    },

    user.user &&
      user.user?.user_type !== "BUSINESS" && {
        to: "/morefood",
        lightIcon: MoreFood,
        darkIcon: MoreFood,
        label: "MOREFOOD",
        hasPermission: true, 
        hasDropdown : false
      },
    user.user &&
      user.user?.user_type !== "BUSINESS" && {
        to: "/moresalons",
        lightIcon: MoreSalonBlack,
        darkIcon: MoreSalonWhite,
        label: "MORE SALONS",
        hasPermission: true, 
        hasDropdown : false
      },
      {
        to: "/moreliving",
        lightIcon: MoreLiving,
        darkIcon: MoreLiving,
        label: "MORE LIVING",
        hasPermission: true, 
        hasDropdown : false
      },
    // user.user &&
    //   user.user?.user_type !== "BUSINESS" && {
    //     label: "MARKETPLACE",
    //     icon: "bi-currency-exchange",
    //     hasPermission: true,
    //     onClick: () => handleRedirection("marketplaceadmin", "/login"),
    //   },
    user.user &&
      user.user?.user_type === "BUSINESS" &&
      !business.businessProfile.business_types?.some(
        (type) => type.name === "Restaurant"
      ) && {
        to: "/morefood",
        lightIcon: MoreFood,
        darkIcon: MoreFood,
        label: "MOREFOOD",
        hasPermission: true, 
        hasDropdown : false
      },
    user.user &&
      user.user?.user_type === "BUSINESS" &&
      !business.businessProfile.business_types?.some(
        (type) => type.name === "Salons"
      ) && {
        to: "/moresalons",
        lightIcon: MoreSalonBlack,
        darkIcon: MoreSalonWhite,
        label: "MORE SALONS",
        hasPermission: true, 
        hasDropdown : false
      },
    // user.user &&
    //   user.user?.user_type === "BUSINESS" &&
    //   !business.businessProfile.business_types?.some(
    //     (type) => type.name === "Marketplace"
    //   ) && {
    //     label: "MARKETPLACE",
    //     icon: "bi-currency-exchange",
    //     hasPermission: true,
    //     onClick: () => handleRedirection("marketplaceadmin", "/login"),
    //   },
  ].filter(Boolean);

  const dropdownItems = [
    user.user && user.user?.user_type === "BUSINESS" && (
      <BusinessMenuDropdown permisions={permissions} />
    ),
    user.user &&
      user.user?.user_type === "BUSINESS" &&
      business.businessProfile.business_types?.some(
        (type) => type.name === "Restaurant"
      ) && <MorefoodDropdown />,
    user.user &&
      user.user?.user_type === "BUSINESS" &&
      business.businessProfile.business_types?.some(
        (type) => type.name === "Salons"
      ) && <MoreSaloonDropdown />,
    // user.user &&
    //   user.user?.user_type === "BUSINESS" &&
    //   business.businessProfile.business_types?.some(
    //     (type) => type.name === "Marketplace"
    //   ) && <MarketplaceLinks MoreClubLinks={MoreClubLinks} />,
  ];

  const additionalLinks = [
    (user.isSuperAdmin || user.isStationOwner) && {
      to: "/station",
      lightIcon: Station,
      darkIcon: Station,
      label: "Setup Station",
      hasPermission: permissions.permission.my_wallet,
      hasDropdown: false,
    },
  ].filter(Boolean);

  return (
    <div className="sidenav pb-2" style={{ zIndex: "200px" }}>
      {/* {user.user?.user_type !== "NORMAL" &&
        !business.businessProfile.business_types?.length === 0 && (
          <CheckUserDiscounts />
        )} */}
      <ul>
        <li>User Menu</li>
        {menuItems.map((item, idx) =>
          item && !item.hasDropdown ? (
            generateMenuItem(
              item.to,
              item.lightIcon,
              item.darkIcon,
              item.label,
              item.hasPermission,
              item.onClick
            )
          ) : (
            <li key={idx}>{item.dropdownComponent}</li>
          )
        )}
        {dropdownItems.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
        {additionalLinks.map((item, idx) => (
          <li key={idx}>
            {generateMenuItem(
              item.to,
              item.lightIcon,
              item.darkIcon,
              item.label,
              item.hasPermission,
              item.onClick
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDashboardMenu;
