// import React, { useState, useEffect } from 'react';

//  const ImageContainer = ({ src, alt }) => {
//   const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
//   const [rowSpan, setRowSpan] = useState(1);

//   useEffect(() => {
//     const img = new Image();
//     img.onload = () => {
//       const { width, height } = img;
//       setImageSize({ width, height });
//       const aspectRatio = width / height;
//       const rowSpan = Math.ceil(aspectRatio * 2); // adjust this value to change the row span calculation
//       setRowSpan(rowSpan);
//     };
//     img.src = src;
//   }, [src]);

//   return (
//     <div className="masonry-item" style={{ gridColumn: `span ${rowSpan}` }}>
//       <img src={src} alt={alt} />
//     </div>
//   );
// };

// export default ImageContainer;

import React, { useState } from "react";
import { deleteRestaurantGallery } from "../../../../redux/slices/gallerySlice";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../../../..";
import { morefoodURL } from "../../../../config/config";
import { useParams } from "react-router-dom";
import { message } from "antd";

const ImageContainer = ({ item, onClick }) => {
  const { res_id } = useParams();
  const [isLoading, setisLoading] = useState(false);
  const widthHeightRatio = item.height / item.width;
  const galleryHeight = Math.ceil(150 * widthHeightRatio);
  const dispatch = useDispatch();
  const photoSpans = Math.ceil(galleryHeight / 18) + 1;

  const handleDelete = async () => {
    if(isLoading) return;
    
    setisLoading(true);
    try {
      const res = await axiosInstance.delete(
        `${morefoodURL}moreclub/user/restaurants/gallery/${res_id}/${item.id}/delete/`
      );
      dispatch(deleteRestaurantGallery(item.id));
      message.success("Image Deleted");
    } catch (err) {
      console.log(err);
      message.error("Error deleting image");
    }
  };

  return (
    // <div className="masonry-image-container" id={item.id} style={{ gridRow: `span ${photoSpans}` }}>
    //   <div style={{ display: "grid", placeContent: "center" }}>
    //     <div
    //       style={{ overflow: "hidden" }}
    //       onClick={onClick}
    //     >

    //       <img
    //         src={item.image}
    //         alt={item.name}
    //         style={{ width: "100%" }}
    //       />
    //     </div>
    //   </div>
    // </div>

    <div
      className="masonry-image-container"
      id={item.id}
      style={{ gridRow: `span ${photoSpans}`, position: "relative" }} // Ensure the container is relative
    >
      {/* Delete Icon */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 10,
          cursor: "pointer",
          backgroundColor: "rgba(255, 0, 0, 0.8)",
          padding: "5px",
          borderRadius: "50%",
          color: "white",
          fontSize: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={() => handleDelete()} // Callback function to handle delete
      >
       
        {isLoading ? <span
                class="spinner-border spinner-border-sm text-primary"
                role="status"
              ></span> :  <>&#128465;</>}
      </div>

      {/* Image Content */}
      <div style={{ display: "grid", placeContent: "center" }}>
        <div style={{ overflow: "hidden" }} onClick={onClick}>
          <img src={item.image} alt={item.name} style={{ width: "100%" }} />
        </div>
      </div>
    </div>
  );
};

export default ImageContainer;
