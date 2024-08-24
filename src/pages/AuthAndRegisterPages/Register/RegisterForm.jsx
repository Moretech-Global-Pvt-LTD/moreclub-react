import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PaginateBar from "../../../components/register/FormPagination";
import UserBasicForm from "./Multistep/UserBasicForm";
import UserSecondForm from "./Multistep/UserSecondForm";
import BusinessRegisterForm from "./BusinessRegisterForm";
import { register } from "../../../redux/api/loginAPI";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import { baseURL } from "../../../config/config";
import axios from "axios";

const RegistrationForm = (props) => {
  const { subTitle, button } = props;
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.registerReducer.formData);
  const step = useSelector((state) => state.registerReducer);
  const [businessRegistration, setBusinessRegistration] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const currentUrl = window.location.href;

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

  const url = new URL(currentUrl);

  // Get the value of the 'refer' query parameter
  const nextParam = url.searchParams.get("next");
  const referParam = url.searchParams.get("referral");
  const bpmsParam = url.searchParams.get("bpms");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.user_type === "BUSINESS") {
      setBusinessRegistration(true);
    } else {
      // submitting without business logic
      const selectedCountry = countryList.find(
        (country) => country.prefix_number === formData.phone_prefix
      );
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
      };

      setLoading(true);
      const result = await dispatch(
        register(combinedFormData, referParam, bpmsParam)
      );
      if (result.status === 200) {
        message.success("Registered sucessfully");
        localStorage.setItem("otp_username", formData.email);
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
    }
    // Handle form submission here
  };

  return (
    <>
      {!businessRegistration ? (
        <div className={`registerform mt-0`}>
          <PaginateBar />
          <div className="card register-form-wrapper">
            {step.userStep === 1 && <UserBasicForm />}
            {step.userStep === 2 && (
              <UserSecondForm handleSubmit={handleSubmit} loading={loading} />
            )}
            <p className="text-end px-4 mt-0 mb-0">
              {subTitle}
              <Link className="ms-1 hover-primary" to={button[0].path}>
                {button[0].text}
              </Link>
            </p>
          </div>
        </div>
      ) : (
        <BusinessRegisterForm
          setBusinessRegistration={setBusinessRegistration}
        />
      )}
    </>
  );
};

export default RegistrationForm;
