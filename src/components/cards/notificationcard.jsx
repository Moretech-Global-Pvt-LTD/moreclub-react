// NotificationCard.js

import React from 'react';
import PropTypes from 'prop-types';

function NotificationCard({ icon, title, date, description }) {
  return (
    <div className="nft-card card shadow-sm mb-4">
      <div className="card-body">
        <div className="row align-items-center g-3">
          <div className="col-12">
            <div className="meta-info">
              <div className="name-info d-flex align-items-center mb-3">
                <div className="author-img position-relative">
                  <img
                    className="shadow"
                    src={icon}
                    alt="icon"
                  />
                </div>
                <div className="name-author">
                  <p className="name d-block hover-primary text-truncate">{title}</p>
                  <p className="author d-block fz-12 hover-primary text-truncate">Date: {date}</p>
                </div>
              </div>
              <div className="price-bid">
                <p className="mb-0">{description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

NotificationCard.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default NotificationCard;


{/* <div className="row">
        {notifications.map((notification, index) => (
          <div className="col-md-4" key={index}>
            <NotificationCard
              icon={notification.icon}
              title={notification.title}
              date={notification.date}
              description={notification.description}
            />
          </div>
        ))}
      </div> */}