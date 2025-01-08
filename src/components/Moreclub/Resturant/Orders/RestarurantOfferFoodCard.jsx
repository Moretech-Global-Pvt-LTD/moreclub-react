import React from 'react'
import { Badge } from 'react-bootstrap'

const RestarurantOfferFoodCard = ({ item, currency }) => {
  return (
    <div className="station-order-card my-2" key={item.id}>
      <img
        src={item.offer.banner}
        alt={item.offer.name}
        className="station-order-card-image bg-white"
      />
      <div className="station-order-card-content">
        <div className="station-order-card-header">
          <div className="station-order-card-restaurant">{item.offer.name}</div>
        </div>

        <div className="station-order-card-date line-clamp-1">{item?.offer.description} </div>
        <div className="d-flex flex-wrap justify-content-start gap-2">{item?.offer.food_item.map((item) => <Badge className='my-1'>{item.name} ({item.value})&nbsp;</Badge>)} </div>

        <div className="station-order-card-footer">
          <div className="station-order-card-received">
            <span className="station-order-card-quantity">{item.quantity}</span>
          </div>
          <div className="station-order-card-price">
            {currency} {item.price}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RestarurantOfferFoodCard
