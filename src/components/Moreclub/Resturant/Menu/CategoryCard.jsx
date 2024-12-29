import React from "react";
// import { Badge, Card, Modal} from "react-bootstrap";
import { morefoodURL } from "../../../../config/config";
import { axiosInstance } from "../../../..";
import { message } from "antd";
import { Badge, Button, Modal } from "react-bootstrap";
import MenuCategoryAddForm from "../common/MenuCategoryAddForm";
import { useDispatch } from "react-redux";
import { removeMenu, updateMenu } from "../../../../redux/slices/MenuSlice";

const CategoryCard = ({ id, res_id, logo, name, item, data, slug }) => {
  const [showCuisineForm, setShowCuisineForm] = React.useState(false);
  const [showDelete, setShowDelete] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);
  const dispatch = useDispatch();

  const submit = async (data) => {
    try {
      const response = await axiosInstance.patch(
        `${morefoodURL}moreclub/user/menus/${id}/${res_id}/`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(updateMenu({ menu: response.data.data }));
      return response; // Return the response directly
    } catch (error) {
      console.error("There was an error submitting the form:", error);
      throw error; // Rethrow the error to be caught in the calling function
    }
    };

  
   async function handleDelete() {
    setDeleting(true)
     try {
       await axiosInstance.delete(
         `${morefoodURL}moreclub/user/menus/${id}/${res_id}/`
       );
       dispatch(removeMenu({ id: id }));
       message.success("Menu Deleted successfully");
     } catch (err) {
       message.error("error deleting");
     }finally{
      setDeleting(false)
     }
   }
  

  async function showAddCuisine() {
    setShowCuisineForm(true);
  }

  async function hideAddCuisine() {
    setShowCuisineForm(false);
  }

  return (
    <>
      <div className="cuisine-card">
        <div className="cuisine-card-action">
      <Badge className="cuisine-card-delete bg-danger" onClick={() => setShowDelete(true)}>
        <i class="bi bi-trash"></i>
      </Badge>
      <Badge className="cuisine-card-edit bg-primary" onClick={showAddCuisine}>
        <i class="bi bi-pencil"></i>
      </Badge>

        </div>
        <img src={logo} alt={name} className="cuisine-card-image bg-white" />
        <div className="cuisine-card-content">
          <p className="cuisine-card-title mb-0">{name}</p>
          <p className="cuisine-card-items my-0 text-warning">{item} items</p>
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
          <h6 className="text-center">Are you sure you want to delete this menu?</h6>
          <p className="text-justify text-danger">All items in this menu will be deleted. this action cannot be undone</p>
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
            Update Menu
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <MenuCategoryAddForm
            onSubmit={submit}
            onFinish={hideAddCuisine}
            onCancel={hideAddCuisine}
            initialMenuName={name}
            initialMenuImage={logo}
            buttonText="Update Menu"
          />
        </Modal.Body>
       </Modal>
    </>
  

  );
};

export default CategoryCard;



