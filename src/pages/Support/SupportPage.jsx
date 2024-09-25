import React from 'react'
import SupportBotPage from "./SupportPageContent"
import LandingLayout from "../../components/Layout/LandingLayout";

const SupportPage = () => {
  return (
    <LandingLayout>
       <div className="container">
      <SupportBotPage/>
      </div>
      </LandingLayout>
  )
}

export default SupportPage