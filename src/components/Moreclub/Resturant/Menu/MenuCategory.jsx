import React, { useState } from "react";
import CategoryCard from "./CategoryCard";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../../..";
import { morefoodURL } from "../../../../config/config";
import { RestaurantItemskeleton } from "../../../Skeleton/SmallCardSkeleton";
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
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        size="lg"
        centered
        show={showForm}
        onHide={hideAddCategory}
      >

        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter text-center" className="text-dynamic-white">
            Add Menu
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MenuCategoryAddForm
            onSubmit={submit}
            onFinish={hideAddCategory}
            onCancel={hideAddCategory}
            initialMenuName=""
            buttonText="Create Menu"
          />
        </Modal.Body>
      </Modal>
     
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
