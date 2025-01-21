import React from "react";
import moment from "moment";

const MessageHistoryCard = ({ messages }) => {
  const { id, message_type , subject, message, response , created } = messages;

  const formatTimestamp = (timestamp) => {
    const timeDifference = moment().diff(moment(timestamp), 'minutes');
  
    if (timeDifference <= 5) {
      return moment.utc(timestamp).local().fromNow(); // 'a few seconds ago', '5 minutes ago'
    } else if (timeDifference < 1440) {
      return moment.utc(timestamp).local().format('h:mm A'); // '10:42 PM'
    } else {
      return moment.utc(timestamp).local().format('dddd, MMM D, YYYY · h:mm A'); // 'Thursday, Jan 9, 2025 · 10:42 PM'
    }
  };

  const formatedTimestamp= formatTimestamp(created);

  return (
    <div className="Lead-message-card" id={id}>
  <div className="Lead-message-card-header">
    {/* <div className="Lead-message-card-avatar">
      <img src="https://via.placeholder.com/150" alt="User Avatar" />
    </div> */}
    <div className="Lead-message-card-comment-content">
      <div className="Lead-message-card-comment-header ">
        <div>
          <span className="Lead-message-card-user-name">via</span>
          <span className="Lead-message-card-role">{ message_type === "Email" ? "Email" : "Phone"}</span>
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
    {message && (
      <div className="Lead-message-card-body-text text-dynamic-white" >
         <div dangerouslySetInnerHTML={{ __html: message }}/>
      </div>
    )}
    {/* {response ? (
      <div className="Lead-message-card-response text-dynamic-white">
        <strong>Response:</strong> {response}
      </div>
    ) : (
      <div className="Lead-message-card-no-response ">
        No response available
      </div>
    )} */}
  </div>
</div>

  );
};

export default MessageHistoryCard;
