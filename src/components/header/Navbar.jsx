import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ThemeToggler from "./themeToggler";
import Navbutton from "./Navbutton";

const Navbar = () => {
  const metainfo = useSelector((state) => state.metaReducer);

  return (
    <div className="primary-background">
      <nav className="container">
        <div className="w-100 d-flex justify-content-between border-0">
          <div className="d-flex align-items-center">
            <div className="admin-logo me-2 me-sm-3">
              <div className="admin-logo me-2 me-sm-3 ">
                <Link className="d-flex align-items-center" to="/">
                  <img
                    className="navbar-logo"
                    src={`${metainfo.meta?.white_logo}`}
                    alt="Dark"
                    style={{ maxHeight: "80px" }}
                  />
                  <h4 className="text-white d-none d-sm-block">MORE DEALS CLUB</h4>
                </Link>
              </div>
            </div>
          </div>

          <div className="header-meta d-flex align-items-center">
            <ThemeToggler />
            <Navbutton signin={true} />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
