import React, { useState } from "react";
import { Button, Col, Row, Form, Spinner } from "react-bootstrap";
import { morefoodURL } from "../../../../config/config";
import { axiosInstance } from "../../../..";
import { message } from "antd";
import { validateAddress, validateResturantName, } from "../../../../validation/resturantValidation";
import { useParams } from "react-router-dom";
import MapBoxLocationDisplayAutocomplete from "../../../Googlemap/MapLocationInput";
import { useSelector } from "react-redux";

const StationSetupForm = ({ onFinish, onCancel }) => {
    const businessProfiles = useSelector((state) => state.businessReducer.businessProfile);
    const { res_id, slug } = useParams();
    const name = `${slug.replace(/-/g, " ")} Station`;

    const [inputDisplayImage, setInputDisplayImage] = useState();
    const [bannerError, setBannerError] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const [formValues, setFormValues] = useState({
        name: name ?? "",
        address: businessProfiles?.business_address ?? "",
        lat: businessProfiles?.lat ?? 0,
        lng: businessProfiles?.lng ?? 0,
        banner: null,
    });

    const [errors, setErrors] = useState({});


    const validateForm = (fieldValues = formValues) => {
        const tempErrors = { ...errors };
        if ("name" in fieldValues)
            tempErrors.name = validateResturantName(fieldValues.name);
        if ("address" in fieldValues)
            tempErrors.address = validateAddress(fieldValues.address, formValues.lat, formValues.lng);
        setErrors({ ...tempErrors });
    };

    const validateField = (name, value) => {
        switch (name) {
            case "name":
                return validateResturantName(value);
            case "address":
                return validateAddress(value);
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


    const handleChange = (e) => {
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
            try {
                const res = await axiosInstance.post(
                    `${morefoodURL}moreclub/${res_id}/setup/station/`,
                    formValues,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                message.success("Station created");
                onFinish();
                // navigate(`/resturant/setup/${res.data.data.id}`);
            } catch (err) {
                message.error("Error Creating Station");
            } finally {
                setIsLoading(false);
            }
        } else {
            message.error("Please Provide the valid information")
        }

    };

    return (
        <div className="d-flex flex-column gap-4 mt-3">
            <Row>
                <Col xs={12} >
                    <Form className="restaurant-form" onSubmit={handleSubmit}>
                        <Col className="d-flex flex-column gap-4 p-2">
                            <Row>
                                <Col xs={12}>
                                    <Form.Group controlId="formRestaurantName">
                                        <Form.Label>Station Banner</Form.Label>
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

                                <Col xs={12} lg={6}>

                                    <Form.Group>
                                        <Form.Label>Station Location</Form.Label>
                                        <MapBoxLocationDisplayAutocomplete
                                            onPlaceSelected={handlePlaceSelected}
                                            initialLat={formValues.lat}
                                            initialLng={formValues.lng}
                                            initialAddress={formValues.address}
                                        />
                                        <p className="text-danger">{errors.address}</p>
                                    </Form.Group>

                                </Col>
                                <Col xs={12} lg={6}>
                                    <div className="col-12">
                                        <Form.Label>Station Banner</Form.Label>
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
                                                <Form.Group className="">
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
                                </Col>

                            </Row>


                        </Col>
                        <Row className="justify-content-end">
                            <Col xs={12} md={6} lg={6} xl={6} xxl={4}>
                                <Button
                                    variant="secondary"
                                                    onClick={onCancel}
                                    className="mt-4 w-100"

                                >
                                    Cancel
                                </Button>
                            </Col>
                            <Col xs={12} md={6} lg={6} xl={6} xxl={4}>
                                <Button
                                    variant="danger"
                                    type="submit"
                                    className="mt-4 w-100"
                                    disabled={

                                        bannerError.trim() !== "" ||
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

export default StationSetupForm;
