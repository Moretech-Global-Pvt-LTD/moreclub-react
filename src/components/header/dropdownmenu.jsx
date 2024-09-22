import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {  useLocation } from "react-router-dom";

const SidebarDropDownMenu = ({
  menuTitle,
  menuSvg,
  menuIcon,
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
    <div className={`sidebar-dropdown-item ${isOpen ? "open" : ""}`}>
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
        >
          {menuSvg ? menuSvg : <i className={`bi ${menuIcon}`} />}
          &nbsp;&nbsp;&nbsp;{menuTitle}
        </h6>
        {isOpen ? (
          <i class="bi bi-caret-up-fill"></i>
        ) : (
          <i class="bi bi-caret-down-fill"></i>
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
