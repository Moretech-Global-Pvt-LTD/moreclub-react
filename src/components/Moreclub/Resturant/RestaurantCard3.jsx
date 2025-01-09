import React from 'react';
import handleRedirection from '../../../utills/redircting';

const ResturantCard = ({ res, link }) => {

    return (
    <div className="restaurant-card-container">
            <div class="restaurant-card" onClick={()=>handleRedirection("morefood" , `/restaurant/${res.slug}`)}>
                <div class="restaurant-card-image">
                    <img src={`${res.banner}`} alt="Restaurant-Image"/>
                    <span class={`open-status ${res.open_hrs === "Open" ? "restro-open" : ""}`}>{res.open_hrs }</span>
                </div>
                <div class="restaurant-card-details">
                    <h3 class="restaurant-name">{res.name}</h3>
                    <p class="restaurant-address">
                        <i class="location-icon">&#x1F4CD;</i>{res.address}
                    </p>
                </div>
            </div>
     </div>
    );
}

export default ResturantCard;
