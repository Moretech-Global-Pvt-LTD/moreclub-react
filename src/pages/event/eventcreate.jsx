import React from 'react'
import Eventcreateform from '../../components/event/eventcreateform'
import DashboardLayout from '../../components/Layout/DashboardLayout'

const Eventcreate = () => {
  return (
    <DashboardLayout title={"Create Event"}>
      <Eventcreateform/>
    </DashboardLayout>
  )
}

export default Eventcreate
