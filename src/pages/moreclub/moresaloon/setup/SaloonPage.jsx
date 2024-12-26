import React from 'react'
import DashboardLayout from '../../../../components/Layout/DashboardLayout'
import { moresaloonURL } from '../../../../config/config';
import { useQuery } from '@tanstack/react-query';
import RestaurantCardSkeleton from '../../../../components/Skeleton/RestaurantCardSkeleton';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SaloonCard from '../../../../components/Moreclub/Saloon/SaloonCard2';
import Plus from "../../../../images/moreclub/plus.png";
import { axiosInstance } from '../../../..';


const SaloonPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user Saloon List"],
    queryFn: async () => {
      const response = await axiosInstance.get(`${moresaloonURL}moreclub/users/saloons/list/`);
      const data = await response.data.data;
      return data;
    },
    staleTime: 300000,
  });

  if (isLoading) {
    return (
      <DashboardLayout title={"Setup Saloon"}>
        <RestaurantCardSkeleton />
      </DashboardLayout>
    );
  }

  if (isError) {

    return (
      
      <DashboardLayout title={"Setup Saloon"}>

      <div className="text-dynamic-white">Error: retriving</div>;
    </DashboardLayout>
    )
  }


  return (
    <DashboardLayout title={"Setup Salon"}>
      <div className="" style={{ minHeight: "50vh", width: "100%" }}>
        <Row xs={1} md={2} lg={3} xl={4} xxl={5} className="g-4">
          <Link to={"/saloon/create"} className="d-flex flex-column">
            <Col className="d-flex flex-column ">
              <Card className="p-2 flex-grow-1">
                <Card.Body className="d-flex flex-column justify-content-center w-full gap-4">
                  <h4 className="text-dynamic-white text-center">
                    Add new Salon
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
          {data.map((sal) => (
            <SaloonCard sal={sal}  />
          ))}
        </Row>
      </div>
    </DashboardLayout>
  )
}


export default SaloonPage