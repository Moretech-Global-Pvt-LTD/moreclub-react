import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import debounce from 'lodash.debounce';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const FilterComponent = ({ OrderStatusTypes, OrderTypes }) => {
    const navigate = useNavigate();
    const location = useLocation();

    // Parse query parameters from the URL
    const queryParams = new URLSearchParams(location.search);
    const initialSearch = queryParams.get('search') || '';
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

    return (
        // <Form className="row  mb-3">
        //     <div className='col-12'>
        //         <div className='d-flex flex-wrap justify-content-between'>
        //             <div className='d-flex mb-3'>
        //                 <div className='d-flex position-relative'>
        //                     <Form.Control
        //                         type="text"
        //                         placeholder="Search by Order ID or Name "
        //                         value={searchInput}
        //                         onChange={(e) => setSearchInput(e.target.value)} // Track input locally
        //                         className="me-2 position-relative "
        //                         style={{ width: '250px' }}
        //                     />
        //                     {searchInput && <Button onClick={handleSearchClearButtonClick} size='sm' variant="secondary" className="me-2 position-absolute " style={{ top: '50%', right: '10px', transform: 'translateY(-50%)' }}>X</Button>}
        //                 </div>
        //                 <Button onClick={handleSearchButtonClick} size='sm' className="me-2">Search</Button>
        //             </div>
        //             <div className='d-flex mb-3'>
        //                 <Form.Select
        //                     value={orderStatus}
        //                     onChange={(e) => { setOrderStatus(e.target.value); handleOderStatusChange(e.target.value) }}
        //                     className="me-2"
        //                 >
        //                     <option value="">Select Order Status</option>
        //                     {OrderStatusTypes &&
        //                         OrderStatusTypes.map((option) => (
        //                             <option value={option}>{option}</option>
        //                         ))

        //                     }
        //                     {!OrderStatusTypes
        //                         &&
        //                         <>
        //                             <option value="Pending">Pending</option>
        //                             <option value="Cooked">Cooked</option>
        //                             <option value="Delivered">Delivered</option>
        //                             <option value="Cancelled">Cancelled</option>
        //                         </>
        //                     }
        //                 </Form.Select>
        //                 <Form.Select
        //                     value={orderType}
        //                     onChange={(e) => {setOrderType(e.target.value); handleOdertypeChange(e.target.value) }}
        //                     className="me-2"
        //                 >
        //                     <option value="">Select Order Type</option>
        //                     {OrderTypes &&
        //                         OrderTypes.map((option) => (
        //                             <option value={option}>{option}</option>
        //                         ))

        //                     }
        //                     {!OrderTypes
        //                         &&
        //                         <>
        //                         <option value="dine-here">Dine Here</option>
        //                         <option value="packed">Packed</option>
        //                         <option value="takeaway">Takeaway</option>
        //                         </>
        //                     }
                            
        //                 </Form.Select>
        //             </div>

        //         </div>

        //     </div>
        //     <div className='d-flex flex-wrap mb-3 align-items-center justify-content-between'>
        //     <div className='d-flex'>
        //         <Button onClick={() => handleDateFilter('today')} size='sm' variant={moment().format('YYYY-MM-DD') === filterDate ? 'warning' : 'primary'} className="me-2">Today</Button>
        //         <Button onClick={() => handleDateFilter('tomorrow')} size='sm' variant={moment().add(1, 'day').format('YYYY-MM-DD') === filterDate ? 'warning' : 'primary'} className="me-2">Tomorrow</Button>
        //         {/* <Form.Control
        //             type="date"
        //             value={filterDate}
        //             onChange={(e) => {
        //                 setFilterDate(e.target.value);
        //                 updateUrlParams(searchQuery, e.target.value);
        //             }}
        //             className="me-2"
        //         /> */}
        //         <DatePicker dateFormat={"yyyy-MM-dd"} selected={filterDate} onChange={(date) => {
        //             if (date) {
        //                 const formattedDate = moment(date).format('YYYY-MM-DD');
        //                 setFilterDate(formattedDate);
        //                 updateUrlParams(searchQuery, formattedDate);
        //             } }}
        //             customInput={<Form.Control type="text"  className="me-2" />}
        //         />
                
        //         </div>
        //         <div className='d-flex my-2'>
        //             <Button onClick={clearFilters} variant="danger" size='sm'>Clear</Button>
        //         </div>
        //     </div>
        // </Form>
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
      </div>

      {/* Date Filter Section */}
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
        <Button type="button" variant='danger' onClick={clearFilters} className="clear-filters-btn">
          Clear
        </Button>
      </div>
    </Form>
    );
};

export default FilterComponent;
