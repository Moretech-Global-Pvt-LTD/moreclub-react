import React from 'react'
import handleRedirection from '../../../utills/redircting';

const SaloonCard = ({ sal, link }) => {

    return (
        <div
            
            className="restaurant-card-container"
        >
            <div class="restaurant-card" onClick={()=>handleRedirection("moresaloon" , `/saloon/${sal.id}`)} >
                <div class="restaurant-card-image">
                    <img src={`${sal.banner}`} alt="Saloon-Image" />
                    {/* <span class="open-status">{sal.is_open ? "Open" : `${sal.open_hrs}`}</span> */}
                </div>
                <div class="restaurant-card-details">
                    <h3 class="restaurant-name">{sal.name}</h3>
                    <p class="restaurant-address truncateText3">
                        <i class="location-icon">&#x1F4CD;</i>{sal.address}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SaloonCard