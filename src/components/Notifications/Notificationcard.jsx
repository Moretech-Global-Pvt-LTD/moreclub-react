
import React from 'react';
import moment from "moment";


const NotificationCard = ({ title, message, time, isUnread }) => {
  return (
    <div className={`moredeals-notification-card ${isUnread ? 'moredeals-notification-card--unread' : ''}`}>
      <div className="moredeals-notification-card__icon">
         <i className={`bi fs-3  ${isUnread ? 'text-danger  bi-bell-fill' : 'text-dynamic-white bi-bell'}`}></i>
        {/* <i className={`icon ${isUnread ? 'icon--unread' : 'icon--read'}`}></i> */}
      </div>
      <div className="moredeals-notification-card__content">
        <div className="moredeals-notification-card__title">{title}</div>
        <div className="moredeals-notification-card__message">{message}</div>
      </div>
      <div className="moredeals-notification-card__time">{moment.utc(time).local().fromNow()}</div>
    </div>
  );
};

export default NotificationCard;

