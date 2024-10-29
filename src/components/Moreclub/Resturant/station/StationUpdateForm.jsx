import React, { useEffect, useState } from "react";
import { Button, Col, Row, Form, InputGroup, Spinner } from "react-bootstrap";
import AddressInputWithAutocomplete from "../../../Googlemap/LocationInputonly";
import axios from "axios";
import { morefoodURL } from "../../../../config/config";
import { axiosInstance } from "../../../..";
import { message } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { valdateShortDescription, validateAddress, Validatebanner, validateContactNumber, validateCountry, validateFacebookURL, validateInstagramURL, Validatelogo, validateLongDescription, validateMin_order, validateResturantName, validateWebsiteURL } from "../../../../validation/resturantValidation";
import { validateEmail } from "../../../../validation/addaccountvalidation";
import MapBoxLocationDisplayAutocomplete from "../../../Googlemap/MapLocationInput";

const StationUpdateInfoForm = ({ data }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [countryList, setCountryList] = useState([]);
    const [symbol, setSymbol] = useState(data.currency_code);
    const [formValues, setFormValues] = useState({
        name: data.name ?? "",
        address: data.address ?? "",
        email: data.email ?? "",
        contact_no: data.contact_no ?? "",
        short_description: data.short_description ?? "",
        country: data.country ?? "",
        currency: data.currency ?? "",
        lat: data.lat ?? 0,
        lng: data.lng ?? 0,
        long_description: data.long_description ?? "",
    });
    const [errors, setErrors] = useState({});
    const queryClient = useQueryClient();



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

    const fetchCountry = async () => {
        try {
            const res = await axios.get(`${morefoodURL}country/list/`);
            setCountryList(res.data.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchCountry();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: type === "checkbox" ? checked : value,
        }));
    };
    const handleCountryChange = (e) => {
        const { name, value, type, checked } = e.target;
        const currency = countryList.filter((co) => co.id === parseInt(value))[0];
        setSymbol(currency.currency.symbol);
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: type === "checkbox" ? checked : value,
        }));
        setFormValues((prevValues) => ({
            ...prevValues,
            currency: currency.currency.id,
        }));
    };

    const handlePlaceSelected = async (place, address) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            address: address,
            lat: place.lat,
            lng: place.lon,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add form submission logic here
        const validationErrors = validateAllFields();


        if (Object.keys(validationErrors).length === 0) {


            try {
                setIsLoading(true);
                const res = await axiosInstance.patch(
                    `${morefoodURL}moreclub/station/${data.id}/`,
                    formValues
                );
                message.success("Your changes was Uploaded ")
                queryClient.invalidateQueries([`Station ${data.id}`]);

            } catch (err) {
                console.log(err);
                message.error("Error uploading your changes ");
            } finally {
                setIsLoading(false);
            }
        } else {
            message.error("Please Provide the valid information")
        }
    };

    return (
        <div className="d-flex flex-column gap-4 mt-3">
            <Row xs={1} md={2}>
                <Col xs={12} md={12} lg={12} xl={10} xxl={10}>
                    <Form className="restaurant-form  " onSubmit={handleSubmit}>
                        <h5>Station Information</h5>
                        <p className="text-warning">All fields are required</p>
                        <Col className="card d-flex flex-column gap-4 p-2">
                            <Row>
                                <Col xs={12} md={6} lg={6} xl={6} >
                                    <Form.Group controlId="formRestaurantName">
                                        <Form.Label>Resturant Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            placeholder={"Resturant Name"}
                                            value={formValues.name}
                                            onChange={handleChange}
                                        />
                                        <p className="text-danger">{errors.name}</p>
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={6} lg={6} xl={6} >
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
                                <Col xs={12} md={6} lg={6} xl={6} >
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
                                <Col xs={12} md={6} lg={6} xl={6} >
                                    <Form.Group controlId="formmin_order ">
                                        <Form.Label>Country</Form.Label>
                                        <Form.Control
                                            as="select"
                                            name="country"
                                            value={formValues.country}
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
                        <Row className="justify-content-end">
                            <Col xs={12} md={6} lg={6} xl={6} xxl={4}>
                                <Button
                                    variant="danger"
                                    type="submit"
                                    className="mt-4 w-100"
                                    disabled={
                                        isLoading
                                    }
                                >
                                    {isLoading && <Spinner animation="border" size="sm" />} Update
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </div>
    );
};

export default StationUpdateInfoForm;
