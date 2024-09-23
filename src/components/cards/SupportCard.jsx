import React from 'react';

const SupportCard = ({ title, description, buttonText, buttonLink }) => {
  return (
    <div className="support-card">
      {/* Support Icon (can be a placeholder icon or a custom one) */}
      <div className="support-icon">
        <img src="/images/moreclub/morefood/support.png" alt="Support Icon" />
      </div>

      <div className="support-content">
        <div className="support-title">{title}</div>
        <div className="support-description">{description}</div>
        
        <a href={buttonLink} className="support-button btn btn-primary">
          {buttonText}
        </a>
      </div>
    </div>
  );
};

export default SupportCard;
