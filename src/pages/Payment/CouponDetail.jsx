import React from 'react'
import CouponCard from '../../components/coupon/CouponCard'

const CouponDetail = ({coupon}) => {
  return (
    <div class="col-12 col-xxl-4 col-xl-4 col-lg-4 mt-2">
    <div class="animated fadeInUp" style={{ animationDuration: "1s" }}>
      <CouponCard
        key={coupon.couponDetail.id}
        coupon={coupon.couponDetail}
      />
    </div>
  </div>
  )
}

export default CouponDetail
