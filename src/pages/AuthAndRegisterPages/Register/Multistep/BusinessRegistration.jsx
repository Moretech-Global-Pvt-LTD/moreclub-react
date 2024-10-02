import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import {
  currentBusinessStep,
  currentStep,
  updateFormData,
} from "../../../../redux/slices/RegisterSlice";
import MapBoxLocationOnlyAutocomplete from "../../../../components/Googlemap/MapLocationOnly";
import { Button, Col, Modal, Row } from "react-bootstrap";
import MapBoxLocationDisplayAutocomplete from "../../../../components/Googlemap/MapLocationInput";

const BusinessBasicForm = ({ setBusinessRegistration }) => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.registerReducer.formData);

  const [companyName, setCompanyName] = useState(formData?.business_name ?? "");
  const [registrationNumber, setRegistrationNumber] = useState(
    formData?.business_registration_number ?? ""
  );
  const [address, setAddress] = useState(formData?.business_address ?? "");
  const [lat, setlat] = useState(formData?.lat ?? null);
  const [lng, setlng] = useState(formData?.lng ?? null);

  const [companyNameError, setcompanyNameError] = useState("");
  const [registrationNumberError, setRegistrationNumberError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [showForm, setShowForm] = useState(false);

  // for company name
  const handleCompanyNameChange = async (event) => {
    setCompanyName(event.target.value);
  };

  //for comapany validation
  const handleCompanyNameValidation = async (event) => {
    const value = event.target.value;
    if (value.trim() === "") {
      setcompanyNameError("Comapny Name is Required");
      await dispatch(updateFormData({ business_name: companyName }));
    } else {
      await dispatch(updateFormData({ business_name: companyName }));
      setcompanyNameError("");
      console.log(formData);
    }
  };

  // for handle registrtaion number
  const handleRegistrationNumberChange = async (event) => {
    setRegistrationNumber(event.target.value);
    await dispatch(
      updateFormData({ business_registration_number: registrationNumber })
    );
  };

  // for registration number validation
  const handleRegistrationValidation = async (event) => {
    const value = event.target.value;
    if (value.trim() === "") {
      setRegistrationNumberError("Registration number is Required");
    } else {
      await dispatch(
        updateFormData({ business_registration_number: registrationNumber })
      );
      setRegistrationNumberError("");
    }
  };

  const handlePlaceSelected = async (place, address) => {
    console.log("place", place, address);
    setAddress(address);
    setlat(place.lat);
    setlng(place.lon);
    await dispatch(updateFormData({ "business_address": address }));
    await dispatch(updateFormData({ "lat": place.lat }));
    await dispatch(updateFormData({ "lng": place.lon }));
  };


  const handleNextStep = (value) => {
    dispatch(currentBusinessStep(value));
  };

  const handlepreviousStep = (value) => {
    dispatch(currentStep(value));
    setBusinessRegistration(false);
  };

  async function showAddressForm() {
    setShowForm(true);
  }

  async function hideAddressForm() {
    setShowForm(false);
  }

  return (
    <>
      <span
        className={`register-form-container  register-form-wrapper register-headings pe-2 ps-2`}
      >
        <h1>Setup your Business </h1>
        <button
          className="btn btn-link btn-sm "
          onClick={() => handlepreviousStep(2)}
        >
          Back
        </button>
      </span>

      <Form.Group className="register-form-container ">
        <Form.Label>Company Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Company Name"
          value={companyName}
          onChange={handleCompanyNameChange}
          onBlur={handleCompanyNameValidation}
          required
        />
        {companyNameError && <p className="text-danger">{companyNameError}</p>}
      </Form.Group>

      <Form.Group className="register-form-container ">
        <Form.Label>Registration Number</Form.Label>
        <Form.Control
          type="text"
          placeholder="Company Registration Number"
          value={registrationNumber}
          onChange={handleRegistrationNumberChange}
          onBlur={handleRegistrationValidation}
          required
        />
        {registrationNumberError && (
          <p className="text-danger">{registrationNumberError}</p>
        )}
      </Form.Group>
      <Form.Group className="register-form-container w-100">
        <Form.Label>Address</Form.Label>

        
        <div
          className="form-control "
          style={{ height:"2rem"}}
          type="text"
          placeholder="Address"
          value={address}
          onClick={showAddressForm}
          required
          disabled
        >
          {address ?? "address"}
        </div>

        {/* <div className="w-100">
        <MapBoxLocationOnlyAutocomplete
          onPlaceSelected={handlePlaceSelected}
          initialLat={lat}
          initialLng={lng}
          initialAddress={address}
        />
        </div>
        {addressError && <p className="text-danger">{addressError}</p>} */}
      </Form.Group>
      <button
        className="btn btn-primary m-4"
        disabled={
          companyName.trim() === "" ||
          registrationNumber.trim() === "" ||
          address.trim() === "" ||
          companyNameError !== "" ||
          addressError !== "" ||
          registrationNumberError !== "" ||
          formData.business_address === "" ||
          formData.business_registration_number === "" ||
          formData.business_name === ""
        }
        onClick={() => handleNextStep(2)}
      >
        Setup Business
      </button>
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        size="md"
        centered
        show={showForm}
        onHide={hideAddressForm}

      >

        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter text-center" className="text-dynamic-white">
            Set Your Location
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="w-100">
            <MapBoxLocationDisplayAutocomplete
          onPlaceSelected={handlePlaceSelected}
          initialLat={lat}
          initialLng={lng}
          initialAddress={address}
        />
        </div>
          {addressError && <p className="text-danger">{addressError}</p>}
          
              <div className=" d-flex justify-content-end  mt-3">
            <Button variant="warning" size="sm" onClick={hideAddressForm}>
              Save
            </Button>
          </div>
            
        </Modal.Body>
      </Modal>
    </>
  );
};

export default BusinessBasicForm;
