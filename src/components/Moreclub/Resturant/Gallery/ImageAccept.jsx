import React from 'react'
import { Image } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { approvePendingItem, deleteItem } from '../../../../redux/slices/gallerySlice';
import { morefoodAuthenticatedAxios } from '../../../../utills/axios/morefoodaxios';

const ImageAccept = ({ item }) => {
    const { res_id, } = useParams();
    const [deleting , setDeleting] = React.useState(false)
    const [verifying, setVerifying] = React.useState(false)
    const dispatch = useDispatch();

   
    async function verifyImage() {
        setVerifying(true)
        try {
            await morefoodAuthenticatedAxios.post(
                `moreclub/user/restaurants/gallery/user/upload/${res_id}/${item.id}/`,

                {
                    status: "verified"
                }


            );
            message.success("Image Verified")
            dispatch(approvePendingItem(item));
        } catch {
            message.error("Error verifying Image");
        } finally {
            setVerifying(false)
        }
    }
    async function deleteImage() {
        setDeleting(true)
        try {
            await morefoodAuthenticatedAxios.post(
                `moreclub/user/restaurants/gallery/user/upload/${res_id}/${item.id}/`,
                {
                    status: "delete"
                }
            );
            message.warning("Image Deleted")
            dispatch(deleteItem(item));
        } catch {
           
            message.error("Error deleting Image")

        } finally {
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