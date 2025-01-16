

import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { message } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import ServiceVariationUpdateForm from "./ServicevariationUpdateForm";
import Defaultimage from "../../../../images/logo/MembersClubblack.png"
import { moresalonAuthenticatedAxios } from "../../../../utills/axios/moresalonaxios";

const ServiceVariationCard = ({ id, sal_id, ser_id, item }) => {
    const [hours, minutes, seconds] = item.duration.split(":");
    const [showForm, setShowForm] = useState(false);
    const [isDeleting , setIsDeleting]= useState(false)

    const queryClient = useQueryClient();
    // const slug = name.replace(/ /g, "-");

    async function handleDelete() {
        setIsDeleting(true)
        try {
            await moresalonAuthenticatedAxios.delete(
                `moreclub/users/saloons/${sal_id}/services/${ser_id}/variations/${item.id}/`
            );
            queryClient.invalidateQueries({
                queryKey: [`Saloon variation List ${sal_id} ${ser_id}`],
            });
            message.success("Service Variation Deleted successfully");
        } catch (err) {
            message.error("error deleting");
            queryClient.invalidateQueries({
                queryKey: [`Saloon variation List ${sal_id} ${ser_id}`],
            });
        }finally{
            setIsDeleting(false)
        }
    }

    async function showAddCategory() {
        setShowForm(true);
    }

    async function hideAddCategory() {
        setShowForm(false);
    }

    return (
        <div class="service-variation-card">
            {(item?.images && item?.images[0] && item?.images[0].image) ?
                <img src={item.images[0].image} alt="Service-Image" class="service-variation-image" />
                : <img src={Defaultimage} alt="Service-Image" class="service-variation-image bg-white" />
            }
            <div class="service-variation-content">
                <h3 class="service-variation-title">{item.name}</h3>
                <p class="service-variation-price">{item.discount_price ? `${item.currency} ${item.discount_price}` : `${item.currency} ${item.price}`}{" "}{<span style={{ textDecoration: "line-through" }}>{item.discount_price && `Rs.${item.price}`}</span>}</p>
                <p class="service-variation-description">
                    {item.description}
                </p>
                <div class="service-variation-footer">
                    <div class="service-variation-admin">
                        <button class="service-variation-edit" onClick={showAddCategory}>
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="service-variation-delete" disabled={isDeleting} onClick={handleDelete}>
                           {isDeleting ? <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : <i class="bi bi-trash"></i>} 
                        </button>
                    </div>
                    <span class="service-variation-time">{hours !== '00' ? `${hours} hrs ${minutes} min ` : `${minutes} min `} </span>
                </div>
            </div>
            <Modal
                aria-labelledby="contained-modal-title-vcenter"
                size="md"
                centered
                show={showForm}
                onHide={hideAddCategory}

            >

                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter text-center" className="text-dynamic-white">
                        Add Services
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ServiceVariationUpdateForm ser_id={ser_id} sal_id={id} data={item} onFinish={hideAddCategory} onCancel={hideAddCategory} />
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ServiceVariationCard;
