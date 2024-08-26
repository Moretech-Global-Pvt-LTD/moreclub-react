
import React, { useState } from 'react';

import { Form, Button, Col, Row, Badge, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {morefoodURL} from "../../../../config/config"
import { axiosInstance } from '../../../..';
import { message } from 'antd';


const OfferForm = () => {
  const { slug, res_id } = useParams();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItemsName, setSelectedItemsName] = useState([]);
  const [description, setDescription] = useState('');
  const [bannerImage, setBannerImage] = useState(null);
  const [offerName, setOfferName] = useState('');
  const [price, setPrice] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const fetchCategories = async () => {
    const response = await axiosInstance.get(`${morefoodURL}moreclub/user/menus/${res_id}/`);
    return response.data.data;
  };

  const fetchSubmenuItems = async (category) => {
    const response = await axiosInstance.get(`${morefoodURL}moreclub/user/food/items/${category}/${res_id}`);
    return response.data.data; // Adjust according to your API response structure
  };

  const { data: categories } = useQuery({ queryKey: 'categories', queryFn: fetchCategories });
  const { data: submenuItems } = useQuery(
    { 
      queryKey: ['submenuItems', selectedCategory],
      queryFn: () => fetchSubmenuItems(selectedCategory),
      enabled: !!selectedCategory, // Only fetch submenu items if a category is selected
    }
  );

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const addItem = (item) => {
    if (!selectedItems.includes(item)) {
      setSelectedItems([...selectedItems, item.id]);
      setSelectedItemsName([
        ...selectedItemsName,
        { name: item.name, id: item.id },
      ]);
    }
  };

  const removeItem = (item) => {
    setSelectedItems(selectedItems.filter((i) => i !== item.id));
    setSelectedItemsName(selectedItems.filter((i) => i.id !== item.id));
  };

  const handleBannerImageChange = (event) => {
    setBannerImage(event.target.files[0]);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    // Handle form submission logic

    setIsLoading(true);

    const data = {
      start_offer: startDate,
      end_offer: endDate,
      price: price,
      description: description,
      banner: bannerImage,
      food_item_ids: selectedItems,
      name: offerName,
    };
    
    try {
      const res = await axiosInstance.post(`${morefoodURL}moreclub/user/offers/${res_id}/`, data, {
        
          headers: {
            "Content-Type": "multipart/form-data",
          },
  
      })
      message.success("Offer added successfully");
      navigate(`/resturant/${res_id}/offer/${slug}`)
    } catch (err) {
      console.log(err)
      message.error("Error adding offer");
    } finally {
      setIsLoading(false);
    }
    
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className=" card p-2 d-flex flex-column gap-3"
    >
      <Form.Group controlId="formCategory">
        <Form.Label>Category</Form.Label>
        <Form.Control
          as="select"
          onChange={handleCategoryChange}
          value={selectedCategory}
        >
          <option value="" disabled>
            Select category
          </option>
          {categories &&
            categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.menu.name}
              </option>
            ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="formSubmenu">
        <Form.Label>Food Items</Form.Label>
        <div
          id="submenu-list"
          className="border p-2"
          style={{ height: "200px", overflowY: "auto" }}
        >
          {submenuItems &&
            submenuItems.map((item) => (
              <div
                key={item.id}
                className="text-dynamic-white p-2 border-bottom"
                style={{ cursor: "pointer" }}
                onClick={() => addItem(item)}
              >
                {item.name}
              </div>
            ))}
        </div>
      </Form.Group>

      <Form.Group controlId="formSelectedItems">
        <Form.Label>Selected Items</Form.Label>
        <div id="d-flex flex-wrap">
          {selectedItemsName.map((item) => (
            <Badge
              key={item}
              className="badge  m-1"
              onClick={() => removeItem(item)}
            >
              {item.name}&nbsp;
              <span className="text-danger ml-1" style={{ cursor: "pointer" }}>
                x
              </span>
            </Badge>
          ))}
        </div>
      </Form.Group>

      <Row>
        <Form.Group as={Col} controlId="formOfferName">
          <Form.Label>Offer Name</Form.Label>
          <Form.Control
            type="text"
            value={offerName}
            onChange={(e) => setOfferName(e.target.value)}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>
      </Row>
      <Row>
        <Form.Group as={Col} controlId="formOfferStart">
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            name="startDate"
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formOfferEnd">
          <Form.Label>End Date</Form.Label>
          <Form.Control
            name="endDate"
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </Form.Group>
      </Row>

      <Form.Group controlId="formDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBannerImage">
        <Form.Label>Banner Image</Form.Label>
        <div classname=" mx-3 my-3  d-flex align-items-center justify-content-center" style={{
          height: "11rem",
          width: "full",
          border: "1px solid #6c757e",
          borderRadius: "0.25rem",
        }}>
          {bannerImage ?
          <img
                src={URL.createObjectURL(bannerImage)}
                alt="Offer banner"
                style={{ height: "10rem", width: "auto" }}
                className=""
              />
          : <p className='text-center ' style={{height:"100%", width:"100%", alignContent:"center" }}>No image selected</p>
          }
            </div>
        <Form.Control type="file" className='mt-3' onChange={handleBannerImageChange} />
      </Form.Group>

      <Button variant="primary" type="submit">
       {isLoading && <Spinner animation="border" size="sm" /> } Add Offer
      </Button>
    </Form>
  );
};

export default OfferForm;
