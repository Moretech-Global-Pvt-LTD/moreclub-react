import React from 'react'
import Saloonlayout from '../setup/Saloonlayout'
import OpeningHoursForm from '../../../../components/Moreclub/CommonComponents/OpeningHourForms';
import { Col, Row } from 'react-bootstrap';
import { moresaloonURL } from '../../../../config/config';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../../../..';
import { useQuery } from '@tanstack/react-query';

const WorkinghourPage = () => {
  const { id } = useParams();



  const { data, isLoading, isError } = useQuery({
    queryKey: ["openingHours", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`${moresaloonURL}moreclub/users/saloons/${id}/opening/hours/`);
      const data = await response.data.data;
      return data;
    },
    staleTime: 100,
  });

  if (isLoading) {
    return <Saloonlayout>Loading...</Saloonlayout>;
  }
  if (isError) {
    return <Saloonlayout>Error</Saloonlayout>;
  }


  const logFormData = async (openingHours) => {
    try {
      const res = await axiosInstance.post(`${moresaloonURL}moreclub/users/saloons/${id}/opening/hours/`, openingHours)
      return res;
    } catch (err) {
      return err.response
    }
  }


  const UpdateWorkingData = async (openingHours) => {
    try {
      const res = await axiosInstance.patch(`${moresaloonURL}moreclub/users/saloons/${id}/opening/hours/`, openingHours)
      return res
    } catch (err) {
      return err.response;
    }
  }

  const daysOfWeek = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];

  const result = daysOfWeek.map(day => {
    const preloadedDay = data.find(data => data.day_of_week === day);
    return preloadedDay || {
        day_of_week: day,
        start_time: "",
        end_time: "",
        is_open: false
    };
});

  return (
    <Saloonlayout>
      <Row>
        <Col xs={12} lg={8} xl={10} xxl={10}>
          {data && data.length > 0 &&
            <OpeningHoursForm existingdata={result} submitFunction={UpdateWorkingData} />
          }
          {data && data.length <= 0 &&
            <OpeningHoursForm submitFunction={logFormData} />
          }
         
        </Col>
      </Row>
    </Saloonlayout>
  )
}

export default WorkinghourPage