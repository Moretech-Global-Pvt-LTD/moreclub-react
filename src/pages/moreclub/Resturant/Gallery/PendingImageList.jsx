import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { Placeholder } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../../../..';
import { morefoodURL } from '../../../../config/config';
import ImageAccept from '../../../../components/Moreclub/Resturant/Gallery/ImageAccept';
import { setUserGalleryPending } from '../../../../redux/slices/gallerySlice';
import { useDispatch, useSelector } from 'react-redux';

const PendingImagelist = () => {
    const { res_id } = useParams();
    const dispatch = useDispatch();
   const  gallery = useSelector(state => state.gallery)
    const { data, isLoading, isError } = useQuery({
        queryKey: [`Resturant Unverified images ${res_id}`],
        queryFn: async () => {
            const response = await axiosInstance.get(
                `${morefoodURL}moreclub/user/restaurants/gallery/user/upload/${res_id}/?status=unverified`
            );
            const data = await response.data.data;
            dispatch(setUserGalleryPending(data));
            return data;
        },
        staleTime: 300000,
    });

    if (isLoading) {
        return (
            <div className="">
                <div className="row gap-2">
                    <Placeholder as="p" animation="glow" className="rounded w-25 me-2">
                        <Placeholder xs={12} style={{ height: "8rem" }} />
                    </Placeholder>
                    <Placeholder as="p" animation="glow" className="rounded  w-25 me-2">
                        <Placeholder xs={12} style={{ height: "8rem" }} />
                    </Placeholder>
                    <Placeholder as="p" animation="glow" className="rounded  w-25">
                        <Placeholder xs={12} style={{ height: "8rem" }} />
                    </Placeholder>
                    <Placeholder as="p" animation="glow" className="rounded w-25 me-2">
                        <Placeholder xs={12} style={{ height: "8rem" }} />
                    </Placeholder>
                </div>
            </div>
        );
    }

    if (isError) {
        return <div className="text-dynamic-white">Error: retriving</div>;
    }

    console.log("redux",gallery)

    console.log("data",data)

   
    return (
        <div className='d-flex  flex-wrap gap-2'>
            {gallery.userGalleryPending && gallery.userGalleryPending.map((item, index) => (
                <ImageAccept key={item.id} item={item}  />
            ))
            }
            {gallery.userGalleryPending.length === 0 && <div className="text-dynamic-white">No Pending Images</div>}
        </div>
    )
}

export default PendingImagelist