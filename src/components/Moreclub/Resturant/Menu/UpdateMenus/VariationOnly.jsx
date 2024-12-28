import React, { useState } from "react";
import { Button, Form, Col } from "react-bootstrap";
import { axiosInstance } from "../../../../..";
import { useParams } from "react-router-dom";
import { morefoodURL } from "../../../../../config/config";
// import { useDispatch } from "react-redux";

import {
  validatePriceAndOfferPrice,
  validateRequiredField,
} from "../../../../../validation/resturantValidation";
import { message } from "antd";

const VariationUpdateOnlyForm = ({ item, onCancel }) => {
  const { res_id } = useParams();
  // const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});
  const [variationData, setVariationData] = useState({
    value: item.value ?? "",
    price: item.price ?? "",
    discountPrice: item.discount_price ?? "",
  });

  const validateForm = (fieldValues = variationData) => {
    const tempErrors = { ...errors };

    // Validate 'value' field
    if ("value" in fieldValues) {
      tempErrors.value = validateRequiredField(
        fieldValues.value,
        "Variation value"
      );
    }

    if ("price" in fieldValues) {
      tempErrors.price = validatePriceAndOfferPrice(
        fieldValues.price,
        variationData.discountPrice
      ).price;
      tempErrors.discountPrice = validatePriceAndOfferPrice(
        fieldValues.price,
        variationData.discountPrice
      ).offerPrice;
    }

    if ("discountPrice" in fieldValues) {
      tempErrors.price = validatePriceAndOfferPrice(
        variationData.price,
        fieldValues.discountPrice
      ).price;
      tempErrors.discountPrice = validatePriceAndOfferPrice(
        variationData.price,
        fieldValues.discountPrice
      ).offerPrice;
    }
    setErrors({ ...tempErrors });
  };

  const validateField = (name, value) => {
    switch (name) {
      case "value":
        return validateRequiredField(value, "Variation value");

      case "price":
        return validatePriceAndOfferPrice(value, variationData.discountPrice)
          .price;

      case "discountPrice":
        if (!value || value === 0) {
          return "";
        } else {
          // Validate 'discountPrice' field for variations
          return validatePriceAndOfferPrice(variationData.price, value)
            .offerPrice;
        }

      default:
        return "";
    }
  };

  const validateAllFields = () => {
    const tempErrors = {};
    for (const key in variationData) {
      const error = validateField(key, variationData[key]);
      if (error) tempErrors[key] = error;
    }
    setErrors(tempErrors);
    return tempErrors;
  };


  const handleVariationChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;

    setVariationData((prev) => ({
      ...prev,
      [name]: val,
    }));
    validateForm({ [name]: type === "checkbox" ? checked : value });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateAllFields();
    if (Object.keys(validationErrors).length === 0) {
      const newMenu = {
        value: variationData.value,
        price: variationData.price,
        discount_price: variationData.discountPrice,
      };
      axiosInstance
        .post(
          `${morefoodURL}moreclub/user/food/items/${variationData.menu_id}/${res_id}/`,
          newMenu,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          message.success("Menu Added Successfully");
        })
        .catch((error) => {
          console.error("There was an error fetching the categories!", error);
          message.error("error creating Menu");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <div className="mt-3 row row-cols-lg-2 align-items-end  ">
          <Form.Group controlId="variation_value" className="mt-2">
            <Form.Label>value</Form.Label>
            <Form.Control
              type="text"
              value={variationData.value}
              onChange={(e) => handleVariationChange("value", e.target.value)}
              isInvalid={!!errors[`variation_value`]}
            />
            <Form.Control.Feedback type="invalid">
              {errors[`variation_value`]}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId={`variation_price`} className="mt-2">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              value={variationData.price}
              onChange={(e) => handleVariationChange("price", e.target.value)}
              isInvalid={!!errors[`variation_price`]}
            />
            <Form.Control.Feedback type="invalid">
              {errors[`variation_price`]}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId={`variation_discountPrice`} className="mt-2">
            <Form.Label>Discount Price (Optional)</Form.Label>
            <Form.Control
              type="text"
              value={variationData.discountPrice}
              isInvalid={!!errors[`variation_discountPrice`]}
              onChange={(e) =>
                handleVariationChange("discountPrice", e.target.value)
              }
            />
            <Form.Control.Feedback type="invalid">
              {errors[`variation_discountPrice`]}
            </Form.Control.Feedback>
          </Form.Group>
          <Col></Col>
        </div>

        <Button variant="secondary" className="mt-4" onClick={onCancel}>
          Cancel
        </Button>

        <Button type="submit" className="mt-4" disabled={loading || item.value === variationData.value || item.price === variationData.price || item.discount_price === variationData.discountPrice} onClick={(e) => handleSubmit(e)}>
          {loading && (
            <span className="spinner-border spinner-border-sm"></span>
          )}{" "}
          Update
        </Button>
      </Form>
    </>
  );
};

export default VariationUpdateOnlyForm;
