import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const UpdateMenuForm = ({ initialMenu }) => {
  const { res_id } = useParams();
  const dispatch = useDispatch();
  console.log(initialMenu);

  const menus = useSelector((state) => state.menus);

  

  return (
    <>
    <div className="food-card">
        <div className="food-card-body">
          {/* <Link to={`/resturant/${res_id}/${cat_id}/${id}`}> */}
            <h3 className="food-name">{name}</h3>
          {/* </Link> */}
          <span className="food-price">{currency_Symbol}&nbsp;{price}{" "}
            <>
              {actual_price !== price && discount_percentage !== 0 && (
                <>
                  <span
                    className="text-dynamic-white"
                    style={{ textDecorationLine: "line-through" }}
                  >
                    {currency_Symbol}&nbsp;{actual_price}
                  </span>
                  <span className="text-dynamic-white text-end">
                    {discount_percentage}% Off
                  </span>
                </>
              )}
            </></span>
          <p className="food-description line-clamp-1">{short_description}</p>

        </div>
        <div className="food-card-image-container bg-secondary">
          <img src={logo} alt={name} className="food-card-image bg-secondary" />
          <div className="actionButtons">
            <button className=" bookmark-icon delete-button " onClick={handleDelete}>&#128465;</button>
            <button className=" bookmark-icon edit-button" onClick={() => showAddCategory()}>&#9997;</button>
          </div>        </div>
    </div>      

    </>
  );
};

export default UpdateMenuForm;
