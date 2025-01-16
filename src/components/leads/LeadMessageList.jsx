import React from "react";
import MessageHistoryCard from "./LeadMessageCard";

const MessageHistoryList = ({ messages }) => {
  if (!messages || messages.length === 0) {
    return <div className="leed-detail-no-messages">No message history available</div>;
  }

  return (
 
    <div className="Lead-message-card-list">
      {messages.map((message, index) => (
          <MessageHistoryCard key={message.id} message={message} />
      ))}
    </div>



  );
};

export default MessageHistoryList;
