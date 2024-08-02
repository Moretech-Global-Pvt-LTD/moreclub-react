import React, { useState } from "react";
import useStickyHeader from "./StickyHeader";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ThemeToggler from "./themeToggler";
import Navbutton from "./Navbutton";
import Logos from "./Logos";

const UniverslNavbar = () => {
  let [check] = useState(true);
  const sticky = useStickyHeader(10);
  const stickyClass = `${sticky && check ? "sticky-on" : ""}`;

  const [isActive, setActive] = useState(false);
  const metainfo = useSelector((state) => state.metaReducer);

  const handleToggle = () => {
    setActive(!isActive);
  };

  return (
    <header
      className={`header-area ${stickyClass} navbar-header dashboard-header px-0 px-sm-0 `}
    >
      <nav className="container">
        <div className="w-100 d-flex justify-content-between border-0">
          <div className="d-flex align-items-center">
            {/* Brand Logo */}
            <Logos link={"/"} />
          </div>

          <div className="header-meta d-flex align-items-center">
            <ThemeToggler />
            <Navbutton signin={true} />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default UniverslNavbar;
