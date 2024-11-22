import React, { useState } from "react";

import { Link, useParams } from "react-router-dom";
import { axiosInstance } from "../../../..";
import { message } from "antd";
import { imageURL, morefoodURL } from "../../../../config/config";
import { useQueryClient } from "@tanstack/react-query";
import { Modal } from "react-bootstrap";
import StationMyMenuItemsUpdateForm from "./StationMyMenuFoodItemsFormUpdate";

const StationFoodCard = ({
    cuisineOption,
    foodid,
    logo,
    name,
    price,
    short_description,
    currency_Symbol,
    actual_price,
    discount_percentage,
    ingredient,
    retailer_price,
    menu
}) => {
    const { resid, stationid} = useParams();
    const queryClient = useQueryClient();
    const [showForm, setShowForm] = useState();

    const [hidemenu, setHideMenu] = useState(false)


    async function handleDelete() {
        setHideMenu(true)
        try {
            await axiosInstance
                .delete
                (`${morefoodURL}moreclub/station/${stationid}/${resid}/${foodid}/food-items/restro/update/`)

            message.success("Menu Deleted successfully");
            queryClient.invalidateQueries({
                queryKey: [`Nearby Station my menu ${stationid}`],
            });
        } catch (err) {
            message.error("error deleting ");
            setHideMenu(false)
        }
    }

    async function showAddCategory() {
        setShowForm(true);
    }

    async function hideAddCategory() {
        setShowForm(false);
    }


    const initialValues = {
        name: name,
        price: price,
        retailer_price: retailer_price,
        short_description: short_description,
        actual_price: actual_price,
        discount_percentage: discount_percentage,
        ingredient: ingredient,
        image: logo,
        menu: menu
    };
    


    return (
        <>
            <div className={`food-card ${hidemenu && "d-none"} `}>
                <div className="food-card-body">
                    {/* <Link to={`/resturant/${res_id}/${cat_id}/${id}`}> */}
                    <h3 className="food-name">{name}</h3>
                    {/* </Link> */}
                    <span className="food-price">{currency_Symbol}&nbsp;{retailer_price}</span>
                    {/* <span className="food-price">{currency_Symbol}&nbsp;{price}{" "}
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
                        </></span> */}
                    <p className="food-description line-clamp-1">{short_description}</p>
                    <p className="food-description"><strong>Menu:</strong> {menu}</p>
                </div>
                <div className="food-card-image-container bg-secondary">
                    <img src={logo} alt={name} className="food-card-image bg-secondary" />
                    <div className="actionButtons">
                        <button className=" bookmark-icon delete-button " onClick={handleDelete}>&#128465;</button>
                        <button className=" bookmark-icon edit-button" onClick={() => showAddCategory()}>&#9997;</button>
                    </div>
                </div>
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
                        Update Station MenuItems
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <StationMyMenuItemsUpdateForm food_id={foodid} res_id={resid} stationId={stationid} onFinish={hideAddCategory}  data={initialValues}  cuisineOption={cuisineOption} />
                </Modal.Body>
            </Modal>
        </>
    );
};

export default StationFoodCard;
