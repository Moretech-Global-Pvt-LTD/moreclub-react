import React from 'react'
import DashboardLayout from '../../../components/Layout/DashboardLayout'
import MorefoodContent from '../../../components/Moreclub/morefood/morefoodContent'
import PopularResturant from '../../../components/Moreclub/morefood/PopularResturant'

const Morefood = () => {
  return (
    <DashboardLayout title={"MORE FOOD"}>
      <div className="w-full mx-auto">

        <h4 className="mx-auto mt-3 ">Popular Restaurants</h4>
        <PopularResturant />
        
       <MorefoodContent/>
      </div>
    </DashboardLayout>
  )
}

export default Morefood