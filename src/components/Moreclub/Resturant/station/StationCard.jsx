import React from 'react'
import { Link } from 'react-router-dom';

const StationCard = ({ station }) => {
    
    const slug = station.name.replace(/ /g, "-");

    return (
        <Link to={`/station/${station.id}/${slug}`}> 
            <div class="restaurant-card mx-auto mb-2" >
                <div class="restaurant-card-image">
                    <img src={`${station.banner}`} alt="Restaurant Image" />
                </div>
                <div class="restaurant-card-details">
                    <h3 class="restaurant-name">{station.name}</h3>
                    <p class="restaurant-address">
                        <i class="location-icon">&#x1F4CD;</i>{station.address}
                    </p>
                </div>
            </div>
            </Link>
    );
}

export default StationCard