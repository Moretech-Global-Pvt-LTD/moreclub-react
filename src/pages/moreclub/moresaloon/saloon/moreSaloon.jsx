import React from 'react'
import DashboardLayout from '../../../../components/Layout/DashboardLayout'
import MoreSaloonContent from '../../../../components/Moreclub/Saloon/MoreSaloonContent'
import PopularSaloon from '../../../../components/Moreclub/Saloon/PopularSaloon'



const MoreSaloon = () => {

 




  return (
    <DashboardLayout title={"More Saloon"}>
      <div className="w-full mx-auto">

        <h4 className="mx-auto mt-3 ">Popular Saloon</h4>
        <PopularSaloon />

        <MoreSaloonContent />
      </div>
    </DashboardLayout>
  )
}

export default MoreSaloon