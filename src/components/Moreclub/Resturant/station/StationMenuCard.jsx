import React, { useState } from "react";
import { Badge, Card, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import MenuCategoryAddForm from "../common/MenuCategoryAddForm";
import { morefoodAuthenticatedAxios } from "../../../../utills/axios/morefoodaxios";

const StationMenuCard = ({ id, slug, stationId, logo, name, item }) => {

    const menuslug = name.replace(/ /g, "-");
    const [showForm, setShowForm] = useState();
    const queryClient = useQueryClient();
    async function showAddCategory() {
        setShowForm(true);
    }

    async function hideAddCategory() {
        setShowForm(false);
    }

    const submit = async (datas) => {
        name = datas.name
        logo = datas.logo && URL.createObjectURL(datas.logo)
        try {
            const response = await morefoodAuthenticatedAxios.patch(
                `moreclub/station/menu/${id}/update/`,
                datas,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            queryClient.invalidateQueries({
                queryKey: [`Station Menu List  ${stationId}`],
            });

            return response; // Return the response directly
        } catch (error) {
            console.error("There was an error submitting the form:", error);
            throw error; // Rethrow the error to be caught in the calling function
        }
    };
 


    return (
        <>
        <div className="d-flex flex-column position-relative" style={{ height: "100%" }}>
            <Badge className="bg-success position-absolute top-0 end-0" style={{ zIndex: 10, cursor: "pointer" }}  onClick={() => showAddCategory()}>
                <i class="bi bi-pen"></i>
            </Badge>
            <Card className="nearby-offers-card flex-grow-1">
                <div className="mx-auto mt-2 mb-0">
                    <img
                        src={`${logo}`}
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
                    <Link to={`/station/${stationId}/menu/${slug}/${id}/${menuslug}`}>
                    <Card.Body className="pt-0">
                        <Card.Title className="text-dynamic-white text-center line">
                            {name}
                        </Card.Title>
                            <Card.Text className="text-warning">{item} items</Card.Text>
                    </Card.Body>
                </Link>
            </Card>
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
                        Update Station Menu
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <MenuCategoryAddForm
                        onSubmit={submit}
                        onFinish={hideAddCategory}
                        onCancel={hideAddCategory}
                        initialMenuName={name}
                        initialMenuImage={logo}
                        buttonText="Update"
                    />
                </Modal.Body>
            </Modal>
        </>
    );
};

export default StationMenuCard;
