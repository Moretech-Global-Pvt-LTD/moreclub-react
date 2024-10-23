import React, { useState } from "react";
import CategoryForm from "./Addcategory";
import CategoryCard from "./CategoryCard";
import { Button, Col, Placeholder, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../../..";
import { morefoodURL } from "../../../../config/config";
import { RestaurantItemskeleton } from "../../../Skeleton/SmallCardSkeleton";
import StationMenuForm from "../station/StationMenuForm";
import MenuCategoryAddForm from "../common/MenuCategoryAddForm";

const MenuCategory = () => {
  const { res_id } = useParams();
  const [showForm, setShowForm] = useState(false);
  const queryClient = useQueryClient();

    const { data, isLoading, isError } = useQuery({
      queryKey: [`Resturant Menu List ${res_id}`],
      queryFn: async () => {
        const response = await axiosInstance.get(
          `${morefoodURL}moreclub/user/menus/${res_id}/`
        );
        const data = await response.data.data;
        return data;
      },
      staleTime: 100,
    });

    if (isLoading) {
      return (
        <RestaurantItemskeleton/>
      );
    }

    if (isError) {
      return <div className="text-dynamic-white">Error: retriving</div>;
    }

  async function showAddCategory() {
    setShowForm(true);
  }

  async function hideAddCategory() {
    setShowForm(false);
  }




  const submit = async (data) => {
    try {
      const response = await axiosInstance.post(
        `${morefoodURL}moreclub/user/menus/${res_id}/`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      queryClient.invalidateQueries({
        queryKey: [`Resturant Menu List ${res_id}`],
      });
      console.log("Form submitted successfully menu:", response);
      return response; // Return the response directly
    } catch (error) {
      console.error("There was an error submitting the form:", error);
      throw error; // Rethrow the error to be caught in the calling function
    }
    };

  const handleSuccess = (data) => {
    console.log('Form submitted successfully:', data);
  };

  const handleError = (error) => {
    console.error('Form submission failed:', error);
  };

  

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between my-2">
        <h4> Menu Category</h4>
        {showForm ? (
          <Button variant="danger" onClick={() => hideAddCategory()}>
            Cancel
          </Button>
        ) : (
          <Button variant="warning" onClick={() => showAddCategory()}>
            Add Category
          </Button>
        )}
      </div>
      <Row>
        <Col xs={12} sm={8} md={6} lg={4}>
          {showForm &&
            <div className="card p-2">
              <MenuCategoryAddForm
                onSubmit={submit}
                onSuccess={handleSuccess}
                onError={handleError}
                initialMenuName="My Menu"
                buttonText="Create Menu"
              />
            </div>
          }
        </Col>
      </Row>

      <Row
        xs={2}
        sm={3}
        md={4}
        lg={4}
        xl={5}
        xxl={6}
        className="gx-3 gy-3 my-4"
      >
        {data.map((item) => (
          <Col className="d-flex flex-column">
            <CategoryCard
              id={item.id}
              res_id={res_id}
              logo={item.icon?? ""}
              name={item.name?? ""}
              item={item.no_of_items}
            />
          </Col>
        ))}
      </Row>
      {data && data.length === 0 && 
      <p className="text-center">Add New Menu Category for your Resturant</p>
      }
    </div>
  );
};

export default MenuCategory;
