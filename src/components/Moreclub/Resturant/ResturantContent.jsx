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
      staleTime: 100,
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
      <Row xs={1} md={2} xl={3} xxl={4} className="g-4">
        <Link to={"/resturant/info"} className="d-flex flex-column">
          <Col className="d-flex flex-column">
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
                {/* <img
                  src={Setup}
                  alt="menu"
                  className="px-2 py-1 rounded "
                  style={{ height: "5rem", placeSelf: "end" }}
                /> */}
              </Card.Body>
            </Card>
          </Col>
        </Link>
        {data.map((res) => (
          // <Link
          //   to={`/resturant/setup/${res.id}`}
          //   className="d-flex flex-column"
          //   key={res.id}
          // >
          //   <Col className="d-flex flex-column">
          //     <Card className="p-2 flex-grow-1">
          //       <Card.Title className="text-dynamic-white text-center"></Card.Title>
          //       <Card.Body className="d-flex align-items-center justify-content-between">
          //         <ul>
          //           <div className="d-flex align-items-center gap-2">
          //             <img
          //               src={res.logo}
          //               style={{
          //                 width: "45px",
          //                 height: "45px",
          //                 objectFit: "cover",
          //                 backgroundColor: "#fff",
          //               }}
          //               alt="logo"
          //               className="img-fluid rounded-circle mb-3 profile-image"
          //             />
          //             {/* )} */}
          //             <h4 className="text-dynamic-white  text-start">
          //               {res.name}
          //             </h4>
          //           </div>
          //           <li className="d-flex justify-content-between">
          //             {/* <h6>Location</h6> */}
          //             <h6>{res.address}</h6>
          //           </li>
          //         </ul>
          //       </Card.Body>
          //     </Card>
          //   </Col>
          // </Link>
          <ResturantCard res={res} link={`/resturant/setup/${res.id}`} />
        ))}
      </Row>
    </div>
  );
};

export default ResturantContent;
