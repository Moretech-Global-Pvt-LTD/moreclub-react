import React, { useState } from "react";
import { Badge, Card, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { message } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { moresalonAuthenticatedAxios } from "../../../../utills/axios/moresalonaxios";
import ServiceForm from "./ServiceCreateForm";

const ServiceCard = ({ id, sal_id, logo, name, item, sal_name, icon }) => {
  const [showForm, setShowForm] = useState(false);
  const [isdeleting, setIsDeleting]= useState(false);

  const queryClient = useQueryClient();
  const slug = name.replace(/ /g, "-");

  async function handleDelete() {
    setIsDeleting(true)
    try {
      await moresalonAuthenticatedAxios.delete(
        `moreclub/users/saloons/${sal_id}/services/${id}/`
      );
      queryClient.invalidateQueries({
        queryKey: [`Saloon service List ${sal_id}`],
      });
      message.success("Services Deleted successfully");
    } catch (err) {
      message.error("error deleting");
      queryClient.invalidateQueries({
        queryKey: [`Saloon service List ${sal_id}`],
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

  const data = {
    id,
    logo,
    name,
    icon

  };

  return (
    <>
      <div
        className="d-flex flex-column position-relative"
        style={{ height: "100%" }}
      >
        <div className="position-absolute top-0 end-0 d-flex gap-2">
          <Badge
            className="bg-success "
            style={{ zIndex: 10, cursor: "pointer" }}
            onClick={() => showAddCategory()}
          >
            <i class="bi bi-pencil"></i>
          </Badge>
          <Badge
            className="bg-danger "
            style={{ zIndex: 10, cursor: "pointer" }}
            onClick={() => handleDelete()}
          >
           {isdeleting ? <span className="spinner-border spinner-border-sm"></span>: <i class="bi bi-trash"></i>}
          </Badge>
        </div>
        <Card className="nearby-offers-card flex-grow-1">
          <div className="mx-auto mt-2 mb-0">
            <img
              src={`${icon ?? logo }`}
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
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        size="md"
        centered
        show={showForm}
        onHide={hideAddCategory}
      >
        <Modal.Header>
          <Modal.Title
            id="contained-modal-title-vcenter text-center"
            className="text-dynamic-white"
          >
            Add Services
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ServiceForm
            initialValues={data}
            id={sal_id}
            onFinish={hideAddCategory}
            onCancel={hideAddCategory}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ServiceCard;
