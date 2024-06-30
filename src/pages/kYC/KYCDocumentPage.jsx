import React from 'react'
import DashboardLayout from '../../components/Layout/DashboardLayout'
import KYCDocument from './KYCDocument'

const KYCDocumentPage = () => {
  return (
    <DashboardLayout title={"KYC Documents"}>
      <KYCDocument />
    </DashboardLayout>
  )
}

export default KYCDocumentPage
