import React, { useState} from 'react';
import { Form, Button, Card, Row } from 'react-bootstrap';
import { morefoodURL } from '../../../../config/config';
import { axiosInstance } from '../../../..';
import { useQueryClient } from '@tanstack/react-query';

const ServiceCreateForm = ({ res_id, onFinish , onCancel}) => {
    
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
        <div className="p-3 ">
            <Form onSubmit={handleSubmit}>
                <Row className="gy-3">
                    <Form.Group controlId="formMenuCategory">
                        <Form.Label>Service</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder={"services.."}
                            value={servicesName}
                            onChange={handleCategoryChange}
                        />
                        
                            
                        
                    </Form.Group>
                    <div className='d-flex justify-content-end gap-2'> 
                        <Button variant="secondary"  onClick={onCancel}>
                            Cancel
                        </Button>
                        <Button variant="success" type="submit" disabled={servicesName.trim() === ""}>
                            Add Service
                        </Button>
                    </div>
                </Row>
            </Form>
        </div>
    );
};

export default ServiceCreateForm;
