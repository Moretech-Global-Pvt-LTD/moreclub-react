import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Card, Spinner } from "react-bootstrap";
import { message } from "antd";

const StationMenuFoodForm = ({ ButtonText, initialData, onSubmit, onCancel , onFinish}) => {
    const [menuItem, setMenuItem] = useState({
        name: "",
        price: "",
        offerPrice: "",
        short_description: "",
        image: null,
        ingredient: ""
    });
    const [imageUrl, setImageUrl] = useState("");
    const [offererror, setOfferError] = useState("");
    const [isLoading, setIsLoading]= useState(false);

    useEffect(() => {
        if (initialData) {
            setMenuItem({
                name: initialData?.name || "",
                price: initialData?.price || "",
                offerPrice: initialData?.actual_price || "",
                short_description: initialData?.short_description || "",
                image: null,
                ingredient: initialData?.ingredient || ""
            });
            setImageUrl(initialData?.image || ""); // If image URL is provided
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "offerPrice") {
            if (value === "") {
                setMenuItem({ ...menuItem, offerPrice: null });
                setOfferError("");
            } else if (parseFloat(menuItem.price) >= parseFloat(value)) {
                setMenuItem({ ...menuItem, offerPrice: value });
                setOfferError("");
            } else {
                setMenuItem({ ...menuItem, offerPrice: "" });
                setOfferError("Must be less than price");
            }
        } else {
            setMenuItem({ ...menuItem, [name]: value });
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setMenuItem({ ...menuItem, image: file });
        setImageUrl(URL.createObjectURL(file));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        setIsLoading(true);
        if (offererror) {
            message.error("Please fix the errors before submitting.");
            return;
        }
        const res = await onSubmit(menuItem);

        if (res.data.success) {

            message.success('Menu added successfully');
            onFinish();
        } else {
            message.error(res.data.message || 'Error adding menu');
            throw new Error('Failed to submit form');
        }
        setIsLoading(false);
    };

    return (
        <Card className="p-3">
            <Form onSubmit={handleSubmit}>
                <Row xs={1} sm={2} lg={3}>
                    <Col>
                        <Form.Group controlId="formItemName">
                            <Form.Label>Item Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter item name"
                                name="name"
                                value={menuItem.name}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formItemPrice">
                            <Form.Label>Item Price</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter item price"
                                name="price"
                                value={menuItem.price}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formItemOfferPrice">
                            <Form.Label>Offer Price (Optional)</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter offer price"
                                name="offerPrice"
                                value={menuItem.offerPrice}
                                onChange={handleChange}
                            />
                            {offererror && <p className="text-danger" style={{ fontSize: "11px" }}>{offererror}</p>}
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group controlId="formItemIngredients" className="my-3">
                    <Form.Label>Ingredients</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Ingredients"
                        name="ingredient"
                        value={menuItem.ingredient}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formItemShortDescription" className="my-3">
                    <Form.Label>Short Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Short description"
                        name="short_description"
                        value={menuItem.short_description}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formItemImage">
                    <Form.Label>Item Image</Form.Label>
                    <br />
                    {imageUrl && (
                        <img
                            src={imageUrl}
                            alt="Food-image"
                            style={{ height: "5rem", width: "5rem" }}
                        />
                    )}
                    <Form.Control type="file" name="image" onChange={handleImageChange} />
                </Form.Group>

                <div className="d-flex justify-content-end gap-2">
                <Button variant="secondary"  className="my-3" onClick={onCancel}>
                    Cancel
                </Button>
                <Button variant="success" disabled={offererror !== ""} type="submit" className="my-3">
                   {isLoading ? <Spinner animation="border" size="sm" /> : null} {ButtonText}
                </Button>

                </div>
            </Form>
        </Card>
    );
};

export default StationMenuFoodForm;
