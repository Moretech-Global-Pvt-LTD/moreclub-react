import React from "react";

const MessageHistoryCard = ({ message }) => {
  const { id, via, subject, body, response } = message;

  return (
    <div className="leed-detail-msg-card">
      <div className="leed-detail-msg-card-header">
        <span className={`leed-detail-via ${via === "email" ? "email" : "phone"}`}>
          {via.toUpperCase()}
        </span>
      </div>
      <div className="leed-detail-msg-card-body">
        {subject && (
          <div className="leed-detail-msg-subject">
            <strong>Subject:</strong> {subject}
          </div>
        )}
        {body && (
          <div className="leed-detail-msg-body">
            <strong>Message:</strong> {body}
          </div>
        )}
        {response ? (
          <div className="leed-detail-msg-response">
            <strong>Response:</strong> {response}
          </div>
        ) : (
          <div className="leed-detail-msg-no-response">No response available</div>
        )}
      </div>
    </div>
  );
};

export default MessageHistoryCard;
