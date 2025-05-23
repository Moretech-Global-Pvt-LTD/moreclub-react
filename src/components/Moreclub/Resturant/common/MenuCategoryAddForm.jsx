import { message } from 'antd';
import React, { useState } from 'react';
import { Button, Form, Row } from 'react-bootstrap';



const MenuCategoryAddForm = ({
    onSubmit,
    onFinish,
    onCancel,  
    initialMenuName = '',
    initialMenuImage = '',
    buttonText = 'Add Menu',
}) => {
    const [menu_name, setMenuName] = useState(initialMenuName);
    const [menu_image, setMenuImage] = useState(null);
    const [imageURL, setImageUrl] = useState(initialMenuImage);
    const [isLoading, setIsLoading] = useState(false);
    const handleImageChange = (e) => {
        // if (e.target.files && e.target.files[0]) {
            setMenuImage(e.target.files[0]);
            setImageUrl(URL.createObjectURL(e.target.files[0]));
        // }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const formData = {
                'name': menu_name,
                'icon': menu_image
            }

            const res = await onSubmit(formData);

            if (res.data.success) {
                if(buttonText !== 'Add Menu'){
                    message.success('Menu Updated successfully');
                }else{
                    message.success('Menu added successfully');
                    setMenuName("");
                    setMenuImage(null);
                }
                
                onFinish();
            } else {
                throw new Error('Failed to submit form');
            }

        } catch (error) {
            console.error('There was an error submitting the form:', error);
            message.success('Error adding menu');
        } finally {
            setIsLoading(false);
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
                        <div
            classname=" mx-3 my-3  d-flex align-items-center justify-content-center"
            style={{
              height: "11rem",
              width: "full",
              border: "1px solid #6c757e",
              borderRadius: "0.25rem",
            }}
          >
            {imageURL ? (
              <img
                src={imageURL}
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
          </div>
                        
                       
                         
                            {/* <img
                                src={imageURL}
                                alt="Foodimage"
                                style={{ height: '5rem', width: '5rem' }}
                                className=""
                            /> */}
                       
                        <Form.Control type="file" name="image" onChange={handleImageChange} 
                        className='mt-2'
                        />
                    </Form.Group>

                    <div className='d-flex justify-content-end gap-2'>
                        <Button variant="secondary" onClick={() => onCancel()}>
                            Cancel
                        </Button>
                        <Button variant="success" type="submit" disabled={!menu_name}>
                            {isLoading  && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}{buttonText}
                        </Button>
                    </div>
                </Row>
            </Form>
        </div>
    );
};

export default MenuCategoryAddForm;
