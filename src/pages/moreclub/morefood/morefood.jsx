import React from 'react'
import DashboardLayout from '../../../components/Layout/DashboardLayout'
import MorefoodContent from '../../../components/Moreclub/morefood/morefoodContent'
import PopularResturant from '../../../components/Moreclub/morefood/PopularResturant'

const Morefood = () => {
  return (
    <DashboardLayout title={"More Food"}>
      <div className="w-full mx-auto">

        <h3 className="mx-auto mt-3 ">Popular Resutaurants</h3>
        <PopularResturant />
        
       <MorefoodContent/>
      </div>
    </DashboardLayout>
  )
}

export default Morefood