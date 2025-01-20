import React, { useEffect, useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { axiosInstance } from "../..";
import TransactionCardSkeleton from "../Skeleton/TransactionCardSkeleton";
import LeadsTransactionCard from "./LeadTransactionCard";
import { baseURL } from "../../config/config";

const LeadTransactions = ({ username }) => {
  const [offset, setOffset] = useState(0);
  const [allData, setAllData] = useState([]); // Store accumulated data
  const [hasNextPage, setHasNextPage] = useState(true); // To track if more pages exist

  const fetchLeadTransactions = async (username, offset, limit = 10) => {
    const response = await axiosInstance.get(
      `${baseURL}leads/business/transaction/history/${username}?offset=${offset}&limit=${limit}`
    );
    return response;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["leadtransaction", username, offset],
    queryFn: () => fetchLeadTransactions(username, offset),
    keepPreviousData: true,
    enabled: hasNextPage,
  });

  useEffect(() => {
    if (data) {
      setAllData((prevData) => [...prevData, ...data.data.data]);
      setHasNextPage(!!data.data.meta.links.next);
    }
  }, [data]);

  const handleLoadMore = () => {
    if (hasNextPage) {
      setOffset((prevOffset) => prevOffset + 10);
    }
  };

  if (isLoading && allData.length === 0) {
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
      {allData && allData.length === 0 ? (
        <div
          className="row align-items-center"
          style={{ height: "20vh", width: "100%" }}
        >
          <h6 className="text-center">Transactions not found</h6>
        </div>
      ) : (
        <>
          {allData &&
            allData.length > 0 &&
            allData.map((row, transactionIndex) => (
              <React.Fragment key={transactionIndex}>
                <LeadsTransactionCard
                  key={transactionIndex}
                  transactionType={
                    row.lead_type === "Received" ? "RECEIVE" : "SEND"
                  }
                  narration={`${row.platform} ${row.lead_type} from ${row.payment_from}`}
                  transactiontime={row.created}
                  transactionamount={row.sent_amount}
                  currency_received={row.received_currency_code}
                  currency_send={row.sent_currency_code}
                />
              </React.Fragment>
            ))}

          {isLoading && allData.length !== 0 && <TransactionCardSkeleton />}
          {hasNextPage && (
            <div className="text-center mt-3">
              <button
                className="btn btn-primary"
                onClick={() => handleLoadMore()}
                disabled={isLoading && allData.length !== 0}
              >
                {isLoading && allData.length !== 0 ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LeadTransactions;
