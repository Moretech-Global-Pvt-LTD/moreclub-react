import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { message } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { morefoodAuthenticatedAxios } from "../../../../utills/axios/morefoodaxios";



const StationMyMenuItemsUpdateForm = ({ res_id, cat_id, food_id, stationId, onFinish, data, cuisineOption }) => {
    const queryClient = useQueryClient();
    const [menuItem, setMenuItem] = useState({
        name: data.name,
        price: data.price.toString(),
        retailer_price: data.retailer_price,
        offerPrice: null,
        short_description: data.short_description,
        menu_id: "",
        image: null,
        ingredient: data.ingredient
    });
    const [loading, setLoading] = useState(false)
    // const [uiLoading, setUIloading] = useState(false);
    const [offererror, setOfferError] = useState("");
    const [defaultMenu_id, setDefaultMenu_id] = useState("");


   

    useEffect(() => {

        if (cuisineOption.length > 0) {
            const menu_id = cuisineOption.filter((item) => item.name === data.menu)[0]?.id
            setMenuItem({ ...menuItem, menu_id: menu_id });
            setDefaultMenu_id(menu_id);

        }


    }, [cuisineOption])



    const handleChange = (e) => {
        if (e.target.name === "offerPrice" && e.target.value) {
            if (parseFloat(menuItem.price) > parseFloat(e.target.value)) {
                setMenuItem({ ...menuItem, [e.target.name]: e.target.value });
                setOfferError("");
            } else {
                setMenuItem({ ...menuItem, [e.target.name]: null });
                setOfferError("Must be less than price")
            }
        } else {
            const { name, value } = e.target;
            setMenuItem({ ...menuItem, [name]: value });
        }
    }

    const handleImageChange = (e) => {
        setMenuItem({ ...menuItem, image: e.target.files[0] });
    };

    const handleMenuChange = (e) => {
        console.log("values", e.target.value)
        setMenuItem({ ...menuItem, menu_id: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const data = {
            name: menuItem.name,
            // price: menuItem.price,
            // discount_price: menuItem.offerPrice ?? null,
            retailer_price: menuItem.retailer_price,
            short_description: menuItem.short_description,
            image: menuItem.image,
            ingredient: menuItem.ingredient,
            restaurant_id: res_id,
            menu_id: menuItem.menu_id
        }

        morefoodAuthenticatedAxios
            .patch(`moreclub/station/${stationId}/${res_id}/${food_id}/food-items/restro/update/ `, data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
            .then((response) => {
                message.success("Menu Updated Successfully")
                queryClient.invalidateQueries({
                    queryKey: [`Nearby Station my menu ${stationId}`],
                });
                setMenuItem({
                    name: "",
                    price: "",
                    short_description: "",
                    menu_id: "",
                    ingredient: "",
                    image: null,
                });
                onFinish();
            })
            .catch((error) => {
                console.error("There was an error fetching the categories!", error);
                message.error("error updating Menu");
            }).finally(() => {
                setLoading(false);
            });
    };


    return (
        <div className="p-3">
            <Form onSubmit={handleSubmit} className="" >
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
                            <Form.Label>Retailer Price</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter item price"
                                name="retailer_price"
                                value={menuItem.retailer_price}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    {/* <Col>
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
                            <Form.Label>Offer Price <span style={{ fontSize: "11px" }}>(optional)</span></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter offer price"
                                name="offerPrice"
                                value={menuItem.offerPrice}
                                onChange={handleChange}
                            />
                            {offererror && <p className="text-danger" style={{ fontSize: "11px" }}>{offererror}</p>}
                        </Form.Group>
                    </Col> */}
                </Row>

                <Form.Group className="my-4">
                    <Form.Label>Menu Category</Form.Label>
                    <Form.Control
                        as="select"
                        value={menuItem.menu_id}
                        name="menu_id"
                        onChange={handleMenuChange}
                        className="mb-4 form-control"
                        placeholder="select cuisine type"
                        required
                    >
                        <option value="">select menu</option>

                        {cuisineOption &&
                            cuisineOption.map((bt) => (
                                <option value={bt.id} key={bt.id}>
                                    {bt.name}
                                </option>
                            ))}


                    </Form.Control>
                </Form.Group>

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

                <Form.Group controlId="formItemIngredients" className="my-3">
                    <Form.Label>short Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="short Description"
                        name="short_description"
                        value={menuItem.short_description}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formItemImage" className="my-3">
                    <Form.Label>Item Image</Form.Label>
                    <br />
                    {menuItem.image &&
                        <img
                            src={URL.createObjectURL(menuItem.image)}
                            alt="Foodimage"
                            style={{ height: "5rem", width: "5rem" }}
                            className=" my-2"
                        />
                    }
                    {!menuItem.image && data.image && <img src={`${data.image}`} alt="Foodimage" style={{ height: "5rem", width: "5rem" }} className=" my-2" />}
                    <Form.Control type="file" name="image" onChange={handleImageChange} />
                </Form.Group>

                <Button
                    variant="success"
                    type="submit"
                    className="my-3"
                    disabled={
                        loading ||
                        (
                            menuItem.name === data.name &&
                            menuItem.ingredient === data.ingredient &&
                            menuItem.short_description === data.short_description &&
                            menuItem.menu_id === defaultMenu_id &&
                            menuItem.image === null &&
                            menuItem.retailer_price === data.retailer_price)
                        // menuItem.price.trim() === "" ||
                        // menuItem.short_description.trim() === "" 
                        // menuItem.retailer_price.trim() === ""
                        // offererror !== ""
                    }
                >
                    {loading && (
                        <span
                            class="spinner-border spinner-border-sm text-warning"
                            role="status"
                        ></span>
                    )}
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default StationMyMenuItemsUpdateForm;
