import React from 'react'
import DashboardLayout from '../../../components/Layout/DashboardLayout'
import RestaurantCardSkeleton from '../../../components/Skeleton/RestaurantCardSkeleton';
import StationCard from '../../../components/Moreclub/Resturant/station/StationCard';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Plus from "../../../images/moreclub/plus.png";
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../..';
import { morefoodURL } from '../../../config/config';
import StationLayout from './StationLayout';
import { useSelector } from 'react-redux';

const StationPage = () => {
    const user = useSelector((state) => state.userReducer);
    const { data, isLoading, isError } = useQuery({
        queryKey: ["station List"],
        queryFn: async () => {
            const response = await axiosInstance.get(`${morefoodURL}moreclub/stations/list/`);
            const data = await response.data.data;
            return data;
        },
        staleTime: 300000,
    });

    if (isLoading) {
        return (
            <StationLayout title={"Setup Station"}>
                <RestaurantCardSkeleton/>
            </StationLayout>
        );
    }

    if (isError) {
        return <StationLayout title={"Setup Station"}> Error: retriving</StationLayout>;
    }


  return (
      <StationLayout title={"Setup Station"}>
          <div className="" style={{ minHeight: "50vh", width: "100%" }}>
              <Row xs={1} md={2} lg={3} xl={4} xxl={5} className="g-4">
                  {user.isSuperAdmin &&
                      <Link to={"/station/setup"} className="d-flex flex-column">
                          <Col className="d-flex flex-column ">
                              <Card className="p-2 flex-grow-1">
                                  <Card.Body className="d-flex flex-column justify-content-center w-full gap-4">
                                      <h4 className="text-dynamic-white text-center">
                                          Add new Station
                                      </h4>
                                      <img
                                          src={Plus}
                                          alt="menu"
                                          className="px-2 py-1 rounded "
                                          style={{ height: "4rem", alignSelf: "center" }}
                                      />

                                  </Card.Body>
                              </Card>
                          </Col>
                      </Link>
                  }
                  {data && data.length > 0 && data.map((res) => (
                        <StationCard station={res} link={`/resturant/setup/${res.id}`} />
                  ))}
              </Row>
          </div>
      </StationLayout>
  )
}

export default StationPage