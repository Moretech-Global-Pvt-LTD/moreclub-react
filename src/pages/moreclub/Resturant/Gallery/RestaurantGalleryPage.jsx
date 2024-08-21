import React from 'react'
import DashboardLayout from '../../../../components/Layout/DashboardLayout';
import { useParams } from 'react-router-dom';
import GalleryContent from './GalleryContent';
import RestaurantGalleryContent from './ResturantGallery';

const RestaurantPage = () => {
    const { res_id, slug } = useParams();
    const name = slug.replace("-", " ");
    return (
        <DashboardLayout title={`${name} Gallery`}>
            <h4 className='my-2'>Restaurant Gallery</h4>
            <RestaurantGalleryContent />
        </DashboardLayout>
    );
}

export default RestaurantPage