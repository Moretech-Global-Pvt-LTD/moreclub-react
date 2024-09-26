import React from "react";
import { Badge, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { morefoodimageURL, morefoodURL, moresaloonURL } from "../../../../config/config";
import { axiosInstance } from "../../../..";
import { message } from "antd";
import { useQueryClient } from "@tanstack/react-query";

const ServiceCard = ({ id, sal_id, logo, name, item , sal_name}) => {

    const queryClient = useQueryClient();
    const slug = name.replace(/ /g, "-");

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
        <div className="d-flex flex-column position-relative" style={{ height: "100%" }}>
            <Badge className="bg-danger position-absolute top-0 end-0" style={{ zIndex: 10, cursor: "pointer" }} onClick={() => handleDelete()}>
                <i class="bi bi-trash"></i>
            </Badge>
            <Card className="nearby-offers-card flex-grow-1">
                <div className="mx-auto mt-2 mb-0">
                    <img
                        src={`${morefoodimageURL}${logo}`}
                        style={{
                            width: "60px",
                            height: "60px",
                            objectFit: "contain",
                            backgroundColor: "#fff",
                        }}
                        alt="Profile"
                        className="img-fluid rounded-circle mb-3 profile-image"
                    />
                </div>
                <Link to={`/saloon/${sal_id}/service/${id}/${sal_name}/${slug}`}>
                    <Card.Body className="pt-0">
                        <Card.Title className="text-dynamic-white text-center line">
                            {name}
                        </Card.Title>
                        <Card.Text className="text-warning">{item} items</Card.Text>
                    </Card.Body>
                </Link>
            </Card>
        </div>
    );
};

export default ServiceCard;
