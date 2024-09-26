

import React from "react";
import { Badge, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { morefoodimageURL, morefoodURL, moresaloonURL } from "../../../../config/config";
import { axiosInstance } from "../../../..";
import { message } from "antd";
import { useQueryClient } from "@tanstack/react-query";

const ServiceVariationCard = ({ id, sal_id, logo, name, item , sal_name}) => {

    const queryClient = useQueryClient();
    // const slug = name.replace(/ /g, "-");

    async function handleDelete() {
        try {
            await axiosInstance.delete(
                `${moresaloonURL}moreclub/user/menus/${id}/${sal_id}/`
            );
            queryClient.invalidateQueries({
                queryKey: [`Resturant Menu List ${sal_id}`],
            });
            message.success("Menu Deleted successfully");
        } catch (err) {
            message.error("error deleting");
            queryClient.invalidateQueries({
                queryKey: [`Resturant Menu List ${sal_id}`],
            });
        }
    }

    return (
        <div class="service-variation-card">
    <img src="path_to_image" alt="Service Image" class="service-variation-image"/>
    <div class="service-variation-content">
        <h3 class="service-variation-title">Chemical Peels</h3>
        <p class="service-variation-price">$20.00</p>
        <p class="service-variation-description">
            Cleansing and moisturizing the skin is important for many people. Properly maintaining your skin can...
        </p>
        <div class="service-variation-footer">
            <div class="service-variation-admin">
                <button class="service-variation-edit">
                    <i class="bi bi-pencil"></i> 
                </button>
                <button class="service-variation-delete">
                    <i class="bi bi-trash"></i> 
                </button>
            </div>
            <span class="service-variation-time">20:00 min</span>
        </div>
    </div>
</div>
    );
};

export default ServiceVariationCard;
