import React from 'react'
import { Link } from 'react-router-dom'

const CheckUserDiscounts = () => {


  return (
    <div className='card bg-warning mt-2 p-3'>
      <div className="text-black text-center" style={{fontSize:"13px"}}>
            You haven't set your discounts for <br/><strong>MORE DEALS CLUB</strong><br/> users
          </div>
          <Link
          className="btn btn-danger rounded-pill btn-sm w-100 "
          to="/business-profile?q=true"
        >
           Add discounts
        </Link>
    </div>
  )
}

export default CheckUserDiscounts
