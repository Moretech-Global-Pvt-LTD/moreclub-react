import React from 'react'
import RestaurantGalleryContent from './ResturantGallery';
import RestaurantLayout from '../../../../components/Layout/RestaurantLayout';

const RestaurantPage = () => {
    
    
    return (
        <RestaurantLayout >
            <h4 className='my-2'>Restaurant Gallery</h4>
            <RestaurantGalleryContent />
        </RestaurantLayout>
    );
}

export default RestaurantPage