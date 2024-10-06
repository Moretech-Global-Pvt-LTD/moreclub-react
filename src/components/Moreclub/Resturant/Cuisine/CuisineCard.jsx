import React from "react";
import { Badge, Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { morefoodimageURL, morefoodURL } from "../../../../config/config";
import { axiosInstance } from "../../../..";
import { message } from "antd";
import { useQueryClient } from "@tanstack/react-query";

const CuisineCard = ({ id, res_id, logo, name, item }) => {
    const { slug:rest_name } = useParams();
    const queryClient = useQueryClient();
    const slug = name.replace(" ", "-");

    async function handleDelete() {
        try {
            await axiosInstance.delete(
                `${morefoodURL}moreclub/user/menus/${id}/${res_id}/`
            );
            queryClient.invalidateQueries({
                queryKey: [`Resturant Cuisine List ${res_id}`],
            });
            message.success("Menu Deleted successfully");
        } catch (err) {
            message.error("error deleting");
            queryClient.invalidateQueries({
                queryKey: [`Resturant Cuisine List ${res_id}`],
            });
        }
    }

    return (
    
        
    
  <Link to={`/resturant/${res_id}/cuisine/${id}/${rest_name}/${slug}`}  className="cuisine-card">
    
    <img src={logo} alt={name} className="cuisine-card-image"/>
    <div className="cuisine-card-content">
      <p className="cuisine-card-title">{name}</p>
    </div>
  
</Link>

 
    );
};

export default CuisineCard;
