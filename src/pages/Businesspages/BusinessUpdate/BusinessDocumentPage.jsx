import React from 'react'
import HeaderDashboard from '../../../components/header/HeaderDashboard'
import Breadcrumb from '../../../components/breadcrumb/Breadcrumb'

import { useSelector } from 'react-redux'

import UpdateTab from '../../../components/businessUpdate/UpdateTab'


const BusinessDocumentPage = () => {
    const user = useSelector((state) => state.userReducer);
    const business = useSelector((state)=>state.businessReducer);
  return (
    <>
        <HeaderDashboard />
        <div className="admin-wrapper">
            <Breadcrumb 
                breadcrumbTitle="Bussiness Upload" 
                breadcrumbNav={[
                    {
                        navText: "Home",
                        path: "/"
                    }
                ]}
            />
            {user.user && business.businessProfile ? (
                    <UpdateTab business={business}/> 
                 
            ):(
                <div>Loading</div>
            )}
        </div>
    </>
  )
}
export default BusinessDocumentPage;