import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
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
import settingRed from "../../images/svg/dashboard/SettingRed.svg";
import settingWhite from "../../images/svg/dashboard/settingWhite.svg";
import settingBlack from "../../images/svg/dashboard/settingGray.svg";
import BusinessMenu from "../../images/svg/dashboard/businessMenus.svg";
import BusinessProfile from "../../images/svg/dashboard/businessProfile.svg";
import BusinessEvent from "../../images/svg/dashboard/businessEvents.svg";
import Station from "../../images/svg/dashboard/Station.svg";

const MoreClubLinks = [
  {
    to: "/Resturant",
    icon: "bi-receipt",
    label: "Resturant",
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

const DashboardMenu = () => {
  const user = useSelector((state) => state.userReducer);
  const business = useSelector((state) => state.businessReducer);
  const permissions = useSelector((state) => state.permissionReducer);

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
  ) => (
    <li>
      {hasPermission ? (
        onClick ? (
          <div
            onClick={onClick}
            className="redirectlink fw-semibold dashboard-menus-items"
            style={{ cursor: "pointer" }}
          >
            <img
              src={darkIcon}
              alt={label}
              className="me-2 small-dashboard-icon menu-icon dark-logo dashboard-menus-dark-icon"
            />
            <img
              src={lightIcon}
              alt={label}
              className="me-2 small-dashboard-icon menu-icon dashboard-menus-light-icon"
            />
            {label}
          </div>
        ) : (
          <NavLink
            to={to}
            className="redirectlink fw-semibold dashboard-menus-items"
          >
            {label === "Events" || label === "Setup Station" ? (
              <img
                src={darkIcon}
                alt={label}
                className="me-2 small-dashboard-icon"
              />
            ) : (
              <>
                <img
                  src={darkIcon}
                  alt={label}
                  className="me-2 small-dashboard-icon menu-icon dashboard-menus-dark-icon"
                />
                <img
                  src={lightIcon}
                  alt={label}
                  className="me-2 small-dashboard-icon menu-icon dashboard-menus-light-icon"
                />
              </>
            )}

            {label}
          </NavLink>
        )
      ) : (
        <>
          <img
            src={darkIcon}
            alt={label}
            className="me-2 small-dashboard-icon menu-icon dashboard-menus-dark-icon"
          />
          <img
            src={lightIcon}
            alt={label}
            className="me-2 small-dashboard-icon menu-icon dashboard-menus-light-icon"
          />
          &nbsp; {label} &nbsp;<i className="bi bi-lock"></i>
        </>
      )}
    </li>
  );

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
      hasDropdown: false
      // hasDropdown : user.user?.user_type === "BUSINESS" ? true : false,
      // dropdownComponent: <NwtworkDropdown />

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
        to: "/moresaloon",
        lightIcon: MoreSalonBlack,
        darkIcon: MoreSalonWhite,
        label: "MORE SALONS",
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
        to: "/moresaloon",
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
    <div className="sidenav pb-5" style={{ zIndex: "200px" }}>
      {user.user?.user_type !== "NORMAL" &&
        !business.businessProfile.business_types?.length === 0 && (
          <CheckUserDiscounts />
        )}
      <ul>
        <li>User Menu</li>
        {menuItems.map(
          (item, idx) =>
            (item) &&
            (!item.hasDropdown) ?
            generateMenuItem(
              item.to,
              item.lightIcon,
              item.darkIcon,
              item.label,
              item.hasPermission,
              item.onClick
            ): 
            <li key={idx}>{item.dropdownComponent}</li>
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

export default DashboardMenu;


const NwtworkDropdown = () => {
  return (
    <SidebarDropDownMenu
      darkIcon={NetworkYellow}
      lightIcon={NetworkYellow}
      
      menuTitle="Network"
      links={NetworkLinks}
    >
      <li>
        <NavLink
          to={"/my-network"}
          className="redirectlink fw-semibold dashboard-menus-items"
        >
          <img
            src={NetworkYellow}
            alt={"Network"}
            className="me-2 small-dashboard-icon menu-icon dashboard-menus-dark-icon"
          />
          <img
            src={NetworkYellow}
            alt={"Network"}
            className="me-2 small-dashboard-icon menu-icon dashboard-menus-light-icon"
          />{" "}
          Network
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/leads"}
          className="redirectlink fw-semibold dashboard-menus-items"
        >
          <img
            src={NetworkYellow}
            alt={"NetworkYellow"}
            className="me-2 small-dashboard-icon menu-icon dashboard-menus-dark-icon"
          />
          <img
            src={NetworkYellow}
            alt={"NetworkYellow"}
            className="me-2 small-dashboard-icon menu-icon dashboard-menus-light-icon"
          />
          Leads
        </NavLink>
      </li>
    </SidebarDropDownMenu>
  );
};

const MorefoodDropdown = () => {
  return (
    <SidebarDropDownMenu
      darkIcon={MoreFood}
      lightIcon={MoreFood}
      menuSvg={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 64 64"
        >
          <path
            fill="currentColor"
            d="M56.411.719S7.623.704 7.637.719C3.14.719.612 3.044.612 7.793v48.966c0 4.443 2.273 6.769 6.766 6.769h49.173c4.493 0 6.769-2.21 6.769-6.769V7.793c.001-4.634-2.275-7.074-6.909-7.074M30.749 23.374c0 1.536-1.399 3.181-3.215 3.181V52.49c0 3.682-5.018 3.682-5.018 0V26.555c-1.767 0-3.306-1.361-3.306-3.4V8.882c0-1.242 1.795-1.29 1.795.049v10.55h1.503V8.833c0-1.141 1.729-1.214 1.729.049v10.599h1.553V8.848c0-1.193 1.678-1.241 1.678.047v10.586h1.528V8.848c0-1.18 1.753-1.227 1.753.047zm13.386 29.104c0 3.601-5.028 3.547-5.028 0V36.496H36.43V12.199c0-5.656 7.706-5.656 7.706 0v40.279z"
          />
        </svg>
      }
      menuTitle="MORE FOOD"
      links={MoreClubLinks}
    >
      <li>
        <NavLink
          to={"/restaurant"}
          className="redirectlink fw-semibold dashboard-menus-items"
        >
          <img
            src={settingRed}
            alt={"MORE FOOD"}
            className="me-2 small-dashboard-icon menu-icon dashboard-menus-dark-icon"
          />
          <img
            src={settingRed}
            alt={"MORE FOOD"}
            className="me-2 small-dashboard-icon menu-icon dashboard-menus-light-icon"
          />{" "}
          Setup Resturant
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/morefood"}
          className="redirectlink fw-semibold dashboard-menus-items"
        >
          <img
            src={MoreFood}
            alt={"MORE FOOD"}
            className="me-2 small-dashboard-icon menu-icon dashboard-menus-dark-icon"
          />
          <img
            src={MoreFood}
            alt={"MORE FOOD"}
            className="me-2 small-dashboard-icon menu-icon dashboard-menus-light-icon"
          />
          MORE FOOD
        </NavLink>
      </li>
    </SidebarDropDownMenu>
  );
};

const MoreSaloonDropdown = () => {
  return (
    <SidebarDropDownMenu
      darkIcon={MoreSalonWhite}
      lightIcon={MoreSalonBlack}
      menuIcon={"bi-scissors"}
      menuTitle="MORE SALONS"
      links={MoreClubLinks}
    >
      <li>
        <NavLink to={"/saloon"}>
          <img
            src={settingWhite}
            alt={"MORE FOOD"}
            className="me-2 small-dashboard-icon menu-icon dashboard-menus-dark-icon"
          />
          <img
            src={settingBlack}
            alt={"MORE FOOD"}
            className="me-2 small-dashboard-icon menu-icon dashboard-menus-light-icon"
          />{" "}
          Setup Salon
        </NavLink>
      </li>
      <li>
        <NavLink to={"/moresaloon"}>
          <img
            src={MoreSalonWhite}
            alt={"MORE SALON"}
            className="me-2 small-dashboard-icon menu-icon dashboard-menus-dark-icon"
          />
          <img
            src={MoreSalonBlack}
            alt={"MORE SALON"}
            className="me-2 small-dashboard-icon menu-icon dashboard-menus-light-icon"
          />{" "}
          MORE SALONS
        </NavLink>
      </li>
    </SidebarDropDownMenu>
  );
};

const BusinessMenuDropdown = ({ permisions }) => {
  return (
    <SidebarDropDownMenu
      SidebarDropDownMenu
      darkIcon={BusinessMenu}
      lightIcon={BusinessMenu}
      menuIcon={"BusinessMenu"}
      menuTitle="Business Menu"
      links={businessMenuLinks}
    >
      {/* {permisions.permission && permisions.permission.billing ? (
                    <li>
                      <NavLink to={"/billing"}>
                        <i className={`bi bi-receipt`} />
                        Billling
                      </NavLink>
                    </li>
                  ) : (
                    <li>
                      <i className={`bi bi-receipt`} />
                      &nbsp; Billling &nbsp;<i class="bi bi-lock"></i>
                    </li>
                  )} */}
      {permisions.permission && permisions.permission.business_transaction ? (
        <li>
          <NavLink to={"/business-transactions"}>
            <img
              src={BusinessTransactions}
              alt={"BusinessTransactions"}
              className="me-2 small-dashboard-icon menu-icon dashboard-menus-dark-icon"
            />
            <img
              src={BusinessTransactions}
              alt={"BusinessTransactions"}
              className="me-2 small-dashboard-icon menu-icon dashboard-menus-light-icon"
            />
            Business Transactions
          </NavLink>
        </li>
      ) : (
        <li>
          <i className={`bi bi-journal`} />
          &nbsp; Business Transactions &nbsp;
          <i class="bi bi-lock"></i>
        </li>
      )}
      {permisions.permission && permisions.permission.business_profile ? (
        <li>
          <NavLink to={"/business-profile"}>
            <img
              src={BusinessProfile}
              alt={"BusinessProfile"}
              className="me-2 small-dashboard-icon menu-icon dashboard-menus-dark-icon"
            />
            <img
              src={BusinessProfile}
              alt={"BusinessProfile"}
              className="me-2 small-dashboard-icon menu-icon dashboard-menus-light-icon"
            />
            Business Profile
          </NavLink>
        </li>
      ) : (
        <li>
          <img
            src={BusinessProfile}
            alt={"BusinessProfile"}
            className="me-2 small-dashboard-icon menu-icon dashboard-menus-dark-icon"
          />
          <img
            src={BusinessProfile}
            alt={"BusinessProfile"}
            className="me-2 small-dashboard-icon menu-icon dashboard-menus-light-icon"
          />
          &nbsp; Business Profile &nbsp;
          <i class="bi bi-lock"></i>
        </li>
      )}

      <li>
        <NavLink to={"/business-events"}>
          <img
            src={BusinessEvent}
            alt={"BusinessEvent"}
            className="me-2 small-dashboard-icon menu-icon dashboard-menus-dark-icon"
          />
          <img
            src={BusinessEvent}
            alt={"BusinessEvent"}
            className="me-2 small-dashboard-icon menu-icon dashboard-menus-light-icon"
          />
          Business Events
        </NavLink>
      </li>
    </SidebarDropDownMenu>
  );
};
