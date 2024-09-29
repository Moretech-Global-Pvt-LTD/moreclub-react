import React from 'react'
import { axiosInstance } from '../../..';
import { baseURL } from '../../../config/config';


const ResturantCard = ({ res, link }) => {
  
    async function handleRedirection() { 
        try {
            const response = await axiosInstance.post(`${baseURL}auth/code/generate/`);
            if (response.status === 200) {  
                const url = `${link}?redirect=true&&code=${response.data.data.auth_code}`; 
                window.open(url, '_blank');
            }
        } catch(err){
            const url = `${link}`;
            window.open(url, '_blank');
        }
    }

    return (
        <div className="restaurant-card-container">
            <div class="restaurant-card" onClick={handleRedirection}>
                <div class="restaurant-card-image">
                    <img src={`${res.banner}`} alt="Restaurant Image"/>
                    <span class={`open-status ${res.is_open ? "restro-open" : ""}`}>{res.is_open ? "Open" : `${res.open_hrs}`}</span>
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

export default ResturantCard