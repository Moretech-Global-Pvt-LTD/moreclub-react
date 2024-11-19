import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import {  validateEmail, validateBusinessPhonenumber } from '../../../validation/RegistrationValidation';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormData } from '../../../redux/slices/RegisterSlice';
import PhoneNumberInput from '../../../components/ui/PhoneInput2';

const BusinessRegistration4 = ({onNext, onBack}) => {
    const dispatch = useDispatch();
    const formData = useSelector((state) => state.registerReducer.formData);

    const [formValues, setFormValues] = useState({
        business_email: formData?.business_email ?? "",
        business_phone: formData?.business_phone ?? "",
        
      });
    const [errors, setErrors] = useState({});


    const validateForm = (fieldValues = formValues) => {
      const tempErrors = { ...errors };
      if ("business_email" in fieldValues)
        tempErrors.business_email = validateEmail(fieldValues.business_email);
      if ("business_phone" in fieldValues)
        tempErrors.business_phone = validateBusinessPhonenumber(fieldValues.business_phone);
      
      setErrors({ ...tempErrors });
    };
  
    const validateField = (name, value) => {
      switch (name) {
        case "business_email":
          return validateEmail(value);
        case "business_phone":
          return validateBusinessPhonenumber(value);
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

      const handlePhoneNumberChange = (data) => {

        setFormValues((prevValues) => ({
            ...prevValues,
            business_phone: data.fullNumber,
          }));
          dispatch(
            updateFormData({
            business_phone: data.fullNumber,
            })
          );
          validateForm({ business_phone : data.fullNumber });
                };
    
      



  return (
    <div>
      <Form.Group className="register-form-container my-3">
        <Form.Label>Business Email</Form.Label>
        <Form.Control
          type="text"
          name="business_email"
          placeholder="Business Email"
          value={formValues.business_email}
          onChange={handleChange}
          required
        />
         <p className="text-danger">{errors?.business_email}</p>
      </Form.Group>
      <Form.Group className="register-form-container my-3 ">
        <Form.Label>Business Contact Nor</Form.Label>
        <PhoneNumberInput
          onChange={handlePhoneNumberChange}
          initialValue={formValues.business_phone}
        />
        <p className="text-danger">{errors?.business_phone}</p>
      </Form.Group>
      <div className='multi-step-registration-button-container'>
      <Button
          className="btn btn-secondary rounded-pill"
          onClick={onBack}
        >
          Back
        </Button>
        <Button
          className="btn btn-primary rounded-pill"
          onClick={(e) => handleSubmit(e)}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default BusinessRegistration4
