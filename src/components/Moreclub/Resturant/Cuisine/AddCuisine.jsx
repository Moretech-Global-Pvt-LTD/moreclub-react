import React, { useState } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { axiosInstance } from "../../../..";
import { morefoodURL } from "../../../../config/config";
import { message } from "antd";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import Select from "react-select";




const AddCuisineForm = ({onFinish}) => {
    const { cat_id, res_id, id } = useParams()
    const queryClient = useQueryClient();
    const [imageUrl, setImageUrl] = useState("")
    const [cuisineFormData, setCuisineFormData] = useState({
        name: "",
        image: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCuisineFormData({ ...cuisineFormData, [name]: value });
    };

    const [loading, setLoading] = useState(false)

    

    
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
        formData.append("image", cuisineFormData.image);
     


        axiosInstance
            .post(
                `${morefoodURL}moreclub/user/cuisines/${res_id}/`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            )
            .then((response) => {
                message.success("Cuisine Added Successfully");
                setCuisineFormData({ name: "", image: null });
                queryClient.invalidateQueries({
                    queryKey: [`Resturant Cuisine List ${res_id}`],
                });

                onFinish();
            })
            .catch((error) => {
                message.error("error creating Cuisine ");

            }).finally(() => {
                setLoading(false)
            });
    };
    return (
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
                    <div classname=" mx-3 my-3  d-flex align-items-center justify-content-center" style={{
                        height: "11rem",
                        width: "full",
                        border: "1px solid #6c757e",
                        borderRadius: "0.25rem",
                    }}>
                        {cuisineFormData.image ?
                            <img
                                src={URL.createObjectURL(cuisineFormData.image)}
                                alt="Offer banner"
                                style={{ height: "10rem", width: "auto" }}
                                className=""
                            />
                            : <p className='text-center ' style={{ height: "100%", width: "100%", alignContent: "center" }}>No image selected</p>
                        }
                    </div>
                    <Form.Control type="file" name="image" onChange={handleImageChange}  className="my-4"/>
                </Form.Group>

                <Button variant="success" type="submit" className="my-3">
                   {loading && <span className="spinner-border spinner-border-sm"></span>} Add Cuisine
                </Button>
            </Form>
        </Card>
    );
};

export default AddCuisineForm;
