import React, { useState } from 'react'
import { Button, Card, Col, Form, Row, Spinner } from 'react-bootstrap'
import { validateCuisineType, validateFeatureType, validateMeal, validatePriceRange, validateProperties } from '../../../../validation/resturantValidation';
import { morefoodURL } from '../../../../config/config';
import { axiosInstance } from '../../../..';
import { message } from 'antd';
import { useQueryClient } from '@tanstack/react-query';

const Feature = ({data}) => {
    const queryClient = useQueryClient();
    const [features, setFeatures] = useState(data?.feature || [
        {
            featureType: "",
            priceRange: { min: "", max: "" },
            cuisineType: "",
            meal: "",
            properties: ""
        }
    ]);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false)

    const handleFeatureChange = (index, e) => {
        const { name, value } = e.target;
        const updatedFeatures = [...features];

        if (name === "min" || name === "max") {
            updatedFeatures[index].priceRange[name] = value;
        } else {
            updatedFeatures[index][name] = value;
        }

        setFeatures(updatedFeatures);
    };


    const validateField = (name, value) => {
        switch (name) {
            case "featureType":
                return validateFeatureType(value);
            case "min":
            case "max":
                return validatePriceRange(value);
            case "cuisineType":
                return validateCuisineType(value);
            case "meal":
                return validateMeal(value);
            case "properties":
                return validateProperties(value);
            default:
                return "";
        }
    };

    const validateAllFields = () => {
        const tempErrors = {};

        features.forEach((feature, index) => {
            const featureErrors = {};
            for (const key in feature) {
                if (key === "priceRange") {
                    featureErrors.min = validateField("min", feature.priceRange.min);
                    featureErrors.max = validateField("max", feature.priceRange.max);
                } else {
                    featureErrors[key] = validateField(key, feature[key]);
                }
            }
            tempErrors[`feature${index}`] = featureErrors;
        });


        setErrors(tempErrors);
        return tempErrors;
    };


    const removeFeature = (index) => {
        const updatedFeatures = features.filter((_, i) => i !== index);
        setFeatures(updatedFeatures);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateAllFields();

        if (Object.keys(validationErrors).length === 0) {
            setIsLoading(true);
            try {
                const formData = {
                    feature: features,
                };
                const res = await axiosInstance.patch(
                    `${morefoodURL}moreclub/user/restaurants/update/${data.id}/`,
                    formData
                );
                message.success("Your changes was Uploaded ")
                queryClient.invalidateQueries([`Resturant List ${data.id}`]);

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
                    <Form className="restaurant-form card p-2" onSubmit={handleSubmit}>
                        <div className="col-12 mb-4 mt-4">
                            <h4>Feature</h4>
                            <Row>
                                {features.map((feature, index) => (
                                    <Col xs={12} md={12} lg={12} xl={6} xxl={6}>
                                        <Card key={index} className="p-3">

                                            <div className="feature-section mb-4">
                                                <h5>Feature {index + 1}</h5>

                                                <Form.Group controlId={`featureType-${index}`}>
                                                    <Form.Label>Feature Type</Form.Label>
                                                    <Form.Control
                                                        as="select"
                                                        name="featureType"
                                                        value={feature.featureType}
                                                        onChange={(e) => handleFeatureChange(index, e)}
                                                    >
                                                        <option value="">Select Feature Type</option>
                                                        <option value="Restaurant">Restaurant</option>
                                                        <option value="Cafe">Cafe</option>
                                                        <option value="Bakery">Bakery</option>
                                                        <option value="Other">Other</option>
                                                    </Form.Control>
                                                    {errors[`feature${index}`]?.featureType && (
                                                        <Form.Text className="text-danger">
                                                            {errors[`feature${index}`]?.featureType}
                                                        </Form.Text>
                                                    )}
                                                </Form.Group>

                                                <Row>
                                                    <Col>
                                                        <Form.Group controlId={`priceRangeMin-${index}`}>
                                                            <Form.Label>Price Range (Min)</Form.Label>
                                                            <Form.Control
                                                                type="number"
                                                                name="min"
                                                                value={feature.priceRange.min}
                                                                onChange={(e) => handleFeatureChange(index, e)}
                                                            />
                                                            {errors[`feature${index}`]?.min && (
                                                                <Form.Text className="text-danger">
                                                                    {errors[`feature${index}`]?.min}
                                                                </Form.Text>
                                                            )}
                                                        </Form.Group>
                                                    </Col>
                                                    <Col>
                                                        <Form.Group controlId={`priceRangeMax-${index}`}>
                                                            <Form.Label>Price Range (Max)</Form.Label>
                                                            <Form.Control
                                                                type="number"
                                                                name="max"
                                                                value={feature.priceRange.max}
                                                                onChange={(e) => handleFeatureChange(index, e)}
                                                            />
                                                            {errors[`feature${index}`]?.max && (
                                                                <Form.Text className="text-danger">
                                                                    {errors[`feature${index}`]?.max}
                                                                </Form.Text>
                                                            )}
                                                        </Form.Group>
                                                    </Col>
                                                </Row>

                                                <Form.Group controlId={`cuisineType-${index}`}>
                                                    <Form.Label>Cuisine Type</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="cuisineType"
                                                        value={feature.cuisineType}
                                                        onChange={(e) => handleFeatureChange(index, e)}
                                                    />
                                                    {errors[`feature${index}`]?.cuisineType && (
                                                        <Form.Text className="text-danger">
                                                            {errors[`feature${index}`]?.cuisineType}
                                                        </Form.Text>
                                                    )}
                                                </Form.Group>

                                                <Form.Group controlId={`meal-${index}`}>
                                                    <Form.Label>Meal</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="meal"
                                                        value={feature.meal}
                                                        onChange={(e) => handleFeatureChange(index, e)}
                                                    />
                                                    {errors[`feature${index}`]?.meal && (
                                                        <Form.Text className="text-danger">
                                                            {errors[`feature${index}`]?.meal}
                                                        </Form.Text>
                                                    )}
                                                </Form.Group>

                                                <Form.Group controlId={`properties-${index}`}>
                                                    <Form.Label>Properties</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="properties"
                                                        value={feature.properties}
                                                        onChange={(e) => handleFeatureChange(index, e)}
                                                    />
                                                    {errors[`feature${index}`]?.properties && (
                                                        <Form.Text className="text-danger">
                                                            {errors[`feature${index}`]?.properties}
                                                        </Form.Text>
                                                    )}
                                                </Form.Group>

                                                <Button
                                                    variant="danger"
                                                    onClick={() => removeFeature(index)}
                                                    className={`mb-3 ${index === 0 ? "d-none" : "d-block"}`}
                                                    disabled={features.length === 1}  // Prevents removing if only one feature is left
                                                >
                                                    Remove Feature
                                                </Button>


                                            </div>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                            {/* Add more features button */}


                            <Button
                                variant="primary"
                                onClick={() => setFeatures([...features, {
                                    featureType: "",
                                    priceRange: { min: "", max: "" },
                                    cuisineType: "",
                                    meal: "",
                                    properties: ""
                                }])}
                                className="mt-3"
                            >
                                Add Another Feature
                            </Button>
                        </div>

                        <Row className="justify-content-center">
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
    )
}

export default Feature