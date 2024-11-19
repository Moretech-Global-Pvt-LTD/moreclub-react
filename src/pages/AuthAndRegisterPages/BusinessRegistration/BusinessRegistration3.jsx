// import React, { useState, useEffect } from "react";
// import { Button, Form } from "react-bootstrap";
// import Select from "react-select";
// import { useDispatch, useSelector } from "react-redux";
// import { updateFormData } from "../../../redux/slices/RegisterSlice";
// import { businessType } from "../../../redux/api/userDetailAPI";

// const BusinessRegistration3 = ({ onNext }) => {
//   const dispatch = useDispatch();
//   const formData = useSelector((state) => state.registerReducer.formData);
//   const businessReducer = useSelector((state) => state.businessReducer);

//   const [selectedBusinessType, setSelectedBusinessType] = useState([]);
//   const [selectedBusinessDiscounts, setSelectedBusinessDiscounts] = useState([]);
//   const [options, setOptions] = useState([]);
//   const [errors, setErrors] = useState({}); // Track field errors

//   useEffect(() => {
//     dispatch(businessType());
//   }, [dispatch]);

//   useEffect(() => {
//     if (businessReducer.businessTypeList?.length > 0) {
//       const formattedOptions = businessReducer.businessTypeList.map((option) => ({
//         value: option.id,
//         label: option.name,
//       }));
//       setOptions(formattedOptions);
//     }
//   }, [businessReducer.businessTypeList]);

//   const handleBusinessTypeChange = (selectedOptions) => {
//     const updatedTypes = selectedOptions || [];
//     setSelectedBusinessType(updatedTypes);
//     const businessTypeIds = updatedTypes.map((type) => type.value);
//     dispatch(updateFormData({ business_types: businessTypeIds }));
//     setErrors((prevErrors) => ({
//       ...prevErrors,
//       selectedBusinessType: updatedTypes.length === 0 ? "Please select at least one business type." : "",
//     }));
//   };

//   const handleDiscountChange = (typeValue, discount) => {
//     const updatedDiscounts = [...selectedBusinessDiscounts];
//     const index = updatedDiscounts.findIndex((d) => d.business_type === typeValue);

//     if (index !== -1) {
//       updatedDiscounts[index] = { ...updatedDiscounts[index], discount };
//     } else {
//       updatedDiscounts.push({ business_type: typeValue, discount });
//     }

//     setSelectedBusinessDiscounts(updatedDiscounts);
//     dispatch(updateFormData({ business_discount: updatedDiscounts }));

//     // Validate discount
//     setErrors((prevErrors) => ({
//       ...prevErrors,
//       [typeValue]: discount.trim() === "" ? "Discount is required." : "",
//     }));
//   };

//   const validateFields = () => {
//     const tempErrors = {};

//     // Validate selected business types
//     if (selectedBusinessType.length === 0) {
//       tempErrors.selectedBusinessType = "Please select at least one business type.";
//     }

//     // Validate discounts
//     selectedBusinessType.forEach((type) => {
//       const discount = selectedBusinessDiscounts.find((d) => d.business_type === type.value)?.discount || "";
//       if (!discount.trim()) {
//         tempErrors[type.value] = `Discount for ${type.label} is required.`;
//       }
//     });

//     setErrors(tempErrors);
//     return Object.keys(tempErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateFields()) {
//       onNext();
//     }
//   };

//   return (
//     <div>
//       <Form.Group className="register-form-container my-3">
//         <Form.Label className="mb-2 fz-16">Business Types</Form.Label>
//         <Select
//           className="mb-2 form-control"
//           styles={{ background: "transparent" }}
//           value={selectedBusinessType}
//           onChange={handleBusinessTypeChange}
//           options={options}
//           isMulti={true}
//           required
//         />
//         {errors.selectedBusinessType && <div className="text-danger">{errors.selectedBusinessType}</div>}
//       </Form.Group>

//       <Form.Group className="register-form-container my-3">
//         {selectedBusinessType.map((type) => (
//           <Form.Group key={type.value} className="w-100">
//             <Form.Label>{type.label}</Form.Label>
//             <Form.Control
//               type="number"
//               step={0.01}
//               placeholder="Discount in percentage"
//               value={
//                 selectedBusinessDiscounts.find((d) => d.business_type === type.value)?.discount || ""
//               }
//               onChange={(e) => handleDiscountChange(type.value, e.target.value)}
//             />
//             {errors[type.value] && <div className="text-danger">{errors[type.value]}</div>}
//           </Form.Group>
//         ))}
//       </Form.Group>

//       <div className="d-flex justify-content-end">
//         <Button className="btn btn-primary" onClick={handleSubmit}>
//           Next
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default BusinessRegistration3;

import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { updateFormData } from "../../../redux/slices/RegisterSlice";
import { businessType } from "../../../redux/api/userDetailAPI";

const BusinessRegistration3 = ({ onNext , onBack , loading}) => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.registerReducer.formData);
  const businessReducer = useSelector((state) => state.businessReducer);

  const [selectedBusinessType, setSelectedBusinessType] = useState([]);
  const [selectedBusinessDiscounts, setSelectedBusinessDiscounts] = useState([]);
  const [options, setOptions] = useState([]);
  const [errors, setErrors] = useState({}); // Track field errors

  useEffect(() => {
    // Fetch business types
    dispatch(businessType());
  }, [dispatch]);

  useEffect(() => {
    // Populate options from business type list
    if (businessReducer.businessTypeList?.length > 0) {
      const formattedOptions = businessReducer.businessTypeList.map((option) => ({
        value: option.id,
        label: option.name,
      }));
      setOptions(formattedOptions);

      // Set initial selected business types based on formData
      if (formData.business_types?.length > 0) {
        const initialBusinessTypes = formattedOptions.filter((option) =>
          formData.business_types.includes(option.value)
        );
        setSelectedBusinessType(initialBusinessTypes);
      }

      // Set initial discounts based on formData
      if (formData.business_discount?.length > 0) {
        setSelectedBusinessDiscounts(formData.business_discount);
      }
    }
  }, [businessReducer.businessTypeList, formData]);

  const handleBusinessTypeChange = (selectedOptions) => {
    const updatedTypes = selectedOptions || [];
    setSelectedBusinessType(updatedTypes);

    const businessTypeIds = updatedTypes.map((type) => type.value);
    dispatch(updateFormData({ business_types: businessTypeIds }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      selectedBusinessType: updatedTypes.length === 0 ? "Please select at least one business type." : "",
    }));
  };

  const handleDiscountChange = (typeValue, discount) => {
    const updatedDiscounts = [...selectedBusinessDiscounts];
    const index = updatedDiscounts.findIndex((d) => d.business_type === typeValue);

    if (index !== -1) {
      updatedDiscounts[index] = { ...updatedDiscounts[index], discount };
    } else {
      updatedDiscounts.push({ business_type: typeValue, discount });
    }

    setSelectedBusinessDiscounts(updatedDiscounts);
    dispatch(updateFormData({ business_discount: updatedDiscounts }));

    // Validate discount
    setErrors((prevErrors) => ({
      ...prevErrors,
      [typeValue]: discount.trim() === "" ? "Discount is required." : "",
    }));
  };

  const validateFields = () => {
    const tempErrors = {};

    // Validate selected business types
    if (selectedBusinessType.length === 0) {
      tempErrors.selectedBusinessType = "Please select at least one business type.";
    }

    // Validate discounts
    selectedBusinessType.forEach((type) => {
      const discount = selectedBusinessDiscounts.find((d) => d.business_type === type.value)?.discount || "";
      if (!discount.trim()) {
        tempErrors[type.value] = `Discount for ${type.label} is required.`;
      }
    });

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateFields()) {
      onNext();
    }
  };

  return (
    <div>
      <Form.Group className="register-form-container my-3">
        <Form.Label className="mb-2 fz-16">Business Types</Form.Label>
        <Select
          className="mb-2 form-control"
          styles={{ background: "transparent" }}
          value={selectedBusinessType}
          onChange={handleBusinessTypeChange}
          options={options}
          isMulti={true}
          required
        />
        {errors.selectedBusinessType && <div className="text-danger">{errors.selectedBusinessType}</div>}
      </Form.Group>

      <Form.Group className="register-form-container my-3">
        {selectedBusinessType.map((type) => (
          <Form.Group key={type.value} className="w-100">
            <Form.Label>{type.label}</Form.Label>
            <Form.Control
              type="number"
              step={0.01}
              placeholder="Discount in percentage"
              value={
                selectedBusinessDiscounts.find((d) => d.business_type === type.value)?.discount || ""
              }
              onChange={(e) => handleDiscountChange(type.value, e.target.value)}
            />
            {errors[type.value] && <div className="text-danger">{errors[type.value]}</div>}
          </Form.Group>
        ))}
      </Form.Group>

      <div className='multi-step-registration-button-container'>
      <Button
          className="btn btn-secondary rounded-pill"
          onClick={onBack}
        >
          Back
        </Button>
        <Button
          className="btn btn-warning rounded-pill"
          onClick={(e) => handleSubmit(e)}
        >
            {loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> }
          Submit
        </Button>
      </div>
    </div>
  );
};

export default BusinessRegistration3;

