import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useQueryClient } from '@tanstack/react-query';

const FilterComponent = ({ OrderStatusTypes, OrderTypes, invalidatekey, showStatus=true, showType=true,  showDateFilter=true  }) => {
    const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

    // Parse query parameters from the URL
    const queryParams = new URLSearchParams(location.search);
    const initialSearch = queryParams.get('q') || '';
    const initialDate = queryParams.get('date') || '';
    const initialOrderStatus = queryParams.get('order_status') || '';
    const initialOrderType = queryParams.get('order_type') || '';

    const [searchInput, setSearchInput] = useState(initialSearch);

    const [searchQuery, setSearchQuery] = useState(initialSearch);
    const [filterDate, setFilterDate] = useState(initialDate);
    const [orderStatus, setOrderStatus] = useState(initialOrderStatus);
    const [orderType, setOrderType] = useState(initialOrderType);

    const handleSearchButtonClick = () => {
        updateUrlParams(searchInput, filterDate, orderStatus, orderType);
    };
    const handleSearchClearButtonClick = () => {
        setSearchInput('');
        updateUrlParams('', filterDate, orderStatus, orderType);
    };

    const handleOderStatusChange = (order_status) => {
        updateUrlParams(searchInput, filterDate, order_status, orderType);
    };
    const handleOdertypeChange = (order_type) => {
        updateUrlParams(searchInput, filterDate, orderStatus, order_type);
    };

    const handleDateFilter = (type) => {
        const selectedDate = type === 'today' ? moment().format('YYYY-MM-DD') :
            type === 'tomorrow' ? moment().add(1, 'day').format('YYYY-MM-DD') :
                '';
        setFilterDate(selectedDate);
        updateUrlParams(searchInput, selectedDate, orderStatus, orderType);
    };

    const updateUrlParams = (search, date, status, type) => {
        const newParams = new URLSearchParams();
        if (search) newParams.append('q', search);
        if (date) newParams.append('date', date);
        if (status) newParams.append('order_status', status);
        if (type) newParams.append('order_type', type);
        navigate({ search: `?${newParams.toString()}` });
    };

    const clearFilters = () => {
        setSearchQuery('');
        setFilterDate('');
        setOrderStatus('');
        setOrderType('');
        navigate({ search: '' });
    };
  
  const handleRefresh = () => {
    queryClient.invalidateQueries({
      queryKey: invalidatekey,
    });
  };

    return (
        <Form className="filter-form">
      {/* Search Input Section */}
      <div className="filter-item search-section">
        <Form.Control
          type="text"
          placeholder="Search by Order ID or Name"
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
        <Button onClick={handleSearchButtonClick} size='sm' className="me-2">Search</Button>
      </div>

      {/* Order Status and Order Type Select */}
      <div className="filter-item select-section">
          {showStatus && (
            
          <Form.Select
          value={orderStatus}
          onChange={(e) => {
            setOrderStatus(e.target.value);
            handleOderStatusChange(e.target.value);
          }}
          className="order-status-select"
        >
          <option value="">Select Order Status</option>
          {OrderStatusTypes &&
            OrderStatusTypes.map((option) => <option key={option} value={option}>{option}</option>)}
          {!OrderStatusTypes && (
            <>
              <option value="Pending">Pending</option>
              <option value="Cooked">Cooked</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </>
          )}
        </Form.Select>
          )}

          {showType && (
            
        <Form.Select
          value={orderType}
          onChange={(e) => {
            setOrderType(e.target.value);
            handleOdertypeChange(e.target.value);
          }}
          className="order-type-select"
        >
          <option value="">Select Order Type</option>
          {OrderTypes &&
            OrderTypes.map((option) => <option key={option} value={option}>{option}</option>)}
          {!OrderTypes && (
            <>
              <option value="dine-here">Dine Here</option>
              <option value="packed">Packed</option>
              <option value="takeaway">Takeaway</option>
            </>
          )}
        </Form.Select>
          )}
      </div>

        {/* Date Filter Section */}
        {showDateFilter && (
      <div className="filter-item date-filter-section">
        <Button onClick={() => handleDateFilter('today')} size='sm' variant={moment().format('YYYY-MM-DD') === filterDate ? 'warning' : 'primary'} className="me-2">Today</Button>
        <Button onClick={() => handleDateFilter('tomorrow')} size='sm' variant={moment().add(1, 'day').format('YYYY-MM-DD') === filterDate ? 'warning' : 'primary'} className="me-2">Tomorrow</Button>
        {/* <Button
          type="button"
          onClick={() => handleDateFilter('today')}
          className={`date-btn ${moment().format('YYYY-MM-DD') === filterDate ? 'active' : ''}`}
        >
          Today
        </button>
        <button
          type="button"
          onClick={() => handleDateFilter('tomorrow')}
          className={`date-btn ${moment().add(1, 'day').format('YYYY-MM-DD') === filterDate ? 'active' : ''}`}
        >
          Tomorrow
        </button> */}
        <DatePicker
          dateFormat={"yyyy-MM-dd"}
          selected={filterDate ? new Date(filterDate) : null}
          onChange={(date) => {
            if (date) {
              const formattedDate = moment(date).format('YYYY-MM-DD');
              setFilterDate(formattedDate);
              updateUrlParams(searchQuery, formattedDate);
            }
          }}
          customInput={<Form.Control type="text" className="date-input"  placeholder="Select date" />}
        />
        <Button type="button" size='sm' variant='danger' onClick={clearFilters} className="clear-filters-btn">
          Clear
          </Button>
          <Button type="button" size='sm' variant='secondary' onClick={handleRefresh} className="clear-filters-btn">
            <i class="bi bi-arrow-repeat"></i> Refresh
          </Button>
      </div>
        )}
    </Form>
    );
};

export default FilterComponent;
