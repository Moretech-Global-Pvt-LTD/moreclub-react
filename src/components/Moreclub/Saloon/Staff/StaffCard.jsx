import React, { useState } from "react";
import { Badge, Card, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { moresaloonimageURL, moresaloonURL } from "../../../../config/config";
import { axiosInstance } from "../../../..";
import { message } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import StaffUpdateForm from "./StaffUpdateForm";
// import ServiceUpdateForm from "./ServiceUpdateForm";

const StaffCard = ({ id, sal_id, profile, name, item, email, contact, services, sal_name }) => {
    const [showForm, setShowForm] = useState(false);

    const queryClient = useQueryClient();

    const staffName = name.replace(/ /g, "-");

    console.log("item", services);
    async function handleDelete() {
        try {
            await axiosInstance.delete(
                `${moresaloonURL}moreclub/users/saloons/${sal_id}/staff/${id}/`
            );
            queryClient.invalidateQueries({
                queryKey: [`Saloon Staff List ${sal_id}`],
            });
            message.success("Services Deleted successfully");
        } catch (err) {
            message.error("error deleting");
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
            <div className="staff-card">
                <div className="staff-profile-pic">
                    <img src={profile} alt={profile} />
                </div>
                <div className="staff-info">
                    <h3 className="staff-name">{name}</h3>
                    <p className="staff-info ">{email}</p>
                    <p className="staff-info ">{contact}</p>
                    <div className="staff-services">
                        {services &&  services.length > 0 && services.map((item) => (
                            <span className="staff-badge">{item.name}</span>
                        ))
                        }
                    </div>
                    <div class="service-variation-footer">
                        <div class="service-variation-admin">
                            <Link to={`/saloon/${sal_id}/${sal_name}/staff/${id}/${staffName}`}>
                            <button class="service-variation-edit">
                                <i class="bi bi-eye"></i>
                            </button>
                            </Link>
                            <button class="service-variation-edit" onClick={showAddCategory}>
                                <i class="bi bi-pencil"></i>
                            </button>
                            <button class="service-variation-delete" onClick={handleDelete}>
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                        {/* <span class="service-variation-time">{hours !== '00' ? `${hours} hrs ${minutes} min ` : `${minutes} min `} </span> */}
                    </div>
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
                    <StaffUpdateForm data={item} sal_id={sal_id} id={item.id} onFinish={hideAddCategory} onCancel={hideAddCategory} />
                </Modal.Body>
            </Modal>
        </>

    );
};

export default StaffCard;
