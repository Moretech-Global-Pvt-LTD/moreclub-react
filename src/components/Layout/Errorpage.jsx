import React from 'react'
import DashboardLayout from './DashboardLayout'
import Divider from '../divider/Divider'
import ErrorPage from './ErrorContent'
import LandingLayout from './LandingLayout'

const Errorpage = () => {
  return (
    <LandingLayout>
  
    <ErrorPage/>
    <Divider />
  </LandingLayout>
  )
}

export default Errorpage
