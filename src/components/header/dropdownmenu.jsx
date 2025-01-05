import React, { useState, useEffect } from "react";
import {  useLocation } from "react-router-dom";

const SidebarDropDownMenu = ({
  menuTitle,
  menuSvg,
  menuIcon,
  darkIcon,
  lightIcon,
  links,
  children,

  
}) => {
  const [isOpen, setIsOpen] = useState(false);


  const handleMenuClick = (event) => {
   
    setIsOpen(!isOpen);
  };

  const location = useLocation();
  useEffect(() => {
    const isAnyLinkActive = links.some((link) => location.pathname === link.to);
    if (isAnyLinkActive) {
    
      setIsOpen(true);
    }
  }, [location, links, menuTitle, isOpen]);

  return (
    <div className={`sidebar-dropdown-item ${isOpen ? "open " : ""}`}>
      <div
        className="sidebar-dropdown-header d-flex justify-content-between mb-0"
        onClick={handleMenuClick}
      >
        <h6
          classname={`fw-normal ${
            !!links.some((link) => location.pathname === link.to)
              ? "text-danger"
              : ""
          }`}
          style={{ marginBottom: isOpen ? "10px" : "0px" }}
        >
          <img
              src={darkIcon}
              alt={menuTitle}
              className="me-2 small-dashboard-icon menu-icon dark-logo dashboard-menus-dark-icon"
            />
            <img
            src={lightIcon}
            alt={menuTitle}
            className="me-2 small-dashboard-icon menu-icon dashboard-menus-light-icon"
          />
          {/* {menuSvg ? menuSvg : <i className={`bi ${menuIcon}`} />} */}
          {menuTitle}
        </h6>
        {isOpen ? (
          <i className="bi bi-caret-up-fill"></i>
        ) : (
          <i className="bi bi-caret-down-fill"></i>
        )}
      </div>
      {isOpen && (
        <ul
          className="sidebar-dropdown-body my-0"
          style={{
            animationDuration: "1s",
            webkitAnimationName: "fadeInDown",
            animationName: "fadeInDown",
          }}
        >
          {children}
        </ul>
      )}
    </div>
  );
};

export default SidebarDropDownMenu;
