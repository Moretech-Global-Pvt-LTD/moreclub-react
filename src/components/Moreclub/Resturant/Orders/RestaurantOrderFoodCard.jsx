import React from "react";

const RestaurantOrderFoodCard = ({ item, currency }) => {
  return (
    <div className="station-order-card my-2" key={item.id}>
      <img
        src={item.image}
        alt={item.name}
        className="station-order-card-image"
      />
      <div className="station-order-card-content">
        <div className="station-order-card-header">
          <div className="station-order-card-restaurant">{item.name}</div>
        </div>

        <div className="station-order-card-date">{item?.description} </div>

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
  );
};

export default RestaurantOrderFoodCard;
