import React, { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import { message } from "antd";



const GalleryImageUpload = ({ onSubmit , onCancel }) => {
    const { res_id } = useParams();

    const [formData, setFormData] = useState({
        id: res_id,
        images: [],
    });


    const [imagePreviews, setImagePreviews] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e, index = null) => {
        const files = Array.from(e.target.files);
        let updatedImages = [...formData.images];
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

        setFormData({
            ...formData,
            images: updatedImages,
        });
        setImagePreviews(updatedPreviews);
    };

    const handleRemoveImage = (index) => {
        const updatedImages = formData.images.filter((_, i) => i !== index);
        const updatedPreviews = imagePreviews.filter((_, i) => i !== index);

        setFormData({
            ...formData,
            images: updatedImages,
        });
        setImagePreviews(updatedPreviews);
    };

    const renderPreview = (image, index, isServerImage = false) => {
        return (
            <>
                <img
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index}`}
                    style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        marginRight: "10px",
                    }}
                />
                <Button variant="danger" onClick={() => handleRemoveImage(index)} >
                    &times;
                </Button>
            </>
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic here
        setLoading(true);

        try {
            const res =  await onSubmit(formData);
            // const res = await axiosInstance.post(
            //     `${morefoodURL}moreclub/user/restaurants/gallery/${res_id}/`,
            //     formData,
            //     {
            //         headers: {
            //             "Content-Type": "multipart/form-data",
            //         },
            //     }
            // );
            if (res.status === 200) {
                message.success(res.data.message || "Images added successfully");
            } else {
                message.error(res.data.message || "Failed to add images");
            }
           
        } catch (err) {
            console.log(err);
        } finally {
            onCancel();
            setLoading(false);
        }
    };

    return (
        <div className="px-4 py-4">
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formImages" className="mb-3">
                    <Form.Label as="h6" className="">Images</Form.Label>
                    <Row className="mx-1">
                        <Col
                            xs={12}

                            className="mb-3 p-3 border border-secondary rounded-3"
                            style={{ minHeight: "10rem" }}
                        >
                            {formData.images &&
                                formData.images.map((image, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            display: "inline-block",
                                            position: "relative",
                                            marginRight: "10px",
                                        }}
                                    >
                                        {renderPreview(image, index)}
                                    </div>
                                ))}
                            {formData.images &&
                                formData.images.length === 0 &&
                                <div

                                    className="text-dynamic-white text-center d-flex align-items-center justify-content-center" style={{ height: "100%" }}
                                >
                                    NO IMAGES TO DISPLAY
                                </div>
                            }
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} >
                            <Form.Control
                                type="file"
                                multiple
                                onChange={(e) => handleImageChange(e)}
                                className=""
                            />
                        </Col>
                    </Row>
                </Form.Group>
                <div className="d-flex justify-content-end gap-2">
                    <Button variant="secondary" onClick={onCancel} size="sm">
                        {loading && (
                            <span
                                class="spinner-border spinner-border-sm text-primary"
                                role="status"
                            ></span>
                        )}
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit" size="sm">
                    {loading && (
                        <span
                            class="spinner-border spinner-border-sm text-primary"
                            role="status"
                        ></span>
                    )}
                    Upload Images
                </Button>
                </div>
            </Form>
        </div>
    );
};

export default GalleryImageUpload;
