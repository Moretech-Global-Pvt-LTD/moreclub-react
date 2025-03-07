import React from 'react';
import handleRedirection from '../../../utills/redircting';

const HotelCard = ({ res }) => {

    return (
    <div className="restaurant-card-container">
            <div class="restaurant-card" onClick={()=>handleRedirection("moreliving" , `/hotel/${res.slug}`)}>
                <div class="restaurant-card-image">
                    <img src={`${res.banner}`} alt="Hotel-Image"/>
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

export default HotelCard;
