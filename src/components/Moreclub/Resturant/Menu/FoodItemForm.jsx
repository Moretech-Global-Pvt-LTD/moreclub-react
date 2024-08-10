import React, { useState } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { axiosInstance } from "../../../..";
import { morefoodURL } from "../../../../config/config";
import { message } from "antd";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import Select from "react-select";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: 'transparent',
    borderColor: state.isFocused ? '#80bdff' : '#ced4da',
    boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(0,123,255,.25)' : null,
    '&:hover': {
      borderColor: state.isFocused ? '#80bdff' : '#ced4da',
    },
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#f8f9fa',
    borderRadius: '0.25rem',
    boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? '#007bff'
      : state.isFocused
      ? '#e9ecef'
      : 'white',
    color: state.isSelected ? 'white' : 'black',
    '&:active': {
      backgroundColor: '#007bff',
      color: 'white',
    },
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: '#007bff',
    color: 'white',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: 'white',
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: 'white',
    '&:hover': {
      backgroundColor: '#0056b3',
      color: 'white',
    },
  }),
};


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
    cuisine: data.cuisine?? [],
    ingredients: data.ingredients?? ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMenuItem({ ...menuItem, [name]: value });
  };

  const [loading, setLoading] = useState(false)

  const cusineOptions = [
    { value: "Indian", label: "Indian" },
    { value: "Chinese", label: "Chinese" },
    { value: "Italian", label: "Italian" },
    { value: "Mexican", label: "Mexican" },
    { value: "Thai", label: "Thai" },
    { value: "Japanese", label: "Japanese" },
    { value: "Korean", label: "Korean" },
    { value: "French", label: "French" },
    { value: "American", label: "American" },
    { value: "Spanish", label: "Spanish" },
  ]

  const handleCusineChange = (selectedOptions) => {
    if (selectedOptions) {
      const selectedValues = selectedOptions.map(option => option.value);
      setMenuItem({ ...menuItem, cuisine: selectedValues });
      console.log("selected option", selectedValues)
    } else {
      setMenuItem({ ...menuItem, "cuisine": [] });
      console.log("selected option", selectedOptions)
    }
  };

  const removeCuisine = (cuisineToRemove) => {
    setMenuItem({
      ...menuItem,
      cuisine: menuItem.cuisine.filter(cuisine => cuisine !== cuisineToRemove),
    });
  };

  const handleImageChange = (e) => {
    setMenuItem({ ...menuItem, image: e.target.files[0] });
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", menuItem.name);
    formData.append("price", menuItem.price);
    formData.append("short_description", menuItem.short_description);
    formData.append("menu", cat_id);
    formData.append("restaurant_id", res_id);
    formData.append("discount_price", menuItem.offerPrice ?? "");
     menuItem.image && formData.append("image", menuItem.image);
    formData.append("cuisine", JSON.stringify(menuItem.cuisine));
    formData.append("ingredients", menuItem.ingredients);
    
    
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
      }).finally(()=>{
        setLoading(false)
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

        <Form.Group className="mb-4">
          <Form.Label className="mb-2 fz-16">Cusine types</Form.Label>
          <Select
            className="mb-4 form-control"
            placeholder="select cusine type"
            styles={customStyles}
            value={Array.isArray(menuItem.cuisine)
              ? cusineOptions.filter(option => menuItem.cuisine.includes(option.value))
              : []}
            onChange={handleCusineChange}
            options={cusineOptions}
            isMulti={true}
            required
          />
        </Form.Group>

        <Form.Group controlId="formItemIngredients" className="my-3">
          <Form.Label>Ingredients</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Ingredients"
            name="ingredients"
            value={menuItem.ingredients}
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
          Update
        </Button>
      </Form>
    </Card>
  );
};

export default FoodItemForm;
