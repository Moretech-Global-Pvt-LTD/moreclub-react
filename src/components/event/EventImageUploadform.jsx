import React, {  useState } from 'react'
import { Button, Form,  } from 'react-bootstrap';

import { useNavigate, useParams } from 'react-router-dom';
import { axiosInstance } from '../..';
import { baseURL } from '../../config/config';
import { message } from 'antd';

const EventImageUploadform = ({datas}) => {

    const { eventId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      id: eventId,
      images: [],
    });
    const [serverimages, setServerImage] = useState(datas || []);
  
    const [imagePreviews, setImagePreviews] = useState([]);
    const [Loading, setLoading] = useState(false);
    

    const handleImageChange = (e, index = null) => {
        const files = Array.from(e.target.files);
        let updatedImages = [...formData.images];
        let updatedPreviews = [...imagePreviews];
    
        if (index !== null) {
          // Updating a specific image
          updatedImages[index] = files[0];
          updatedPreviews[index] = URL.createObjectURL(files[0]);
        } else {
          // Adding new images
          updatedImages = updatedImages.concat(files);
          updatedPreviews = updatedPreviews.concat(
            files.map((file) => URL.createObjectURL(file))
          );
        }
    
        setFormData({
          ...formData,
          images: updatedImages,
        });
        setImagePreviews(updatedPreviews);
      };
    
      const handleRemoveImage = (index) => {
        const updatedImages = formData.images.filter((_, i) => i !== index);
        const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
    
        setFormData({
          ...formData,
          images: updatedImages,
        });
        setImagePreviews(updatedPreviews);
      };
    
      const handleRemoveImageurl = async (id) => {
        try {
          const image = serverimages.filter((image) => image.id !== id);
          await axiosInstance.delete(
            `${baseURL}events/event-photos/${eventId}/${id}/delete/`
          );
          // Remove the image from local state
          setServerImage((prevImages) =>
            prevImages.filter((image) => image.id !== id)
          );
        } catch (error) {
          console.error("Error removing image from server:", error);
        }
      };
    
      const renderPreview = (image, index, isServerImage = false) => {
        if (isServerImage) {
          return (
            <>
              <img
                src={`${image}`}
                alt={`Preview ${index}`}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  marginRight: "10px",
                }}
              />
              <Button variant="danger" onClick={() => handleRemoveImageurl(index)}>
                &times;
              </Button>
            </>
          );
        } else {
          return (
            <>
              <img
                src={URL.createObjectURL(image)}
                alt={`Preview ${index}`}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  marginRight: "10px",
                }}
              />
              <Button variant="danger" onClick={() => handleRemoveImage(index)}>
                &times;
              </Button>
            </>
          );
        }
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic here
        


        if(formData.images.length === 0){
          message.error("Please upload at least one image");
        }else{
          setLoading(true);
          try {
            const res = await axiosInstance.post(
              `${baseURL}events/event-photos/${eventId}/`,
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
         
            message.success("Event created successfully");
            navigate(`/business-events/`);
          } catch (err) {
            console.log(err);
          } finally {
            setLoading(false);
          }

        }
      };

  return (
    <Form onSubmit={handleSubmit}>
    <Form.Group controlId="formImages" className="mb-3">
      <Form.Label>Images</Form.Label>
      <div className="mb-3  p-3 border border-secondary rounded-3"
      style={{ minHeight: "10rem" }}
      >
        {serverimages.map((items) => (
          <div
            key={items.id}
            style={{
              display: "inline-block",
              position: "relative",
              marginRight: "10px",
            }}
          >
            {renderPreview(items.image, items.id, true)}
          </div>
        ))}
        {formData.images.map((image, index) => (
          <div
            key={index}
            style={{
              display: "inline-block",
              position: "relative",
              marginRight: "10px",
            }}
          >
            {renderPreview(image, index)}
          </div>
        ))}
        {formData.images &&
                   ((formData.images.length === 0) && (serverimages.length === 0)) &&
                    <div
                      
                     className="text-dynamic-white text-center d-flex align-items-center justify-content-center" style={{height:"100%"}} 
                    >
                      NO IMAGES TO DISPLAY 
                    </div>
          }
      </div>
      <Form.Control
        type="file"
        multiple
        onChange={(e) => handleImageChange(e)}
      />
        </Form.Group>
        <div className="d-flex justify-content-end">
    <Button variant="warning" type="submit" className="">
      {Loading && (
        <span
          class="spinner-border spinner-border-sm text-primary"
          role="status"
        ></span>
      )}
      Upload Images
    </Button>

        </div>
  </Form>
  )
}

export default EventImageUploadform
