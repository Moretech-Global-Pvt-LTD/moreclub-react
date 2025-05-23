import React, {  useState } from "react";
import { Form, Button, Row, Col} from "react-bootstrap";

import { message } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { morefoodAuthenticatedAxios } from "../../../../utills/axios/morefoodaxios";



const StationMyMenuItemsForm = ({ res_id, cat_id, stationId, onFinish , cuisineOption}) => {
    const queryClient = useQueryClient();
    const [menuItem, setMenuItem] = useState({
        name: "",
        price: "",
        offerPrice: null,
        short_description: "",
        menu_id:"",
        image: null,
        ingredient: ""
    });
    const [loading, setLoading] = useState(false)
    // const [cuisineOption, setCuisineOption] = useState([]);
    const [offererror, setOfferError] = useState("");


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
        console.log("values",e.target.value)
        setMenuItem({ ...menuItem, menu_id: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(menuItem)

        const data = {
            name: menuItem.name,
            // price: menuItem.price,
            // discount_price: menuItem.offerPrice ?? null,
            retailer_price: menuItem.price,
            short_description: menuItem.short_description,
            image: menuItem.image,
            ingredient: menuItem.ingredient,
            restaurant_id: res_id,
            menu_id: menuItem.menu_id
        }

        morefoodAuthenticatedAxios
            .post(`moreclub/station/${stationId}/restaurant/${res_id}/food-items/restro/`, data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
            .then((response) => {
                message.success("Menu Added Successfully")
                queryClient.invalidateQueries({
                    queryKey: [`Nearby Station my menu ${stationId}`],
                });
                setMenuItem({
                    name: "",
                    price: "",
                    short_description: "",
                    menu_id:"",
                    ingredient: "",
                    image: null,
                });
                onFinish();
            })
            .catch((error) => {
                console.error("There was an error fetching the categories!", error);
                message.error("error creating Menu");
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
                                name="price"
                                value={menuItem.price}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    
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
                    <Form.Control type="file" name="image" onChange={handleImageChange} />
                </Form.Group>

                <Button
                    variant="success"
                    type="submit"
                    className="my-3"
                    disabled={
                        loading ||
                        menuItem.name.trim() === "" ||
                        menuItem.price.trim() === "" ||
                        menuItem.short_description.trim() === "" ||
                        menuItem.image === null ||
                        offererror !== ""
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

export default StationMyMenuItemsForm;
