import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BusinessBasicForm from "./Multistep/BusinessRegistration";
import BusinessDiscountsForm from "./Multistep/BusinessDiscounts";
import BusinessPaginateBar from "../../../components/register/BusinessRegistrationPagination";
import { useNavigate } from "react-router-dom";
import { register } from "../../../redux/api/loginAPI";
import { message } from "antd";
import axios from "axios";
import { baseURL } from "../../../config/config";

const BusinessRegisterForm = ({ setBusinessRegistration }) => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.registerReducer.formData);
  const step = useSelector((state) => state.registerReducer);

  const [countryList, setCountryList] = useState();

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const res = await axios.get(`${baseURL}country/list/`);
        setCountryList(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCountry();
  }, []);

  const currentUrl = window.location.href;

  // Create a URL object
  const url = new URL(currentUrl);

  // Get the value of the 'refer' query parameter
  const nextParam = url.searchParams.get("next");
  const referParam = url.searchParams.get("referral");
  const bpms = url.searchParams.get("bpms");

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmitWithBusiness = async (e) => {
    e.preventDefault();

    const selectedCountry = countryList.find(
      (country) => country.prefix_number === formData.phone_prefix
    );

    // Handle form submission here
    const combinedFormData = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      phone_number: `${formData.phone_number}`,
      password: formData.password,
      user_type: formData.user_type,
      user_profile: {
        phone_prefix: formData.phone_prefix,
        country_code: selectedCountry.code,
        country: selectedCountry.name,
        gender: formData.gender,
      },
      business_profile: {
        business_types: formData.business_types,
        business_name: formData.business_name,
        business_address: formData.business_address,
        lat: formData.lat,
        lng: formData.lng,
        business_email: formData.email,
        business_phone: formData.phone_number,
        business_registration_number: formData.business_registration_number,
      },
      business_discount: formData.business_discount,
    };
    setLoading(true);
    const result = await dispatch(register(combinedFormData, referParam, bpms));

    if (result.status === 200) {
      message.success("Registered Successfully");
      localStorage.setItem("otp_username", formData.phone_number);
      if (nextParam) {
        const targetUrl = `/otp?next=${encodeURIComponent(nextParam)}`;
        navigate(targetUrl);
      } else {
        navigate("/otp");
      }
      setLoading(false);
    } else {
      message.error("Something went Wrong");
      setLoading(false);
    }
  };

  return (
    <div className={`registerform`}>
      <BusinessPaginateBar />
      <div className="card register-form-wrapper">
        {step.businessStep === 1 && (
          <BusinessBasicForm
            setBusinessRegistration={setBusinessRegistration}
          />
        )}
        {step.businessStep === 2 && (
          <BusinessDiscountsForm
            handleSubmit={handleSubmitWithBusiness}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
};

export default BusinessRegisterForm;
