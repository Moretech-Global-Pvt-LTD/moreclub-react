import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { update_business_detail } from "../../../redux/api/loginAPI";
import { message } from "antd";
import { alertNotification } from "../../../redux/api/notification";
import AddressInputWithAutocomplete from "../../../components/Googlemap/LocationInputonly";

const BusinessUpdatePage = ({ business }) => {
  const dispatch = useDispatch();
  const businessverification = useSelector((state) => state.businessReducer);

  const [notifications, setNotifications] = useState([]);

  // const business = useSelector((state) => state.businessReducer);

  // console.log(business.businessProfile.business_name)

  const [companyName, setCompanyName] = useState(
    business.businessProfile?.business_name ?? ""
  );
  const [registrationNumber, setRegistrationNumber] = useState(
    business.businessProfile?.business_registration_number ?? ""
  );
  const [address, setAddress] = useState(
    business?.businessProfile?.business_address ?? ""
  );
  const [lat, setlat] = useState(business?.businessProfile?.lat ?? null);
  const [lng, setlng] = useState(business?.businessProfile?.lng ?? null);

  const [businessPhone, setBusinessPhone] = useState(
    business?.businessProfile?.business_phone ?? ""
  );
  const [businessEmail, setBusinessEmail] = useState(
    business?.businessProfile?.business_email ?? ""
  );

  const [companyNameError, setcompanyNameError] = useState("");
  const [registrationNumberError, setRegistrationNumberError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [bussinessPhoneError, setBussinessPhoneError] = useState("");
  const [bussinessEmailError, setBussinessEmailError] = useState("");

  useEffect(() => {
    setCompanyName(business.businessProfile?.business_name ?? "");
    setRegistrationNumber(
      business.businessProfile?.business_registration_number ?? ""
    );
    setAddress(business?.businessProfile?.business_address ?? "");
    setBusinessPhone(business?.businessProfile?.business_phone ?? "");
    setBusinessEmail(business?.businessProfile?.business_email ?? "");
  }, [business]);

  useEffect(() => {
    alertNotification()
      .then((response) => {
        setNotifications(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching notifications:", error);
      });
  }, []);

  // for company name
  const handleCompanyNameChange = async (event) => {
    setCompanyName(event.target.value);
  };

  //for comapany validation
  const handleCompanyNameValidation = async (event) => {
    const value = event.target.value;
    if (value.trim() === "") {
      setcompanyNameError("Comapny Name is Required");
    } else {
      //   await dispatch(updateFormData({ "business_name": companyName }));
      setcompanyNameError("");
      //   console.log(formData)
    }
  };

  // for handle registrtaion number
  const handleRegistrationNumberChange = async (event) => {
    setRegistrationNumber(event.target.value);
  };

  // for registration number validation
  const handleRegistrationValidation = async (event) => {
    const value = event.target.value;
    if (value.trim() === "") {
      setRegistrationNumberError("Registration number is Required");
    } else {
      //   await dispatch(updateFormData({ "business_registration_number": registrationNumber }));
      setRegistrationNumberError("");
    }
  };

  const handlePlaceSelected = async (place, address) => {
    setAddress(address);
    setlat(place.lat);
    setlng(place.lng);
  };

  // for handleAddress
  const handleAddressChange = async (event) => {
    setAddress(event.target.value);
  };

  const handleAddressValidation = async (event) => {
    const value = event.target.value;
    if (value.trim() === "") {
      setAddressError("Address is Required");
    } else {
      //   await dispatch(updateFormData({ "business_address": address }));
      setAddressError("");
    }
  };

  const handlePhoneChange = async (event) => {
    setBusinessPhone(event.target.value);
  };

  const handlePhoneValidation = async (event) => {
    const value = event.target.value;
    if (value.trim() === "") {
      setBussinessPhoneError("Phone is Required");
    } else {
      //   await dispatch(updateFormData({ "business_address": address }));
      setBussinessPhoneError("");
    }
  };

  const handleEmailChange = async (event) => {
    setBusinessEmail(event.target.value);
  };

  const handleEmailValidation = async (event) => {
    const value = event.target.value;
    if (value.trim() === "") {
      setBussinessEmailError("Email is Required");
    } else {
      //   await dispatch(updateFormData({ "business_address": address }));
      setBussinessEmailError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      business_name: companyName,
      business_address: address,
      lat: lat,
      lng: lng,
      business_registration_number: registrationNumber,
      business_email: businessEmail,
      business_phone: businessPhone,
    };
    const res = await dispatch(update_business_detail(formData));
    if (res) {
      message.success("Business Updated Successfully");
    } else {
      message.error("Failed to Update Data");
    }
  };

  return (
    <div className="card col-12 col-sm-10 col-md-8">
      <div className="card-body p-4 p-sm-5" style={{ marginTop: "-25px" }}>
        <h4>Update Basic Information</h4>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="register-form-container ">
            <Form.Label>Comapny Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Company Name"
              value={companyName}
              onChange={handleCompanyNameChange}
              onBlur={handleCompanyNameValidation}
              disabled={businessverification.businessProfile.is_verified}
              required
              className="text-dynamic-white"
              style={{ backgroundColor: "transparent" }}
            />
            {companyNameError && (
              <p className="text-danger">{companyNameError}</p>
            )}
          </Form.Group>

          <Form.Group className="register-form-container ">
            <Form.Label>Registration Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Company Registration Number"
              value={registrationNumber}
              onChange={handleRegistrationNumberChange}
              onBlur={handleRegistrationValidation}
              disabled={businessverification.businessProfile.is_verified}
              required
              className="text-dynamic-white"
              style={{ backgroundColor: "transparent" }}
            />
            {registrationNumberError && (
              <p className="text-danger">{registrationNumberError}</p>
            )}
          </Form.Group>

          <Form.Group className="register-form-container ">
            <Form.Label>Address</Form.Label>
            {businessverification.businessProfile.is_verified ? (
              <Form.Control
                type="text"
                placeholder="Company Address"
                value={address}
                onChange={handleAddressChange}
                onBlur={handleAddressValidation}
                disabled={businessverification.businessProfile.is_verified}
                required
                className="text-dynamic-white"
                style={{ backgroundColor: "transparent" }}
              />
            ) : (
              <AddressInputWithAutocomplete
                onPlaceSelected={handlePlaceSelected}
                initialLat={lat}
                initialLng={lng}
                initialAddress={address}
              />
            )}

            {addressError && <p className="text-danger">{addressError}</p>}
          </Form.Group>

          <Form.Group className="register-form-container ">
            <Form.Label>Business Phonenumber</Form.Label>
            <Form.Control
              type="text"
              placeholder="Business PhoneNumber"
              value={businessPhone}
              onChange={handlePhoneChange}
              onBlur={handlePhoneValidation}
              disabled={businessverification.businessProfile.is_verified}
              required
              className="text-dynamic-white"
              style={{ backgroundColor: "transparent" }}
            />
            {bussinessPhoneError && (
              <p className="text-danger">{bussinessPhoneError}</p>
            )}
          </Form.Group>
          <Form.Group className="register-form-container ">
            <Form.Label>Business Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Business Email"
              value={businessEmail}
              onChange={handleEmailChange}
              onBlur={handleEmailValidation}
              disabled={businessverification.businessProfile.is_verified}
              required
              className="text-dynamic-white"
              style={{ backgroundColor: "transparent" }}
            />
            {bussinessEmailError && (
              <p className="text-danger">{bussinessEmailError}</p>
            )}
          </Form.Group>

          <button
            className="btn btn-primary m-4"
            type="submit"
            disabled={
              companyName.trim() === "" ||
              registrationNumber.trim() === "" ||
              address.trim() === "" ||
              companyNameError !== "" ||
              addressError !== "" ||
              registrationNumberError !== ""
            }
          >
            Update Business
          </button>
        </Form>
      </div>
    </div>
  );
};

export default BusinessUpdatePage;
