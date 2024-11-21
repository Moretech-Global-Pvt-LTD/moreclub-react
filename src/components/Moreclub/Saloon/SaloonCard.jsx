import React from 'react'
import { baseURL, moresaloonimageURL } from '../../../config/config';
import { axiosInstance } from '../../..';

const SaloonCard = ({ sal, link }) => {

    async function handleRedirection() {
        const newWindow = window.open('about:blank', '_blank');
        try {
            const response = await axiosInstance.post(`${baseURL}auth/code/generate/`);
            if (response.status === 200) {
                const url = `${link}?redirect=true&&code=${response.data.data.auth_code}`;
                newWindow.location.href = url;
            }
        } catch (err) {
            console.log("error getting code ", err.response.status)
            
            newWindow.location.href = link;
        }
    }

    return (
        <div
            
            className="restaurant-card-container"
        >
            <div class="restaurant-card" onClick={handleRedirection} >
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