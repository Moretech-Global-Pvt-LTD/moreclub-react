import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const HeaderDashboardMenu = () => {
  const user = useSelector((state) => state.userReducer);
  const business = useSelector((state) => state.businessReducer);
  const permisions = useSelector((state) => state.permissionReducer);
  // const wallet = useSelector((state)=>state.walletReducer);

  return (
    <div className="sidenav pb-5">
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
      </ul>
      {user.user?.user_type !== "NORMAL" && (
        <>
          {business.businessProfile.is_verified && (
            <ul>
              <li>Business Menu </li>
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
                  {/* <i className={`bi bi-building`} /> */}
                  Business Events
                </NavLink>
              </li>

              {/* {permisions.permission &&
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
            )} */}

              {/* {BusinessNav.map((elem, index) => (
          <li key={index}>
            <NavLink to={elem.path}>
              <i className={`bi ${elem.icon}`} />
              {elem.text}
            </NavLink>
          </li>
        ))} */}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default HeaderDashboardMenu;
