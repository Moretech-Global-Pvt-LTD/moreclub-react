import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Badge, Col } from "react-bootstrap";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchFoodItems } from "../../../../redux/api/menuApi";
import MenuCategoryAddForm from "../common/MenuCategoryAddForm";
import AddCuisineForm from "../Cuisine/AddCuisine";
import { validateCuisineField, validateMenuImage, validatePriceAndOfferPrice, validateRequiredField, } from "../../../../validation/resturantValidation";
import VariationForm from "./VariationForm";
import { message } from "antd";
import { addMenu } from "../../../../redux/slices/MenuSlice";
import { useQueryClient } from "@tanstack/react-query";
import { morefoodAuthenticatedAxios } from "../../../../utills/axios/morefoodaxios";
import { customStyles } from "./UpdateMenus/MenuDetailUpdate";

const MenuForm = () => {
  const { res_id ,slug } = useParams();
  const dispatch = useDispatch();

  const menus = useSelector((state) => state.menus);
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    ItemName: "",
    ingredient: "",
    short_description: "",
    price: "",
    offerPrice: "",
    image: null,
    imagePreview: "",
    menu_id: "",
    cuisine_id: [],
    selectedCategory: "",
    selectedItems: [],
    selectedItemsName: [],
    variation: false, // Determines if variations exist
    variation_type: "",
    variations: [],
  });
  const [showMenuForm, setShowMenuForm] = useState(false);
  const [showCuisineForm, setShowCuisineForm] = useState(false);
  const [showVariationForm, setShowVariationForm] = useState(false);
  const [Loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});
  const [variationData, setVariationData] = useState([
    { type: formData.variation_type, value: "", price: "", discountPrice: "" },
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    if (formData.selectedCategory !== "") {
      dispatch(fetchFoodItems(formData.selectedCategory, res_id));
    }
  }, [formData.selectedCategory, dispatch, res_id]);

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
    const url = URL.createObjectURL(e.target.files[0]);
    setFormData({ ...formData, image: e.target.files[0], imagePreview: url });

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
    if ("price" in fieldValues) {
      if (formData.variation) {
        tempErrors.price = "";
        tempErrors.offerPrice = "";
      } else {
        tempErrors.price = validatePriceAndOfferPrice(
          fieldValues.price,
          formData.offerPrice
        ).price;
        tempErrors.offerPrice = validatePriceAndOfferPrice(
          fieldValues.price,
          formData.offerPrice
        ).offerPrice;
      }
    }
    if ("offerPrice" in fieldValues) {
      if (formData.variation) {
        tempErrors.price = "";
        tempErrors.offerPrice = "";
      } else {
        tempErrors.offerPrice = validatePriceAndOfferPrice(
          formData.price,
          fieldValues.offerPrice
        ).offerPrice;
        tempErrors.price = validatePriceAndOfferPrice(
          formData.price,
          fieldValues.offerPrice
        ).price;
      }
    }

    if ("variation_type" in fieldValues) {
      if (!formData.variation) {
        tempErrors.variation_type = "";
      } else {
        tempErrors.variation_type = validateRequiredField(
          fieldValues.type,
          "Variation type"
        );
      }
    }

    if (variationIndex !== null) {
      const variation = variationData[variationIndex];

      // Validate 'value' field
      if ("value" in fieldValues) {
        tempErrors[`variation_value_${variationIndex}`] = validateRequiredField(
          fieldValues.value,
          "Variation value"
        );
      }

      if ("price" in fieldValues) {
        tempErrors[`variation_price_${variationIndex}`] =
          validatePriceAndOfferPrice(
            fieldValues.price,
            variation.discountPrice
          ).price;
        tempErrors[`variation_discountPrice_${variationIndex}`] =
          validatePriceAndOfferPrice(
            fieldValues.price,
            variation.discountPrice
          ).offerPrice;
      }

      if ("discountPrice" in fieldValues) {
        tempErrors[`variation_price_${variationIndex}`] =
          validatePriceAndOfferPrice(
            variation.price,
            fieldValues.discountPrice
          ).price;
        tempErrors[`variation_discountPrice_${variationIndex}`] =
          validatePriceAndOfferPrice(
            variation.price,
            fieldValues.discountPrice
          ).offerPrice;
      }
    }
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
      case "price":
        if (formData.variation) {
          return "";
        } else {
          return validatePriceAndOfferPrice(value, formData.offerPrice).price;
        }
      case "offerPrice":
        if (formData.variation) {
          return "";
        } else {
          if (!value || value === 0) {
            return "";
          } else {
            return validatePriceAndOfferPrice(formData.price, value).offerPrice;
          }
        }

      case "variation_type":
        if (!formData.variation) {
          return "";
        } else {
          return validateRequiredField(value, "Variation type");
        }
      default:
        return "";
    }
  };

  const validateVariationField = (name, value, variationIndex) => {
    const tempErrors = { ...errors };

    const variation = variationData[variationIndex]; // Get the specific variation data by index

    switch (name) {
      case "value":
        // Validate 'value' field for variations
        tempErrors[`variation_value_${variationIndex}`] = validateRequiredField(
          value,
          "Variation value"
        );
        return tempErrors[`variation_value_${variationIndex}`];

      case "price":
        // Validate 'price' field for variations
        tempErrors[`variation_price_${variationIndex}`] =
          validatePriceAndOfferPrice(value, variation.discountPrice).price;
        return tempErrors[`variation_price_${variationIndex}`];

      case "discountPrice":
        if (!value || value === 0) {
          return "";
        } else {
          // Validate 'discountPrice' field for variations
          tempErrors[`variation_discountPrice_${variationIndex}`] =
            validatePriceAndOfferPrice(variation.price, value).offerPrice;
          return tempErrors[`variation_discountPrice_${variationIndex}`];
        }

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

    if (formData.variation === true && variationData.length > 0) {
      variationData.forEach((variation, index) => {
        // Validate the fields for each variation (type, value, price, discountPrice)

        Object.keys(variation).forEach((field) => {
          const error = validateVariationField(field, variation[field], index);
          if (error) {
            tempErrors[`variation_${field}_${index}`] = error;
          }
        });
      });
    }

    setErrors(tempErrors);
    return tempErrors;
  };

  // Add new variation row
  const addVariationRow = () => {
    setVariationData([
      ...variationData,
      { value: "", price: "", discountPrice: "" },
    ]);
  };

  const removeVariationRow = (index) => {
    setVariationData(variationData.filter((_, i) => i !== index));

    const updatedErrors = { ...errors };
    delete updatedErrors[`variation_value_${index}`];
    delete updatedErrors[`variation_price_${index}`];
    delete updatedErrors[`variation_discountPrice_${index}`];

    setErrors(updatedErrors);
  };

  const handleVariationChange = (index, field, value) => {
    const updatedVariations = [...variationData];
    updatedVariations[index][field] = value;

    // Trigger validation for the specific variation field that was changed
    validateForm({ [field]: value }, index);
    setVariationData(updatedVariations);
  };

  const addItem = (item) => {
    const { selectedItems, selectedItemsName } = formData;
    if (!selectedItems.includes(item.id)) {
      const newSelectedItems = [...selectedItems, item.id];
      const newSelectedItemsName = [
        ...selectedItemsName,
        { name: `${item.name} (${item.value})`, id: item.id },
      ];

      setFormData((prev) => ({
        ...prev,
        selectedItems: newSelectedItems,
        selectedItemsName: newSelectedItemsName,
      }));

      // Validate selected items
      //   validateField('selectedItems', newSelectedItems);
    }
  };

  const removeItem = (item) => {
    const newSelectedItems = formData.selectedItems.filter(
      (prev) => prev !== item.id
    );
    const newSelectedItemsName = formData.selectedItemsName.filter(
      (prev) => prev.id !== item.id
    );

    setFormData((prev) => ({
      ...prev,
      selectedItems: newSelectedItems,
      selectedItemsName: newSelectedItemsName,
    }));

    // Validate selected items
    // validateField('selectedItems', newSelectedItems);
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

  async function showAddVariationType() {
    setShowVariationForm(true);
  }

  async function hideAddVariationType() {
    setShowVariationForm(false);
  }

  const MenuSubmit = async (data) => {
    try {
      const response = await morefoodAuthenticatedAxios.post(
        `moreclub/user/menus/${res_id}/`,
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
        ingredient: formData.ingredient,
        image: formData.image,
        cuisine_id: formData.cuisine_id,
        related_food_items: formData.selectedItems,
        has_variation: formData.variation,
        variations: formData.variation
          ? variationData.map((variation) => ({
              variation_type: formData.variation_type,
              value: variation.value,
              price: variation.price,
              discount_price: variation.discountPrice,
            }))
          : [],
        ...(formData.variation === false && {
          price: formData.price,
          discount_price: formData.offerPrice,
        }),
      };
      setLoading(true)
      morefoodAuthenticatedAxios
        .post(
          `moreclub/user/food/items/${formData.menu_id}/${res_id}/`,
          newMenu,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          message.success("Menu Added Successfully");
          navigate(`/resturant/${res_id}/menu/${slug}`);
          queryClient.invalidateQueries({
            queryKey: [`Restaurant All Menu ${res_id}`, '', ''],
          })
        })
        .catch((error) => {
          console.error("There was an error fetching the categories!", error);
          message.error("error creating Menu");
        })
        .finally(() => {
          setLoading(false);
        });
    }else{
      message.error("Please fill the required fields");
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit} className="card p-2">
        {/* Menu Name */}
        <div className="row row-cols-1 row-cols-md-2 row-cols-xxl-3 align-items-center">
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
        </div>

        <div className="row row-cols-1 row-cols-lg-2">
          <div>
            {/* Short Description */}
            <Form.Group controlId="short_description" className="mt-3">
              <Form.Label>Short Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
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
                rows={3}
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
          </div>

          {/* Item Image */}
          <Form.Group controlId="formItemImage" className="my-3">
            <Form.Label>Item Image</Form.Label>
            <br />
            <div
              classname=" mx-3 my-3  d-flex align-items-center justify-content-center"
              style={{
                height: "11rem",
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
                    style={{ height: "9rem", width: "auto" }}
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
        </div>

        {/* Variation Checkbox */}
        <Form.Group controlId="variation" className="mt-3">
          <Form.Check
            type="checkbox"
            name="variation"
            label="Has Variations?"
            checked={formData.variation}
            onChange={handleInputChange}
          />
        </Form.Group>

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

        {/* Variations Section */}
        {formData.variation && (
          <>
            <h5 className="mt-4">Variations</h5>

            <Form.Group controlId={`variation_type`}>
              <Form.Label>Variation Type</Form.Label>
              <div className="d-flex align-items-center responsive-width">
                <Form.Control
                  as="select"
                  className="w-75 me-2"
                  value={formData.variation_type}
                  onChange={(e) =>
                    handleChange("variation_type", e.target.value)
                  }
                  placeholder="Select Variation Type"
                  isInvalid={!!errors.variation_type}
                >
                  <option value="">Select variation type</option>
                  {menus.variationTypeLoading && <option>Loading...</option>}
                  {menus.variationTypeList &&
                    menus.variationTypeList.length > 0 &&
                    menus.variationTypeList.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                </Form.Control>
                <button
                  className="btn btn-warning ms-2 btn-sm  py-0 px-2 d-flex align-items-center fw-bold fs-4 justify-content-center"
                  onClick={() => showAddVariationType()}
                >
                  +
                </button>
              </div>
              <p className="text-danger">{errors.variation_type}</p>
            </Form.Group>

            {variationData.map((variation, index) => (
              <div key={index} className="mt-3 row row-cols-lg-2 align-items-end  ">
                <Form.Group
                  controlId={`variation_value_${index}`}
                  className="mt-2"
                >
                  <Form.Label>value</Form.Label>
                  <Form.Control
                    type="text"
                    value={variation.value}
                    onChange={(e) =>
                      handleVariationChange(index, "value", e.target.value)
                    }
                    isInvalid={!!errors[`variation_value_${index}`]}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors[`variation_value_${index}`]}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  controlId={`variation_price_${index}`}
                  className="mt-2"
                >
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="text"
                    value={variation.price}
                    onChange={(e) =>
                      handleVariationChange(index, "price", e.target.value)
                    }
                    isInvalid={!!errors[`variation_price_${index}`]}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors[`variation_price_${index}`]}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  controlId={`variation_discountPrice_${index}`}
                  className="mt-2"
                >
                  <Form.Label>Discount Price (Optional)</Form.Label>
                  <Form.Control
                    type="text"
                    value={variation.discountPrice}
                    isInvalid={!!errors[`variation_discountPrice_${index}`]}
                    onChange={(e) =>
                      handleVariationChange(
                        index,
                        "discountPrice",
                        e.target.value
                      )
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors[`variation_discountPrice_${index}`]}
                  </Form.Control.Feedback>
                </Form.Group>
                <Col>
                {variationData.length > 1 && index !== 0 && (
                  <Button
                    variant="link"
                    onClick={(e) => {
                      e.preventDefault();
                      removeVariationRow(index);
                    }}
                    className="mt-2 btn-danger btn-sm me-2"
                  >
                    Remove
                  </Button>
                )}
                
                </Col>
              </div>
            ))}

            <Button
              variant="link"
              onClick={addVariationRow}
              className="mt-3 btn-secondary btn-sm w-100"
            >
              + Add Variation
            </Button>
          </>
        )}

        <h6 className="mt-4">Related Food Items</h6>

        <div className="row row-cols-lg-2 ">
        <div>
        <Form.Group controlId="formCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            value={formData.selectedCategory}
            onChange={(e) => handleChange("selectedCategory", e.target.value)}
          >
            <option value="">Select Menu</option>
            {menus.menuLoading && <option disabled>Loading...</option>}
            {menus.menuList &&
              menus.menuList.length > 0 &&
              menus.menuList.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formSubmenu">
          <Form.Label>Food Items</Form.Label>
          <div
            id="submenu-list"
            className="border p-2"
            style={{ height: "200px", overflowY: "auto" }}
          >
            {menus.foodItemList[formData.selectedCategory] &&
              menus.foodItemList[formData.selectedCategory].map((item) => (
                <div
                  key={item.id}
                  className="text-dynamic-white p-2 border-bottom"
                  style={{ cursor: "pointer" }}
                  onClick={() => addItem(item)}
                >
                  {item.name} ({item.value}){" "}
                  <span className="font-italic">
                    price: {item.currency_symbol}{" "}
                    {Number(item.discount_price) < Number(item.price) &&
                    Number(item.discount_price) > 0
                      ? item.discount_price
                      : item.price}
                  </span>
                </div>
              ))}

            {menus.foodItemLoading[formData.selectedCategory] && (
              <div className="text-dynamic-white p-2 text-muted">
                <span className="spinner-border spinner-border-sm"></span>
              </div>
            )}

            {formData.selectedCategory === "" && (
              <div className="text-dynamic-white p-2 text-muted">
                Choose any one category from the Category to get started!
              </div>
            )}
            {formData.selectedCategory !== "" &&
              menus.foodItemList[formData.selectedCategory] &&
              menus.foodItemList[formData.selectedCategory].length === 0 && (
                <div className="text-dynamic-white p-2 border-bottom">
                  No Food items available in this category
                </div>
              )}
          </div>
        </Form.Group>
        </div>
        <Form.Group controlId="formSelectedItems">
          <Form.Label>Selected Items</Form.Label>
          <div
            id="submenu-list"
            className={`border p-2 ${
              errors.selectedItems ? "border-danger" : "border-secondary"
            }`}
            style={{ height: "100px", overflowY: "auto" }}
          >
            <div id="d-flex flex-wrap">
              {formData.selectedItemsName &&
                formData.selectedItemsName.map((item) => (
                  <Badge
                    key={item}
                    className="badge  m-1"
                    onClick={() => removeItem(item)}
                  >
                    {item.name}&nbsp;
                    <span
                      className="text-danger ml-1"
                      style={{ cursor: "pointer" }}
                    >
                      x
                    </span>
                  </Badge>
                ))}
              {formData.selectedItemsName &&
                formData.selectedItemsName.length === 0 && (
                  <div className="text-dynamic-white p-2 text-muted">
                    No Food items selected!
                  </div>
                )}
            </div>
          </div>
          <p className="text-danger">{errors.selectedItems}</p>
        </Form.Group>
        </div>
        {/* Related Items */}
        
       
        <Button type="submit" className="mt-4" onClick={(e) => handleSubmit(e)}>
          {Loading && (
            <span className="spinner-border spinner-border-sm"></span>
          )}{" "}
          Add Menu
        </Button>
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

      {/* add variation type  */}

      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        size=""
        centered
        show={showVariationForm}
        onHide={hideAddVariationType}
      >
        <Modal.Header>
          <Modal.Title
            id="contained-modal-title-vcenter text-center"
            className="text-dynamic-white"
          >
            Add Variation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <VariationForm res_id={res_id} onFinish={hideAddVariationType} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MenuForm;
