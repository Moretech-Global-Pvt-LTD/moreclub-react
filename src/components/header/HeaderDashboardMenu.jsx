import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import SidebarDropDownMenu from "./dropdownmenu";

const HeaderDashboardMenu = () => {
  const user = useSelector((state) => state.userReducer);
  const business = useSelector((state) => state.businessReducer);
  const permisions = useSelector((state) => state.permissionReducer);


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
        {/* {permisions.permission && permisions.permission.my_coupon ? (
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
        )} */}
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
        {(user.user?.user_type === "NORMAL") &&
          <>
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


          </>
        }

        {(user.user?.user_type !== "NORMAL") && !business.businessProfile.business_types?.some(type => type.name === "Restaurant") &&
          <>
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
          


          </>
        }

        {(user.user?.user_type !== "NORMAL") && (!business.businessProfile.business_types?.some(type => type.name === "Saloon")) && (
          <>
            <li>
              <NavLink to={"/moresaloon"}>
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                  <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                    <path d="M6 2C5 5 7 5 6 8m4-6c-1 3 1 3 0 6" />
                    <circle cx="4" cy="20" r="2" />
                    <path d="M5.4 18.6L8 16m2.8-2.8L14 10" />
                    <circle cx="12" cy="20" r="2" />
                    <path d="m2 10l8.6 8.6M18 2h2a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-2m0-16h4m-4 4h4m-4 4h4m-4 4h4" />
                  </g>
                </svg>
                &nbsp; More Salon
              </NavLink>
            </li>
          </>
        )}

        {(user.user?.user_type === "NORMAL") && (
          <>
            <li>
              <NavLink to={"/moresaloon"}>
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                  <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                    <path d="M6 2C5 5 7 5 6 8m4-6c-1 3 1 3 0 6" />
                    <circle cx="4" cy="20" r="2" />
                    <path d="M5.4 18.6L8 16m2.8-2.8L14 10" />
                    <circle cx="12" cy="20" r="2" />
                    <path d="m2 10l8.6 8.6M18 2h2a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-2m0-16h4m-4 4h4m-4 4h4m-4 4h4" />
                  </g>
                </svg>
                &nbsp; More Salon
              </NavLink>
            </li>
          </>
        )}



        {user.user?.user_type !== "NORMAL" && (
          <>
            {/* {business.businessProfile.is_verified && ( */}
              <>
                <SidebarDropDownMenu
                  SidebarDropDownMenu
                  menuIcon={"bi-building"}
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
                    menuSvg={<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 64 64">
                      <path fill="currentColor" d="M56.411.719S7.623.704 7.637.719C3.14.719.612 3.044.612 7.793v48.966c0 4.443 2.273 6.769 6.766 6.769h49.173c4.493 0 6.769-2.21 6.769-6.769V7.793c.001-4.634-2.275-7.074-6.909-7.074M30.749 23.374c0 1.536-1.399 3.181-3.215 3.181V52.49c0 3.682-5.018 3.682-5.018 0V26.555c-1.767 0-3.306-1.361-3.306-3.4V8.882c0-1.242 1.795-1.29 1.795.049v10.55h1.503V8.833c0-1.141 1.729-1.214 1.729.049v10.599h1.553V8.848c0-1.193 1.678-1.241 1.678.047v10.586h1.528V8.848c0-1.18 1.753-1.227 1.753.047zm13.386 29.104c0 3.601-5.028 3.547-5.028 0V36.496H36.43V12.199c0-5.656 7.706-5.656 7.706 0v40.279z" />
                    </svg>}
                    menuTitle="More Food"
                    links={MoreClubLinks}
                  >
                    <li>
                      <NavLink to={"/Resturant"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
                          <circle cx="256" cy="256" r="48" fill="currentColor" />
                          <path fill="currentColor" d="m470.39 300l-.47-.38l-31.56-24.75a16.11 16.11 0 0 1-6.1-13.33v-11.56a16 16 0 0 1 6.11-13.22L469.92 212l.47-.38a26.68 26.68 0 0 0 5.9-34.06l-42.71-73.9a1.6 1.6 0 0 1-.13-.22A26.86 26.86 0 0 0 401 92.14l-.35.13l-37.1 14.93a15.94 15.94 0 0 1-14.47-1.29q-4.92-3.1-10-5.86a15.94 15.94 0 0 1-8.19-11.82l-5.59-39.59l-.12-.72A27.22 27.22 0 0 0 298.76 26h-85.52a26.92 26.92 0 0 0-26.45 22.39l-.09.56l-5.57 39.67a16 16 0 0 1-8.13 11.82a175 175 0 0 0-10 5.82a15.92 15.92 0 0 1-14.43 1.27l-37.13-15l-.35-.14a26.87 26.87 0 0 0-32.48 11.34l-.13.22l-42.77 73.95a26.71 26.71 0 0 0 5.9 34.1l.47.38l31.56 24.75a16.11 16.11 0 0 1 6.1 13.33v11.56a16 16 0 0 1-6.11 13.22L42.08 300l-.47.38a26.68 26.68 0 0 0-5.9 34.06l42.71 73.9a1.6 1.6 0 0 1 .13.22a26.86 26.86 0 0 0 32.45 11.3l.35-.13l37.07-14.93a15.94 15.94 0 0 1 14.47 1.29q4.92 3.11 10 5.86a15.94 15.94 0 0 1 8.19 11.82l5.56 39.59l.12.72A27.22 27.22 0 0 0 213.24 486h85.52a26.92 26.92 0 0 0 26.45-22.39l.09-.56l5.57-39.67a16 16 0 0 1 8.18-11.82c3.42-1.84 6.76-3.79 10-5.82a15.92 15.92 0 0 1 14.43-1.27l37.13 14.95l.35.14a26.85 26.85 0 0 0 32.48-11.34a3 3 0 0 1 .13-.22l42.71-73.89a26.7 26.7 0 0 0-5.89-34.11m-134.48-40.24a80 80 0 1 1-83.66-83.67a80.21 80.21 0 0 1 83.66 83.67" />
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
                  {user.isSuperAdmin && (   
                  <li>
                    <NavLink to={"/station"}>
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
                      &nbsp; Setup Station 
                    </NavLink>
                  </li>
                  )}
                   
                  </SidebarDropDownMenu>
                }
                {business.businessProfile.business_types?.some(type => type.name === "Saloon") &&
                  <SidebarDropDownMenu
                    menuIcon={"bi-scissors"}
                    menuTitle="More Salon"
                    links={MoreClubLinks}
                  >
                    <li>
                      <NavLink to={"/saloon"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
                          <circle cx="256" cy="256" r="48" fill="currentColor" />
                          <path fill="currentColor" d="m470.39 300l-.47-.38l-31.56-24.75a16.11 16.11 0 0 1-6.1-13.33v-11.56a16 16 0 0 1 6.11-13.22L469.92 212l.47-.38a26.68 26.68 0 0 0 5.9-34.06l-42.71-73.9a1.6 1.6 0 0 1-.13-.22A26.86 26.86 0 0 0 401 92.14l-.35.13l-37.1 14.93a15.94 15.94 0 0 1-14.47-1.29q-4.92-3.1-10-5.86a15.94 15.94 0 0 1-8.19-11.82l-5.59-39.59l-.12-.72A27.22 27.22 0 0 0 298.76 26h-85.52a26.92 26.92 0 0 0-26.45 22.39l-.09.56l-5.57 39.67a16 16 0 0 1-8.13 11.82a175 175 0 0 0-10 5.82a15.92 15.92 0 0 1-14.43 1.27l-37.13-15l-.35-.14a26.87 26.87 0 0 0-32.48 11.34l-.13.22l-42.77 73.95a26.71 26.71 0 0 0 5.9 34.1l.47.38l31.56 24.75a16.11 16.11 0 0 1 6.1 13.33v11.56a16 16 0 0 1-6.11 13.22L42.08 300l-.47.38a26.68 26.68 0 0 0-5.9 34.06l42.71 73.9a1.6 1.6 0 0 1 .13.22a26.86 26.86 0 0 0 32.45 11.3l.35-.13l37.07-14.93a15.94 15.94 0 0 1 14.47 1.29q4.92 3.11 10 5.86a15.94 15.94 0 0 1 8.19 11.82l5.56 39.59l.12.72A27.22 27.22 0 0 0 213.24 486h85.52a26.92 26.92 0 0 0 26.45-22.39l.09-.56l5.57-39.67a16 16 0 0 1 8.18-11.82c3.42-1.84 6.76-3.79 10-5.82a15.92 15.92 0 0 1 14.43-1.27l37.13 14.95l.35.14a26.85 26.85 0 0 0 32.48-11.34a3 3 0 0 1 .13-.22l42.71-73.89a26.7 26.7 0 0 0-5.89-34.11m-134.48-40.24a80 80 0 1 1-83.66-83.67a80.21 80.21 0 0 1 83.66 83.67" />
                        </svg>
                        &nbsp; Setup Salon
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to={"/moresaloon"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                          <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                            <path d="M6 2C5 5 7 5 6 8m4-6c-1 3 1 3 0 6" />
                            <circle cx="4" cy="20" r="2" />
                            <path d="M5.4 18.6L8 16m2.8-2.8L14 10" />
                            <circle cx="12" cy="20" r="2" />
                            <path d="m2 10l8.6 8.6M18 2h2a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-2m0-16h4m-4 4h4m-4 4h4m-4 4h4" />
                          </g>
                        </svg>
                        &nbsp; More Salon
                      </NavLink>
                    </li>
                  </SidebarDropDownMenu>
                }
              </>
            {/* )} */}
          </>
        )}
      </ul>

    </div>
  );
};

export default HeaderDashboardMenu;
