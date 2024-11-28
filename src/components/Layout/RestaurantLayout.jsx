import React from 'react'
import { useParams } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';

const RestaurantLayout = ({children}) => {
    const { slug } = useParams();
    const name = slug.replace(/-/g, " ");
    
  return (
    <DashboardLayout title={name}>
        {children}  
   </DashboardLayout>
  )
}

export default RestaurantLayout;