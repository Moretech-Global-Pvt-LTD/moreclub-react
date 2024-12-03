import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Spinner, Badge } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../../..";
import { morefoodURL } from "../../../../config/config";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { message } from "antd";

const convertUTCToLocalDate = (utcDateString) => {
  if (!utcDateString) return null;
  const utcDate = new Date(utcDateString);
  const offsetInMinutes = utcDate.getTimezoneOffset();
  return new Date(utcDate.getTime() - offsetInMinutes * 60000);
};

const convertTimeStringToLocalDate = (timeString) => {
  if (!timeString) return null; // Handle empty strings or undefined values
  const [hours, minutes] = timeString.split(":").map(Number); // Parse hours and minutes
  const date = new Date(); // Use the current date
  date.setHours(hours, minutes, 0, 0); // Set the local time
  return date; // Return the adjusted Date object
};

const OfferForm = ({ mode = "create", initialData = {} }) => {
  const { slug, res_id } = useParams();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    offerName: initialData?.offerName || "",
    description: initialData?.description || "",
    price: initialData?.price || "",
    selectedCategory: "",
    selectedItems: initialData?.selectedItems || [],
    selectedItemsName: initialData?.selectedItemsName || [],
    bannerImage: null,
    previewImage: initialData?.previewImage || null,
    isEveryDay: initialData?.isEveryDay !== false,
    startDate: initialData?.startDate ? new Date(initialData.startDate) : "",
    endDate: initialData?.endDate ? new Date(initialData.endDate) : "",
    customDays:
    initialData.customDays
    ? Object.entries(initialData.customDays).reduce((acc, [day, times]) => {
        acc[day] = {
          start_time: times.start_time ? new Date(times.start_time) : "",
          end_time: times.end_time ? new Date(times.end_time) : "",
        };
        return acc;
      }, {})
    :
    {
      Monday: { start_time: "", end_time: "" },
      Tuesday: { start_time: "", end_time: "" },
      Wednesday: { start_time: "", end_time: "" },
      Thursday: { start_time: "", end_time: "" },
      Friday: { start_time: "", end_time: "" },
      Saturday: { start_time: "", end_time: "" },
      Sunday: { start_time: "", end_time: "" },
    },
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `${morefoodURL}moreclub/user/menus/${res_id}/`
      );
      return response.data.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  const { data: submenuItems, isLoading: submenuItemsLoading } = useQuery({
    queryKey: ["submenuItems", formData.selectedCategory],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `${morefoodURL}moreclub/user/food/items/${formData.selectedCategory}/${res_id}`
      );
      return response.data.data;
    },
    enabled: !!formData.selectedCategory,
  });


  const validateField = (field, value) => {
    const newErrors = { ...errors };
  
    switch (field) {
      case 'offerName':
        newErrors.offerName = value ? '' : 'Offer Name is required.';
        break;
      case 'description':
        newErrors.description = value ? '' : 'Description is required.';
        break;
      case 'price':
        newErrors.price =
          value && !isNaN(value) && Number(value) > 0
            ? ''
            : 'Valid price is required.';
        break;
      case 'selectedItems':
        newErrors.selectedItems =
          value.length > 0 ? '' : 'At least one food item must be selected.';
        break;
      case 'bannerImage':
        // Check if bannerImage is a File object
        if (value instanceof File) {
          newErrors.bannerImage = '';
        }else{
          if(formData.previewImage !== null){
            newErrors.bannerImage = '';
          }else{
            newErrors.bannerImage = 'Banner Image is required.'
          }
        }       
        break;
      case 'startDate':
        if(formData.isEveryDay){
          newErrors.startDate = '';
        }else{
          newErrors.startDate = value ? '' : 'Start Date is required.';
        }
        break;
      case 'endDate':
        if(formData.isEveryDay){
          newErrors.endDate = '';
        }else{
          newErrors.endDate = value ? '' : 'End Date is required.';
        }
        break;
      default:
        break;
    }
  
    setErrors(newErrors);
  };

  const validateCustomDays = () => {
    const hasValidDay = Object.values(formData.customDays).some(
      (day) => day.start_time && day.end_time
    );
  
    setErrors((prevErrors) => ({
      ...prevErrors,
      customDays: hasValidDay
        ? ''
        : 'At least one weekday must have start and end times.',
    }));
  
    return hasValidDay;
  };

  const addItem = (item) => {
    const { selectedItems, selectedItemsName } = formData;
    if (!selectedItems.includes(item.id)) {
      const newSelectedItems = [...selectedItems, item.id];
      const newSelectedItemsName = [
        ...selectedItemsName,
        { name: item.name, id: item.id },
      ];
  
      setFormData((prev) => ({
        ...prev,
        selectedItems: newSelectedItems,
        selectedItemsName: newSelectedItemsName,
      }));
  
      // Validate selected items
      validateField('selectedItems', newSelectedItems);
    }
  };
  
  const removeItem = (item) => {
    const newSelectedItems = formData.selectedItems.filter(
      (prev) => prev !== item.id
    );
    const newSelectedItemsName = formData.selectedItemsName.filter(
      (prev) => prev.id !== item.id
    );
  
    setFormData((prev) => ({
      ...prev,
      selectedItems: newSelectedItems,
      selectedItemsName: newSelectedItemsName,
    }));
  
    // Validate selected items
    validateField('selectedItems', newSelectedItems);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    validateField(field, value);
  };

  const handleDateChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    validateField(field, value);
  };

  const handleDayTimeChange = (day, field, value) => {
    setFormData((prev) => ({
      ...prev,
      customDays: {
        ...prev.customDays,
        [day]: {
          ...prev.customDays[day],
          [field]: value,
        },
      },
    }));

    validateCustomDays();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFormData((prev) => ({
      ...prev,
      bannerImage: file,
      previewImage: URL.createObjectURL(file),
    }));

    validateField('bannerImage', file);
  };

  const validate = () => {
    const newErrors = {};
    const {
      offerName,
      description,
      price,
      selectedItems,
      startDate,
      endDate,
      isEveryDay,
      customDays,
      bannerImage
    } = formData;

    if (!offerName) newErrors.offerName = "Offer Name is required.";
    if (!description) newErrors.description = "Description is required.";
    if (!price || isNaN(price) || Number(price) <= 0)
      newErrors.price = "Valid price is required.";
    if (selectedItems.length === 0)
      newErrors.selectedItems = "At least one food item must be selected.";
    if (!bannerImage)
      
        if(formData.previewImage === null){
         newErrors.bannerImage = 'Banner Image is required.'
        }
        
    if (isEveryDay) {
      if (!startDate) newErrors.startDate = "Start Date is required.";
      if (!endDate) newErrors.endDate = "End Date is required.";
    } else {
      const hasValidDay = Object.values(customDays).some(
        (day) => day.start_time && day.end_time
      );
      if (!hasValidDay)
        newErrors.customDays =
          "At least one weekday must have start and end times.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

   
const filterApplicableDays = () => {
  return Object.entries(formData.customDays)
    .filter(([_, times]) => times.start_time !== '' && times.end_time !== '') // Check for empty strings
    .reduce((acc, [day, times]) => {
      acc[day] = {
        start_time: times.start_time,
        end_time: times.end_time,
      };
      return acc;
    }, {});
};
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);

    const offerData = {
      price: formData.price,
      description: formData.description,
      banner: formData.bannerImage,
      food_item_ids: formData.selectedItems,
      name: formData.offerName,
      is_every_day: formData.isEveryDay,
      ...(formData.isEveryDay === true && {start_offer: formData.startDate,
      end_offer: formData.endDate}),
      ...(formData.isEveryDay === false && {
        applicable_days: filterApplicableDays(),
      }),
      ...(initialData?.id && { id: initialData.id }),
    };
   
    try {
      const endpoint =
        mode === 'create'
          ? `${morefoodURL}moreclub/user/offers/${res_id}/`
          : `${morefoodURL}moreclub/user/offers/${res_id}/${initialData.id}/`;
      const method = mode === 'create' ? 'post' : 'patch';

      const res= await axiosInstance[method](endpoint, offerData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      message.success(`Offer ${mode === 'create' ? 'added' : 'updated'} successfully`);
      queryClient.invalidateQueries({
        queryKey: [`Resturant offer List ${res_id}`],
      })
      queryClient.invalidateQueries({
        queryKey: [`Resturant offer detail ${res.data.data.id}`],
      })
      navigate(`/resturant/${res_id}/offer/${slug}`);
    } catch (err) {
      console.error(err);
      message.error(`Error ${mode === 'create' ? 'adding' : 'updating'} offer`);
    } finally {
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  return (
    <Form onSubmit={handleSubmit} className="card p-3">
      <div className="row row-cols-1 row-cols-lg-2">
        <div>
          <Form.Group controlId="formCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              value={formData.selectedCategory}
              onChange={(e) => handleChange("selectedCategory", e.target.value)}
              disabled={categoriesLoading}
            >
              <option value="">
                {categoriesLoading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                Select Category
              </option>
              {categories &&
                categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
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

              {submenuItemsLoading && (
                <div className="text-dynamic-white p-2 text-muted">
                  <span className="spinner-border spinner-border-sm"></span>
                </div>
              )}

              {formData.selectedCategory === "" && (
                <div className="text-dynamic-white p-2 text-muted">
                  Choose any one category from the Category to get started!
                </div>
              )}
              {formData.selectedCategory !== "" &&
                submenuItems &&
                submenuItems.length === 0 && (
                  <div className="text-dynamic-white p-2 border-bottom">
                    No Food items available in this category
                  </div>
                )}
            </div>
          </Form.Group>
        </div>
        <div>
          <Form.Group controlId="formSelectedItems">
            <Form.Label>Selected Items</Form.Label>
            <div
              id="submenu-list"
              className={`border p-2 ${errors.selectedItems ? "border-danger": "border-secondary"}`}
              style={{ height: "100px", overflowY: "auto" }}
            >
              <div id="d-flex flex-wrap">
                {formData.selectedItemsName &&
                  formData.selectedItemsName.map((item) => (
                    <Badge
                      key={item}
                      className="badge  m-1"
                      onClick={() => removeItem(item)}
                    >
                      {item.name}&nbsp;
                      <span
                        className="text-danger ml-1"
                        style={{ cursor: "pointer" }}
                      >
                        x
                      </span>
                    </Badge>
                  ))}
                {formData.selectedItemsName &&
                  formData.selectedItemsName.length === 0 && (
                    <div className="text-dynamic-white p-2 text-muted">
                      No Food items selected!
                    </div>
                  )}
              </div>
            </div>
              <p className="text-danger">
                {errors.selectedItems}
              </p>
            
              
            
          </Form.Group>
          <Form.Group as={Col} controlId="offerName">
            <Form.Label>Offer Name</Form.Label>
            <Form.Control
              type="text"
              name="offerName"
              value={formData.offerName}
              onChange={(e) => handleChange("offerName", e.target.value)}
              isInvalid={!!errors.offerName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.offerName}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={formData.price}
              onChange={(e) => handleChange("price", e.target.value)}
              isInvalid={!!errors.price}
              />
              <Form.Control.Feedback type="invalid">
                {errors.price}
              </Form.Control.Feedback>
          </Form.Group>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-lg-2">
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            rows={5}
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            isInvalid={!!errors.description}
            />
            <Form.Control.Feedback type="invalid">
              {errors.description}
            </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="bannerImage">
          <Form.Label>Banner Image</Form.Label>
          {formData.previewImage && (
            <div className={`my-2 border ${errors.bannerImage ? "border-danger" : "border-secondary"} `}>
              <img
                src={formData.previewImage}
                alt="Banner Preview"
                style={{
                  width: "3rem",
                  height: "4.5rem",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </div>
          )}
          {!formData.previewImage && (
            <div
              className={`my-2 border ${errors.bannerImage ? "border-danger" : "border-secondary"} `}
              style={{
                maxWidth: "100%",
                height: "5rem",
                border: "1px",
                borderRadius: "8px",
              }}
            >
             <p className="text-center mt-3">No Preview </p> 
            </div>
          )}
          <Form.Control type="file" name="bannerImage" onChange={handleImageChange} isInvalid={!!errors.bannerImage}
            />
            <Form.Control.Feedback type="invalid">
              {errors.bannerImage}
            </Form.Control.Feedback>
          
        </Form.Group>
      </div>

      <Row>
        <Row>
          <Form.Group as={Col} controlId="offerType">
            <Form.Check
              type="checkbox"
              label="Specific Days/Times"
              name="isEveryDay"
              checked={!formData.isEveryDay}
              onChange={() => handleChange("isEveryDay", !formData.isEveryDay)}
              isInvalid={!!errors.isEveryDay}
              />
              <Form.Control.Feedback type="invalid">
                {errors.isEveryDay}
              </Form.Control.Feedback>
          </Form.Group>
        </Row>

        {formData.isEveryDay ? (
          <Row>
            <Form.Group as={Col} controlId="startDate">
              <Form.Label>Start Date</Form.Label>
              <DatePicker
                selected={formData.startDate}
                onChange={(date) => handleDateChange("startDate", date)}
                showTimeSelect
                dateFormat="Pp"
                placeholderText="Select Start Date"
                className="form-control"
                isInvalid={!!errors.startDate}

              />
              <p className="text-danger">  
                {errors.startDate}
              </p>
            </Form.Group>
            <Form.Group as={Col} controlId="endDate">
              <Form.Label>End Date</Form.Label>
              <DatePicker
                selected={formData.endDate}
                onChange={(date) => handleDateChange("endDate", date)}
                showTimeSelect
                dateFormat="Pp"
                placeholderText="Select End Date"
                className="form-control"
                isInvalid={!!errors.endDate}
              />
              <p className="text-danger">
              {errors.endDate}
              </p>
            </Form.Group>
          </Row>
        ) : (
          <div>
            {Object.keys(formData.customDays).map((day) => (
              <Row key={day} className="mb-3">
                <Col md={2}>
                  <Form.Label>{day}</Form.Label>
                </Col>
                <Col md={5}>
                  <Form.Group controlId={`${day}-start-time`}>
                    <Form.Label>Start Time</Form.Label>
                    <DatePicker
                      selected={formData.customDays[day].start_time}
                      onChange={(date) =>
                        handleDayTimeChange(day, "start_time", date)
                      }
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption="Time"
                      dateFormat="h:mm aa"
                      placeholderText="Select Start Time"
                      className="form-control"
                    />
                  </Form.Group>
                </Col>
                <Col md={5}>
                  <Form.Group controlId={`${day}-end-time`}>
                    <Form.Label>End Time</Form.Label>
                    <DatePicker
                      selected={formData.customDays[day].end_time}
                      onChange={(date) =>
                        handleDayTimeChange(day, "end_time", date)
                      }
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption="Time"
                      dateFormat="h:mm aa"
                      placeholderText="Select End Time"
                      className="form-control"
                    />
                  </Form.Group>
                </Col>
              </Row>
            ))}
            <p className="text-danger">
              {errors.customDays}
              </p>
          </div>
        )}
      </Row>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? <Spinner size="sm" animation="border" /> : "Submit"}
      </Button>
    </Form>
    
  );
};

export default OfferForm;
