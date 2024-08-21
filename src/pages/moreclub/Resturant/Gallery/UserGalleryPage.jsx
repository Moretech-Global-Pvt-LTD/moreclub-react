import React from 'react'
import DashboardLayout from '../../../../components/Layout/DashboardLayout';
import { useParams } from 'react-router-dom';
import UserGalleryContent from './UserGallery';

const UserPage = () => {
    const { res_id, slug } = useParams();
    const name = slug.replace("-", " ");
    return (
        <DashboardLayout title={`${name} Gallery`}>
            <h4 className='my-2'>User Upload Gallery</h4>
            <UserGalleryContent />
        </DashboardLayout>
    );
}

export default UserPage