import React from 'react'
import DashboardLayout from '../../../../components/Layout/DashboardLayout'
import { useParams } from 'react-router-dom';

const Saloonlayout = ({children}) => {
    const { slug } = useParams();
    const name = slug.replace(/-/g, " ");
    
  return (
    <DashboardLayout title={name}>
        {children}  
   </DashboardLayout>
  )
}

export default Saloonlayout;