import React from 'react'
import Saloonlayout from '../setup/Saloonlayout'
import { useParams } from 'react-router-dom'
import {  Card, Col, Placeholder, Row, Table } from 'react-bootstrap'
import { useQuery } from '@tanstack/react-query'
import moment from 'moment'
import { moresalonAuthenticatedAxios } from '../../../../utills/axios/moresalonaxios'
import ServiceBookingCard from './ServiceBookingCard'

const BookingDetailPage = () => {
  const { id, book_id, appoit_id } = useParams()

  const { data, isLoading, isError } = useQuery({
    queryKey: [`Saloon bookings detail ${id} ${appoit_id}`],
    queryFn: async () => {
      const response = await moresalonAuthenticatedAxios.get(
        `moreclub/users/saloons/${id}/appointments/${book_id}/details/`
      );
      const data = await response.data.data;
      return data;
    },
    staleTime: 480000,
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
    return <Saloonlayout className="text-dynamic-white">Error: retriving</Saloonlayout>;
  }

  return (
    <Saloonlayout>
      <Row className="mt-4  flex-xl-row ">
      <Col className="col-12 col-lg-8 col-xl-6 my-xl-0 my-4 gy-2">
          <h5>Booked Services</h5>
          {data.service_variation.map((orders) => (
            <ServiceBookingCard
              item={orders}
              currency={data?.currency}
            />
          ))}
          <div
            className=" mt-3 p-2 card text-dynamic-white fs-6 fw-semibold"
          >
            <div className="d-flex justify-content-between">
              <span>Total</span>
              <span>
                {data.currency}&nbsp;{data.total_price}
              </span>
            </div>
            <div className="d-flex justify-content-between">
              <span>Discount</span>
              <span>
                {data.currency}&nbsp;
                {parseFloat(
                  parseFloat(data.total_price) -
                    parseFloat(data.user_send_amount)
                ).toFixed(2)}
              </span>
            </div>
            
            
            <div
              className="border-top-2 border-dashed mt-3 pt-2 border-dynamic-white  d-flex justify-content-between"
            >
              <span>Grand Total</span>
              <span>
                {data.currency}&nbsp;{data.user_send_amount}
              </span>
            </div>
            <div
              className="  border-dynamic-white  d-flex justify-content-between"
            >
              <span>Payment Method</span>
              <span>
                {data.payment_method.toUpperCase()}
              </span>
            </div>
            <div
              className="  border-dynamic-white  d-flex justify-content-between"
            >
              <span>Payment Status</span>
              {data.payment_status !== "Unpaid" ?
              <span>
                 PAID{" "}&#x2705; 
              </span>:
              <span>
                NOT PAID &#10060;
              </span>
              } 
              
            </div>
            </div>
          
        </Col>
        <Card className="col-12 col-lg-8 col-xl-6 p-2">
          <h5 as="h5">Booking Details</h5>
          <Card.Body className="text-dynamic-white text-start">
            <Row className="mb-3">
              <Col>
                <strong>Booking ID:</strong>&nbsp;#{data.appointment_id}
              </Col>
              
            </Row>
            <Row className="mb-3">
              <Col>
                <strong>Customer Name:</strong>
                <div className="d-flex align-items-center user-profile mt-2">
                  {!data?.user?.profile ? (
                    <div
                      className="partner-logo-wrapper ms-0 me-0 d-flex justify-content-center align-items-center text-uppercase"
                      style={{
                        width: "45px",
                        height: "45px",
                        objectFit: "contain",
                        backgroundColor: "#fff",
                      }}
                    >
                      {data.fullname[0]}
                    </div>
                  ) : (
                    <img
                        src={`${data?.user?.profile}`}
                      style={{
                        width: "45px",
                        height: "45px",
                        objectFit: "cover",
                        backgroundColor: "#fff",
                      }}
                      alt="Profile"
                      className="img-fluid rounded-circle mb-3 profile-image"
                    />
                  )}
                  <div className="ms-3">
                    <h6 className="lh-1 text-dark fz-18">
                      {data.fullname} 
                    </h6>
                  </div>
                </div>
              </Col>
              <Col>
                <strong>Staff</strong>
                <div className="d-flex align-items-center user-profile mt-2">
                  {!data?.staff?.image ? (
                    <div
                      className="partner-logo-wrapper ms-0 me-0 d-flex justify-content-center align-items-center text-uppercase"
                      style={{
                        width: "45px",
                        height: "45px",
                        objectFit: "contain",
                        backgroundColor: "#fff",
                      }}
                    >
                      {data.staff?.name[0]}
                    </div>
                  ) : (
                    <img
                      src={`${data?.staff?.image}`}
                      style={{
                        width: "45px",
                        height: "45px",
                        objectFit: "cover",
                        backgroundColor: "#fff",
                      }}
                      alt="Profile"
                      className="img-fluid rounded-circle mb-3 profile-image"
                    />
                  )}
                  <div className="ms-3">
                    <h6 className="lh-1 text-dark fz-18">
                      {data.staff?.name}
                    </h6>
                  </div>
                </div>
              </Col>
             
            </Row>
            <Row className="mb-3">
              <Col>
                <strong>Email:</strong> {data.email}
              </Col>
              <Col>
                <strong>Booking Date:</strong> {moment(data.date).format("DD MMM YY")}
              </Col>
            </Row>
            <Row className="mb-3">
              
              <Col>
                <strong>Phone Number:</strong>
                 &nbsp;{data.phone_number}
                
              </Col>
              <Col>
                <strong>Booking Time:</strong> {moment(data.start_time, 'HH:mm:ss').format('hh:mm A')} - {moment(data.end_time, 'HH:mm:ss').format('hh:mm A')}
              </Col>
            </Row>

            <Row className="mt-3">
              <Col>
                <strong>Created At:</strong> {moment(data.created_at).format("DD MMM YY")}
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* <Col className="col-12 col-lg-8 col-xl-6 my-xl-0 my-4">
          <h5>Items Ordered</h5>
          <Table responsive className="bg-white text-dynamic-white">
            <thead>
              <tr className="text-dynamic-white">
                <th className="text-dynamic-white">Service Name</th>
                <th className="text-dynamic-white">Duration</th>
                <th className="text-dynamic-white">Price</th>
              </tr>
            </thead>
            <tbody>
              {data.service_variation.map((items, index) => {
                const [hours, minutes, seconds] = items.duration.split(":"); 
                return(
                  <tr key={index}>
                    <td className="text-dynamic-white">{items.name}</td>
                    <td className="text-dynamic-white">{hours !== '00' ? `${hours} hrs ${minutes} min ` : `${minutes} min `} </td>
                    <td className="text-dynamic-white">{data?.currency ?? "Rs"}&nbsp;{items.price}</td>
                  </tr>
                )
              })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={2} className="text-dynamic-white">
                  Total
                </td>
                <td className="text-dynamic-white">{data?.currency?? "Rs"}&nbsp;{data.total_price}</td>
              </tr>
            </tfoot>
          </Table>
        </Col> */}
      </Row>
    </Saloonlayout>
  )
}

export default BookingDetailPage