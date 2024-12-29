import React, { useState } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import { axiosInstance } from "../../../../..";
import { useParams } from "react-router-dom";
import { morefoodURL } from "../../../../../config/config";
import { useDispatch, useSelector } from "react-redux";

import {
  validatePriceAndOfferPrice,
  validateRequiredField,
} from "../../../../../validation/resturantValidation";
import VariationForm from "../VariationForm";
import { message } from "antd";
import { has } from "lodash";
import { fetchFoodItemsDetailSuccess } from "../../../../../redux/slices/FoodItemDetailSlice";

const VariationUpdateForm = ({item, onCancel}) => {
  const { res_id } = useParams();
  const dispatch = useDispatch();

  const menus = useSelector((state) => state.menus);

  const [formData, setFormData] = useState({
    price: item.actual_price ?? "",
    offerPrice: item.item_price === item.actual_price ? "" : item.item_price ?? "",

    variation: item.variations ? item.variations.filter((variation) => variation.value !== "Default").length > 0 : false,
    variation_type: item.variations ? item.variations.length > 0 ? item.variations[0].variation_type : "": "",
    variations: [],
  });
  const [showVariationForm, setShowVariationForm] = useState(false);
  const [Loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});
  const [variationData, setVariationData] = useState(item.variations ?
    item.variations.filter((variation) => variation.value !== "Default").map((variation) => ({
      id: variation.id,
      value: variation.value,
      price: variation.price,
      discountPrice: variation.discount_price,
    })):
    [
    { id:"", value: "", price: "", discountPrice: "" },
  ]);

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



  const validateForm = (fieldValues = formData, variationIndex = null) => {
    const tempErrors = { ...errors };
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

    if (formData.variations && variationData.length > 0) {
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

 
  async function showAddVariationType() {
    setShowVariationForm(true);
  }

  async function hideAddVariationType() {
    setShowVariationForm(false);
  }


  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateAllFields();
    if (Object.keys(validationErrors).length === 0) {
      
      const newMenu = {
        has_variation: formData.variation,
        variations: formData.variation
          ? variationData.map((variation) => ({
              food_item_id: item.id,
              id: variation.id,
              variation_type: formData.variation_type,
              value: variation.value,
              price: variation.price,
              discount_price: variation.discountPrice,
            }))
          : [],
        price: formData.variation === false ? formData.price : "0",
        discount_price: (formData.variation === false) && (formData.offerPrice !== "") ? formData.offerPrice : null,
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
          message.success("Variation updated Successfully");    
          dispatch(fetchFoodItemsDetailSuccess({ id:item.id, foodItems: response.data.data }));
          onCancel();
        })
        .catch((error) => {
          console.error("There was an error updating variation!", error);
          message.error("error updating Variation");
        })
        .finally(() => {
          setLoading(false);
          
        });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit} className="card p-1">
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
              <div className="d-flex align-items-center ">
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


      <div className="d-flex justify-content-end gap-2">

       <Button variant="secondary" className="mt-4" onClick={onCancel}>
          
         Cancel
        </Button>

        <Button type="submit" className="mt-4" onClick={(e) => handleSubmit(e)}>
          {Loading && (
            <span className="spinner-border spinner-border-sm"></span>
          )}{" "}
          Update
        </Button>

      </div>

      </Form>


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

export default VariationUpdateForm;
