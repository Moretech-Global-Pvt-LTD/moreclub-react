import React, { useState } from "react";

import { Link, useParams } from "react-router-dom";
import { axiosInstance } from "../../../..";
import { message } from "antd";
import { morefoodURL } from "../../../../config/config";
import { useQueryClient } from "@tanstack/react-query";
import { Modal } from "react-bootstrap";
import FoodItemForm from "./FoodItemForm";
// import DefaultImage from "../../../../images/logo/MembersClubblack.png"

const MenuCard = ({
  data,
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

  const [showForm, setShowForm] = useState();

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

  async function showAddCategory() {
    setShowForm(true);
  }

  async function hideAddCategory() {
    setShowForm(false);
  }

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
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        size="lg"
        centered
        show={showForm}
        onHide={hideAddCategory}
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter text-center" className="text-dynamic-white">
            Update MenuItems
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FoodItemForm data={data} onCancel={hideAddCategory} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MenuCard;
