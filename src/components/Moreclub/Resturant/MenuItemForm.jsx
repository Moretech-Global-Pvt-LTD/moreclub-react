import React, { useState } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { axiosInstance } from "../../..";
import { morefoodURL } from "../../../config/config";
import { message } from "antd";
import { useQueryClient } from "@tanstack/react-query";

const MenuItemsForm = ({ res_id, cat_id }) => {
  const queryClient = useQueryClient();
  const [menuItem, setMenuItem] = useState({
    name: "",
    price: "",
    offerPrice:null,
    short_description: "",
    image: null,
  });
  const [loading, setLoading]= useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMenuItem({ ...menuItem, [name]: value });
  };

  const handleImageChange = (e) => {
    setMenuItem({ ...menuItem, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", menuItem.name);
    formData.append("price", menuItem.price);
    formData.append("short_description", menuItem.short_description);
    formData.append("image", menuItem.image);
    formData.append("menu", cat_id);
    formData.append("restaurant_id", res_id);
    formData.append("discount_price", menuItem.offerPrice?? "");


axiosInstance
  .post(`${morefoodURL}moreclub/user/food/items/${cat_id}/${res_id}/`, formData, 
    {
          headers: {
            "Content-Type": "multipart/form-data",
          },
  })
  .then((response) => {
    message.success("Menu Added Successfully")
    queryClient.invalidateQueries({
      queryKey: [`Resturant SubMenu List ${cat_id}`],
    });
    setMenuItem({
    name: "",
    price: "",
    short_description: "",
    image: null,
  });
  })
  .catch((error) => {
    console.error("There was an error fetching the categories!", error);
    message.error("error creating Menu");
  }).finally(() => {
    setLoading(false);
  });

   
  };

  return (
    <Card className="p-3">
      {/* <h1>Add Menu Item to {category}</h1> */}
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
              <Form.Label>Offer Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter offer price"
                name="offerPrice"
                value={menuItem.offerPrice}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="formItemIngredients">
          <Form.Label>short Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="short Description"
            name="short_description"
            value={menuItem.short_description}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formItemImage">
          <Form.Label>Item Image</Form.Label>
          <br/>
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
            menuItem.image === null
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
    </Card>
  );
};

export default MenuItemsForm;
