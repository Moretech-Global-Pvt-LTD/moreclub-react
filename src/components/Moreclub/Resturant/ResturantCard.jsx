import React from 'react'
import { Link } from 'react-router-dom';

const ResturantCard = ({res, link}) => {
  const slug = res.name.replace(/ /g, "-");
    return (
      <Link
        to={`/restaurant/${res.id}/${slug}`}
        key={res.id}
      >
          <div class="restaurant-card mx-auto mb-2" >
            <div class="restaurant-card-image">
              <img src={`${res.banner}`} alt="Restaurant Image" />
              {/* <span class="open-status">{res.is_open ? "Open" : `${res.open_hrs}`}</span> */}
            </div>
            <div class="restaurant-card-details">
              <h3 class="restaurant-name">{res.name}</h3>
              <p class="restaurant-address">
                <i class="location-icon">&#x1F4CD;</i>{res.address}
              </p>
            </div>
          </div>
      </Link>
    );
}

export default ResturantCard