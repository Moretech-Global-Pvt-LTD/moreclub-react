import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useQueryClient } from "@tanstack/react-query";

const NetworkLeadFilter = ({
  invalidatekey,
  showDateFilter = true,
  children,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  // Parse query parameters from the URL
  const queryParams = new URLSearchParams(location.search);
  const initialSearch = queryParams.get("q") || "";
  const initialStartDate = queryParams.get("date_from") || null;
  const initialEndDate = queryParams.get("date_to") || null;

  const formatedInitialStartDate = initialStartDate
    ? new Date(initialStartDate).toISOString()
    : null;
  const formatedInitialEndDate = initialEndDate
    ? new Date(initialEndDate).toISOString()
    : null;

  const initialLimit = queryParams.get("limit") || "";
  const initialTime = queryParams.get("time") || "";

  const [searchInput, setSearchInput] = useState(initialSearch);

  const [searchQuery, setSearchQuery] = useState(initialSearch);

  const [startDate, setStartDate] = useState(formatedInitialStartDate);
  const [endDate, setEndDate] = useState(formatedInitialEndDate);

  const [filterTime, setFilterTime] = useState(initialTime);
  const [limit, setLimit] = useState(initialLimit);

  const handleSearchButtonClick = () => {
    updateUrlParams(searchInput, [startDate, endDate], limit);
  };

  const handleSearchClearButtonClick = () => {
    setSearchInput("");
    updateUrlParams("", [startDate, endDate], limit);
  };

  const handlelimitChange = (limits) => {
    updateUrlParams(searchInput, [startDate, endDate], limits, filterTime);
  };

  const handlefilterTimeChange = (time) => {
    updateUrlParams(searchInput, [startDate, endDate], limit, time);
  };

  const handleStartChange = (date) => {
    setStartDate(date);
    if (endDate) {
      updateUrlParams(searchInput, [date, endDate], limit, filterTime);
    }
  };

  const handleEndChange = (date) => {
    setEndDate(date);
    if (startDate) {
      updateUrlParams(searchInput, [startDate, date], limit, filterTime);
    }
  };

  const updateUrlParams = (search, date, limit, time) => {
    const newParams = new URLSearchParams();
    if (search) newParams.append("q", search);
    if (limit) newParams.append("limit", limit);
    if (time) newParams.append("time", time);
    if (date) {
      if (date[0]) {
        const startedDate = date[0]
          ? moment(date[0]).format("YYYY-MM-DD")
          : null;
        newParams.append("date_from", startedDate);
      }
      if (date[1]) {
        const endDate = date[1] ? moment(date[1]).format("YYYY-MM-DD") : null;
        newParams.append("date_to", endDate);
      }
    }

    navigate({ search: `?${newParams.toString()}` });
  };

  const clearFilters = () => {
    setSearchQuery("");
    setStartDate(null);
    setEndDate(null);
    setFilterTime("");
    setLimit("");
    navigate({ search: "" });
  };

  const handleRefresh = () => {
    queryClient.invalidateQueries({
      queryKey: invalidatekey,
    });
  };

  return (
    <>
      <Form className="network-filter-form mt-2">
        {/* Search Input Section */}
        
          <Form.Group>
          <Form.Label>Search</Form.Label>
          <div className="network-filter-item network-search-section">
          <Form.Control
            type="text"
            placeholder="Search..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="search-input"
          />
          {searchInput && (
            <Button
              type="button"
              onClick={handleSearchClearButtonClick}
              className="clear-btn"
            >
              X
            </Button>
          )}
          <Button onClick={handleSearchButtonClick} size="sm" className="me-2">
            Search
          </Button>
          </div>
          </Form.Group>
        

        {/* Order Status and Order Type Select */}
        <div className="filter-item select-section">
          <Form.Group>
          <Form.Label>Limit per page</Form.Label>
          <Form.Select
            value={limit}
            onChange={(e) => {
              setLimit(e.target.value);
              handlelimitChange(e.target.value);
            }}
            className="order-status-select"
            style={{ width: "75px" }}
          >
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="250">250</option>
            <option value="500">500</option>
            <option value="1000">1000</option>
          </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>By Time</Form.Label>
          <Form.Select
            value={filterTime}
            onChange={(e) => {
              setFilterTime(e.target.value);
              handlefilterTimeChange(e.target.value);
            }}
            className="order-status-select"
            style={{ width: "200px" }}
          >
            <option value="">Select Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </Form.Select>
          </Form.Group>
        </div>

        {/* Date Filter Section */}
        {showDateFilter && (
          <div className="filter-item date-filter-section">
            <Form.Group className="d-flex flex-column">
            <Form.Label>From</Form.Label>
            <DatePicker
              showIcon
              dateFormat={"yyyy-MM-dd"}
              placeholderText="Start Date"
              selected={startDate ? new Date(startDate) : null}
              onChange={(date) => {
                if (date) {
                  const formattedDate = moment(date).format("YYYY-MM-DD");
                  handleStartChange(formattedDate);
                }
              }}
              maxDate={new Date()}
              customInput={
                <Form.Control
                  type="text"
                  className="date-input"
                  placeholder="Select date"
                  style={{ width: "134px" }}
                />
              }
            />
            </Form.Group>
            <Form.Group className="d-flex flex-column">
            <Form.Label>To</Form.Label>
            <DatePicker
              showIcon
              placeholderText="End Date"
              dateFormat={"yyyy-MM-dd"}
              selected={endDate ? new Date(endDate) : null}
              onChange={(date) => {
                if (date) {
                  const formattedDate = moment(date).format("YYYY-MM-DD");
                  handleEndChange(formattedDate);
                }
              }}
              minDate={new Date(startDate)}
              maxDate={new Date()}
              customInput={
                <Form.Control
                  type="text"
                  className="date-input"
                  placeholder="Select date"
                  style={{ width: "134px" }}
                />
              }
            />
            </Form.Group>
          </div>
        )}
      </Form>
      <div className="d-flex gap-2 align-items-center justify-content-between mt-2 mb-2">
        <div className="d-flex gap-2 align-items-center">
          {(limit || startDate || endDate || filterTime) && (
            <Button
              type="button"
              size="sm"
              variant="danger"
              onClick={clearFilters}
              className="clear-filters-btn"
            >
              Clear filter
            </Button>
          )}
          {/* <Button
      type="button"
          size="sm"
          variant="secondary"
          onClick={handleRefresh}
          className="clear-filters-btn"
     >
      <i class="bi bi-arrow-repeat"></i> Refresh
    </Button> */}
        </div>
        {children}
      </div>
    </>
  );
};

export default NetworkLeadFilter;
