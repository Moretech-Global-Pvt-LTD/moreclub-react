import React from 'react';
import handleRedirection from '../../utills/redircting';

const BusinessListCard = ({ slug, type, banner, name , address , path , open_hrs}) => {

    return (
    <div className="restaurant-card-container">
            <div class="restaurant-card" onClick={()=>handleRedirection(`${type}` , `${path}`)}>
                <div class="restaurant-card-image bg-white">
                    <img src={`${banner}`} alt="Restaurant-Image" />
                    {open_hrs && <span class={`open-status ${open_hrs === "Open" ? "restro-open" : ""}`}>{open_hrs }</span>}
                </div>
                <div class="restaurant-card-details">
                    <h3 class="restaurant-name">{name}</h3>
                    <p class="restaurant-address">
                        <i class="location-icon">&#x1F4CD;</i>{address}
                    </p>
                </div>
            </div>
     </div>
    );
}

export default BusinessListCard;
