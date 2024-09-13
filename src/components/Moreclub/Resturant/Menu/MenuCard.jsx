import React from "react";

import { Link, useParams } from "react-router-dom";
import { axiosInstance } from "../../../..";
import { message } from "antd";
import { morefoodURL } from "../../../../config/config";
import { useQueryClient } from "@tanstack/react-query";
import DefaultImage from "../../../../images/logo/MembersClubblack.png"

const MenuCard = ({
  id,
  logo,
  name,
  price,
  short_description,
  currency_Symbol,
  actual_price,
  discount_percentage,
}) => {
  const { res_id, cat_id } = useParams();
  const queryClient = useQueryClient();


  async function handleDelete() {
    try {
      await axiosInstance
        .delete
        // `${morefoodURL}moreclub/user/menus/${id}/${res_id}/`
        (`${morefoodURL}moreclub/user/food/items/${cat_id}/${id}/${res_id}/`)

      message.success("Menu Deleted successfully");
      queryClient.invalidateQueries({
        queryKey: [`Resturant SubMenu List ${cat_id}`],
      });
    } catch (err) {
      message.error("error deleting ");
    }
  }

  return (
    <>
     

      <div className="food-card">
        <div className="food-card-body">
          <Link to={`/resturant/${res_id}/${cat_id}/${id}`}>
            <h3 className="food-name">{name}</h3>
          </Link>
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
          <button className=" bookmark-icon delete-button " onClick={handleDelete}>&#128465;</button>
        </div>
      </div>



    </>
  );
};

export default MenuCard;
