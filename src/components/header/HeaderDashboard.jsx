import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Dropdown from "react-bootstrap/Dropdown";
import useStickyHeader from "./StickyHeader";
// import NotificationData from "../../../data/dashboard/notification-data.json";
import BrandLogo from "../../images/logo/MembersClubWhite.png";
import BrandBlackLogo from "../../images/logo/MembersClubblack.png";
import { useDispatch, useSelector } from "react-redux";
import { imageURL } from "../../config/config";
import { logout } from "../../redux/api/loginAPI";
import { getWallet } from "../../redux/api/wallets";
import DropNotificationContent from "../Notifications/DropNotificationContent";
import HeaderDashboardMenu from "./HeaderDashboardMenu";
import HeaderUserInfo from "./HeaderUserInfo";
import ThemeToggler from "./themeToggler";

const HeaderDashboard = () => {
  let [check] = useState(true);
  const sticky = useStickyHeader(10);
  const stickyClass = `${sticky && check ? "sticky-on" : ""}`;

  const [isActive, setActive] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const wallet = useSelector((state) => state.walletReducer);

  const currency = useSelector((state) => state.currencyReducer.currencyDetail);

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

  // const notificationCards = NotificationData.slice(0, 4).map((elem, index) => (
  //     <li key={index}>
  //         <Link className="dropdown-item" to={`/notification-details/${elem.id}`} >
  //             <i className={`me-2 bg-${elem.icon[0].color} bi ${elem.icon[0].icon}`} />
  //             {elem.notification}
  //         </Link>
  //     </li>
  // ))

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
                    className="nav-light-logo"
                    src={BrandBlackLogo}
                    alt="Light"
                    style={{ width: "auto", height: "60px" }}
                  />
                  <img
                    className="nav-dark-logo"
                    src={BrandLogo}
                    alt="Dark"
                    style={{ width: "auto", height: "60px" }}
                  />
                </Link>
              </div>
            </div>
            {/* <center>
              <HeaderMenu/>
              
            </center> */}

            {/* Header Meta */}
            <div className="header-meta d-flex align-items-center  ">
              <ThemeToggler />
              <Link
                className="btn btn-sm btn-danger rounded-pill me-2 me-sm-3 "
                to="/wallet"
              >
                <span className="fs-6 fw-bold">{currency.symbol}&nbsp;</span>
                <span className="fs-6 fw-bold ">
                  {wallet.wallet?.balance ?? "0.00"}
                </span>
              </Link>

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
                    className="user-btn"
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
          <HeaderDashboardMenu />
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
            <div className="overflowY-scroll  ">
              <HeaderUserInfo />
              <HeaderDashboardMenu />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HeaderDashboard;
