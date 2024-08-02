import React, { useState } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { axiosInstance } from "../../..";
import { morefoodURL } from "../../../config/config";
import { message } from "antd";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const FoodItemForm = ({ data }) => {
  const { cat_id, res_id, id } = useParams()
  const queryClient = useQueryClient();
  const [imageUrl ,setImageUrl]= useState("")
  const [menuItem, setMenuItem] = useState({
    name: data.name,
    price: data.actual_price,
    offerPrice: data.item_price ?? null,
    short_description: data.short_description,
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMenuItem({ ...menuItem, [name]: value });
  };

  const handleImageChange = (e) => {
    setMenuItem({ ...menuItem, image: e.target.files[0] });
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", menuItem.name);
    formData.append("price", menuItem.price);
    formData.append("short_description", menuItem.short_description);
    formData.append("menu", cat_id);
    formData.append("restaurant_id", res_id);
    formData.append("discount_price", menuItem.offerPrice ?? "");
     menuItem.image && formData.append("image", menuItem.image);

    axiosInstance
      .patch(
        `${morefoodURL}moreclub/user/food/items/${cat_id}/${id}/${res_id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        message.success("Food Items Updated Successfully");
        // setMenuItem({
        //   name: "",
        //   price: "",
        //   short_description: "",
        //   image: null,
        // });
        queryClient.invalidateQueries({
          queryKey: [`Resturant SubMenu List ${cat_id}`],
        });
        queryClient.invalidateQueries({
          queryKey: [`Resturant SubMenu ${id}`],
        });
      })
      .catch((error) => {
        console.error("There was an error updating the foodItems!", error);
        message.error("error Updating Food Items");
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
          <br />
          {menuItem.image ? (
            <img
              src={imageUrl}
              alt="Foodimage"
              style={{ height: "5rem", width: "5rem" }}
              className=""
            />
          ) : (
            <>
              {data.image && (
                <img
                  src={data.image}
                  alt="Foodimage"
                  style={{ height: "5rem", width: "5rem" }}
                  className=""
                />
              )}
            </>
          )}
          <Form.Control type="file" name="image" onChange={handleImageChange} />
        </Form.Group>

        <Button variant="success" type="submit" className="my-3">
          Submit
        </Button>
      </Form>
    </Card>
  );
};

export default FoodItemForm;
