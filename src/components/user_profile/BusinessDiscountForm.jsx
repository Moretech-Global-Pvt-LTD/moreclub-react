import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { businessType } from "../../redux/api/userDetailAPI";
import {
  validateMin_order,
  validateResturantName,
} from "../../validation/resturantValidation";
import { Button, Form } from "react-bootstrap";
import { message } from "antd";
import { axiosInstance } from "../..";
import { baseURL } from "../../config/config";
import {
  validateBusinessTyes,
  validateDiscount,
} from "../../validation/RegistrationValidation";
import { businessQrinfoUpdate } from "../../redux/slices/businessSlice";

const BusinessDiscountForm = ({ onClose, initialValues }) => {
  const dispatch = useDispatch();
  const businessReducer = useSelector((state) => state.businessReducer);
  const [formValues, setFormValues] = useState({
    businessTypes: "",
    discount: initialValues?.business_type_discount || "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (businessReducer.businessTypeList?.length === 0) {
      dispatch(businessType());
    }
    // Fetch business types
  }, [dispatch, businessReducer.businessTypeList]);

  useEffect(() => {
    if (
      Array.isArray(businessReducer.businessTypeList) &&
      businessReducer.businessTypeList.length > 0
    ) {
      // Find the business type object where the name matches initialValues.businessTypes
      const initialId = businessReducer.businessTypeList.find(
        (option) => option.name === initialValues?.business_type_name
      );

      if (initialId) {
        // Update form values with the found business type object
        setFormValues((prevValues) => ({
          ...prevValues,
          businessTypes: initialId.id,
        }));
      } else {
        console.warn(
          "No matching business type found for the provided name. Ensure that initialValues.businessTypes matches an option's name."
        );
      }
    }
  }, [initialValues, businessReducer.businessTypeList]);

  const validateForm = (fieldValues = formValues) => {
    const tempErrors = { ...errors };
    if ("businessTypes" in fieldValues)
      tempErrors.businessTypes = validateBusinessTyes(
        fieldValues.businessTypes
      );
    if ("discount" in fieldValues)
      tempErrors.discount = validateDiscount(fieldValues.discount);

    setErrors({ ...tempErrors });
  };

  const validateField = (name, value) => {
    switch (name) {
      case "businessTypes":
        return validateBusinessTyes(value);
      case "discount":
        return validateDiscount(value);

      default:
        return "";
    }
  };

  const validateAllFields = () => {
    const tempErrors = {};
    for (const key in formValues) {
      const error = validateField(key, formValues[key]);
      if (error) tempErrors[key] = error;
    }

    setErrors(tempErrors);
    return tempErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: type === "checkbox" ? (checked ? true : false) : value,
    }));
    validateForm({ [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tempErrors = validateAllFields();

    if (Object.keys(tempErrors).length === 0) {
      setLoading(true);

      if (
        initialValues?.business_type_name &&
        initialValues?.business_type_discount
      ) {
        if (initialValues.business_type_discount !== formValues.discount) {
          try {
            const res = await axiosInstance.patch(
              `${baseURL}auth/update/business/type/`,
              {
                business_types: formValues.businessTypes,
                discount_percentage: formValues.discount,
              }
            );
            if (res.data.success) {
              dispatch(
                businessQrinfoUpdate({
                  business_type_discount: formValues.discount,
                  business_type_icon: initialValues.business_type_icon,
                  business_type_name: initialValues.business_type_name,
                  qr_code: initialValues.qr_code,
                })
              );

              message.success(res.data.message);
              onClose();
            }
          } catch (err) {
            message.error(err.response.data.message);
          }
        } else {
          message.warning("You have not update anything");
        }
      } else {
        try {
          const res = await axiosInstance.post(
            `${baseURL}auth/add/business/type/`,
            {
              business_types: formValues.businessTypes,
              discount_percentage: formValues.discount,
            }
          );
          if (res.data.success) {
            dispatch(
              businessQrinfoUpdate({
                business_type_discount: res.data?.data?.business_type_discount,
                business_type_icon: res.data?.data?.business_type_icon,
                business_type_name: res.data?.data?.business_type_name,
                qr_code: res.data?.data?.qr_code,
              })
            );
            message.success(res.data.message);
            onClose();
          }
        } catch (err) {
          message.error(err.response.data.message);
        }
      }
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBusinessType" className="mb-3 ">
        <Form.Label>Business Type {initialValues?.businessTypes}</Form.Label>
        <Form.Control
          as="select"
          name="businessTypes"
          value={formValues.businessTypes}
          onChange={handleChange}
          disabled={initialValues?.business_type_name}
        >
          <option value={""} disabled>
            {"Select Business"}
          </option>
          {!initialValues?.business_type_name &&  businessReducer.businessTypeList
            .filter(
              (bt) =>
                !businessReducer.businessQRInfo.some(
                  (qrInfo) => qrInfo.business_type_name === bt.name
                )
            )
            .map((bt) => (
              <option value={bt.id} key={bt.name} className="p-2">
                {bt.name}
              </option>
            ))}
            
            {initialValues?.business_type_name &&  businessReducer.businessTypeList.map((bt) => (
              <option value={bt.id} key={bt.name} className="p-2">
                {bt.name}
              </option>
            ))}
        </Form.Control>

        <p className="text-danger">{errors.businessTypes}</p>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Discount (%)</Form.Label>
        <Form.Control
          type="number"
          step="0.01"
          name="discount"
          value={formValues.discount}
          onChange={handleChange}
          placeholder="Enter Discount Percentage"
        />
        {errors.discount && (
          <div className="text-danger">{errors.discount}</div>
        )}
      </Form.Group>

      <div className="d-flex justify-content-end gap-2">
        <Button
          type="button"
          variant="secondary"
          className="btn btn-sm"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="btn btn-primary btn-sm"
          disabled={loading}
        >
          {loading && (
            <span
              className="spinner-border spinner-border-sm me-2"
              role="status"
            />
          )}
          {initialValues?.business_type_name ? "Update" : "Submit"}
        </Button>
      </div>
    </Form>
  );
};

export default BusinessDiscountForm;
