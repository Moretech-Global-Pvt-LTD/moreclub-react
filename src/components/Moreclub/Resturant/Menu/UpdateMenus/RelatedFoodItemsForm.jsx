import React, { useEffect, useState } from "react";
import { Button, Form, Badge } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { fetchFoodItems } from "../../../../../redux/api/menuApi";
import { fetchFoodItemsDetailSuccess } from "../../../../../redux/slices/FoodItemDetailSlice";
import { morefoodAuthenticatedAxios } from "../../../../../utills/axios/morefoodaxios";

const RelatedFoodItemsForm = ({ item, food_id, onCancel }) => {
  const { res_id } = useParams();
  const dispatch = useDispatch();
  const menus = useSelector((state) => state.menus);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    selectedCategory: "",
    selectedItems: item?.related_food_items_data?.length > 0 ? item.related_food_items_data.map((item) => item.id) : [],
    selectedItemsName: item?.related_food_items_data?.length > 0 ? item.related_food_items_data.map((item) => ({ name: `${item.name} (${item.value})`, id: item.id })) : [],
  });

  // const [formData, setFormData] = useState({
  //   selectedCategory: "",
  //   selectedItems: [],
  //   selectedItemsName:[],
  // });

  useEffect(() => {
    if (formData.selectedCategory !== "") {
      dispatch(fetchFoodItems(formData.selectedCategory, res_id));
    }
  }, [formData.selectedCategory, dispatch, res_id]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addItem = (item) => {
    const { selectedItems, selectedItemsName } = formData;
    if (!selectedItems.includes(item.id)) {
      const newSelectedItems = [...selectedItems, item.id];
      const newSelectedItemsName = [
        ...selectedItemsName,
        { name: `${item.name} (${item.value})`, id: item.id },
      ];

      setFormData((prev) => ({
        ...prev,
        selectedItems: newSelectedItems,
        selectedItemsName: newSelectedItemsName,
      }));

      // Validate selected items
      //   validateField('selectedItems', newSelectedItems);
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
    // validateField('selectedItems', newSelectedItems);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formData.selectedItems.length !== item?.related_food_items_data?.length){
    const newMenu = {
      has_variation: false,
      related_food_items: formData.selectedItems,
    };
    morefoodAuthenticatedAxios
      .patch(
        `moreclub/user/all/food/items/${res_id}/${food_id}/`,
        newMenu,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        message.success("Related food items updated Successfully");
        dispatch(fetchFoodItemsDetailSuccess({ id:item.id, foodItems: response.data.data }));
        onCancel();
      })
      .catch((error) => {
        console.error("There was an error fetching the categories!", error);
        message.error("error updating related food items");
      })
      .finally(() => {
        setLoading(false);
      });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit} className="card p-2">
        <h6 className="mt-4">Related Food Items</h6>

        <div className="row row-cols-lg-2 ">
          <div>
            <Form.Group controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                value={formData.selectedCategory}
                onChange={(e) =>
                  handleChange("selectedCategory", e.target.value)
                }
              >
                <option value="">Select Menu</option>
                {menus.menuLoading && <option disabled>Loading...</option>}
                {menus.menuList &&
                  menus.menuList.length > 0 &&
                  menus.menuList.map((category) => (
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
                {menus.foodItemList[formData.selectedCategory] &&
                  menus.foodItemList[formData.selectedCategory].map((item) => (
                    <div
                      key={item.id}
                      className="text-dynamic-white p-2 border-bottom"
                      style={{ cursor: "pointer" }}
                      onClick={() => addItem(item)}
                    >
                      {item.name} ({item.value}){" "}
                      <span className="font-italic">
                        price: {item.currency_symbol}{" "}
                        {Number(item.discount_price) < Number(item.price) &&
                        Number(item.discount_price) > 0
                          ? item.discount_price
                          : item.price}
                      </span>
                    </div>
                  ))}

                {menus.foodItemLoading[formData.selectedCategory] && (
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
                  menus.foodItemList[formData.selectedCategory] &&
                  menus.foodItemList[formData.selectedCategory].length ===
                    0 && (
                    <div className="text-dynamic-white p-2 border-bottom">
                      No Food items available in this category
                    </div>
                  )}
              </div>
            </Form.Group>
          </div>
          <Form.Group controlId="formSelectedItems">
            <Form.Label>Selected Items</Form.Label>
            <div
              id="submenu-list"
              className={`border p-2 border-secondary
              }`}
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
          </Form.Group>
        </div>


        <div className="d-flex justify-content-end gap-2">
        <Button variant="secondary" className="mt-4" onClick={onCancel}>
          Cancel
        </Button>

        <Button type="submit" className="mt-4" disabled={loading || item?.related_food_items_data?.length === formData.selectedItems.length } onClick={(e) => handleSubmit(e)}>
          {loading && (
            <span className="spinner-border spinner-border-sm"></span>
          )}{" "}
          Update
        </Button>

        </div>
      </Form>
    </>
  );
};

export default RelatedFoodItemsForm;
