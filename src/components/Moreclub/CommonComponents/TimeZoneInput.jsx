import React, { useEffect, useState } from "react";
import Select from "react-select";
import moment from "moment-timezone";
import { useSelector } from "react-redux";

const TimezoneSelector = ({ selectedTimezone, onTimezoneChange }) => {

 const theme = useSelector((state) => state.theme);


  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: 'transparent',
      borderColor: state.isFocused ? '#80bdff' : '#ced4da',
      boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(0,123,255,.25)' : null,
      color: state.isFocused ? '#0056b3' : '#495057', // Change input text color
      '&:hover': {
        borderColor: state.isFocused ? '#80bdff' : '#ced4da',
      },
    
    }),

    menu: (provided) => ({
      ...provided,
      backgroundColor: '#f8f9fa',
      borderRadius: '0.25rem',
      boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? '#007bff'
        : state.isFocused
        ? '#e9ecef'
        : 'white',
      color: state.isSelected ? 'white' : 'black',
      '&:active': {
        backgroundColor: '#007bff',
        color: 'white',
      },
    }),
    input: (provided) => ({
      ...provided,
      color: '#0056b3', // Set the input text color here
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#007bff',
      color: 'white',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: 'white',
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: 'white',
      '&:hover': {
        backgroundColor: '#0056b3',
        color: 'white',
      },
    }),
  };


  // Generate options for timezones
  const timezones = moment.tz.names().map((timezone) => ({
    value: timezone,
    label: timezone,
  }));

  return (
    <div>
      <label htmlFor="timezone-select" className="form-label">
        Select Timezone
      </label>
      <Select
        id="timezone-select"
        styles={customStyles}
        options={timezones}
        value={timezones.find((tz) => tz.value === selectedTimezone)}
        onChange={(selectedOption) => onTimezoneChange(selectedOption.value)}
        placeholder="select a timezone"
      />

    </div>
  );
};

export default TimezoneSelector;
