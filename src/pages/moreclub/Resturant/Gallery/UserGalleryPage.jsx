import React from 'react'
import UserGalleryContent from './UserGallery';
import RestaurantLayout from '../../../../components/Layout/RestaurantLayout';

const UserPage = () => {
    
    return (
        <RestaurantLayout >
            <h4 className='my-2'>User Upload Gallery</h4>
            <UserGalleryContent />
        </RestaurantLayout>
    );
}

export default UserPage