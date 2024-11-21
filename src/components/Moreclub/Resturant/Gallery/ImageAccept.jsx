import React from 'react'
import { Image } from 'react-bootstrap'
import { axiosInstance } from '../../../..';
import { morefoodURL } from '../../../../config/config';
import { useParams } from 'react-router-dom';
import { message } from 'antd';
import { useQueryClient } from '@tanstack/react-query';
import Restaurant from '../../../../images/moreclub/Restaturant.png';
import { useDispatch } from 'react-redux';
import { approvePendingItem, deleteItem, deletePendingItem } from '../../../../redux/slices/gallerySlice';

const ImageAccept = ({ item }) => {
    const { res_id, cat_id, slug } = useParams();
    const [deleting , setDeleting] = React.useState(false)
    const [verifying, setVerifying] = React.useState(false)
    const dispatch = useDispatch();

    const queryClient = useQueryClient();
    async function verifyImage() {
        setVerifying(true)
        try {
            const response = await axiosInstance.post(
                `${morefoodURL}moreclub/user/restaurants/gallery/user/upload/${res_id}/${item.id}/`,

                {
                    status: "verified"
                }


            );
            message.success("Image Verified")
            dispatch(approvePendingItem(item));
        } catch {
            message.error("Error verifying Image");
        } finally {
            // queryClient.invalidateQueries(`Resturant Unverified images ${res_id}`);
            // queryClient.invalidateQueries(`Resturant Accepted images Gallery ${res_id}`);
            setVerifying(false)
        }
    }
    async function deleteImage() {
        setDeleting(true)
        try {
            const response = await axiosInstance.post(
                `${morefoodURL}moreclub/user/restaurants/gallery/user/upload/${res_id}/${item.id}/`,
                {
                    status: "delete"
                }
            );
            message.warning("Image Deleted")
            dispatch(deleteItem(item));
        } catch {
            console.log("error")
            message.error("Error deleting Image")

        } finally {
            // queryClient.invalidateQueries(`Resturant Unverified images ${res_id}`);
            // queryClient.invalidateQueries(`Resturant Accepted images Gallery ${res_id}`);
            setDeleting(false)
        }
    }


    return (
        <div className='card bg-secondary d-flex flex-column gap-2'>
            <Image
                src={item.image}
                alt={item.image}
                style={{ width: "16rem", height: "16rem", objectFit: "cover" }}
            />
            <div className='d-flex justify-content-center gap-5 p-2'>
                {!item.is_verified && 
                <button className='btn btn-sm btn-success' onClick={verifyImage}>
                   {verifying && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>} Verify
                </button>
               }
                <button className='btn btn-sm btn-danger' onClick={deleteImage}>
                {deleting  && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>} Delete
                </button>
            </div>
        </div>
    )
}

export default ImageAccept