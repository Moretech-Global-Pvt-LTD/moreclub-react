import React from "react";
import Saloonlayout from "../setup/Saloonlayout";
import { Link, useParams } from "react-router-dom";
import { Button, Col, Placeholder, Row } from "react-bootstrap";

import WorkingdaysContent from "./WorkingdaysContent";
import StaffBookingCalendar from "../../../../components/Moreclub/Saloon/Staff/StaffBookingCalendar";

import { useQuery } from "@tanstack/react-query";

import { moresalonAuthenticatedAxios } from "../../../../utills/axios/moresalonaxios";

const StaffDetailPage = () => {
  const { id, staff_id, staff_name, slug } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: [`Saloon staff appointments ${id} ${staff_id}`],
    queryFn: async () => {
      const response = await moresalonAuthenticatedAxios.get(
        `moreclub/users/saloons/${id}/staff/${staff_id}/appointments/`
      );
      const data = await response.data.data;
      return data;
    },
    staleTime: 100,
  });

  const {
    data: salonWorkingdays,
    isLoading: saloonWorkingloading,
    isError: saloonWorkingError,
  } = useQuery({
    queryKey: ["openingHours", id],
    queryFn: async () => {
      const response = await moresalonAuthenticatedAxios.get(
        `moreclub/users/saloons/${id}/opening/hours/`
      );
      const data = await response.data.data;
      return data;
    },
    staleTime: 240000,
  });

  if (isLoading) {
    return (
      <Saloonlayout>
        <div className="row gap-2">
          <Placeholder as="p" animation="glow" className="rounded my-1 w-100">
            <Placeholder xs={12} style={{ height: "2rem" }} />
          </Placeholder>
          <Placeholder as="p" animation="glow" className="rounded my-2 w-100">
            <Placeholder xs={12} style={{ height: "2rem" }} />
          </Placeholder>
          <Placeholder as="p" animation="glow" className="rounded my-2 w-100">
            <Placeholder xs={12} style={{ height: "2rem" }} />
          </Placeholder>
          <Placeholder as="p" animation="glow" className="rounded my-2 w-100">
            <Placeholder xs={12} style={{ height: "2rem" }} />
          </Placeholder>
          <Placeholder as="p" animation="glow" className="rounded my-2 w-100">
            <Placeholder xs={12} style={{ height: "2rem" }} />
          </Placeholder>
        </div>
      </Saloonlayout>
    );
  }

  if (isError) {
    return (
      <Saloonlayout className="text-dynamic-white">
        Error: retriving
      </Saloonlayout>
    );
  }
  console.log(salonWorkingdays);

  return (
    <Saloonlayout>
      <div className="d-flex align-items-center justify-content-between my-2">
        <h4>{staff_name}</h4>
      </div>

      <Row className="gap-2">
      {salonWorkingdays && salonWorkingdays.length > 0 ? (
        <>
        
             <StaffBookingCalendar data={data} />

             <Col xs={12} lg={10} xl={10} xxl={8}>
               
                 <WorkingdaysContent />
               
             </Col>
        
        </>
          ) : (
            <Col xs={10} md={8} className="card p-2 mx-auto mx-md-0 bg-primary">
              <Row>
                <Col>
                  <h5 className="my-3 text-white">
                    {" "}
                    Please update the Working Hours of the salon before staff
                    working hours
                  </h5>
                  <Link to={`/saloon/${id}/opening-duration/${slug}`}>
                    <Button variant="danger">Setup Now</Button>
                  </Link>
                </Col>
              </Row>
            </Col>
          )}


       
      </Row>
    </Saloonlayout>
  );
};

export default StaffDetailPage;
