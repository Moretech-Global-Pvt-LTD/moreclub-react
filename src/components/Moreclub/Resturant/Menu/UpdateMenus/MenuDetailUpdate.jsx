import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Alert, Badge, Col } from "react-bootstrap";
import Select from "react-select";
import { customStyles } from "../MenuItemForm";
import { axiosInstance } from "../../../../..";
import { useParams } from "react-router-dom";
import { morefoodURL } from "../../../../../config/config";
import { useDispatch, useSelector } from "react-redux";
import { fetchFoodItems } from "../../../../../redux/api/menuApi";
import MenuCategoryAddForm from "../../common/MenuCategoryAddForm";
import AddCuisineForm from "../../Cuisine/AddCuisine";
import {
  validateCuisineField,
  validateMenuImage,
  validateRequiredField,
} from "../../../../../validation/resturantValidation";
import { message } from "antd";
import { addMenu } from "../../../../../redux/slices/MenuSlice";
import { fetchFoodItemsDetailSuccess } from "../../../../../redux/slices/FoodItemDetailSlice";

const MenuDetailUpdateForm = ({item , onCancel }) => {
  const { res_id } = useParams();
  const dispatch = useDispatch();

  const menus = useSelector((state) => state.menus);

  const [formData, setFormData] = useState({
    ItemName: item.name?? "",
    ingredient: item.ingredient ?? "",
    short_description: item.short_description ?? "",
    menu_id: item.menu_id?? "",
    price: item.actual_price ?? "",
    offerPrice: item.item_price === item.actual_price ? "" : item.item_price ?? "",
    image: null,
    imagePreview: item.image ?? "",
    cuisine_id: item.cuisine ? item.cuisine.map((items) => items.id) : [],
    variation: item.variations ? item.variations.filter((variation) => variation.value !== "Default").length > 0 : false,

  });
  const [showMenuForm, setShowMenuForm] = useState(false);
  const [showCuisineForm, setShowCuisineForm] = useState(false);
  const [Loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

 
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: val,
    }));
    validateForm({ [name]: type === "checkbox" ? checked : value });
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // validateField(field, value);
  };

  const handleCusineChange = (selectedOptions) => {
    if (selectedOptions) {
      const selectedValues = selectedOptions.map((option) => option.value);
      setFormData({ ...formData, cuisine_id: selectedValues });
    } else {
      setFormData({ ...formData, cuisine: [] });
    }
  };

  const handleImageChange = (e) => {
    console.log(e.target.files[0]);
    const url = URL.createObjectURL(e.target.files[0]);
    setFormData({ ...formData, image: e.target.files[0], imagePreview: url });
    console.log(formData);
  };

  const validateForm = (fieldValues = formData, variationIndex = null) => {
    const tempErrors = { ...errors };
    if ("ItemName" in fieldValues)
      tempErrors.ItemName = validateRequiredField(
        fieldValues.ItemName,
        "Menu name"
      );
    if ("short_description" in fieldValues)
      tempErrors.short_description = validateRequiredField(
        fieldValues.short_description,
        "Short description"
      );
    if ("ingredient" in fieldValues)
      tempErrors.ingredient = validateRequiredField(
        fieldValues.ingredient,
        "Ingredient"
      );
    if ("menu_id" in fieldValues)
      tempErrors.menu_id = validateRequiredField(fieldValues.menu_id, "Menu");
    if ("cuisine_id" in fieldValues)
      tempErrors.cuisine_id = validateCuisineField(fieldValues.cuisine_id);
    if ("image" in fieldValues)
      if (fieldValues.image === null && fieldValues.imagePreview !== "") {
        tempErrors.image = "";
      } else {
        tempErrors.image = validateMenuImage(fieldValues.image);
      }
    // if ("price" in fieldValues) {
    //   if (formData.variation) {
    //     tempErrors.price = "";
    //     tempErrors.offerPrice = "";
    //   } else {
    //     tempErrors.price = validatePriceAndOfferPrice(
    //       fieldValues.price,
    //       formData.offerPrice
    //     ).price;
    //     tempErrors.offerPrice = validatePriceAndOfferPrice(
    //       fieldValues.price,
    //       formData.offerPrice
    //     ).offerPrice;
    //   }
    // }
    // if ("offerPrice" in fieldValues) {
    //   if (formData.variation) {
    //     tempErrors.price = "";
    //     tempErrors.offerPrice = "";
    //   } else {
    //     tempErrors.offerPrice = validatePriceAndOfferPrice(
    //       formData.price,
    //       fieldValues.offerPrice
    //     ).offerPrice;
    //     tempErrors.price = validatePriceAndOfferPrice(
    //       formData.price,
    //       fieldValues.offerPrice
    //     ).price;
    //   }
    // }

    setErrors({ ...tempErrors });
  };

  const validateField = (name, value) => {
    switch (name) {
      case "ItemName":
        return validateRequiredField(value, "Menu name");
      case "short_description":
        return validateRequiredField(value, "Short description");
      case "ingredient":
        return validateRequiredField(value, "Ingredient");
      case "menu_id":
        return validateRequiredField(value, "Menu");
      case "cuisine_id":
        return validateCuisineField(value);
      case "image":
        if (value === null && formData.imagePreview !== "") {
          return "";
        } else {
          return validateMenuImage(value);
        }
      // case "price":
      //   if (formData.variation) {
      //     return "";
      //   } else {
      //     return validatePriceAndOfferPrice(value, formData.offerPrice).price;
      //   }
      // case "offerPrice":
      //   if (formData.variation) {
      //     return "";
      //   } else {
      //     if (!value || value === 0) {
      //       return "";
      //     } else {
      //       return validatePriceAndOfferPrice(formData.price, value).offerPrice;
      //     }
      //   }

    //   case "variation_type":
    //     if (!formData.variation) {
    //       return "";
    //     } else {
    //       return validateRequiredField(value, "Variation type");
    //     }
      default:
        return "";
    }
  };

  const validateAllFields = () => {
    const tempErrors = {};
    for (const key in formData) {
      const error = validateField(key, formData[key]);
      if (error) tempErrors[key] = error;
    }

    setErrors(tempErrors);
    return tempErrors;
  };

  // Add new variation row
 

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

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateAllFields();
    if (Object.keys(validationErrors).length === 0) {
      const newMenu = {
        name: formData.ItemName,
        short_description: formData.short_description,
        menu_id: formData.menu_id,
        ingredient: formData.ingredient,
        ...(formData.image && { image: formData.image }),
        has_variation: false,
        cuisine_id: formData.cuisine_id,
        ...(formData.variation === false && {
          price: formData.price,
          discount_price: formData.discount_price,
        }),
      };
      setLoading(true);

      axiosInstance
        .patch(
          `${morefoodURL}moreclub/user/all/food/items/${res_id}/${item.id}/`,
          newMenu,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          message.success("Details updated Successfully");
          dispatch(fetchFoodItemsDetailSuccess({ id:item.id, foodItems: response.data.data }));
          onCancel();
        })
        .catch((error) => {
          console.error("There was an error fetching the categories!", error);
          message.error("error updating details");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        {/* Menu Name */}
          <Form.Group controlId="name">
            <Form.Label>Item Name</Form.Label>
            <Form.Control
              type="text"
              name="ItemName"
              className=""
              placeholder="Item Name"
              value={formData.ItemName}
              onChange={handleInputChange}
              isInvalid={!!errors.ItemName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.ItemName}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Menu */}
          <Form.Group controlId="menu_id" className="">
            <Form.Label>Menu</Form.Label>
            <div className="d-flex align-items-center ">
              <Form.Control
                as="select"
                className="w-75 me-2"
                value={formData.menu_id}
                onChange={(e) => handleChange("menu_id", e.target.value)}
                placeholder="Select Menu"
                isInvalid={!!errors.menu_id}
              >
                <option value="">Select Menu</option>
                {menus.menuLoading && <option>Loading...</option>}
                {menus.menuList &&
                  menus.menuList.length > 0 &&
                  menus.menuList.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
              </Form.Control>
              <button
                className="btn btn-warning ms-2 btn-sm  py-0 px-2 d-flex align-items-center fw-bold fs-4 justify-content-center"
                onClick={(e) => {
                  e.preventDefault();
                  showAddMenu();
                }}
              >
                +
              </button>
            </div>
            <Form.Control.Feedback type="invalid">
              {errors.menu_id}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Cuisine */}
          <Form.Group controlId="cuisine_ids" className="">
            <Form.Label>Cuisine</Form.Label>
            <div className="d-flex align-items-center ">
              <div
                className={`border  form-control p-0 w-75 ${
                  !!errors.cuisine_id ? " border-2 border-danger" : ""
                }`}
              >
                <Select
                  className={``}
                  placeholder="select cuisine type"
                  styles={{ customStyles }}
                  name="cuisine_id"
                  isInvalid={!!errors.cuisine_id}
                  value={
                    Array.isArray(formData.cuisine_id)
                      ? menus.menuCuisineList.filter((option) =>
                          formData.cuisine_id.includes(option.value)
                        )
                      : []
                  }
                  onChange={handleCusineChange}
                  options={menus.menuCuisineList}
                  isMulti={true}
                  required
                />
              </div>
              <button
                className="btn btn-warning ms-2 btn-sm  py-0 px-2 d-flex align-items-center fw-bold fs-4 justify-content-center"
                onClick={(e) => {
                  e.preventDefault();
                  showAddCuisine();
                }}
              >
                +
              </button>
            </div>
            <p className="text-danger">{errors.cuisine_id}</p>
          </Form.Group>
       

       
            {/* Short Description */}
            <Form.Group controlId="short_description" className="mt-3">
              <Form.Label>Short Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="short_description"
                placeholder="Short Description"
                value={formData.short_description}
                onChange={handleInputChange}
                isInvalid={!!errors.short_description}
              />
              <Form.Control.Feedback type="invalid">
                {errors.short_description}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Ingredients */}
            <Form.Group controlId="Ingredients" className="my-3">
              <Form.Label>Ingredients</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Ingredients"
                name="ingredient"
                value={formData.ingredient}
                onChange={handleInputChange}
                isInvalid={!!errors.ingredient}
              />
              <Form.Control.Feedback type="invalid">
                {errors.ingredient}
              </Form.Control.Feedback>
            </Form.Group>
         

          {/* Item Image */}
          <Form.Group controlId="formItemImage" className="my-3">
            <Form.Label>Item Image</Form.Label>
            <br />
            <div
              classname=" mx-3 my-3  d-flex align-items-center justify-content-center"
              style={{
                height: "8rem",
                width: "full",
                padding: "1rem",
                border: `1px solid ${!!errors.image ? "red" : "#ced4da"}`,
                borderRadius: "0.25rem",
              }}
            >
              {formData.imagePreview ? (
                <div className="d-flex align-items-center justify-content-center">
                  <img
                    src={formData.imagePreview}
                    alt="Foodimage"
                    style={{ height: "6rem", width: "auto" }}
                    className="mx-auto"
                  />
                </div>
              ) : (
                <p
                  className="text-center "
                  style={{
                    height: "100%",
                    width: "100%",
                    alignContent: "center",
                  }}
                >
                  No image selected
                </p>
              )}
            </div>
            <Form.Control
              type="file"
              name="image"
              onChange={handleImageChange}
              isInvalid={!!errors.image}
            />
            <Form.Control.Feedback type="invalid">
              {errors.image}
            </Form.Control.Feedback>
          </Form.Group>

        {/* Variation Checkbox */}
        {/* <Form.Group controlId="variation" className="mt-3">
          <Form.Check
            type="checkbox"
            name="variation"
            label="Has Variations?"
            checked={formData.variation}
            onChange={handleInputChange}
          />
        </Form.Group> */}

        {/* Price and Offer Price (hidden if variations exist) */}
        {!formData.variation && (
          <div className="row row-cols-2">
            <Form.Group controlId="price" className="mt-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                isInvalid={!!errors.price}
              />
              <Form.Control.Feedback type="invalid">
                {errors.price}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="offerPrice" className="mt-3">
              <Form.Label>Offer Price</Form.Label>
              <Form.Control
                type="text"
                name="offerPrice"
                value={formData.offerPrice}
                onChange={handleInputChange}
                isInvalid={!!errors.offerPrice}
              />
              <Form.Control.Feedback type="invalid">
                {errors.offerPrice}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
        )}

  

       
        
        <div className="d-flex justify-content-end gap-2">
        <Button type="button" variant="secondary" className="mt-4" onClick={onCancel}>
          cancel
        </Button>
        <Button type="submit" className="mt-4" onClick={(e) => handleSubmit(e)}>
          {Loading && (
            <span className="spinner-border spinner-border-sm"></span>
          )}{" "}
          Update
        </Button>

        </div>
      </Form>

      {/* menu creating form  */}
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        size="lg"
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
        size=""
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

    </>
  );
};

export default MenuDetailUpdateForm;
