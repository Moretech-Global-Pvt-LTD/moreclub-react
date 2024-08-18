import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";

import SidebarDropDownMenu from "./dropdownmenu";

const HeaderDashboardMenu = () => {
  const user = useSelector((state) => state.userReducer);
  const business = useSelector((state) => state.businessReducer);
  const permisions = useSelector((state) => state.permissionReducer);


  const businessMenuLinks = [
    {
      to: "/billing",
      icon: "bi-receipt",
      label: "Billing",
      permission: 'billing',
    },
    {
      to: "/business-transactions",
      icon: "bi-journal",
      label: "Business Transactions",
      permission: 'business_transaction',
    },
    {
      to: "/business-profile",
      icon: "bi-building",
      label: "Business Profile",
      permission:
        'business_profile',
    },
    {
      to: "/business-events",
      icon: "bi-calendar2-event",
      label: "Business Events",
      permission: true,
    },
  ];


  const MoreClubLinks = [
    {
      to: "/Resturant",
      icon: "bi-receipt",
      label: "Resturant",
      permission: true,
    },
  ];

  return (
    <div className="sidenav pb-5 " style={{ zIndex: "200px" }}>
      <ul>
        <li>User Menu</li>
        <li>
          <NavLink to={"/dashboard"}>
            <i className={`bi bi-speedometer`} />
            Dashboard
          </NavLink>
        </li>
        {permisions.permission && permisions.permission.my_coupon ? (
          <li>
            <NavLink to={"/my-coupons"}>
              <i className={`bi bi-cash`} />
              My Coupons
            </NavLink>
          </li>
        ) : (
          <li>
            <i className={`bi bi-cash`} />
            &nbsp; My Coupons &nbsp;<i class="bi bi-lock"></i>
          </li>
        )}
        {permisions.permission && permisions.permission.my_network ? (
          <li>
            <NavLink to={"/my-network"}>
              <i className={`bi bi-tree`} />
              My Network
            </NavLink>
          </li>
        ) : (
          <li>
            <i className={`bi bi-tree`} />
            &nbsp; My Network &nbsp;<i class="bi bi-lock"></i>
          </li>
        )}
        {permisions.permission && permisions.permission.my_wallet ? (
          <li>
            <NavLink to={"/wallet"}>
              <i className={`bi bi-wallet2`} />
              My Wallet
            </NavLink>
          </li>
        ) : (
          <li>
            <i className={`bi bi-wallet2`} />
            &nbsp; My Wallet &nbsp;<i class="bi bi-lock"></i>
          </li>
        )}
        {/* {permisions.permission && permisions.permission.my_wallet ? ( */}
        <li>
          <NavLink to={"/event"}>
            <i className={`bi bi-calendar3`} />
            Events
          </NavLink>
        </li>
        {permisions.permission && permisions.permission.transaction ? (
          <li>
            <NavLink to={"/transactions"}>
              <i className={`bi bi-currency-exchange`} />
              Transactions
            </NavLink>
          </li>
        ) : (
          <li>
            <i className={`bi bi-currency-exchange`} />
            &nbsp; Transactions &nbsp;<i class="bi bi-lock"></i>
          </li>
        )}
        {user.user?.user_type === "NORMAL" && (
          <li>
            <NavLink to={"/morefood"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.2em"
                height="1.2em"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="m445.588 56l-.026 384.352c6.881 11.323 14 15.677 19.97 15.648c5.924-.028 12.967-4.434 19.714-15.418L466.82 244.27l-.215-2.391l1.475-1.906c21.174-27.169 28.573-74.108 22.533-113.81c-3.02-19.852-9.342-37.82-18.195-50.522c-7.424-10.652-16.28-17.447-26.828-19.641zm-372.375.004l-.016 67.127l-12.56-.016V56.008H46.332l.002 67.11H33.756v-67.11h-14.57v103.228c-.001 11.417 6.23 17.748 16.04 21.662l4.06 1.622l-.09 4.37c-2 84.57-3.977 169.139-5.962 253.708C40.074 451.79 47.1 456.028 52.95 456s12.87-4.377 19.623-15.432q-3.474-126.821-6.941-253.644l-.12-4.4l4.073-1.606c10.324-4.106 17.039-11.074 17.039-21.676V56.004h-13.41zM256 95A161 161 0 0 0 95 256a161 161 0 0 0 161 161a161 161 0 0 0 161-161A161 161 0 0 0 256 95"
                />
              </svg>
              &nbsp; More Food
            </NavLink>
          </li>
        )}
        {user.user?.user_type !== "NORMAL" && (
          <>
            {business.businessProfile.is_verified && (
              <>
                <SidebarDropDownMenu
                  SidebarDropDownMenu
                  menuIcon={"bi-building"}
                  menuTitle="Business Menu"
                  links={businessMenuLinks}

                >
                  {permisions.permission && permisions.permission.billing ? (
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
                  )}
                  {permisions.permission &&
                    permisions.permission.business_transaction ? (
                    <li>
                      <NavLink to={"/business-transactions"}>
                        <i className={`bi bi-journal`} />
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
                  {permisions.permission &&
                    permisions.permission.business_profile ? (
                    <li>
                      <NavLink to={"/business-profile"}>
                        <i className={`bi bi-building`} />
                        Business Profile
                      </NavLink>
                    </li>
                  ) : (
                    <li>
                      <i className={`bi bi-building`} />
                      &nbsp; Business Profile &nbsp;
                      <i class="bi bi-lock"></i>
                    </li>
                  )}

                  <li>
                    <NavLink to={"/business-events"}>
                      <i class="bi bi-calendar2-event"></i>
                      Business Events
                    </NavLink>
                  </li>
                </SidebarDropDownMenu>
                {business.businessProfile.business_types?.some(type => type.name === "Restaurant") &&

                  <SidebarDropDownMenu
                    menuIcon={"bi-building"}
                    menuTitle="More Food"
                    links={MoreClubLinks}
                  >
                    <li>
                      <NavLink to={"/Resturant"}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1.2em"
                          height="1.2em"
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="currentColor"
                            d="m445.588 56l-.026 384.352c6.881 11.323 14 15.677 19.97 15.648c5.924-.028 12.967-4.434 19.714-15.418L466.82 244.27l-.215-2.391l1.475-1.906c21.174-27.169 28.573-74.108 22.533-113.81c-3.02-19.852-9.342-37.82-18.195-50.522c-7.424-10.652-16.28-17.447-26.828-19.641zm-372.375.004l-.016 67.127l-12.56-.016V56.008H46.332l.002 67.11H33.756v-67.11h-14.57v103.228c-.001 11.417 6.23 17.748 16.04 21.662l4.06 1.622l-.09 4.37c-2 84.57-3.977 169.139-5.962 253.708C40.074 451.79 47.1 456.028 52.95 456s12.87-4.377 19.623-15.432q-3.474-126.821-6.941-253.644l-.12-4.4l4.073-1.606c10.324-4.106 17.039-11.074 17.039-21.676V56.004h-13.41zM256 95A161 161 0 0 0 95 256a161 161 0 0 0 161 161a161 161 0 0 0 161-161A161 161 0 0 0 256 95"
                          />
                        </svg>
                        &nbsp; Setup Resturant
                      </NavLink>
                    </li>
                    <li>
                  <NavLink to={"/morefood"}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.2em"
                      height="1.2em"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="m445.588 56l-.026 384.352c6.881 11.323 14 15.677 19.97 15.648c5.924-.028 12.967-4.434 19.714-15.418L466.82 244.27l-.215-2.391l1.475-1.906c21.174-27.169 28.573-74.108 22.533-113.81c-3.02-19.852-9.342-37.82-18.195-50.522c-7.424-10.652-16.28-17.447-26.828-19.641zm-372.375.004l-.016 67.127l-12.56-.016V56.008H46.332l.002 67.11H33.756v-67.11h-14.57v103.228c-.001 11.417 6.23 17.748 16.04 21.662l4.06 1.622l-.09 4.37c-2 84.57-3.977 169.139-5.962 253.708C40.074 451.79 47.1 456.028 52.95 456s12.87-4.377 19.623-15.432q-3.474-126.821-6.941-253.644l-.12-4.4l4.073-1.606c10.324-4.106 17.039-11.074 17.039-21.676V56.004h-13.41zM256 95A161 161 0 0 0 95 256a161 161 0 0 0 161 161a161 161 0 0 0 161-161A161 161 0 0 0 256 95"
                      />
                    </svg>
                    &nbsp; More Food
                  </NavLink>
                </li>
                  </SidebarDropDownMenu>
                }
              </>
            )}
          </>
        )}
      </ul>

    </div>
  );
};

export default HeaderDashboardMenu;
