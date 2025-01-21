import React, { useEffect, useState } from "react";
import MessageHistoryCard from "./LeadMessageCard";
import { baseURL } from "../../config/config";
import { axiosInstance } from "../..";
import { useQuery } from "@tanstack/react-query";
import UniversalErrorbox from "../Layout/UniversalErrorBox";
import TransactionCardSkeleton from "../Skeleton/TransactionCardSkeleton";

const MessageHistoryList = ({username}) => {


  const [offset, setOffset] = useState(0);
  const [messagesList, setMessagesList] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true); // To track if more pages exist

  const fetchLeadTransactions = async (username) => {
    const response = await axiosInstance.get(
      `${baseURL}leads/sent/messages/${username}/`
    );
    return response;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["lead message", username],
    queryFn: () => fetchLeadTransactions(username, ),
    keepPreviousData: true,
    enabled: hasNextPage,
  });

  useEffect(() => {
    if (data) {
      setMessagesList(data.data.data);
      setHasNextPage(!!data?.data?.meta?.links?.next);
    }
  }, [data]);

  const handleLoadMore = () => {
    if (hasNextPage) {
      setOffset((prevOffset) => prevOffset + 10);
    }
  };

  if (isLoading && messagesList.length === 0) {
    return (
      <div className="card p-4">
        <TransactionCardSkeleton />
      </div>
    );
  }

  if (isError) {
    return <UniversalErrorbox message="Something went wrong while fetching the Messages" 
    retry={["lead message", username, offset]}
    />
  }


  if (!messagesList || messagesList.length === 0) {
    return <div className="leed-detail-no-messages">No message history available</div>;
  }

  console.log(messagesList);

  return (
 
    <div className="Lead-message-card-list">
      {messagesList.map((message, index) => (
        <>
        <MessageHistoryCard key={message.id} messages={message} />
        </>
      ))}
    </div>
  );
};

export default MessageHistoryList;
