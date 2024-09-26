import React from 'react'
import Saloonlayout from '../setup/Saloonlayout'
import OpeningHoursForm from '../../../../components/Moreclub/CommonComponents/OpeningHourForms';

const WorkinghourPage = () => {
  const logFormData = (openingHours) => {
    console.log('Form data:', openingHours);
  };

  const data = [
    {
      day_name: "Monday",
      "start_time": "08:04",
      "end_time": "07:05",
      "is_open": true
    },
    {
      "day_name": "Tuesday",
      "start_time": "08:04",
      "end_time": "07:05",
      "is_open": true
    },
    {
      "day_name": "Wednesday",
      "start_time": "08:04",
      "end_time": "07:05",
      "is_open": true
    },
    {
      "day_name": "Thursday",
      "start_time": "08:04",
      "end_time": "07:05",
      "is_open": true
    },
    {
      "day_name": "Friday",
      "start_time": "08:04",
      "end_time": "07:05",
      "is_open": true
    },
    {
      "day_name": "Saturday",
      "start_time": "08:04",
      "end_time": "07:05",
      "is_open": true
    },
    {
      "day_name": "Sunday",
      "start_time": "08:04",
      "end_time": "07:05",
      "is_open": true
    }

  ]


  return (
    <Saloonlayout>  {data && data.length > 0 &&
      <OpeningHoursForm existingdata={data} submitFunction={logFormData}/>
    }
      {data && data.length <= 0 &&
        <OpeningHoursForm />
      }</Saloonlayout>
  )
}

export default WorkinghourPage