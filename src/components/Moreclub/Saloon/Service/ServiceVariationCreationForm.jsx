import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { axiosInstance } from "../../../..";
import { moresaloonURL } from "../../../../config/config";
import { message } from "antd";
import { useQueryClient } from "@tanstack/react-query";



const ServiceVariationCreationForm = ({ ser_id, sal_id, onFinish, onCancel }) => {
    const queryClient = useQueryClient();
    const [serviceVariation, setserviceVariation] = useState({
        name: "",
        price: "",
        discount_price: null,
        description: "",
        duration: "",
        image: [],
    });
    const [imagePreviews, setImagePreviews] = useState([]);
    // const [imagesList, setImagesList] = useState([]);
    const [loading, setLoading] = useState(false)
    const [uiLoading, setUIloading] = useState(false);

    const [offererror, setOfferError] = useState("");
    const [durationerror, setDurationError] = useState("");




    const handleChange = async (e) => {
        if (e.target.name === "offerPrice" && e.target.value) {
            if (parseFloat(serviceVariation.price) > parseFloat(e.target.value)) {
                setserviceVariation({ ...serviceVariation, [e.target.name]: e.target.value });
                setOfferError("");
            } else {
                setserviceVariation({ ...serviceVariation, [e.target.name]: null });
                setOfferError("Must be less than price")
            }
        } else {
            const { name, value } = e.target;
            setserviceVariation({ ...serviceVariation, [name]: value });
        }
    }


    const handleImageChange = (e, index = null) => {
        const files = Array.from(e.target.files);
        let updatedImages = [...serviceVariation.image];
        let updatedPreviews = [...imagePreviews];

        if (index !== null) {
            // Updating a specific image
            updatedImages[index] = files[0];
            updatedPreviews[index] = URL.createObjectURL(files[0]);
        } else {
            // Adding new images
            updatedImages = updatedImages.concat(files);
            updatedPreviews = updatedPreviews.concat(
                files.map((file) => URL.createObjectURL(file))
            );
        }

        setserviceVariation({
            ...serviceVariation,
            image: updatedImages,
        });
        setImagePreviews(updatedPreviews);
    };

    const handleRemoveImage = (index) => {
        const updatedImages = serviceVariation.image.filter((_, i) => i !== index);
        const updatedPreviews = imagePreviews.filter((_, i) => i !== index);

        setserviceVariation({
            ...serviceVariation,
            image: updatedImages,
        });
        setImagePreviews(updatedPreviews);
    };





    const handleDurationChange = async (e) => {
        let { value } = e.target;

        // Remove any non-numeric characters except for ":"
        value = value.replace(/[^\d]/g, '');

        // Automatically add colon for HH:MM format
        if (value.length > 2) {
            value = value.slice(0, 2) + ':' + value.slice(2);
        }

        // Restrict input to 5 characters in total (HH:MM)
        if (value.length > 5) {
            return; // Stop accepting input if exceeds HH:MM format
        }

        // Set valid input
        setserviceVariation({ ...serviceVariation, duration: value });
        setDurationError(''); // Reset error on valid input
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        const data = {
            name: serviceVariation.name,
            price: serviceVariation.price,
            discount_price: serviceVariation.offerPrice ?? null,
            description: serviceVariation.description,
            images: serviceVariation.image,
            duration: `${serviceVariation.duration }:00`,
        }
        setLoading(false);

        axiosInstance
            .post(`${moresaloonURL}moreclub/users/saloons/${sal_id}/services/${ser_id}/variations/`, data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
            .then((response) => {
                message.success("Service Variation Added Successfully")
                queryClient.invalidateQueries({
                    queryKey: [`Saloon variation List ${sal_id} ${ser_id}`],
                });
                setserviceVariation({
                    name: "",
                    price: "",
                    discount_price: null,
                    description: "",
                    duration: "",
                    image: null,
                });
                onFinish();
            })
            .catch((error) => {
                console.error("There was an error fetching the categories!", error);
                message.error("error creating Service Variation");
            }).finally(() => {
                setLoading(false);
            });


    };

    return (
        <div className="p-3">
            <Form onSubmit={handleSubmit} className="" >
                <Row xs={1} sm={2} >
                    <Col>
                        <Form.Group controlId="formItemName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                name="name"
                                value={serviceVariation.name}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formItemOfferPrice">
                            <Form.Label>Duration </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="00:00 HH:MM"
                                name="duration"
                                pattern="[0-9]{2}:[0-9]{2}"
                                value={serviceVariation.duration}
                                onChange={handleDurationChange}
                            />
                            {durationerror && <p className="text-danger" style={{ fontSize: "11px" }}>{durationerror}</p>}
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formItemPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter price"
                                name="price"
                                value={serviceVariation.price}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formItemOfferPrice">
                            <Form.Label>Discount Price <span style={{ fontSize: "11px" }}>(optional)</span></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Discount price"
                                name="offerPrice"
                                value={serviceVariation.offerPrice}
                                onChange={handleChange}
                            />
                            {offererror && <p className="text-danger" style={{ fontSize: "11px" }}>{offererror}</p>}
                        </Form.Group>
                    </Col>
                </Row>




                <Form.Group controlId="formItemIngredients" className="my-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder=" Description"
                        name="description"
                        value={serviceVariation.description}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formItemImage" className="my-3">
                    <Form.Label>Image</Form.Label>
                    <br />
                    {serviceVariation.image && serviceVariation.image.length > 0 && (
                        <div className="image-preview-container">
                            {serviceVariation.image.map((img, index) => (
                                <div key={index} style={{ display: 'inline-block', marginRight: '10px' }}>
                                    <img
                                        src={URL.createObjectURL(img)}
                                        alt={`Selected ${index}`}
                                        style={{ height: '5rem', width: '5rem' }}
                                        className="my-2"
                                    />
                                    <Button variant="danger" size="sm" onClick={() => handleRemoveImage(index)}>
                                        &times;
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                    <Form.Control type="file" name="image" multiple onChange={handleImageChange} />
                </Form.Group>

                <div className='d-flex justify-content-end gap-2'>
                    <Button variant="secondary" onClick={onCancel}>
                        Cancel
                    </Button>

                    <Button
                        variant="success"
                        type="submit"
                        className=""
                        disabled={
                            loading ||
                            serviceVariation.name.trim() === "" ||
                            serviceVariation.price.trim() === "" ||
                            serviceVariation.description.trim() === "" ||
                            serviceVariation.duration.trim() === "" ||
                            // serviceVariation.cuisine_id.length === 0 ||
                            durationerror !== ""
                        }
                    >
                        {loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}&nbsp;
                        Submit
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default ServiceVariationCreationForm;
