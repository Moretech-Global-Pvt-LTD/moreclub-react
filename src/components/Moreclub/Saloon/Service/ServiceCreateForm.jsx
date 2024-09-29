import React, { useState} from 'react';
import { Form, Button, Row } from 'react-bootstrap';
import {  moresaloonURL } from '../../../../config/config';
import { axiosInstance } from '../../../..';
import { useQueryClient } from '@tanstack/react-query';

const ServiceCreateForm = ({ id, onFinish , onCancel}) => {
    
    const [servicesName, setServicesName] = useState('');
    const [loading, setLoading]= useState(false)
    const queryClient = useQueryClient();

    const handleCategoryChange = (e) => {
        setServicesName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        axiosInstance
            .post(`${moresaloonURL}moreclub/users/saloons/${id}/services/`, {
                name: servicesName
            })
            .then((response) => {
               
                queryClient.invalidateQueries({
                    queryKey: [`Saloon service List ${id}`],
                });
                setServicesName("");
                onFinish();
            })
            .catch((error) => {
                console.error("There was an error fetching the categories!", error);
            }).finally(() => setLoading(false));
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
                            {loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}&nbsp;
                            Add Service
                        </Button>
                    </div>
                </Row>
            </Form>
        </div>
    );
};

export default ServiceCreateForm;
