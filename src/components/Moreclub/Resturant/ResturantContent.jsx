import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Plus from "../../../images/moreclub/plus.png";
import { axiosInstance } from "../../..";
import { morefoodURL } from "../../../config/config";
import { useQuery } from "@tanstack/react-query";
import ResturantCard from "./ResturantCard";
import RestaurantCardSkeleton from "../../Skeleton/RestaurantCardSkeleton";

const ResturantContent = () => {
    const { data, isLoading, isError } = useQuery({
      queryKey: ["Resturant List"],
      queryFn: async () => {
        const response = await axiosInstance.get(`${morefoodURL}moreclub/user/restaurants/list`);
        const data = await response.data.data;
        return data;
      },
      staleTime: 300000,
    });

    if (isLoading) {
      return (
         <RestaurantCardSkeleton />
      );
    }

    if (isError) {
      return <div className="text-dynamic-white">Error: retriving</div>;
    }
  return (
    <div className="" style={{ minHeight: "50vh", width: "100%" }}>
      <Row xs={1} md={2} lg={3} xl={4} xxl={5} className="g-4">
        <Link to={"/resturant/info"} className="d-flex flex-column">
          <Col className="d-flex flex-column ">
            <Card className="p-2 flex-grow-1">
              <Card.Body className="d-flex flex-column justify-content-center w-full gap-4">
                <h4 className="text-dynamic-white text-center">
                  Add new Resturant
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
        {data.map((res) => (
          <ResturantCard res={res} link={`/resturant/setup/${res.id}`} />
        ))}
      </Row>
    </div>
  );
};

export default ResturantContent;
