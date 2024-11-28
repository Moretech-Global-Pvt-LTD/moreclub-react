import React, { useState } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { axiosInstance } from "../../../..";
import { morefoodURL } from "../../../../config/config";
import { message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const UpdateCuisineForm = ({ data }) => {
  const { res_id, cuisine_id, rest_name } = useParams();
  const queryClient = useQueryClient();
  const [imageUrl, setImageUrl] = useState(data.image);
  const [cuisineFormData, setCuisineFormData] = useState({
    name: data?.name,
    image: null,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCuisineFormData({ ...cuisineFormData, [name]: value });
  };

  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setCuisineFormData({ ...cuisineFormData, image: e.target.files[0] });
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", cuisineFormData.name);
    formData.append("restaurant_id", res_id);
    {cuisineFormData.image && formData.append("image", cuisineFormData.image);}

    axiosInstance
      .patch(
        `${morefoodURL}moreclub/user/cuisines/update/${cuisine_id}/${res_id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        message.success("Cuisine Updated Successfully");
        queryClient.invalidateQueries({
          queryKey: [`Resturant Cuisine List ${res_id}`],
        });
        queryClient.invalidateQueries({
          queryKey: [`Resturant Cuisine Detail ${res_id} ${cuisine_id}`],
        });
        navigate(`/resturant/${res_id}/cuisine/${rest_name}`);
      })
      .catch((error) => {
        message.error("error Updating cuisine ");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Row>
      <Col xs={12} sm={8} md={6} lg={4}>
        <Card className="p-3">
          {/* <h1>Add Menu Item to {category}</h1> */}
          <Form onSubmit={handleSubmit}>
            <Col className="mb-4">
              <Form.Group controlId="formItemName">
                <Form.Label>Cuisine Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter cuisine name"
                  name="name"
                  value={cuisineFormData.name}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Form.Group controlId="formItemImage">
              <Form.Label>Cuisine Image</Form.Label>
              <div
                classname=" mx-3 my-3  d-flex align-items-center justify-content-center"
                style={{
                  height: "11rem",
                  width: "full",
                  border: "1px solid #6c757e",
                  borderRadius: "0.25rem",
                }}
              >
                {cuisineFormData.image ? (
                  <img
                    src={URL.createObjectURL(cuisineFormData.image)}
                    alt="Offer banner"
                    style={{ height: "10rem", width: "auto" }}
                    className=""
                  />
                ) : (
                  <>
                    {data.image ? (
                      <img
                        src={data.image}
                        alt="Offer banner"
                        style={{ height: "10rem", width: "auto" }}
                        className=""
                      />
                    ) : (
                      <p
                        className="text-center "
                        style={{
                          height: "100%",
                          width: "100%",
                          alignContent: "center",
                        }}
                      >
                        No image selected
                      </p>
                    )}
                  </>
                )}
              </div>
              <Form.Control
                type="file"
                name="image"
                onChange={handleImageChange}
                className="my-4"
              />
            </Form.Group>

            <Button variant="success" type="submit" className="my-3">
              Update Cuisine
            </Button>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default UpdateCuisineForm;
