import React from "react";
import moment from "moment";

const MessageHistoryCard = ({ message }) => {
  const { id, via, subject, body, response , timestamp } = message;

  const formatTimestamp = (timestamp) => {
    const timeDifference = moment().diff(moment(timestamp), 'minutes');
  
    if (timeDifference <= 5) {
      return moment(timestamp).fromNow(); // 'a few seconds ago', '5 minutes ago'
    } else if (timeDifference < 1440) {
      return moment(timestamp).format('h:mm A'); // '10:42 PM'
    } else {
      return moment(timestamp).format('dddd, MMM D, YYYY · h:mm A'); // 'Thursday, Jan 9, 2025 · 10:42 PM'
    }
  };

  const formatedTimestamp= formatTimestamp(timestamp);

  return (
    <div className="Lead-message-card" id={id}>
  <div className="Lead-message-card-header">
    <div className="Lead-message-card-avatar">
      <img src="https://via.placeholder.com/150" alt="User Avatar" />
    </div>
    <div className="Lead-message-card-comment-content">
      <div className="Lead-message-card-comment-header ">
        <div>
          <span className="Lead-message-card-user-name">via</span>
          <span className="Lead-message-card-role">{ via === "email" ? "Email" : "Phone"}</span>
        </div>
        <span className="Lead-message-card-timestamp">{formatedTimestamp}</span>
      </div>
    </div>
  </div>
  <div className="Lead-message-card-body ">
    {subject && (
      <div className="Lead-message-card-subject text-dynamic-white">
        <strong>Subject:</strong> {subject}
      </div>
    )}
    {body && (
      <div className="Lead-message-card-body-text text-dynamic-white">
         {body}
      </div>
    )}
    {response ? (
      <div className="Lead-message-card-response text-dynamic-white">
        <strong>Response:</strong> {response}
      </div>
    ) : (
      <div className="Lead-message-card-no-response ">
        No response available
      </div>
    )}
  </div>
</div>

  );
};

export default MessageHistoryCard;
