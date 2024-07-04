import React, { useEffect, useState } from "react";
import WithCouponCard from "../Users/WithCoupon";
import { Placeholder } from "react-bootstrap";
import { axiosInstance } from "../../..";
import { baseURL } from "../../../config/config";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

const BusinessCouponsTransactions = () => {
  const location = useLocation();
  const [starting, setStarting] = useState("");
  const [ending, setEnding] = useState("");
  let active;

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const start = urlParams.get("starting");
    const end = urlParams.get("ending");
    active = urlParams.get("active");
    if (active === "Coupons") {
      if (start) setStarting(start);
      if (end) setEnding(end);
    }
  }, [location.search]);

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: ["coupoons billing", starting, ending],
      queryFn: async ({ pageParam = 1 }) => {
        if (starting || ending) {
          const response = await axiosInstance.get(
            `${baseURL}billings/business/transaction/list/?types=coupon&start_date=${encodeURIComponent(
              starting
            )}&end_date=${encodeURIComponent(ending)}`
          );
          return response.data;
        } else {
          const response = await axiosInstance.get(
            `${baseURL}billings/business/transaction/list/?types=coupon&page=${pageParam}`
          );
          return response.data;
        }
      },
      getNextPageParam: (lastPage) => {
        if (lastPage.meta.links.next) {
          return lastPage.meta.page_number + 1;
        }
        return undefined;
      },
    });

  const bottomRef = React.createRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (hasNextPage) {
            fetchNextPage();
          }
        }
      },
      { threshold: 1.0 }
    );
    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }
  }, [hasNextPage, fetchNextPage, bottomRef.current]); // Add bottomRef.current to the dependency array

  if (isLoading) {
    return (
      <div
        className="content-inside-wrapper nft-card card p-4"
        style={{ maxWidth: "640px" }}
      >
        <Placeholder as="p" animation="glow" className="rounded">
          <Placeholder xs={12} style={{ height: "4rem" }} />
        </Placeholder>
        <Placeholder as="p" animation="glow" className="rounded">
          <Placeholder xs={12} style={{ height: "4rem" }} />
        </Placeholder>
      </div>
    );
  }

  if (isError) {
    return <div className="text-dynamic-white">Error: retriving</div>;
  }
  console.log("pages", data);

  return (
    <div
      className="content-inside-wrapper nft-card card p-4"
      style={{ maxWidth: "640px" }}
    >
      {data && data.pages[0].data.length === 0 ? (
        <div
          className="row align-items-center"
          style={{ height: "20vh", width: "100%" }}
        >
          <h6 className="text-center ">Transactions not found</h6>
        </div>
      ) : (
        <>
          {data.pages.map((data) => (
            <>
              {data.data.map((trnx, index) => (
                <>
                  {trnx.transactions.map((trans) => (
                    <WithCouponCard
                      // receiver={`${trans.membership.user.first_name} ${trans.membership.user.last_name}`}
                      dated={trans.created_at}
                      total={trans.total_amount}
                      discount={trans.discount}
                      paid={trans.paid_amount}
                      currencyCode={trans.currency.code}
                      key={`${trans.created_at}-${index}`}
                    />
                  ))}
                </>
              ))}
            </>
          ))}
          <div
            ref={(node) => {
              bottomRef.current = node;
            }}
          />
        </>
      )}
    </div>
  );
};

export default BusinessCouponsTransactions;
