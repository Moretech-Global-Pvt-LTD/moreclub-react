import { message } from 'antd';
import React, { useState } from 'react';
import { Button, Form, Row } from 'react-bootstrap';



const MenuCategoryAddForm = ({
    onSubmit,
    onSuccess,
    onCancel,
    onError,
    initialMenuName = '',
    initialMenuImage = null,
    buttonText = 'Add Menu',
}) => {
    const [menu_name, setMenuName] = useState(initialMenuName);
    const [menu_image, setMenuImage] = useState(initialMenuImage);
    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setMenuImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = {
                'name': menu_name,
                'icon': menu_image
            }
            console.log("in form ",formData)
            const res = await onSubmit(formData);
            console.log('Form submitted successfully:', res);

            if (res.data.success) {
                onSuccess();
                message.success('Menu added successfully');
                setMenuName("");
                setMenuImage(null);
            } else {
                throw new Error('Failed to submit form');
            }

        } catch (error) {
            console.error('There was an error submitting the form:', error);
            message.success('Error Menu added successfully');
            if (onError) {
                onError(error);
            }
        }
    };

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Row className="gy-3">
                    <Form.Group controlId="formItemName">
                        <Form.Label>Menu Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter item name"
                            name="name"
                            value={menu_name}
                            onChange={(e) => setMenuName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formItemImage">
                        <Form.Label>Item Image</Form.Label>
                        <br />
                        {menu_image ? (
                            <img
                                src={URL.createObjectURL(menu_image)}
                                alt="Foodimage"
                                style={{ height: '5rem', width: '5rem' }}
                                className=""
                            />
                        ) : (
                            <div>No image selected</div>
                        )}
                        <Form.Control type="file" name="image" onChange={handleImageChange} />
                    </Form.Group>

                    <div className='d-flex justify-content-end gap-2'>
                        <Button variant="secondary" onAbort={() => onCancel()}>
                            {buttonText}
                        </Button>
                        <Button variant="success" type="submit" disabled={!menu_name}>
                            {buttonText}
                        </Button>
                    </div>
                </Row>
            </Form>
        </div>
    );
};

export default MenuCategoryAddForm;
