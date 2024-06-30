import React from 'react'
import { useSelector } from 'react-redux'

import { Link } from 'react-router-dom'

const CouponCards = ({ coupon }) => {
  const currency = useSelector((state)=>state.currencyReducer.currencyDetail)
  return (
    
    <Link to={"#"} class="nft-card card shadow-sm mb-4">
      <div class="card-body">
        <div class="row align-items-center g-3">
          <div class="col-12">
            <div class="meta-info">
              <div class="name-info d-flex align-items-center mb-3">
                <div class="author-img position-relative">
                  <img
                    class="shadow"
                    src="https://static.vecteezy.com/system/resources/previews/009/342/078/non_2x/discount-coupon-icon-sign-design-free-png.png"
                    alt="designing_world"
                  />
                  <i class="bi bi-check position-absolute bg-success true"></i>
                </div>
                <div class="name-author">
                  <span
                    class="name d-block hover-primary text-truncate "
                    // href={`/buy/coupon/${coupon.id}`}
                  >
                    {coupon.code}: {currency.symbol}&nbsp;{coupon.balance} 
                  </span>
                  <a
                    class="author d-block fz-12 hover-primary text-truncate"
                    href="/author/designing_world"
                  >
                    Expired at: <i className="bi bi-calendar-date" />{" "}
                    {coupon.expiry_date.slice(0,10)} at {coupon.expiry_date.slice(11,16)}
                  </a>
                </div>
              </div>
              {/* <div class="price-bid d-flex align-items-center">
                <div class="price me-2 me-sm-3">
                  <h6 class="mb-0 d-inline-block fz-14 border border-2 rounded py-1 px-2">
                    Coupon value ${coupon.balance} 
                  </h6>
                </div>
                <a
                  class="btn btn-danger btn-sm rounded-pill text-white d-flex align-items-end"
                  href={`/buy/coupon/${coupon.id}`}
                >
                  <i className="bi bi-cart-plus"></i> Buy ${coupon.balance}
                </a>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CouponCards
