import React from 'react'
import DashboardLayout from '../../../../components/Layout/DashboardLayout';
import { useParams } from 'react-router-dom';
import GalleryContent from './GalleryContent';

const GalleryPage = () => {
    const { res_id, slug } = useParams();
    const name = slug.replace("-", " ");
  return (
    <DashboardLayout title={`${name} Gallery`}>
     <GalleryContent/>
    </DashboardLayout>
  );
}

export default GalleryPage