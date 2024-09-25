import React, { useState} from 'react';
import { Form, Button, Card, Row } from 'react-bootstrap';
import { morefoodURL } from '../../../../config/config';
import { axiosInstance } from '../../../..';
import { useQueryClient } from '@tanstack/react-query';

const ServiceCreateForm = ({ res_id, onFinish }) => {
    const [categories, setCategories] = useState([]);
    const [servicesName, setServicesName] = useState('');
    const queryClient = useQueryClient();

    const handleCategoryChange = (e) => {
        setServicesName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosInstance
            .post(`${morefoodURL}moreclub/user/menus/${res_id}/`, {
                menu_id: servicesName
            })
            .then((response) => {
                setCategories(response.data.data);
                queryClient.invalidateQueries({
                    queryKey: [`Resturant Menu List ${res_id}`],
                });
                setServicesName("");
                onFinish();
            })
            .catch((error) => {
                console.error("There was an error fetching the categories!", error);
            });
    };
    
    return (
        <Card className="p-3 ">
            <Form onSubmit={handleSubmit}>
                <Row className="gy-3">
                    <Form.Group controlId="formMenuCategory">
                        <Form.Label>Category</Form.Label>

                        <Form.Control
                            as="text"
                            value={servicesName}
                            onChange={handleCategoryChange}
                        >
                            <option value="">Select a category</option>
                            {categories &&
                                categories.length > 0 &&
                                categories?.map((category, index) => (
                                    <option key={index} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                        </Form.Control>
                    </Form.Group>
                    <div>
                        <Button variant="success" type="submit" disabled={servicesName.trim() === ""}>
                            Add Service
                        </Button>
                    </div>
                </Row>
            </Form>
        </Card>
    );
};

export default ServiceCreateForm;
