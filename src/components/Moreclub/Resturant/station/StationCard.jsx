import React from 'react'
import { Link } from 'react-router-dom';

const StationCard = ({ res_id, id, name, address, banner }) => {
    
    const slug = name.replace(/ /g, "-");

    return (
        <Link to={`/resturant/${res_id}/station/${id}/${slug}`}>
            
            <div class="restaurant-card mx-auto mb-2" >
                <div class="restaurant-card-image">
                    <img src={`${banner}`} alt="Restaurant Image" />
                </div>
                <div class="restaurant-card-details">
                    <h3 class="restaurant-name">{name}</h3>
                    <p class="restaurant-address">
                        <i class="location-icon">&#x1F4CD;</i>{address}
                    </p>
                </div>
            </div>
            </Link>
    );
}

export default StationCard