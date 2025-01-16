import React from "react";
import Saloonlayout from "../setup/Saloonlayout";
import OpeningHoursForm from "../../../../components/Moreclub/CommonComponents/OpeningHourForms";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { moresalonAuthenticatedAxios } from "../../../../utills/axios/moresalonaxios";

const WorkinghourPage = () => {
  const { id } = useParams();

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["openingHours", id],
    queryFn: async () => {
      const response = await moresalonAuthenticatedAxios.get(
        `moreclub/users/saloons/${id}/opening/hours/`
      );
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
    const updatedOpeningHours = Object.entries(openingHours).reduce(
      (acc, [day, data]) => {
        acc[day] = {
          ...data,
          start_time: data.is_open ? data.start_time : "00:00:00",
          end_time: data.is_open ? data.end_time : "00:00:00",
        };
        queryClient.invalidateQueries({
          queryKey: ["openingHours", id],
        });
        return acc;
      },
      {}
    );
    try {
      const res = await moresalonAuthenticatedAxios.post(
        `moreclub/users/saloons/${id}/opening/hours/`,
        updatedOpeningHours
      );
      queryClient.invalidateQueries({
        queryKey: ["openingHours", id],
      });
      return res;
    } catch (err) {
      return err.response;
    }
  };

  const UpdateWorkingData = async (openingHours) => {
    const updatedOpeningHours = Object.entries(openingHours).reduce(
      (acc, [day, data]) => {
        acc[day] = {
          ...data,
          start_time: data.is_open ? data.start_time : "00:00:00",
          end_time: data.is_open ? data.end_time : "00:00:00",
        };
        return acc;
      },
      {}
    );

    try {
      const res = await moresalonAuthenticatedAxios.patch(
        `moreclub/users/saloons/${id}/opening/hours/`,
        updatedOpeningHours
      );
      return res;
    } catch (err) {
      return err.response;
    }
  };

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const result = daysOfWeek.map((day) => {
    const preloadedDay = data.find((data) => data.day_of_week === day);
    return (
      preloadedDay || {
        day_of_week: day,
        start_time: "",
        end_time: "",
        is_open: false,
      }
    );
  });

  return (
    <Saloonlayout>
      <Row>
        <Col xs={12} lg={8} xl={10} xxl={10}>
          {data && data.length > 0 && (
            <OpeningHoursForm
              existingdata={result}
              submitFunction={UpdateWorkingData}
            />
          )}
          {data && data.length <= 0 && (
            <OpeningHoursForm submitFunction={logFormData} />
          )}
        </Col>
      </Row>
    </Saloonlayout>
  );
};

export default WorkinghourPage;
