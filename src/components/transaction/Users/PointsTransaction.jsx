import React, { useEffect, useState } from "react";
import moment from "moment";
import { axiosInstance } from "../../..";
import { baseURL } from "../../../config/config";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import TransactionCardSkeleton from "../../Skeleton/TransactionCardSkeleton";
import TransactionCard from "./transactionCard";

const PointsTransactions = () => {
  const location = useLocation();
  const [starting, setStarting] = useState("");
  const [ending, setEnding] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const start = urlParams.get("starting");
    const end = urlParams.get("ending");
    const active = urlParams.get("active");
    if (active === "Transactions") {
      if (start) setStarting(start);
      if (end) setEnding(end);
    }
  }, [location.search]);

  const { data, isLoading, isError, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["pointstransaction", starting, ending],
      queryFn: async ({ pageParam = 1 }) => {
        if (starting || ending) {
          const response = await axiosInstance.get(
            `${baseURL}wallets/transaction/?start_date=${encodeURIComponent(
              starting
            )}&end_date=${encodeURIComponent(ending)}&page=${pageParam}`
          );
          return response.data;
        } else {
          const response = await axiosInstance.get(
            `${baseURL}wallets/transaction/?page=${pageParam}`
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

      <div className="card p-4">
        <TransactionCardSkeleton />
      </div>
    );
  }

  if (isError) {
    return <div className="text-dynamic-white">Error: reteriving</div>;
  }

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
              {data.data.map((notification) => (
                <>
                  <h6 className="mt-2 mb-1">
                    {moment(notification.day).format("dddd DD MMM, YY")}
                  </h6>
                  {notification.transactions.map((row) => (
                    <TransactionCard
                          transactionType={row.transaction_type}
                          narration={row.narration}
                          transactiontime={row.timestamp}
                          transactionamount={row.amount}
                          previousbalance={row.previous_balance}
                          currency={row.currency}
                          currency_received={row.currency_received_symbol}
                          currency_send={row.currency_sent_symbol}
                          transaction_id={row.id}
                        />
                  ))}
                </>
              ))}
            </>
          ))}
        </>
      )}

      <div
        ref={(node) => {
          bottomRef.current = node;
        }}
      />
      {isFetchingNextPage && 
        <TransactionCardSkeleton />
      }
    </div>
  );
};

export default PointsTransactions;
