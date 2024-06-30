import React from "react";
import { Col, Placeholder } from "react-bootstrap";

import { Link } from "react-router-dom";
import { baseURL } from "../../config/config";
import { axiosInstance } from "../..";
import { useQuery } from "@tanstack/react-query";

const RecentTransaction = () => {


  const { data, isLoading, isError } = useQuery({
    queryKey: ["recent-billing-transaction"],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `${baseURL}billings/business/transaction/list/`
      );
      return response.data.data;
    },
  });

  if (isError) {
    <p>Error : error retriving</p>;
  }


  return (
    
    <Col lg={6} className="p-3">
      <div className="card text-dynamic-white p-4">
        <div className="d-flex justify-content-between">
          <h5>Recent bilings</h5>
          <Link to="/transactions" className="">
            View All
          </Link>
        </div>
        <div className="d-flex flex-column mt-3">
          {isLoading && 
          <>
          <Placeholder as="p" animation="glow" className="rounded">
          <Placeholder xs={12} style={{ height: "2rem" }} />
        </Placeholder>
        <Placeholder as="p" animation="glow" className="rounded">
          <Placeholder xs={12} style={{ height: "2rem" }} />
        </Placeholder>
        </>
          }
        </div>
        <div className="d-flex flex-column mt-3">
          {data &&
            data.slice(0, 7).map((item) => (
              <>
                {item.coupon === null && item.membership === null ? (
                  <div
                    className="d-flex justify-content-between border-bottom mb-2 pb-2"
                    key={item}
                  >
                    <span className="fs-6">
                      {"SELL"}
                    </span>
                    <span className="fs-6">{item.paid_amount}</span>
                  </div>
                ) : (
                  <>
                    {item.coupon !== null && item.membership === null ? (
                      <div
                        className="d-flex justify-content-between border-bottom mb-2 pb-2"
                        key={item}
                      >
                        <span className="fs-6">
                          {"coupon"}
                        </span>
                        <span className="fs-6">{item.paid_amount}</span>
                      </div>
                    ) : (
                      <div
                        className="d-flex justify-content-between border-bottom mb-2 pb-2"
                        key={item}
                      >
                        <span className="fs-6">
                        {item.membership.user.first_name} ${item.membership.user.last_name}                  </span>
                        <span className="fs-6">{item.paid_amount}</span>
                      </div>
                    )}
                  </>
                )}
              </>
            ))}
        </div>
        <div className="d-flex flex-column mt-3">
          {!data && (
            <div className="d-flex justify-content-center border-bottom mb-2 pb-2">
              <div className="text-dynamic-white"> No transactions </div>
            </div>
          )}
        </div>
      </div>
    </Col>
  );
};

export default RecentTransaction;
