import React from 'react'
import DashboardLayout from '../../../../components/Layout/DashboardLayout'
import SaloonCreateForm from '../../../../components/Moreclub/Saloon/SaloonCreateForm'

const SaloonCreate = () => {
  return (
    <DashboardLayout title={"Create Saloon"}>
      <SaloonCreateForm/>
    </DashboardLayout>
  )
}

export default SaloonCreate