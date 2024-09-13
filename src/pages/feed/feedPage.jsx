import React from 'react'
import DashboardLayout from '../../components/Layout/DashboardLayout'
import FeedContent from './feedContent'
import FeedCreation from '../../components/feed/feedCreation'

const FeedPage = () => {
  return (
    <DashboardLayout title={"feed"}>
      
      <FeedCreation />  
      <FeedContent />
          
    </DashboardLayout>
  )
}

export default FeedPage