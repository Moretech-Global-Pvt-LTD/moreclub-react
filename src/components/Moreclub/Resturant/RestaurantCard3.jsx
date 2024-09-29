import React from 'react';
import { axiosInstance } from '../../..';
import { baseURL } from '../../../config/config';

const ResturantCard = ({ res, link }) => {
  async function handleRedirection() {
    // Open a blank tab immediately
    const newWindow = window.open('about:blank', '_blank');

    try {
      const response = await axiosInstance.post(`${baseURL}auth/code/generate/`);
      if (response.status === 200) {
        const url = `${link}?redirect=true&&code=${response.data.data.auth_code}`;
        newWindow.location.href = url;
      } else {
        newWindow.location.href = link;
      }
    } catch (err) {
      newWindow.location.href = link;
    }
  }

  return (
    <div className="restaurant-card-container">
      <div className="restaurant-card" onClick={handleRedirection}>
        <div className="restaurant-card-image">
          <img src={res.banner} alt="Restaurant" />
          <span className={`open-status ${res.is_open ? "restro-open" : ""}`}>
            {res.is_open ? "Open" : res.open_hrs}
          </span>
        </div>
        <div className="restaurant-card-details">
          <h3 className="restaurant-name">{res.name}</h3>
          <p className="restaurant-address">
            <i className="location-icon">&#x1F4CD;</i>{res.address}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResturantCard;
