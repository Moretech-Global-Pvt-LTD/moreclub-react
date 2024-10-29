import React from 'react'
import { useParams } from 'react-router-dom';
import DashboardLayout from '../../../components/Layout/DashboardLayout';

const StationLayout = ({ title, children }) => {
    const { slug } = useParams();
    const name = slug?.replace(/-/g, " ");



    return (
        <DashboardLayout title={name ?? title}>
            {children}
        </DashboardLayout>
    )
}




export default StationLayout