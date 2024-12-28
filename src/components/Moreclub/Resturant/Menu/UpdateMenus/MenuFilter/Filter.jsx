import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import MenuCategoryAddForm from "../../../common/MenuCategoryAddForm";
import AddCuisineForm from "../../../Cuisine/AddCuisine";
import { axiosInstance } from "../../../../../..";
import { morefoodURL } from "../../../../../../config/config";
import { addMenu } from "../../../../../../redux/slices/MenuSlice";

const Filter = ({ onFilterChange, onViewChange }) => {
  const { res_id, slug } = useParams();
  const [menu, setMenu] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [showMenuForm, setShowMenuForm] = useState(false);
  const [showMenus, setShowMenus] = useState(false);
  const [showCuisines, setShowCuisines] = useState(false);

  const [showCuisineForm, setShowCuisineForm] = useState(false);
  const dispatch = useDispatch();

  const menus = useSelector((state) => state.menus);

  const handleMenuChange = (e) => {
    const selectedMenu = e.target.value;
    setMenu(selectedMenu);
    const name = menus.menuList.filter((menu) => menu.id === selectedMenu)[0]
      .name;
    setCuisine(""); // Reset cuisine when menu is selected
    if (onFilterChange) {
      onFilterChange({ filterType: "menu", value: selectedMenu, name: name });
    }
  };

  const handleCuisineChange = (e) => {
    const selectedCuisine = e.target.value;
    setCuisine(selectedCuisine);
    const name = menus.cuisineList.filter(
      (cuisine) => cuisine.id === Number(selectedCuisine)
    )[0].name;
    setMenu(""); // Reset menu when cuisine is selected
    if (onFilterChange) {
      onFilterChange({
        filterType: "cuisine",
        value: selectedCuisine,
        name: name,
      });
    }
  };

  const ShowMenus = async (e) => {
    const showMenu = showMenus;
    setShowMenus(!showMenus);
    setMenu("");
    setCuisine("");
    setShowCuisines(false);
    if (onViewChange) {
      onViewChange({ view: "menu", showMenus: !showMenu });
    }
    if (showMenu) {
      if (onFilterChange) {
        onFilterChange({ filterType: "menu", value: "", name: "All Food " });
      }
    }
  };

  const ShowCuisine = async (e) => {
    const showCuisine = showCuisines;
    setShowCuisines(!showCuisines);
    setShowMenus(false);
    setMenu("");
    setCuisine("");
    if (onViewChange) {
      onViewChange({ view: "cuisine", showMenus: !showCuisine });
    }
    if (showCuisine) {
      if (onFilterChange) {
        onFilterChange({ filterType: "cuisine", value: "", name: "All Food " });
      }
    }
  };

  const MenuSubmit = async (data) => {
    try {
      const response = await axiosInstance.post(
        `${morefoodURL}moreclub/user/menus/${res_id}/`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const menu = response.data.data;
      dispatch(addMenu({ menu }));
      return response;
    } catch (error) {
      throw error;
    }
  };

  async function showAddMenu() {
    setShowMenuForm(true);
  }

  async function hideAddMenu() {
    setShowMenuForm(false);
  }

  async function showAddCuisine() {
    setShowCuisineForm(true);
  }

  async function hideAddCuisine() {
    setShowCuisineForm(false);
  }

  return (
    <div className="menu-filter-container">
      
      <div className="menu-filter-select-container">
        <div className="d-flex gap-2 align-items-end ">
          <div>
            <label className="text-dynamic-white">Menu</label>
            <select
              className="form-select form-select-sm"
              value={menu}
              placeholder="Select Menu"
              onChange={handleMenuChange}
              style={{ width: "8rem" }}
            >
              <option value="">Select Menu</option>
              {menus.menuList.map((menu) => (
                <option value={menu.id}>{menu.name}</option>
              ))}
            </select>
          </div>

          <Button className="btn btn-sm fs-6 fw-bold" onClick={showAddMenu}>
            + <span className="d-none d-md-inline">menu</span>
          </Button>
          <Button
            className={`btn btn-sm fs-6 fw-bold ${
              showMenus ? "btn-danger" : "btn-secondary"
            }`}
            onClick={ShowMenus}
          >
            {showMenus ? "View All Food" : "View Menus"}
          </Button>
        </div>
        <div className="vertical-line menu-seperator"></div>
        <div className="d-flex gap-2 align-items-end">
          <div>
            <label className="text-dynamic-white ">Cuisine</label>
            <select
              className="form-select form-select-sm"
              value={cuisine}
              onChange={handleCuisineChange}
            >
              <option value="">Select Cuisine</option>
              {menus.cuisineList.map((cuisine) => (
                <option value={cuisine.id}>{cuisine.name}</option>
              ))}
            </select>
          </div>
          <Button className="btn btn-sm fs-6 fw-bold" onClick={showAddCuisine}>
            +<span className="d-none d-md-inline">Cuisine</span>
          </Button>
          <Button
            className={`btn btn-sm fs-6 fw-bold ${
              showCuisines ? "btn-danger" : "btn-secondary"
            }`}
            onClick={ShowCuisine}
          >
            {showCuisines ? "View All Food" : "View Cuisines"}
          </Button>
        </div>
      </div>
      
      <Link
        to={`/resturant/${res_id}/fooditem/${slug}/create`}
        className="btn btn-warning btn-sm"
      >
        Add New Food Items
      </Link>

      {/* menu creating form  */}
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        size="md"
        centered
        show={showMenuForm}
        onHide={hideAddMenu}
      >
        <Modal.Header>
          <Modal.Title
            id="contained-modal-title-vcenter text-center"
            className="text-dynamic-white"
          >
            Add Menu
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MenuCategoryAddForm
            onSubmit={MenuSubmit}
            onFinish={hideAddMenu}
            onCancel={hideAddMenu}
            initialMenuName=""
            buttonText="Create Menu"
          />
        </Modal.Body>
      </Modal>

      {/* add cuisine  */}

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
            Add Cuisines
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddCuisineForm res_id={res_id} onFinish={hideAddCuisine} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Filter;
