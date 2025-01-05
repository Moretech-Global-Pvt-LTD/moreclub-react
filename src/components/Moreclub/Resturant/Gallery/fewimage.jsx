import React, { useState } from 'react'
import { Image } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { message } from 'antd';

import { useDispatch } from 'react-redux';
import {  deleteRestaurantGallery } from '../../../../redux/slices/gallerySlice';
import { morefoodAuthenticatedAxios } from '../../../../utills/axios/morefoodaxios';

const FewImage = ({ item }) => {
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
          const res = await morefoodAuthenticatedAxios.delete(
            `moreclub/user/restaurants/gallery/${res_id}/${item.id}/delete/`
          );
          dispatch(deleteRestaurantGallery(item.id));
          message.success("Image Deleted");
        } catch (err) {
          console.log(err);
          message.error("Error deleting image");
        }
      };
    


    return (
        <div className='card bg-secondary d-flex flex-column gap-2 position-relative'>
            <Image
                src={item.image}
                alt={item.image}
                style={{ width: "16rem", height: "16rem", objectFit: "cover" }}
            />
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
        </div>
    )
}

export default FewImage