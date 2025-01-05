import React, { useEffect, useState } from "react";
import { Button, Col, Row, Form, Spinner } from "react-bootstrap";
import axios from "axios";
import { baseURL } from "../../../../config/config";

import { message } from "antd";
import {
  valdateShortDescription,
  validateAddress,
  Validatebanner,
  validateContactNumber,
  validateCountry,
  validateEmail,
  Validatelogo,
  validateLongDescription,
  validateResturantName,
} from "../../../../validation/resturantValidation";
import { useNavigate } from "react-router-dom";
import MapBoxLocationDisplayAutocomplete from "../../../Googlemap/MapLocationInput";
import { useSelector } from "react-redux";
import {
  validateFirstName,
  validateGender,
  validateLastName,
  validatePassword,
  validateUserEmail,
  validateUserPhone,
} from "../../../../validation/userRegisterValidation";
import PhoneNumberInput from "../../../ui/PhoneInput2";
import { morefoodAuthenticatedAxios, morefoodPublicAxios } from "../../../../utills/axios/morefoodaxios";

const StationCreateForm = () => {
  const navigate = useNavigate();
  const businessProfiles = useSelector(
    (state) => state.businessReducer.businessProfile
  );
  const userProfiles = useSelector((state) => state.userReducer.user);

  const [countryList, setCountryList] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [inputDisplayLogo, setInputDisplayLogo] = useState();
  const [LogoError, setLogoError] = useState("");

  const [inputDisplayImage, setInputDisplayImage] = useState();
  const [bannerError, setBannerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [symbol, setSymbol] = useState("");
  const [userhasaccount, setUserhasaccount] = useState(false);
  const [formValues, setFormValues] = useState({
    name: businessProfiles?.business_name ?? "",
    address: businessProfiles?.business_address ?? "",
    email: businessProfiles?.business_email ?? "",
    contact_no: businessProfiles?.business_phone ?? "",
    country: "",
    currency: "",
    lat: businessProfiles?.lat ?? 0,
    lng: businessProfiles?.lng ?? 0,
    banner: null,
    logo: null,
    user: "",
    short_description: "",
    long_description: "",
    station_country: "",

    first_name: "",
    last_name: "",
    phone_number: "",
    password: "",
    phone_prefix: "",
    gender: "",
    country_code: "",
    username: "",
  });

  const handleAccountSwitch = () => {
    setUserhasaccount((prevValue) => !prevValue);
  };

  const [errors, setErrors] = useState({});

  const validateForm = (fieldValues = formValues) => {
    const tempErrors = { ...errors };
    if ("name" in fieldValues)
      tempErrors.name = validateResturantName(fieldValues.name);
    if ("country" in fieldValues)
      tempErrors.country = validateCountry(fieldValues.country);
    if ("address" in fieldValues)
      tempErrors.address = validateAddress(
        fieldValues.address,
        formValues.lat,
        formValues.lng
      );
    if ("short_description" in fieldValues)
      tempErrors.short_description = valdateShortDescription(
        fieldValues.short_description
      );
    if ("long_description" in fieldValues)
      tempErrors.long_description = validateLongDescription(
        fieldValues.long_description
      );
    if ("contact_no" in fieldValues)
      tempErrors.contact_no = validateContactNumber(fieldValues.contact_no);
    if ("email" in fieldValues)
      tempErrors.email = validateEmail(fieldValues.email);

    if (!userhasaccount) {
      if ("first_name" in fieldValues)
        tempErrors.first_name = validateFirstName(fieldValues.first_name);
      if ("last_name" in fieldValues)
        tempErrors.last_name = validateLastName(fieldValues.last_name);
      if ("phone_number" in fieldValues)
        tempErrors.phone_number = validateUserPhone(fieldValues.phone_number);
      if ("password" in fieldValues)
        tempErrors.password = validatePassword(fieldValues.password);
      if ("gender" in fieldValues)
        tempErrors.gender = validateGender(fieldValues.gender);
    }

    // Username validation (always optional)
    if ("username" in fieldValues)
      tempErrors.username = validateUserEmail(fieldValues.username);

    setErrors({ ...tempErrors });
  };

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return validateResturantName(value);
      case "country":
        return validateCountry(value);
      case "address":
        return validateAddress(value);
      case "short_description":
        return valdateShortDescription(value);
      case "long_description":
        return validateLongDescription(value);
      case "contact_no":
        return validateContactNumber(value);
      case "email":
        return validateEmail(value);
      case "banner":
        return Validatebanner(value);
      case "logo":
        return Validatelogo(value);
      case "username":
        return validateUserEmail(value);
      case "first_name":
        return !userhasaccount ? validateFirstName(value) : "";
      case "last_name":
        return !userhasaccount ? validateLastName(value) : "";
      case "phone_number":
        return !userhasaccount ? validateUserPhone(value) : "";
      case "password":
        return !userhasaccount ? validatePassword(value) : "";
      case "gender":
        return !userhasaccount ? validateGender(value) : "";
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

  const handlePhoneNumberChange = (data) => {
    if (
      data.prefix === undefined ||
      data.country === undefined ||
      data.countryCode === undefined
    ) {
      setFormValues((prevData) => ({
        ...prevData,
        phone_number: data.fullNumber,
      }));
    } else {
      // setPhoneNumber(data.fullNumber);
      // setPrefixs(data.prefix);
      setFormValues((prevData) => ({
        ...prevData,
        phone_number: data.fullNumber,
        phone_prefix: data.prefix,
        country_code: data.countryCode,
        country: data.country,
      }));
      handlePhoneCheck(data.fullNumber);
    }
  };

  const handleemailCheck = async (value) => {
    const emailpattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailpattern.test(value)) {
      setErrors((prevData) => ({
        ...prevData,
        username: "Invalid email",
      }));
    } else {
      setErrors((prevData) => ({
        ...prevData,
        username: "",
      }));
      try {
        const res = await axios.post(`${baseURL}auth/check/username/`, {
          username: `${value}`,
        });
        if (res.status === 200) {
          if (userhasaccount) {
            setErrors((prevData) => ({
              ...prevData,
              username: "username not found",
            }));
          } else {
            setErrors((prevData) => ({
              ...prevData,
              username: "",
            }));
          }
        }
      } catch (error) {
        console.log(error.response?.data?.errors?.username[0]);
        if (userhasaccount) {
          setErrors((prevData) => ({
            ...prevData,
            username: "",
          }));
        } else {
          setErrors((prevData) => ({
            ...prevData,
            username: error.response?.data?.errors?.username[0],
          }));
        }
      }
    }
  };

  const handlePhoneCheck = async (value) => {
    if (value !== "") {
      try {
        const res = await axios.post(`${baseURL}auth/check/username/`, {
          username: `${value}`,
        });
        if (res.status === 200) {
          setErrors((prevData) => ({
            ...prevData,
            phone_number: "",
          }));
        }
      } catch (error) {
        setErrors((prevData) => ({
          ...prevData,
          phone_number: error.response.data?.errors?.username[0],
        }));
      }
    } else {
      setErrors((prevData) => ({
        ...prevData,
        phone_number: "Phone number is required",
      }));
    }
  };

  const fetchCountry = async () => {
    try {
      const res = await morefoodPublicAxios.get(`country/list/`);
      setCountryList(res.data.data);
      const uniqueCurrencies = new Map();

      res.data.data.forEach((country) => {
        if (country.currency && country.currency.id) {
          uniqueCurrencies.set(country.currency.id, country.currency);
        }
      });

      // Convert Map values to Array
      const currencyList = Array.from(uniqueCurrencies.values());
      setCurrencyList(currencyList);
    } catch (err) {
      console.error(err);
    }
  };
  const fetchUserList = async () => {
    try {
      const res = await morefoodPublicAxios.get(`user/list/`);
      setUsersList(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCountry();
    fetchUserList();
  }, []);

  useEffect(() => {
    if (countryList.length > 0) {
      if (userProfiles?.user_profile?.country) {
        handleCountryInitialChange();
      }
    }
  }, [countryList, userProfiles]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: type === "checkbox" ? (checked ? true : false) : value,
    }));
    validateForm({ [name]: type === "checkbox" ? checked : value });
    if (name === "username") {
      console.log("value", value);
      handleemailCheck(value);
    }
  };

  const handleCountryInitialChange = () => {
    const currency = countryList.filter(
      (co) => co.name === userProfiles?.user_profile?.country
    )[0];
    setSymbol(currency.currency.symbol);

    setFormValues((prevValues) => ({
      ...prevValues,
      currency: currency.currency.id,
      country: currency.id,
    }));
    validateForm({ country: currency.id, currency: currency.currency.id });
  };

  const handleCountryChange = (e) => {
    const { name, value, type, checked } = e.target;
    const currency = countryList.filter((co) => co.id === parseInt(value))[0];
    setSymbol(currency.currency.symbol);
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: type === "checkbox" ? (checked ? true : false) : value,
    }));
    setFormValues((prevValues) => ({
      ...prevValues,
      currency: currency.currency.id,
    }));
    validateForm({ [name]: type === "checkbox" ? checked : value });
  };

  const handleCurrencyChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: type === "checkbox" ? (checked ? true : false) : value,
    }));
    validateForm({ [name]: type === "checkbox" ? checked : value });
  };

  const handlePlaceSelected = async (place, address) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      address: address,
      lat: place.lat,
      lng: place.lon,
    }));
  };

  const LogohandleChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setInputDisplayLogo(URL.createObjectURL(event.target.files[0]));
      setFormValues((prevValues) => ({
        ...prevValues,
        logo: event.target.files[0],
      }));
      setLogoError("");
    } else {
      setLogoError("Please upload images only");
    }
  };

  const bannerhandleChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setInputDisplayImage(URL.createObjectURL(event.target.files[0]));
      setFormValues((prevValues) => ({
        ...prevValues,
        banner: event.target.files[0],
      }));
      setBannerError("");
    } else {
      setBannerError("Please upload images only");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateAllFields();
    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true);

      const formData = {
        is_new_user:true,
        name: formValues.name,
        address: formValues.address,
        email: formValues.email,
        contact_no: formValues.contact_no,
        country: formValues.station_country,
        currency: formValues.currency,
        lat: formValues.lat,
        lng: formValues.lng,
        banner: formValues.banner,
        logo: formValues.logo,
        short_description: formValues.short_description,
        long_description: formValues.long_description,

        first_name: formValues.first_name,
        last_name: formValues.last_name,
        phone_number: formValues.phone_number,
        password: formValues.password,
        prefix_code: formValues.phone_prefix,
        gender: formValues.gender,
        moreclub_country_code: formValues.country_code,
        moreclub_country_name: formValues.country,
        username: formValues.username,
      };

      try {
        const res = await morefoodAuthenticatedAxios.post(
          `moreclub/setup/station/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        message.success("Station created");
        const slug = res.data.data.name.replace(/ /g, "-");
        navigate(`/station/${res.data.data.id}/${slug}`);
      } catch (err) {
        console.log(err);
        message.error("Error Creating Station");
      } finally {
        setIsLoading(false);
      }
    } else {
      message.error("Please Provide the valid information");
    }
  };

  return (
    <div className="d-flex flex-column gap-4 mt-3">
      <Row>
        <Col xs={12} md={12} lg={12} xl={10} xxl={10}>
          <Form className="restaurant-form  " onSubmit={handleSubmit}>
            <h5>User Information</h5>
            <p className="text-warning">All fields are required</p>
            <Col className="card d-flex flex-column gap-4 p-2">
              <Row>
                {/* <Col xs={12} md={6} lg={6} xl={6}>
                                    <Form.Group controlId="formUserHasAccount">
                                        <Form.Check
                                            type="switch"
                                            label="I already have an account"
                                            checked={userhasaccount}
                                            onChange={handleAccountSwitch}
                                        />
                                    </Form.Group>
                                </Col> */}
                <Col xs={12} md={6} lg={6} xl={6}>
                  <Form.Group controlId="formUsername">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="username"
                      placeholder="Login Email"
                      value={formValues.username}
                      onChange={handleChange}
                    />
                    <p className="text-danger">{errors.username}</p>
                  </Form.Group>
                </Col>

                {!userhasaccount && (
                  <>
                    <Col xs={12} md={6} lg={6} xl={6}>
                      <Form.Group controlId="formFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="first_name"
                          placeholder="First Name"
                          value={formValues.first_name}
                          onChange={handleChange}
                        />
                        <p className="text-danger">{errors.first_name}</p>
                      </Form.Group>
                    </Col>

                    <Col xs={12} md={6} lg={6} xl={6}>
                      <Form.Group controlId="formLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="last_name"
                          placeholder="Last Name"
                          value={formValues.last_name}
                          onChange={handleChange}
                        />
                        <p className="text-danger">{errors.last_name}</p>
                      </Form.Group>
                    </Col>

                    <Col xs={12} md={6} lg={6} xl={6}>
                      <Form.Group controlId="formPhoneNumber">
                        <Form.Label>Phone Number</Form.Label>
                        <PhoneNumberInput
                          onChange={handlePhoneNumberChange}
                          initialValue={formValues.phone_number}
                        />

                        {/* <Form.Control
                                                    type="text"
                                                    name="phone_number"
                                                    placeholder="Phone Number"
                                                    value={formValues.phone_number}
                                                    onChange={handleChange}
                                                /> */}
                        <p className="text-danger">{errors.phone_number}</p>
                      </Form.Group>
                    </Col>

                    <Col xs={12} md={6} lg={6} xl={6}>
                      <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          placeholder="Password"
                          value={formValues.password}
                          onChange={handleChange}
                        />
                        <p className="text-danger">{errors.password}</p>
                      </Form.Group>
                    </Col>

                    <Col xs={12} md={6} lg={6} xl={6}>
                      <Form.Group controlId="formGender">
                        <Form.Label>Gender</Form.Label>
                        <Form.Control
                          as="select"
                          name="gender"
                          value={formValues.gender}
                          onChange={handleChange}
                        >
                          <option value="">Select Gender</option>
                          <option value="MALE">Male</option>
                          <option value="FEMALE">Female</option>
                          <option value="OTHER">Other</option>
                        </Form.Control>
                        <p className="text-danger">{errors.gender}</p>
                      </Form.Group>
                    </Col>
                  </>
                )}
              </Row>
            </Col>

            <h5>Station Information</h5>
            <p className="text-warning">All fields are required</p>
            <Col className="card d-flex flex-column gap-4 p-2">
              <Row>
                <Col xs={12} md={6} lg={6} xl={6}>
                  <Form.Group controlId="formRestaurantName">
                    <Form.Label>Station Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder={"Station Name"}
                      value={formValues.name}
                      onChange={handleChange}
                    />
                    <p className="text-danger">{errors.name}</p>
                  </Form.Group>
                </Col>
                <Col xs={12} md={6} lg={6} xl={6}>
                  <Form.Group controlId="formemail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder={"example@example.com"}
                      value={formValues.email}
                      onChange={handleChange}
                    />
                    <p className="text-danger">{errors.email}</p>
                  </Form.Group>
                </Col>
                {/* <Col xs={12} md={6} lg={6} xl={6} >
                                    <Form.Group controlId="formmin_order ">
                                        <Form.Label>Assign user</Form.Label>
                                        <Form.Control
                                            as="select"
                                            name="user"
                                            value={formValues.user}
                                            onChange={handleCountryChange}
                                        >
                                            <option value={""} disabled>
                                                {"Select User"}
                                            </option>
                                            {usersList.map((bt) => (
                                                <option value={bt.id} key={bt.name}>
                                                    {bt.name}
                                                </option>
                                            ))}
                                        </Form.Control>
                                        <p className="text-danger">{errors.user}</p>
                                    </Form.Group>
                                </Col> */}

                <Col xs={12} md={6} lg={6} xl={6}>
                  <Form.Group controlId="formContactname">
                    <Form.Label>Contact no</Form.Label>
                    <Form.Control
                      type="text"
                      name="contact_no"
                      placeholder={"+xxxxxxxxxx"}
                      value={formValues.contact_no}
                      onChange={handleChange}
                    />
                    <p className="text-danger">{errors.contact_no}</p>
                  </Form.Group>
                </Col>
                <Col xs={12} md={6} lg={6} xl={6} className="">
                  <div className="row row-cols-2">
                    <Form.Group controlId="formmin_order ">
                      <Form.Label>Country</Form.Label>
                      <Form.Control
                        as="select"
                        name="station_country"
                        value={formValues.station_country}
                        onChange={handleCountryChange}
                      >
                        <option value={""} disabled>
                          {"Select Country"}
                        </option>
                        {countryList.map((bt) => (
                          <option value={bt.id} key={bt.name}>
                            {bt.name}
                          </option>
                        ))}
                      </Form.Control>
                      <p className="text-danger">{errors.country}</p>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Currency</Form.Label>
                      <Form.Control
                        as="select"
                        name="currency"
                        value={formValues.currency}
                        onChange={handleCurrencyChange}
                      >
                        <option value={""} disabled>
                          {"Currency"}
                        </option>
                        {currencyList.map((bt) => (
                          <option value={bt.id} key={bt.name}>
                            {bt.name} ({bt.symbol})
                          </option>
                        ))}
                      </Form.Control>
                      <p className="text-danger">{errors.currency}</p>
                    </Form.Group>
                  </div>
                </Col>

                <Col xs={12} md={12} lg={12} xl={6} xxl={6}>
                  <Form.Group>
                    <Form.Label>Location</Form.Label>
                    <MapBoxLocationDisplayAutocomplete
                      onPlaceSelected={handlePlaceSelected}
                      initialLat={formValues.lat}
                      initialLng={formValues.lng}
                      initialAddress={formValues.address}
                    />

                    <p className="text-danger">{errors.address}</p>
                  </Form.Group>
                </Col>
                <Col xs={12} md={12} lg={12} xl={6} xxl={6}>
                  <Form.Group controlId="formDescription">
                    <Form.Label>Short Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      name="short_description"
                      placeholder={"Short Description"}
                      value={formValues.short_description}
                      onChange={handleChange}
                    />
                    <p className="text-danger">{errors.short_description}</p>
                  </Form.Group>
                  <Form.Group controlId="formDescription">
                    <Form.Label>Long Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={8}
                      name="long_description"
                      placeholder={"Long Description"}
                      value={formValues.long_description}
                      onChange={handleChange}
                    />
                    <p className="text-danger">{errors.long_description}</p>
                  </Form.Group>
                </Col>
              </Row>
            </Col>
            <Row>
              <Col xs={12} md={12} lg={12} xl={6} xxl={6}>
                <div className="col-12 mt-4">
                  <h5>Station Logo</h5>
                  <div className=" card ">
                    <div
                      className="card-body p-4 p-sm-5"
                      style={{ marginTop: "-25px" }}
                    >
                      <div className=" card-body">
                        <div className="img-wrap text-center">
                          <img
                            src={inputDisplayLogo}
                            alt=""
                            style={{
                              width: "200px",
                              borderRadius: "50px",
                              border: "1px",
                              borderColor: "white",
                            }}
                          />
                        </div>
                      </div>

                      <div className="col-12">
                        <Form.Group className="mb-4">
                          <Form.Control
                            className="bg-transparent"
                            id="formFileMultiple"
                            type="file"
                            accept="image/*"
                            onChange={LogohandleChange}
                          />
                          {LogoError && (
                            <p className="text-danger">{LogoError}</p>
                          )}
                          <p className="text-danger">{errors.logo}</p>
                        </Form.Group>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>

              <Col xs={12} md={12} lg={12} xl={6} xxl={6}>
                <div className="col-12 mb-4 mt-4">
                  <h5>Station Banner</h5>
                  <div className=" card ">
                    <div
                      className="card-body p-4 p-sm-5"
                      style={{ marginTop: "-25px" }}
                    >
                      <div className=" card-body">
                        <div className="img-wrap text-center">
                          <img
                            src={inputDisplayImage}
                            alt=""
                            style={{
                              width: "200px",
                              borderRadius: "50px",
                              border: "1px",
                              borderColor: "white",
                            }}
                          />
                        </div>
                      </div>

                      <div className="col-12">
                        <Form.Group className="mb-4">
                          <Form.Control
                            className="bg-transparent"
                            id="formFileMultiple"
                            type="file"
                            accept="image/*"
                            onChange={bannerhandleChange}
                          />
                          {bannerError && (
                            <p className="text-danger">{bannerError}</p>
                          )}
                          <p className="text-danger">{errors.banner}</p>
                        </Form.Group>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>

            <Row className="justify-content-end">
              <Col xs={12} md={6} lg={6} xl={6} xxl={4}>
                <Button
                  variant="danger"
                  type="submit"
                  className="mt-4 w-100"
                  disabled={
                    bannerError.trim() !== "" ||
                    LogoError.trim() !== "" ||
                    isLoading
                  }
                >
                  {isLoading && <Spinner animation="border" size="sm" />} Save
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default StationCreateForm;
