import React from 'react'
import DashboardLayout from '../../../components/Layout/DashboardLayout'
import NotificationContent from './NotificationContent'

const NotificationPage = () => {
  return (
    <DashboardLayout title={"Notification"}>
      <NotificationContent/>
    </DashboardLayout>
  )
}

export default NotificationPage
