import React, { useState } from "react";
import RelatedFoodItemsForm from "./RelatedFoodItemsForm";
import { Button } from "react-bootstrap";

const RelatedFoodItem = ({ item }) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <div className="d-flex align-items-center justify-content-between "
      style={{maxWidth:"500px"}}
      >
        <h6 className="text-dynamic-white my-3">Related Food Items</h6>
        {item.related_food_items_data &&
        item.related_food_items_data.length !== 0 && <button
          className=" edit-varient-button"
          onClick={() => setShowForm(true)}
        >
          &#9997;
        </button>
        }
      </div>

      {showForm ? (
        <RelatedFoodItemsForm item={item} food_id={item.id} onCancel={()=>setShowForm(false)} />)
        :
        <div className="related-card-container">
        {item.related_food_items_data &&
        item.related_food_items_data.map((items) => <FoodCard item={items} />)}

        {item.related_food_items_data &&
        item.related_food_items_data.length === 0 && (
          <div className="d-flex flex-column justify-content-center">

          <p className="text-center">No Related Food Items</p>
          <Button className="mt-2" size="sm" onClick={() => setShowForm(true)} variant="warning">Add Related Food Items</Button>
          </div>
        )}
        </div>
      }

      

        
    </>
  );
};

export default RelatedFoodItem;

const FoodCard = ({ item }) => {
  return (
    <div className="food-card">
      <div className="food-card-body">
        {/* <Link to={`/resturant/${res_id}/${cat_id}/${id}`}> */}
        <h3 className="food-name">{item.name}</h3>
        {/* </Link> */}
        <span className="food-price">
          {item.currency_symbol}&nbsp;{item.price}{" "}
          <>
            {item.discount_price !== item.price &&
              Number(item.discount_price) !== 0 && (
                <>
                  <span
                    className="text-dynamic-white"
                    style={{ textDecorationLine: "line-through" }}
                  >
                    {item.currency_symbol}&nbsp;{item.price}
                  </span>
                  {/* <span className="text-dynamic-white text-end">
                    {discount_percentage}% Off
                  </span> */}
                </>
              )}
          </>
        </span>
        {/* <p className="food-description line-clamp-1">{short_description}</p> */}
      </div>
      <div className="variaent-card-image-container bg-secondary">
        <img
          src={item.image}
          alt={item.name}
          className="variaent-card-image bg-secondary"
        />
        <div className="actionButtons">
          {/* <button className=" bookmark-icon delete-button " onClick={handleDelete}>&#128465;</button> */}
          {/* <Link to={`/resturant/${res_id}/fooditem/${id}/${slug}/detail`}>
            <button className=" bookmark-icon edit-button">&#9997;</button>
            </Link> */}
        </div>
      </div>
    </div>
  );
};
