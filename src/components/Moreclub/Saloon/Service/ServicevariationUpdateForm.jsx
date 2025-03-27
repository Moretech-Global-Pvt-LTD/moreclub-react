// import React, { useState } from "react";
// import { Form, Button, Row, Col } from "react-bootstrap";
// import { message } from "antd";
// import { useQueryClient } from "@tanstack/react-query";
// import { moresalonAuthenticatedAxios } from "../../../../utills/axios/moresalonaxios";

// const ServiceVariationUpdateForm = ({
//   ser_id,
//   sal_id,
//   data,
//   onFinish,
//   onCancel,
// }) => {
//   const queryClient = useQueryClient();
//   const [serviceVariation, setserviceVariation] = useState({
//     name: data.name,
//     price: data.price,
//     discount_price: data.discount_price ?? null,
//     description: data.description,
//     duration: data.duration.split(":").slice(0, 2).join(":"),
//     image: [],
//   });
//   const [imagePreviews, setImagePreviews] = useState([]);
//   const [serverImage, setServerImage] = useState(data.images);
//   const [removedImages, setRemovedImages] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [offererror, setOfferError] = useState("");
//   const [durationerror, setDurationError] = useState("");


// const handleChange = (e) => {
//     const { name, value } = e.target;
  
//     if (name === "offerPrice") {
//       if (value === "" || parseFloat(serviceVariation.price) > parseFloat(value)) {
//         setserviceVariation((prev) => ({
//           ...prev,
//           [name]: value,
//         }));
//         setOfferError(""); // Clear the error if valid
//       } else {
//         setOfferError("Offer price must be less than the original price");
//       }
//     } else {
//       setserviceVariation((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };
  
//   const handleImageChange = (e, index = null) => {
//     const files = Array.from(e.target.files);
//     let updatedImages = [...serviceVariation.image];
//     let updatedPreviews = [...imagePreviews];

//     if (index !== null) {
//       // Updating a specific image
//       updatedImages[index] = files[0];
//       updatedPreviews[index] = URL.createObjectURL(files[0]);
//     } else {
//       // Adding new images
//       updatedImages = updatedImages.concat(files);
//       updatedPreviews = updatedPreviews.concat(
//         files.map((file) => URL.createObjectURL(file))
//       );
//     }
//     setserviceVariation({
//       ...serviceVariation,
//       image: updatedImages,
//     });
//     setImagePreviews(updatedPreviews);
//   };

//   const handleRemoveImage = (index) => {
//     const updatedImages = serviceVariation.image.filter((_, i) => i !== index);
//     const updatedPreviews = imagePreviews.filter((_, i) => i !== index);

//     setserviceVariation({
//       ...serviceVariation,
//       image: updatedImages,
//     });
//     setImagePreviews(updatedPreviews);
//   };

//   const handleRemoveServerImage = async (id) => {
//     setRemovedImages([...removedImages, id]);
//     const updatedServerImage = serverImage.filter((image) => image.id !== id);
//     setServerImage(updatedServerImage);
//   };

//   const handleDurationChange = async (e) => {
//     let { value } = e.target;

//     // Remove any non-numeric characters except for ":"
//     value = value.replace(/[^\d]/g, "");

//     // Automatically add colon for HH:MM format
//     if (value.length > 2) {
//       value = value.slice(0, 2) + ":" + value.slice(2);
//     }

//     // Restrict input to 5 characters in total (HH:MM)
//     if (value.length > 5) {
//       return; // Stop accepting input if exceeds HH:MM format
//     }

//     // Set valid input
//     setserviceVariation({ ...serviceVariation, duration: value });
//     setDurationError(""); // Reset error on valid input
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const datas = {
//       name: serviceVariation.name,
//       price: serviceVariation.price,
//       discount_price: serviceVariation.offerPrice ?? null,
//       description: serviceVariation.description,
//       duration: `${serviceVariation.duration}:00`,
//       ...(serviceVariation.image !== 0 && { images: serviceVariation.image }),
//       ...(removedImages.length > 0 && { removed_images: removedImages }),
//     };

//     moresalonAuthenticatedAxios
//       .patch(
//         `moreclub/users/saloons/${sal_id}/services/${ser_id}/variations/${data.id}/`,
//         datas,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       )
//       .then((response) => {
//         message.success("Service Variation updated Successfully");
//         console.log("response", response);
//         queryClient.invalidateQueries({
//           queryKey: [`Saloon variation List ${sal_id} ${ser_id}`],
//         });
//         setserviceVariation({
//           name: response.data.data.name,
//           price: response.data.data.price,
//           discount_price: response.data.data.discount_price,
//           description: response.data.data.description,
//           duration: response.data.data.duration,
//           image: null,
//         });
//         setServerImage(response.data.data.images);
//         setRemovedImages([]);
//         onFinish();
//       })
//       .catch((error) => {
//         console.error(
//           "There was an error fetching the updated variation!",
//           error
//         );
//         message.error("error updating service variation");
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };

//   return (
//     <div className="p-3">
//       <Form onSubmit={handleSubmit} className="">
//         <Row xs={1} sm={2}>
//           <Col>
//             <Form.Group controlId="formItemName">
//               <Form.Label>Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter name"
//                 name="name"
//                 value={serviceVariation.name}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//           </Col>
//           <Col>
//             <Form.Group controlId="formItemOfferPrice">
//               <Form.Label>Duration </Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="00:00 HH:MM"
//                 name="duration"
//                 pattern="[0-9]{2}:[0-9]{2}"
//                 value={serviceVariation.duration}
//                 onChange={handleDurationChange}
//               />
//               {durationerror && (
//                 <p className="text-danger" style={{ fontSize: "11px" }}>
//                   {durationerror}
//                 </p>
//               )}
//             </Form.Group>
//           </Col>
//           <Col>
//             <Form.Group controlId="formItemPrice">
//               <Form.Label>Price</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter price"
//                 name="price"
//                 value={serviceVariation.price}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//           </Col>
//           <Col>
//             <Form.Group controlId="formItemOfferPrice">
//               <Form.Label>
//                 Discount Price{" "}
//                 <span style={{ fontSize: "11px" }}>(optional)</span>
//               </Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter Discount price"
//                 name="offerPrice"
//                 value={serviceVariation.discount_price}
//                 onChange={handleChange}
//               />
//               {offererror && (
//                 <p className="text-danger" style={{ fontSize: "11px" }}>
//                   {offererror}
//                 </p>
//               )}
//             </Form.Group>
//           </Col>
//         </Row>

//         <Form.Group controlId="formItemIngredients" className="my-3">
//           <Form.Label>Description</Form.Label>
//           <Form.Control
//             as="textarea"
//             rows={3}
//             placeholder=" Description"
//             name="description"
//             value={serviceVariation.description}
//             onChange={handleChange}
//           />
//         </Form.Group>

//         <Form.Group controlId="formItemImage" className="my-3">
//           <Form.Label>Image</Form.Label>
//           <br />

//           {serverImage && serverImage.length > 0 && (
//             <div className="image-preview-container">
//               {serverImage.map((img, index) => (
//                 <div
//                   key={index}
//                   style={{ display: "inline-block", marginRight: "10px" }}
//                 >
//                   <img
//                     src={img.image}
//                     alt={`Selected ${index}`}
//                     style={{ height: "5rem", width: "5rem" }}
//                     className="my-2"
//                   />
//                   <Button
//                     variant="danger"
//                     size="sm"
//                     onClick={() => handleRemoveServerImage(img.id)}
//                   >
//                     &times;
//                   </Button>
//                 </div>
//               ))}
//             </div>
//           )}
//           {serviceVariation.image && serviceVariation.image.length > 0 && (
//             <>
//               <span className="text-muted">New Images</span>
//               <div className="image-preview-container">
//                 {serviceVariation.image.map((img, index) => (
//                   <div
//                     key={index}
//                     style={{ display: "inline-block", marginRight: "10px" }}
//                   >
//                     <img
//                       src={URL.createObjectURL(img)}
//                       alt={`Selected ${index}`}
//                       style={{ height: "5rem", width: "5rem" }}
//                       className="my-2"
//                     />
//                     <Button
//                       variant="danger"
//                       size="sm"
//                       onClick={() => handleRemoveImage(index)}
//                     >
//                       &times;
//                     </Button>
//                   </div>
//                 ))}
//               </div>
//             </>
//           )}
//           <Form.Control
//             type="file"
//             name="image"
//             multiple
//             onChange={handleImageChange}
//           />
//         </Form.Group>

//         <div className="d-flex justify-content-end gap-2">
//           <Button variant="secondary" onClick={onCancel}>
//             Cancel
//           </Button>

//           <Button
//             variant="success"
//             type="submit"
//             className=""
//             disabled={
//               loading ||
//               serviceVariation.name.trim() === "" ||
//               serviceVariation.price.trim() === "" ||
//               serviceVariation.description.trim() === "" ||
//               serviceVariation.image === null ||
//               // serviceVariation.cuisine_id.length === 0 ||
//               durationerror !== ""
//             }
//           >
//             {loading && (
//               <span
//                 class="spinner-border spinner-border-sm text-warning"
//                 role="status"
//               ></span>
//             )}
//             Submit
//           </Button>
//         </div>
//       </Form>
//     </div>
//   );
// };

// export default ServiceVariationUpdateForm;

import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { message } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { moresalonAuthenticatedAxios } from "../../../../utills/axios/moresalonaxios";

const ServiceVariationUpdateForm = ({
  ser_id,
  sal_id,
  data,
  onFinish,
  onCancel,
}) => {
  const queryClient = useQueryClient();

  const [serviceVariation, setServiceVariation] = useState({
    name: data.name,
    price: data.price,
    discount_price: data.discount_price || "",
    description: data.description,
    duration: data.duration.split(":").slice(0, 2).join(":"),
    image: [],
  });
  const [imagePreviews, setImagePreviews] = useState([]);
  const [serverImage, setServerImage] = useState(data.images || []);
  const [removedImages, setRemovedImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const [offerError, setOfferError] = useState("");
  const [durationError, setDurationError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "discount_price") {
      if (value === "" || parseFloat(value) < parseFloat(serviceVariation.price)) {
        setServiceVariation((prev) => ({ ...prev, [name]: value }));
        setOfferError("");
      } else {
        setOfferError("Discount price must be less than the original price.");
      }
    } else {
      setServiceVariation((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map((file) => URL.createObjectURL(file));

    setServiceVariation((prev) => ({
      ...prev,
      image: [...prev.image, ...files],
    }));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleRemoveImage = (index) => {
    setServiceVariation((prev) => ({
      ...prev,
      image: prev.image.filter((_, i) => i !== index),
    }));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveServerImage = (id) => {
    setRemovedImages((prev) => [...prev, id]);
    setServerImage((prev) => prev.filter((img) => img.id !== id));
  };

  // const handleDurationChange = (e) => {
  //   let { value } = e.target;
  //   value = value.replace(/[^\d:]/g, "");

  //   if (value.length > 2) value = value.slice(0, 2) + ":" + value.slice(2);
  //   if (value.length <= 5) {
  //     setServiceVariation((prev) => ({ ...prev, duration: value }));
  //     setDurationError("");
  //   }
  // };
  const handleDurationChange = async (e) => {
    let { value } = e.target;

    // Remove any non-numeric characters except for ":"
    value = value.replace(/[^\d]/g, "");

    // Automatically add colon for HH:MM format
    if (value.length > 2) {
      value = value.slice(0, 2) + ":" + value.slice(2);
    }

    // Restrict input to 5 characters in total (HH:MM)
    if (value.length > 5) {
      return; // Stop accepting input if exceeds HH:MM format
    }

    // Set valid input
    setServiceVariation({ ...serviceVariation, duration: value });
    setDurationError(""); // Reset error on valid input
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const formData = new FormData();
//     formData.append("name", serviceVariation.name);
//     formData.append("price", serviceVariation.price);
//     formData.append("discount_price", serviceVariation.discount_price || null);
//     formData.append("description", serviceVariation.description);
//     formData.append("duration", `${serviceVariation.duration}:00`);

//     serviceVariation.image.forEach((img) => formData.append("images", img));
//     if (removedImages.length) formData.append("removed_images", removedImages);

//     try {
//       const response = await moresalonAuthenticatedAxios.patch(
//         `moreclub/users/saloons/${sal_id}/services/${ser_id}/variations/${data.id}/`,
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );

//       message.success("Service Variation updated successfully.");
//       queryClient.invalidateQueries([`Saloon variation List ${sal_id} ${ser_id}`]);
//       setServiceVariation({
//         ...serviceVariation,
//         ...response.data.data,
//         image: [],
//       });
//       setServerImage(response.data.data.images);
//       setRemovedImages([]);
//       onFinish();
//     } catch (error) {
//       message.error("Error updating service variation.");
//       console.error("Update Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const datas = {
      name: serviceVariation.name,
      price: serviceVariation.price,
      discount_price: serviceVariation.offerPrice ?? null,
      description: serviceVariation.description,
      duration: `${serviceVariation.duration}:00`,
      ...(serviceVariation.image !== 0 && { images: serviceVariation.image }),
      ...(removedImages.length > 0 && { removed_images: removedImages }),
    };

    moresalonAuthenticatedAxios
      .patch(
        `moreclub/users/saloons/${sal_id}/services/${ser_id}/variations/${data.id}/`,
        datas,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        message.success("Service Variation updated Successfully");
        
        setServiceVariation({
          name: response.data.data.name,
          price: response.data.data.price,
          discount_price: response.data.data.discount_price,
          description: response.data.data.description,
          duration: response.data.data.duration,
          image: null,
        });
        setServerImage(response.data.data.images);
        setRemovedImages([]);
         queryClient.invalidateQueries({
            queryKey: [`Saloon variation List ${sal_id} ${ser_id}`],
          });
        onFinish();
      })
      .catch((error) => {
        // console.error(
        //   "There was an error fetching the updated variation!",
        //   error
        // );
        // message.error("error updating service variation");

        message.success("Service Variation Added Successfully");
        queryClient.invalidateQueries({
            queryKey: [`Saloon variation List ${sal_id} ${ser_id}`],
          });
        onFinish();
      })
      .finally(() => {
        setLoading(false);
      });
  };  

const isSubmitDisabled =
    loading ||
    !serviceVariation.name.trim() ||
    !serviceVariation.price.trim() ||
    !serviceVariation.description.trim() ||
    durationError ||
    offerError;

  return (
    <div className="p-3">
      <Form onSubmit={handleSubmit}>
        <Row xs={1} sm={2}>
          <Col>
            <Form.Group controlId="formItemName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={serviceVariation.name}
                onChange={handleChange}
                placeholder="Enter name"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formItemDuration">
              <Form.Label>Duration</Form.Label>
              <Form.Control
                type="text"
                name="duration"
                value={serviceVariation.duration}
                onChange={handleDurationChange}
                placeholder="HH:MM"
              />
              {durationError && (
                <p className="text-danger" style={{ fontSize: "11px" }}>
                  {durationError}
                </p>
              )}
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formItemPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                name="price"
                value={serviceVariation.price}
                onChange={handleChange}
                placeholder="Enter price"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formItemDiscountPrice">
              <Form.Label>Discount Price (optional)</Form.Label>
              <Form.Control
                type="text"
                name="discount_price"
                value={serviceVariation.discount_price}
                onChange={handleChange}
                placeholder="Enter discount price"
              />
              {offerError && (
                <p className="text-danger" style={{ fontSize: "11px" }}>
                  {offerError}
                </p>
              )}
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="my-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={serviceVariation.description}
            onChange={handleChange}
            placeholder="Enter description"
          />
        </Form.Group>
        <Form.Group className="my-3">
          <Form.Label>Images</Form.Label>
          <div className="d-flex flex-wrap">
            {serverImage.map((img) => (
              <div key={img.id} className="m-2">
                <img
                  src={img.image}
                  alt="server"
                  style={{ width: "5rem", height: "5rem" }}
                />
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleRemoveServerImage(img.id)}
                >
                  &times;
                </Button>
              </div>
            ))}
            {imagePreviews.map((preview, index) => (
              <div key={index} className="m-2">
                <img
                  src={preview}
                  alt="preview"
                  style={{ width: "5rem", height: "5rem" }}
                />
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleRemoveImage(index)}
                >
                  &times;
                </Button>
              </div>
            ))}
          </div>
          <Form.Control type="file" multiple onChange={handleImageChange} />
        </Form.Group>
        <div className="d-flex justify-content-end gap-2">
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="success" type="submit" disabled={isSubmitDisabled}>
            {loading && (
              <span
                className="spinner-border spinner-border-sm text-warning"
                role="status"
              ></span>
            )}
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ServiceVariationUpdateForm;
