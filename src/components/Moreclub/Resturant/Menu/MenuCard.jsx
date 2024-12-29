import React, { useState } from "react";

import { Link, useParams } from "react-router-dom";
import { axiosInstance } from "../../../..";
import { message } from "antd";
import { morefoodURL } from "../../../../config/config";
import { useQueryClient } from "@tanstack/react-query";

const MenuCard = ({
  menu,
  cuisine,
  data,
  id,
  slug,
}) => {
  const { res_id} = useParams();
  const queryClient = useQueryClient();
  const [deleting, setDeleting] = useState(false)


  async function handleDelete() {
    setDeleting(true)
    try {
      await axiosInstance
        .delete
        (`${morefoodURL}moreclub/user/food/items/${data.menu_id}/${data.id}/${res_id}/`)

      message.success("Menu Deleted successfully");
      queryClient.invalidateQueries({
        queryKey: [`Restaurant All Menu ${res_id}`, menu, cuisine],
      });
    } catch (err) {
      message.error("error deleting ");
    }finally{
      setDeleting(false)
    }
  }

  return (
    <>
      <div className="food-card">
        <div className="food-card-body">
            <h3 className="food-name">{data.name}</h3>
          <span className="food-price">{data.currency_Symbol}&nbsp;{data.item_price}{" "}
            <>
              {data.actual_price !== data.item_price && data.discount_percentage !== 0 && (
                <>
                  <span
                    className="text-dynamic-white"
                    style={{ textDecorationLine: "line-through" }}
                  >
                    {data.currency_Symbol}&nbsp;{data.actual_price}
                  </span>
                  <span className="text-dynamic-white text-end">
                    {data.discount_percentage}% Off
                  </span>
                </>
              )}
            </></span>
          <p className="food-description line-clamp-1">{data.short_description}</p>
        </div>
        <div className="food-card-image-container bg-secondary">
          <img src={data.image} alt={data.name} className="food-card-image bg-secondary" />
          <div className="actionButtons">
            <button className=" bookmark-icon delete-button " onClick={handleDelete}>{deleting ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : ""} &#128465;</button>
            <Link to={`/resturant/${res_id}/fooditem/${id}/${slug}/detail`}>
            <button className=" bookmark-icon edit-button">&#9997;</button>
            </Link>
          </div> </div>
      </div>
    </>
  );
};

export default MenuCard;
