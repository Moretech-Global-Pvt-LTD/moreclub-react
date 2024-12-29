import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { validateBusinessName, validateBusinessRegistration } from '../../../validation/RegistrationValidation';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormData } from '../../../redux/slices/RegisterSlice';

const BusinessRegistration1 = ({onNext}) => {
    const dispatch = useDispatch();
    const formData = useSelector((state) => state.registerReducer.formData);

    const [formValues, setFormValues] = useState({
        companyName: formData?.companyName ?? "",
        registrationNumber: formData?.registrationNumber ?? "",
        
      });
    const [errors, setErrors] = useState({});


    const validateForm = (fieldValues = formValues) => {
      const tempErrors = { ...errors };
      if ("companyName" in fieldValues)
        tempErrors.companyName = validateBusinessName(fieldValues.companyName);
      if ("registrationNumber" in fieldValues)
        tempErrors.registrationNumber = validateBusinessRegistration(fieldValues.registrationNumber);
      
      setErrors({ ...tempErrors });
    };
  
    const validateField = (name, value) => {
      switch (name) {
        case "companyName":
          return validateBusinessName(value);
        case "registrationNumber":
          return validateBusinessRegistration(value);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const tempErrors = validateAllFields();
        if (Object.keys(tempErrors).length === 0) {
            onNext();
        }
        return false;
      };

    const handleChange =async (e) => {
        const { name, value, type, checked } = e.target;
        setFormValues((prevValues) => ({
          ...prevValues,
          [name]: type === "checkbox" ? (checked ? true : false) : value,
        }));
        validateForm({ [name]: type === "checkbox" ? checked : value });
      
        await dispatch(
            updateFormData({
              [name]: type === "checkbox" ? checked : value, // Pass field name and value
            })
          );
      };



  return (
    <div>
      <Form.Group className="register-form-container my-3">
        <Form.Label>Company Name</Form.Label>
        <Form.Control
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={formValues.companyName}
          onChange={handleChange}
          required
        />
         <p className="text-danger">{errors?.companyName}</p>
      </Form.Group>
      <Form.Group className="register-form-container my-3 ">
        <Form.Label>Registration Number</Form.Label>
        <Form.Control
          type="text"
          name="registrationNumber"
          placeholder="Company Registration Number"
          value={formValues.registrationNumber}
          onChange={handleChange}
          required
        />
        <p className="text-danger">{errors?.registrationNumber}</p>
      </Form.Group>
      <div className='multi-step-registration-button-container-single'>
        <button
          className="btn btn-primary rounded-pill w-100"
          onClick={(e) => handleSubmit(e)}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default BusinessRegistration1
