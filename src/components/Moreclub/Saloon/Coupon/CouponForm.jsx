import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../../..";
import { moresaloonURL } from "../../../../config/config";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { message } from "antd";
import Select from "react-select";
import { customStyles } from "../Staff/StaffUpdateForm";
import {
  validateRequiredDateField,
  validateRequiredField,
  validateServiceField,
} from "../../../../validation/resturantValidation";

const CouponForm = ({ mode = "create", initialData = {} ,onFinish }) => {
  const { id } = useParams();
  const [service, setService] = useState([]);
  const [formData, setFormData] = useState({
    code: initialData?.code || "",
    percentage_discount: initialData?.percentage_discount || "",
    fixed_discount: initialData?.fixed_discount || "",
    startDate: initialData?.start_date ? new Date(initialData.start_date) : "",
    endDate: initialData?.end_date ? new Date(initialData.end_date) : "",
    isGlobal: initialData?.is_global !== false,
    services: initialData?.services || [],
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const { data: servicesData, isLoading: serviceLoading } = useQuery({
    queryKey: [`Saloon service List ${id}`],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `${moresaloonURL}moreclub/users/saloons/${id}/services/`
      );
      return response.data.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (servicesData) {
      setService(
        servicesData.map((item) => ({ value: item.id, label: item.name }))
      );
    }
  }, [servicesData]);

  const validateField = (field, value) => {
    switch (field) {
      case "code":
        return validateRequiredField(value, "Coupon Code");
      case "startDate":
        return validateRequiredDateField(value, "Start date");
      case "endDate":
        return validateRequiredDateField(value, "End date");
      // case "percentage_discount":
      //   if (!value && !formData.fixed_discount) {
      //     return ""; // Clear error only when percentage_discount is empty and fixed_discount is not set
      //   } else if (formData.fixed_discount) {
      //     return "Either percentage discount or fixed discount can be selected";
      //   } else {
      //     return validateRequiredField(value, "Percentage discount");
      //   }

      // case "fixed_discount":
      //   if (!value && !formData.percentage_discount) {
      //     return ""; // Clear error only when fixed_discount is empty and percentage_discount is not set
      //   } else if (formData.percentage_discount) {
      //     return "Either percentage discount or fixed discount can be selected";
      //   } else {
      //     return validateRequiredField(value, "Fixed discount");
      //   }
      case "percentage_discount":
      if (!value && !formData.fixed_discount) {
        return "Either percentage discount or fixed discount is required.";
      } else if (value && formData.fixed_discount) {
        return "Only one of percentage discount or fixed discount can be selected.";
      } else {
        return ""; // No error
      }

    case "fixed_discount":
      if (!value && !formData.percentage_discount) {
        return "Either percentage discount or fixed discount is required.";
      } else if (value && formData.percentage_discount) {
        return "Only one of percentage discount or fixed discount can be selected.";
      } else {
        return ""; // No error
      }

      case "services":
        return formData.isGlobal
          ? ""
          : validateServiceField(value, formData.services).price;
      default:
        return "";
    }
  };

  const handleChange = (field, value) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);

    if (field === "percentage_discount" || field === "fixed_discount") {
      if (field === "percentage_discount") {
        const error = validateField(field, value);
        const fixed_discountError = validateField(
          "fixed_discount",
          formData.fixed_discount
        );
        setErrors((prevErrors) => ({
          ...prevErrors,
          [field]: error,
          fixed_discount: fixed_discountError,
        }));
      } else {
        const error = validateField(field, value);
        const percentage_discountError = validateField(
          "percentage_discount",
          formData.percentage_discount
        );
        setErrors((prevErrors) => ({
          ...prevErrors,
          [field]: error,
          percentage_discount: percentage_discountError,
        }));
      }
    } else {
      const error = validateField(field, value);
      setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tempErrors = {};
    // Object.keys(formData).forEach((field) => {
    //   tempErrors[field] = validateField(field, formData[field]);
    // });
    // setErrors(tempErrors);

    // if (Object.values(tempErrors).some((error) => error)) {
    //   message.error("Please fix the errors before submitting.");
    //   return;
    // }

    setIsLoading(true);

    const datas = {
      code: formData.code,
      start_date: formData.startDate,
      end_date: formData.endDate,
      percentage_discount: formData.percentage_discount,
      fixed_discount: formData.fixed_discount,
      is_global: formData.isGlobal,
      services: formData.isGlobal ? [] : formData.services,
    };

    try {
      const endpoint =
        mode === "create"
          ? `${moresaloonURL}moreclub/users/saloons/${id}/coupons/create/`
          : `${moresaloonURL}moreclub/users/saloons/${id}/coupons/${initialData.id}/details/`;
      const method = mode === "create" ? "post" : "patch";

      await axiosInstance[method](endpoint, datas, {
        headers: { "Content-Type": "application/json" },
      });

      message.success(
        `Coupon ${mode === "create" ? "added" : "updated"} successfully`
      );
      queryClient.invalidateQueries({
        queryKey: [`Coupon List ${id}`],
      });
      onFinish();
    } catch (err) {
      message.error(
        `Error ${mode === "create" ? "adding" : "updating"} coupon`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="card p-3">
      <div className="Coupon-form-Container">
        <Form.Group as={Col} controlId="code">
          <Form.Label>Coupon Code</Form.Label>
          <Form.Control
            type="text"
            value={formData.code}
            onChange={(e) => handleChange("code", e.target.value)}
            isInvalid={!!errors.code}
          />
          <Form.Control.Feedback type="invalid">
            {errors.code}
          </Form.Control.Feedback>
        </Form.Group>

        <div>
        </div>

        <Form.Group as={Col} controlId="percentage_discount">
          <Form.Label>Percentage Discount</Form.Label>
          <Form.Control
            type="text"
            value={formData.percentage_discount}
            onChange={(e) =>
              handleChange("percentage_discount", e.target.value)
            }
            isInvalid={!!errors.percentage_discount}
          />
          <Form.Control.Feedback type="invalid">
            {errors.percentage_discount}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} controlId="fixed_discount">
          <Form.Label>Fixed Discount</Form.Label>
          <Form.Control
            type="text"
            value={formData.fixed_discount}
            onChange={(e) => handleChange("fixed_discount", e.target.value)}
            isInvalid={!!errors.fixed_discount}
          />
          <Form.Control.Feedback type="invalid">
            {errors.fixed_discount}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="startDate" className="">
          <Form.Label>Start Date</Form.Label>
          <DatePicker
            selected={formData.startDate}
            onChange={(date) => handleChange("startDate", date)}
            showTimeSelect
            dateFormat="Pp"
            className={`form-control m-2  ${errors.startDate ? "is-invalid" : ""}`}
          />
          <Form.Control.Feedback type="invalid">
            {errors.startDate}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} controlId="endDate" className="">
          <Form.Label>End Date</Form.Label>
          <DatePicker
            selected={formData.endDate}
            onChange={(date) => handleChange("endDate", date)}
            showTimeSelect
            dateFormat="Pp"
            className={`form-control m-2 ${errors.endDate ? "is-invalid" : ""}`}
          />
          <Form.Control.Feedback type="invalid">
            {errors.endDate}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Check
          type="checkbox"
          label="For Specific Services"
          checked={!formData.isGlobal}
          onChange={() => handleChange("isGlobal", !formData.isGlobal)}
        />
        <div></div>
        {!formData.isGlobal && (
          <Form.Group >
            <Form.Label>Services</Form.Label>
            <Select
              styles={customStyles}
              value={service.filter((s) => formData.services.includes(s.value))}
              onChange={(selectedOptions) =>
                handleChange(
                  "services",
                  selectedOptions.map((option) => option.value)
                )
              }
              options={service}
              isMulti
            />
          </Form.Group>
        )}
      </div>

      

      <Button type="submit" disabled={isLoading} className="mt-3">
        {isLoading ? <Spinner size="sm" animation="border" /> : "Submit"}
      </Button>
    </Form>
  );
};

export default CouponForm;
