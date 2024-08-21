import React from 'react'
import { Image } from 'react-bootstrap'
import { axiosInstance } from '../../../..';
import { morefoodURL } from '../../../../config/config';
import { useParams } from 'react-router-dom';
import { message } from 'antd';
import { useQueryClient } from '@tanstack/react-query';
import Restaurant from '../../../../images/moreclub/Restaturant.png';

const ImageAccept = ({ item }) => {
    const { res_id, cat_id, slug } = useParams();

    const queryClient = useQueryClient();
    async function verifyImage() {
        try {
            const response = await axiosInstance.post(
                `${morefoodURL}moreclub/user/restaurants/gallery/user/upload/${res_id}/${item.id}/`,

                {
                    status: "verified"
                }


            );
            message.success("Image Verified")
        } catch {
            message.error("Error verifying Image");
        } finally {
            queryClient.invalidateQueries(`Resturant Unverified images ${res_id}`);
            queryClient.invalidateQueries(`Resturant Accepted images Gallery ${res_id}`);
        }
    }
    async function deleteImage() {
        try {
            const response = await axiosInstance.post(
                `${morefoodURL}moreclub/user/restaurants/gallery/user/upload/${res_id}/${item.id}/`,
                {
                    status: "delete"
                }
            );
            message.warning("Image Deleted")
        } catch {
            console.log("error")
            message.error("Error deleting Image")

        } finally {
            queryClient.invalidateQueries(`Resturant Unverified images ${res_id}`);
            queryClient.invalidateQueries(`Resturant Accepted images Gallery ${res_id}`);

        }
    }


    return (
        <div className='card bg-secondary d-flex flex-column gap-2'>
            <Image
                src={Restaurant}
                alt={item.image}
                style={{ width: "16rem", height: "16rem", objectFit: "cover" }}
            />
            <div className='d-flex justify-content-center gap-5 p-2'>
                {!item.is_verified && 
                <button className='btn btn-sm btn-success' onClick={verifyImage}>
                    Verify
                </button>
               }
                <button className='btn btn-sm btn-danger' onClick={deleteImage}>
                    Delete
                </button>
            </div>
        </div>
    )
}

export default ImageAccept