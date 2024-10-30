import React from 'react'
import DashboardLayout from '../../../../components/Layout/DashboardLayout'
import { Link, useParams } from 'react-router-dom'
import { Button, Card, Col, Image, Row } from 'react-bootstrap'
import StationLayout from '../../Station/StationLayout'
import RestaurantLayoutSkeleton from '../../../../components/Skeleton/RestaurantLayout'
import { morefoodURL } from '../../../../config/config'
import { axiosInstance } from '../../../..'
import { useQuery } from '@tanstack/react-query'

const NearbyStationDetail = () => {
    const { resid, stationid, name } = useParams();
    const stationName = name.replace(/-/g, " ");

    const { data, isLoading, isError } = useQuery({
        queryKey: [`Station detail ${resid}`],
        queryFn: async () => {
            const response = await axiosInstance.get(
                `${morefoodURL}moreclub/station/${stationid}/`
            );
            const data = await response.data.data;
            return data;
        },
        staleTime: 10000,
    });

    if (isLoading) {
        return (
            <StationLayout title={`${stationName}`}>
                <RestaurantLayoutSkeleton />
            </StationLayout>
        );
    }

    if (isError) {
        return <StationLayout title={`${stationName}`} className="text-dynamic-white">Error: retriving</StationLayout>;
    }

  
    return (
        <DashboardLayout title={`${stationName}`}>
          <div>
              <Row className="mt-4 align-items-center">
                  <Col xs={12} md={6} xl={7} className="restaurant-info">
                      <div className="px-2 py-1  rounded-circle profile-image bg-white d-flex align-items-center justify-content-center overflow-hidden"
                          style={{ height: "5rem", width: "5rem", }}
                      >
                          <img
                              src={data.logo}
                              alt="setup"
                              className="rounded-circle"
                              style={{ height: "100%", objectFit: "cover", width: "100%", placeSelf: "center" }}
                          />
                      </div>
                      <div className="restaurant-details">
                          <h2>{data.name}</h2>
                          <p>
                              <i class="bi bi-geo-alt"></i>&nbsp; {data.address}
                          </p>
                          <p>{data.short_description}</p>
                      </div>
                  </Col>
                  <Col xs={12} md={6} xl={5}>
                      <Image
                          src={data.banner}
                          alt="banner"
                          className="px-2 py-1 rounded-3"
                          style={{ placeSelf: "center", maxHeight: "20rem" }}
                      />
                  </Col>
              </Row>

              <Row xs={2} sm={2} md={3} lg={4} xl={5} xxl={6} className="mt-4">
                    <Link to={`/restaurant/${resid}/station/${stationid}/${name}/menu`} className="d-flex flex-column my-2 ">
                      <Col className="d-flex flex-column my-2 ">
                          <Card className="p-2 flex-grow-1">
                              <Card.Body className="d-flex justify-content-center">
                                  <img
                                      src={'/images/moreclub/morefood/menus.png'}
                                      alt="menu"
                                      className="px-2 py-1 rounded  "
                                      style={{ height: "5rem", width: "5rem" }}
                                  />
                              </Card.Body>
                              <Card.Title className="text-dynamic-white text-center fs-6">
                                  Menus
                              </Card.Title>
                          </Card>
                      </Col>
                  </Link>
                  
                  <Link
                        to={`/restaurant/${resid}/station/${stationid}/${name}/my-menu`}
                      className="d-flex flex-column my-2"
                  >
                      <Col className="d-flex flex-column my-2">
                          <Card className="p-2 px-2 flex-grow-1">
                              <Card.Body className="d-flex justify-content-center">
                                  <img
                                      src={'/images/moreclub/morefood/orders.png'}
                                      alt="orders"
                                      className="  rounded "
                                      style={{ height: "5rem", width: "5rem" }}
                                  />
                              </Card.Body>
                              <Card.Title className="text-dynamic-white text-center fs-6">
                                  My Menu
                              </Card.Title>
                          </Card>
                      </Col>
                  </Link>
              </Row>

          </div>
    </DashboardLayout>
  )
}

export default NearbyStationDetail