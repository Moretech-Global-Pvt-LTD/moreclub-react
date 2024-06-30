import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./pagination.css";

const CustomPagination = ({ totalPages, totalItems, itemsPerPage }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = parseInt(searchParams.get("page")) || 1;
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  }, [location.search]);

  // const handlePaginationClick = (page) => {
  //     setCurrentPage(page);
  //     const searchParams = new URLSearchParams(location.search);
  //     searchParams.set('page', page);
  //     const newPath = `${location.pathname}?${searchParams.toString()}`;
  //     navigate(newPath, { replace: true });
  // };
  const handlePaginationClick = (page) => {
    const totalPages = calculateTotalPages();
    const newPage = Math.min(Math.max(page, 1), totalPages);
    setCurrentPage(newPage);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", newPage);
    const newPath = `${location.pathname}?${searchParams.toString()}`;
    navigate(newPath, { replace: true });
  };

  const calculateTotalPages = () => {
    if (totalPages) {
      return totalPages;
    }
    if (totalItems && itemsPerPage) {
      return Math.ceil(totalItems / itemsPerPage);
    }
    return 1;
  };

  const getPageNumbers = () => {
    const maxPagesToShow = 3; // Adjust as needed
    const pages = [];
    const totalPages = calculateTotalPages();
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
      let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
      if (endPage - startPage < maxPagesToShow) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
      }
      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) {
          pages.push("...");
        }
      }
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push("...");
        }
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    

    <ul className={`custom-pagination ${totalPages === 1 ? "custom-pagination-hidden" : ""} ${totalItems === 0 ? "custom-pagination-hidden":""} `}>
      <li className={`custom-page-item `}>
        <span
          className={`custom-page-link navigation-button ${currentPage === 1 ? "disabled" : ""}`}
          onClick={() => handlePaginationClick(currentPage - 1)}
        >
          <i class="bi bi-caret-left-fill"></i>
        </span>
      </li>
      {getPageNumbers().map((page, index) => (
        <li
          key={index}
          className={`custom-page-item ${
            page === currentPage ? "page-active" : ""
          }`}
        >
          <span
            className={`custom-page-link ${
              page === currentPage ? "page-active" : ""
            }`}
            onClick={() => handlePaginationClick(page)}
          >
            {page}
          </span>
        </li>
      ))}
      <li
        className={`custom-page-item ${
          currentPage === calculateTotalPages() ? "disabled" : ""
        }`}
      >
        <span
          className={`custom-page-link navigation-button ${currentPage === calculateTotalPages() ? "disabled" : ""}`}
          onClick={() => handlePaginationClick(currentPage + 1)}
        >
          <i class="bi bi-caret-right-fill"></i>
        </span>
      </li>
    </ul>
    
  );
};

export default CustomPagination;
