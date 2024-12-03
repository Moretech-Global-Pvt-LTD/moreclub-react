import React from "react";
import Select from "react-select";
import moment from "moment-timezone";

const TimezoneSelector = ({ selectedTimezone, onTimezoneChange }) => {
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
        styles={{ background: "transparent" }}
        options={timezones}
        value={timezones.find((tz) => tz.value === selectedTimezone)}
        onChange={(selectedOption) => onTimezoneChange(selectedOption.value)}
        placeholder="select a timezone"
        isClearable
      />
    </div>
  );
};

export default TimezoneSelector;
