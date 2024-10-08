import React from 'react'
import { Link } from 'react-router-dom';


const SaloonCard = ({ sal }) => {


    const slug = sal.name.replace(/ /g, "-");

    return (
        <Link 
            to={`/saloon/${sal.id}/${slug}`}
            key={sal.id}
             className="restaurant-card-container"
        >
            <div class="restaurant-card mx-auto mb-2"  >
                <div class="restaurant-card-image">
                    <img src={`${sal.banner}`} alt="Restaurant Image" />
                    {/* <span class="open-status">{sal.is_open ? "Open" : `${sal.open_hrs}`}</span> */}
                </div>
                <div class="restaurant-card-details">
                    <h3 class="restaurant-name">{sal.name}</h3>
                    <p class="restaurant-address">
                        <i class="location-icon">&#x1F4CD;</i>{sal.address}
                    </p>
                </div>
            </div>
        </Link>
    );
}

export default SaloonCard