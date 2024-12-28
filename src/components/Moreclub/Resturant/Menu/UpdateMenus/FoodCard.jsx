import React, { useState } from 'react'
import MenuDetailUpdateForm from './MenuDetailUpdate'

const FoodCard = ({item}) => {
  const [edit , setEdit] = useState(false)


  return (
    <>
    {!edit ?
    <div className='food-card-cover'>
    <div className="food-card">
        <div className="food-card-image-container bg-secondary">
      <img src={item.image} alt={item.name} className="food-card-image bg-secondary" />
             
      </div>
    <div className="food-card-body ps-2">
      {/* <Link to={`/resturant/${res_id}/${cat_id}/${id}`}> */}
        <h3 className="food-name">{item.name}</h3>
      {/* </Link> */}
      <p className="food-description line-clamp-1">{item.cuisine.map((item) => <span>{item.name}&nbsp;</span>)}</p>
      <span className="food-price">{item.currency_symbol}&nbsp;{item.item_price}{" "}
        <>
          {item.actual_price !== item.item_price && item.discount_percentage !== 0 && (
            <>
              <span
                className="text-dynamic-white"
                style={{ textDecorationLine: "line-through" }}
              >
                {item.currency_symbol}&nbsp;{item.actual_price}
              </span>
              <span className="text-dynamic-white text-end">
                {item.discount_percentage}% Off
              </span>
            </>
          )}
        </></span>

    </div>
    <div className="actionButtons">
        <button className=" bookmark-icon delete-button " 
        // onClick={handleDelete}
        >&#128465;</button>
        <button className=" bookmark-icon edit-button" 
        onClick={() => setEdit(true)}
        >&#9997;</button>
      </div> 
  </div>
     <div className="food-card-body ps-2">
      <p className="food-description">{item.short_description}</p>
      <h6 className="food-name">Ingredient</h6>
      <p className="food-description ">{item.ingredient}</p>
    </div>

    </div> 
    :  <div className='food-card-cover p-2'>
    
    
    <MenuDetailUpdateForm item={item}  onCancel={() => setEdit(false)}/>
  
    

    </div>  }

    </>
    
  )
}

export default FoodCard
