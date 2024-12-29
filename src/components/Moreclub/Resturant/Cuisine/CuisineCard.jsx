import React from "react";
import {Badge, Button, Modal } from "react-bootstrap";
// import { Link, useParams } from "react-router-dom";
// import { morefoodimageURL, morefoodURL } from "../../../../config/config";
// import { axiosInstance } from "../../../..";
// import { message } from "antd";
import UpdateCuisineForm from "./UpdateCuisine";
import { axiosInstance } from "../../../..";
import { morefoodURL } from "../../../../config/config";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { removeCuisine } from "../../../../redux/slices/MenuSlice";

const CuisineCard = ({ res_id, logo, name, items }) => {
  const [showCuisineForm, setShowCuisineForm] = React.useState(false);
  const [showDelete, setShowDelete] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);
  const dispatch = useDispatch();

  async function showDeleteModal(){
    setShowDelete(true)
  }


  async function showAddCuisine() {
    setShowCuisineForm(true);
  }

  async function hideAddCuisine() {
    setShowCuisineForm(false);
  }

  async function handleDelete() {
    try {
      setDeleting(true)
      await axiosInstance.delete(
        `${morefoodURL}moreclub/user/cuisines/update/${items.id}/${res_id}/`
      );
      dispatch(removeCuisine({ id: items.id }));
      // queryClient.invalidateQueries({
      //   queryKey: [`Resturant Cuisine List ${res_id}`],
      // });
      message.success("Menu Deleted successfully");
    } catch (err) {
      message.error("error deleting");
    }finally{
      setDeleting(false)
    }
  }

  return (
    <>
      <div onClick={showAddCuisine} className="cuisine-card">
      <div className="cuisine-card-action">
      <Badge className="cuisine-card-delete bg-danger" onClick={showDeleteModal}>
        <i class="bi bi-trash"></i>
      </Badge>
      <Badge className="cuisine-card-edit bg-primary mt-2" onClick={showAddCuisine}>
        <i class="bi bi-pencil"></i>
      </Badge>

        </div>
        <img src={logo} alt={name} className="cuisine-card-image" />
        <div className="cuisine-card-content">
          <p className="cuisine-card-title">{name}</p>
        </div>
      </div>

      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        size="md"
        centered
        show={showDelete}
        onHide={() => setShowDelete(false)}
      >
        <Modal.Header>
          <Modal.Title
            id="contained-modal-title-vcenter text-center"
            className="text-dynamic-white"
          >
            <h4>Delete {name} Menu</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6 className="text-center">Are you sure you want to delete this Cuisine?</h6>
          <p className="text-justify text-danger">This action cannot be undone</p>
          <div className="d-flex justify-content-center gap-2">
          <Button variant="secondary" onClick={() => setShowDelete(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>
            {deleting && <span className="spinner-border spinner-border-sm"></span>}
            Delete
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        size="md"
        centered
        show={showCuisineForm}
        onHide={hideAddCuisine}
      >
        <Modal.Header>
          <Modal.Title
            id="contained-modal-title-vcenter text-center"
            className="text-dynamic-white"
          >
            Update Cuisines
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <UpdateCuisineForm res_id={res_id} data={items}  onCancel={hideAddCuisine}/>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CuisineCard;
