import React from "react";
import { Col, Placeholder } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { baseURL } from "../../config/config";
import { axiosInstance } from "../..";

const PointsTransaction = () => {

  const { data, isLoading, isError } =useQuery({
      queryKey: ["recent-transaction"],
      queryFn: async () => {
        const response = await axiosInstance.get(
          `${baseURL}wallets/transaction/?page=1`
        );
        return response.data.data;
      },
    });

    if(isError){
      <p>Error : error retriving</p>
    }

  

  return (
    <Col lg={6} className="p-3">
      <div className="card text-dynamic-white p-4">
        <div className="d-flex justify-content-between">
          <h5>Today's  transaction</h5>
          <Link to="/transactions" className="">
            View All
          </Link>
        </div>
        {isLoading && 
        <div className="d-flex flex-column mt-3">
        <Placeholder as="p" animation="glow" className="rounded">
          <Placeholder xs={12} style={{ height: "2rem" }} />
        </Placeholder>
        <Placeholder as="p" animation="glow" className="rounded">
          <Placeholder xs={12} style={{ height: "2rem" }} />
        </Placeholder>
        </div>
        }
        <div className="d-flex flex-column mt-3">
          {data  &&
            data[0]?.transactions?.slice(0,7).map((item) => {
              return(
              <div
                className="d-flex justify-content-between border-bottom mb-2 pb-2"
                key={item}
              >
                <span className="fs-6 line-clamp-1">{item.narration}</span>
                <span className="fs-6">${" "}{item.amount}</span>
              </div>
            )})}
        </div>
        <div className="d-flex flex-column mt-3">
          {!data  && (
            <div className="d-flex justify-content-center border-bottom mb-2 pb-2">
              <div className="text-dynamic-white"> No transactions </div>
            </div>
          )}
        </div>
      </div>
    </Col>
  );
};

export default PointsTransaction;
