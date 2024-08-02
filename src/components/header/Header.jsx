import { useState } from "react";
import { Link } from "react-router-dom";

import useStickyHeader from "./StickyHeader";
// import NotificationData from "../../../data/dashboard/notification-data.json";
import HeaderMenu from "./HeaderMenu";
import { useSelector } from "react-redux";
import ThemeToggler from "./themeToggler";

const Header = () => {
  let [check] = useState(true);
  const sticky = useStickyHeader(10);
  const stickyClass = `${sticky && check ? "sticky-on" : ""}`;

  const [isActive, setActive] = useState(false);
  const metainfo = useSelector((state) => state.metaReducer);

  const handleToggle = () => {
    setActive(!isActive);
  };

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
                <div className="admin-logo me-2 me-sm-3">
                  <Link className="d-block" to="/">
                    <img
                      className="nav-light-logo"
                      src={`${metainfo.meta?.black_logo}`}
                      alt="Light"
                      style={{ width: "auto", height: "70px" }}
                    />
                    <img
                      className="nav-dark-logo"
                      src={`${metainfo.meta?.white_logo}`}
                      alt="Dark"
                      style={{ width: "auto", height: "70px" }}
                    />
                  </Link>
                  {/* <Link className="d-block" to="/dashboard" >
                  <img src={BrandBlackLogo} alt="" style={{ width: "70px" }} className="light-visible position-absolute"/>
                </Link> */}
                </div>
              </div>

              {/* Search Form */}
              {/* <Link to="/" className="">
                <h3>More Club</h3>
              </Link> */}
              {/* <div className="search-form">
                <Form
                  className="position-relative d-flex align-items-center"
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Search"
                  />
                  <button className="position-absolute" type="submit">
                    <i className="bi bi-search" />
                  </button>
                </Form>
              </div> */}
            </div>

            {/* Header Meta */}
            <HeaderMenu />
            <div className="header-meta d-flex align-items-center">
              {/* User Dropdown */}
              {/* <Dropdown className="user-dropdown">
                <Dropdown.Toggle className="user-btn" id="userDropdown">
                  <img
                    src={`${process.env.PUBLIC_URL}/img/core-img/user.png`}
                    alt=""
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu className="mt-3" align="end">
                  {userDropdownList}
                </Dropdown.Menu>
              </Dropdown> */}
              {/* <Dropdown className="user-dropdown">
                <a href="/login">
                  <Dropdown.Toggle className="user-btn" id="userDropdown">
                    <i className="bi bi-box-arrow-in-right" />
                  </Dropdown.Toggle>
                </a>
              </Dropdown> */}

              {/* Menu Toggler */}

              {/* Button */}
              <ThemeToggler />
              <a
                className="btn btn-sm btn-primary rounded-pill ms-2 ms-sm-3 d-none d-sm-block"
                href="/login"
              >
                <i className="bi bi-box-arrow-in-right me-1" />
                Sign In
              </a>
              <Link
                className="btn btn-sm btn-danger rounded-pill ms-2 ms-sm-3 d-none d-sm-block"
                to="/register-membership"
              >
                <i className="bi bi-eye me-1" />
                Join Us
              </Link>
              <div className="menu-toggler ms-1 ms-sm-3" onClick={handleToggle}>
                <i className="bi bi-list" />
              </div>
            </div>
          </div>
        </nav>
      </header>
      {isActive && (
        <div
          className="sidebar-overlay"
          onClick={() => {
            isActive && handleToggle();
          }}
        >
          <div
            className={`header-sidebar-wrap ${
              isActive ? "sidebar-active" : "sidebar-disabled"
            }`}
          >
            <div className="overflowY-scroll ">
              {/* Sidenav */}
              <div className="sidenav d-flex flex-column gap-3">
                <Link
                  id="Home"
                  aria-expanded="false"
                  role="button"
                  className=" nav-link text-dynamic-white"
                  tabindex="0"
                  to="/"
                >
                  Home
                </Link>

                <Link
                  id="About"
                  aria-expanded="false"
                  role="button"
                  className=" nav-link text-dynamic-white"
                  tabindex="1"
                  to="/about"
                >
                  About
                </Link>

                <Link
                  id="Event"
                  aria-expanded="false"
                  role="button"
                  className="nav-link text-dynamic-white"
                  tabindex="3"
                  to="/event"
                >
                  Event
                </Link>

                <Link
                  id="Products"
                  aria-expanded="false"
                  role="button"
                  className="nav-link text-dynamic-white"
                  tabindex="4"
                  to="/products"
                >
                  Our Products
                </Link>

                <Link
                  id="Partners"
                  aria-expanded="false"
                  role="button"
                  className="nav-link text-dynamic-white"
                  tabindex="5"
                  to="/partners"
                >
                  Our Partners
                </Link>
                <Link
                  id="Partners"
                  aria-expanded="false"
                  role="button"
                  className="nav-link text-dynamic-white btn btn-sm btn-danger rounded-pill ms-2 ms-sm-3 text-white"
                  tabindex="6"
                  to="/login"
                >
                  Sign In
                </Link>
                <Link
                  id="Partners"
                  aria-expanded="false"
                  role="button"
                  className="nav-link text-dynamic-white btn btn-sm btn-primary rounded-pill ms-2 ms-sm-3 text-white"
                  tabindex="7"
                  to="/register-membership"
                >
                  Join Us
                </Link>

                {/* <div className="ft-dd nav-item ">
                  <a
                    id="Pages"
                    aria-expanded="false"
                    role="button"
                    class="dropdown-toggle nav-link text-dynamic-white"
                    tabindex="0"
                    to="#"
                  >
                    Pages
                  </a>
                </div> */}
                {/* <a class="" href="/help-center">
                  Help Center
                </a> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
