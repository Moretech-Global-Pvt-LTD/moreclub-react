import React from "react";
import MessageHistoryCard from "./LeadMessageCard";


const MessageHistoryList = ({ messages }) => {
  if (!messages || messages.length === 0) {
    return <div className="leed-detail-no-messages">No message history available</div>;
  }

  return (
    <div className="leed-detail-msg-list">
      {messages.map((message) => (
        <MessageHistoryCard key={message.id} message={message} />
      ))}
    </div>
  );
};

export default MessageHistoryList;
