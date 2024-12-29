import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { validateBusinessaddress} from '../../../validation/RegistrationValidation';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormData } from '../../../redux/slices/RegisterSlice';
import MapBoxLocationDisplayAutocomplete from '../../../components/Googlemap/MapLocationInput';

const BusinessRegistration2 = ({onNext,onBack}) => {
    const dispatch = useDispatch();
    const formData = useSelector((state) => state.registerReducer.formData);

    const [formValues, setFormValues] = useState({
        address: formData?.address ?? "",
        lat: formData?.lat ?? null,
        lng: formData?.lng ?? null,
      });
    const [errors, setErrors] = useState({});


    const validateForm = (fieldValues = formValues) => {
      const tempErrors = { ...errors };
      if ("address" in fieldValues)
        tempErrors.address = validateBusinessaddress(fieldValues.address , formValues.lat, formValues.lng);      
      setErrors({ ...tempErrors });
    };
  
    const validateField = (name) => {
      switch (name) {
        case "address":
          return  validateBusinessaddress(formValues.address , formValues.lat, formValues.lng);
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

    const handlePlaceSelected = async (place, address) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            address: address,
            lat: place.lat, 
            lng: place.lon
          }));
      
        await dispatch(updateFormData({ "address": address }));
        await dispatch(updateFormData({ "lat": place.lat }));
        await dispatch(updateFormData({ "lng": place.lon }));
        validateForm({
            address: address,
            lat: place.lat,
            lng: place.lon,
          });
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        const tempErrors = validateAllFields();
        if (Object.keys(tempErrors).length === 0) {
            onNext();
        }
        return false;
      };



  return (
    <div>
      <Form.Group className="register-form-container my-3 ">
        <Form.Label>location</Form.Label>
        <div className="w-100">
        <MapBoxLocationDisplayAutocomplete
          onPlaceSelected={handlePlaceSelected}
          initialLat={formValues.lat}
          initialLng={formValues.lng}
          initialAddress={formValues.address}
          height={"200px"}
        />
        </div>
         <p className="text-danger">{errors?.address}</p>
      </Form.Group>
      <div className='multi-step-registration-button-container'>
      <button
          className="btn btn-secondary rounded-pill"
          onClick={onBack}
        >
          Back
        </button>
        <button
          className="btn btn-warning rounded-pill"
          onClick={(e) => handleSubmit(e)}
        >
          Submit
        </button>
      </div>
    </div>
  )
}

export default BusinessRegistration2
