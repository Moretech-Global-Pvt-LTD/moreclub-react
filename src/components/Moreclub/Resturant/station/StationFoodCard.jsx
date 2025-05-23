import React, { useState } from "react";

import {  useParams } from "react-router-dom";
import { message } from "antd";

import { useQueryClient } from "@tanstack/react-query";
import { Modal } from "react-bootstrap";
import StationMenuFoodForm from "./StationMenuFoodForm";
import { useSelector } from "react-redux";
import { morefoodAuthenticatedAxios } from "../../../../utills/axios/morefoodaxios";

const StationFoodCard = ({
    foodid,
    logo,
    name,
    price,
    retailer_price,
    short_description,
    currency_Symbol,
    actual_price,
    discount_percentage,
    ingredient,
    isActive
}) => {
    const { id, menu_id, } = useParams();
    const queryClient = useQueryClient();
    const [showForm, setShowForm] = useState();
    const user = useSelector((state) => state.userReducer);

    const [hidemenu, setHideMenu] = useState(false)


    async function handleDelete() {
        setHideMenu(true)
        try {
            await morefoodAuthenticatedAxios
                .delete
                (`moreclub/station/${id}/${menu_id}/${foodid}/food-items/`)

            message.success("Menu Deleted successfully");
            queryClient.invalidateQueries({
                queryKey: [`Station Menu List for ${menu_id}`],
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


    const submit = async (datas) => {

        const formDatas = {
            name: datas.name,
            price: datas.price,
            retailer_price: datas.retailer_price,
            discount_price: datas.offerPrice,
            short_description: datas.short_description,
            ingredient: datas.ingredient,
            is_active: datas.isActive,
            ...(datas.image && { image: datas.image })
        }


        try {
            const response = await morefoodAuthenticatedAxios.patch(
                `moreclub/station/${id}/${menu_id}/${foodid}/food-items/`,
                formDatas,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            queryClient.invalidateQueries({
                queryKey: [`Station Menu List for ${menu_id}`],
            });

            return response; // Return the response directly
        } catch (error) {
            console.error("There was an error submitting the form:", error);
            throw error; // Rethrow the error to be caught in the calling function
        }
    };

    const initialValues = {
        name: name,
        price: actual_price ? actual_price : price,
        retailer_price: retailer_price,
        short_description: short_description,
        actual_price: actual_price ? price : actual_price,
        discount_percentage: discount_percentage,
        ingredient: ingredient,
        image: logo,
        isActive: isActive
    };


    return (
        <>
            <div className={`food-card ${hidemenu && "d-none"} `}>
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
                    {user.isSuperAdmin &&
                        <div className="actionButtons">
                            <button className=" bookmark-icon delete-button " onClick={handleDelete}>&#128465;</button>
                            <button className=" bookmark-icon edit-button" onClick={() => showAddCategory()}>&#9997;</button>
                        </div>
                    }
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
                    <StationMenuFoodForm onSubmit={submit} initialData={initialValues} onCancel={hideAddCategory} ButtonText={"Update Menu Items"} onFinish={hideAddCategory} />
                </Modal.Body>
            </Modal>


        </>
    );
};

export default StationFoodCard;
