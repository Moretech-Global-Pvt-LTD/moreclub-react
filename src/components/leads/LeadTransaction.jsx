import React, { useEffect } from "react";
import moment from "moment";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

import { baseURL } from "../../config/config";
import { axiosInstance } from "../..";
import TransactionCardSkeleton from "../Skeleton/TransactionCardSkeleton";
import TransactionCard from "../transaction/Users/transactionCard";
import LeadsTransactionCard from "./LeadTransactionCard";

const LeadTransactions = ({ username }) => {
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const active = urlParams.get("active");
  }, [location.search]);

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["leadtransaction", username],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await axiosInstance.get(
        `${baseURL}wallets/transaction/?page=${pageParam}`
      );
      return response.data;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.links.next) {
        return lastPage.meta.page_number + 1;
      }
      return undefined;
    },
  });

  if (isLoading) {
    return (
      <div className="card p-4">
        <TransactionCardSkeleton />
      </div>
    );
  }

  if (isError) {
    return <div className="text-dynamic-white">Error: retrieving</div>;
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
          <h6 className="text-center">Transactions not found</h6>
        </div>
      ) : (
        <>
          {data.pages.map((page, pageIndex) => (
            <React.Fragment key={pageIndex}>
              {page.data.map((notification, notificationIndex) => (
                <React.Fragment key={notificationIndex}>
                  <h6 className="mt-2 mb-1">
                    {moment(notification.day).format("dddd DD MMM, YY")}
                  </h6>
                  {notification.transactions.map((row, transactionIndex) => (
                    <LeadsTransactionCard

                      key={transactionIndex}
                      transactionType={row.transaction_type}
                      narration={row.narration}
                      transactiontime={row.timestamp}
                      transactionamount={row.amount}
                      
                      
                      currency_received={row.currency_received_symbol}
                      currency_send={row.currency_sent_symbol}
                      
                    />
                  ))}
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
          {isFetchingNextPage && <TransactionCardSkeleton />}
        </>
      )}

      {/* Load More Button */}
      {hasNextPage && (
        <div className="text-center mt-3">
          <button
            className="btn btn-primary"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default LeadTransactions;
