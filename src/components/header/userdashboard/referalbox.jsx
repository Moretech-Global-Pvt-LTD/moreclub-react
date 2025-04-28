import React from 'react';
import './user-dashboard.css';
import { useSelector } from 'react-redux';
import { message } from 'antd';

const ReferralBox = () => {
  const user = useSelector((state) => state.userReducer);

  const handleCopyLink = () => {
    if (user?.user?.link) {
      navigator.clipboard.writeText(user.user.link)
        .then(() => {
            message.success('Referral link copied to clipboard!');
        })
        .catch((err) => {
          message.error('Failed to copy referral link');
        });
    }
  };

  return (
    <div className="user-dashboard-referral-box mb-5 mt-0">
      <h6>Your Referral Link</h6>
      <div className="user-dashboard-referral-link text-white">
        {user?.user?.link}
      </div>
      <button 
        className="user-dashboard-btn user-dashboard-btn-small" 
        style={{ width: '100%' }}
        onClick={handleCopyLink}
      >
        Copy Link
      </button>
    </div>
  );
}

export default ReferralBox;
