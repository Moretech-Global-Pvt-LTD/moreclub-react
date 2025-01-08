import React from "react";
import { Button } from "react-bootstrap";

const StationOrderFoodCard = ({ item, rejectedItems, handleReject, orderStatus, rejectloading }) => {
  return (
    <div
      className={`station-order-card ${
        rejectedItems[item.id] ? "bg-danger" : ""
      }`}
      key={item.id}
    >
      <img
        src={item.food_item.image}
        alt={item.food_item.name}
        className="station-order-card-image"
      />
      <div
        className={`station-order-card-content ${
          rejectedItems[item.id] ? "text-white" : ""
        }`}
      >
        <div className="station-order-card-header">
          <div
            className={`station-order-card-restaurant ${
              rejectedItems[item.id] ? "text-white" : ""
            }`}
          >
            {item.food_item.name}
          </div>
        </div>
        <div
          className={`station-order-card-date line-clamp-1" ${
            rejectedItems[item.id] ? "text-white" : ""
          }`}
        >
          {item.food_item.short_description}{" "}
        </div>

        {/* <div className="station-order-card-food-name">{item.food_item.name}</div> */}
        <div className="station-order-card-footer">
          <div
            className={`station-order-card-received ${
              rejectedItems[item.id] ? "text-white" : ""
            }`}
          >
            <strong>QTY:</strong>
            <span
              className={`station-order-card-quantity ${
                rejectedItems[item.id] ? "text-white" : ""
              }`}
            >
              {item.quantity}
            </span>
          </div>

          <div
            className={`station-order-card-price ${
              rejectedItems[item.id] ? "text-white" : ""
            }`}
          >
            {" "}
            {item.food_item.currency_symbol}{" "}
            {parseFloat(item.food_item.retailer_price) * item.quantity}
          </div>
        </div>
        {orderStatus === "Pending" && 
        
        <div className="station-order-card-received my-2 justify-content-end">
          <Button
            size="sm"
            variant={rejectedItems[item.id] ? "warning" : "success"}
            disabled={rejectedItems[item.id]}
            onClick={() => handleReject(item)}
          >
            {rejectloading && <span className='spinner-border spinner-border-sm'></span>} 
            {rejectedItems[item.id] ? "Rejected" : "Reject"}
          </Button>
        </div>
        }
      </div>
    </div>
  );
};

export default StationOrderFoodCard;
