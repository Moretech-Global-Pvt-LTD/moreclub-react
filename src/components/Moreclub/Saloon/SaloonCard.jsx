import React from 'react'
import { Link } from 'react-router-dom';
import { baseURL, moresaloonimageURL } from '../../../config/config';
import { axiosInstance } from '../../..';

const SaloonCard = ({ sal, link }) => {

    async function handleRedirection() {
        try {
            const response = await axiosInstance.post(`${baseURL}auth/code/generate/`);
            if (response.status === 200) {
                const url = `${link}?redirect=true&&code=${response.data.data.auth_code}`;
                window.open(url, '_blank');
            }
        } catch (err) {
            console.log("error getting code ", err.response.status)
            const url = `${link}`;
            window.open(url, '_blank');
        }
    }

    return (
        <div
            
            key={sal.id}
        >
            <div class="restaurant-card mx-auto mb-2" onClick={handleRedirection} >
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
        </div>
    );
}

export default SaloonCard