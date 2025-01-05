import React, { useState } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { message } from "antd";
import {  useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateCuisine } from "../../../../redux/slices/MenuSlice";
import { morefoodAuthenticatedAxios } from "../../../../utills/axios/morefoodaxios";

const UpdateCuisineForm = ({ data, onCancel }) => {
  const { res_id } = useParams();
  const [imageUrl, setImageUrl] = useState(data.image);
  const [cuisineFormData, setCuisineFormData] = useState({
    name: data?.name,
    image: null,
  });

  const dispatch = useDispatch();

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
    {
      cuisineFormData.image && formData.append("image", cuisineFormData.image);
    }

    morefoodAuthenticatedAxios
      .patch(
        `moreclub/user/cuisines/update/${data.id}/${res_id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        message.success("Cuisine Updated Successfully");
        dispatch(updateCuisine({ cuisine: response.data.data }));
        onCancel();
      })
      .catch((error) => {
        message.error("error Updating cuisine");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Row>
      <Col>
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
            <div className="d-flex justify-content-end align-items-center gap-2">
              <Button className="btn-sm btn-secondary " onClick={onCancel}>
                Cancel
              </Button>

              <Button variant="success" type="submit" className="my-3 btn-sm">
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}{" "}
                Update Cuisine
              </Button>
            </div>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default UpdateCuisineForm;
