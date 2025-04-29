import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import './userdashboard/user-dashboard.css';

const UserSidebarDropDownMenu = ({
  menuTitle,
  menuSvg,
  menuIcon,
  darkIcon,
  lightIcon,
  links,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isAnyLinkActive = links.some((link) => location.pathname === link.to);

  useEffect(() => {
    if (isAnyLinkActive) {
      setIsOpen(true);
    }
  }, [location.pathname]);

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`user-dashboard-dropdown ${isOpen ? "open" : ""}`}>
      <div
        className={`user-dashboard-dropdown-header ${isAnyLinkActive ? "user-dashboard-dropdown-header-active" : ""}`}
        onClick={handleMenuClick}
      >
        <div className="user-dashboard-dropdown-title">
          <img
            src={darkIcon}
            alt={menuTitle}
            className="user-dashboard-menu-icon user-dashboard-menu-icon-dark"
          />
          <img
            src={lightIcon}
            alt={menuTitle}
            className="user-dashboard-menu-icon user-dashboard-menu-icon-light"
          />
          {menuTitle}
        </div>
        <i className={`bi ${isOpen ? "bi-caret-up-fill" : "bi-caret-down-fill"}`}></i>
      </div>
      {isOpen && (
        <ul className="user-dashboard-dropdown-body">
          {children}
        </ul>
      )}
    </div>
  );
};

export default UserSidebarDropDownMenu;
