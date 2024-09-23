import React from 'react'
import { Link } from 'react-router-dom';
import {moresaloonimageURL } from '../../../config/config';


const SaloonCard = ({ sal }) => {


    const slug = sal.name.replace(" ", "-");

    return (
        <Link 
            to={`/saloon/${sal.id}/${slug}`}
            key={sal.id}
        >
            <div class="restaurant-card mx-auto mb-2"  >
                <div class="restaurant-card-image">
                    <img src={`${moresaloonimageURL}${sal.banner}`} alt="Restaurant Image" />
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