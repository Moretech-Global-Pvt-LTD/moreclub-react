import React from 'react'
import DashboardLayout from "../../components/Layout/DashboardLayout"
import KYCcontent from './KYCcontent'
import KYCDetail from './KYCDetail'

const KYCPage = () => {


  
  return (
    <DashboardLayout title={"KYC Detail"}>
      {/* <KYCcontent/> */}
      <KYCDetail/>
    </DashboardLayout>
  )
}

export default KYCPage
