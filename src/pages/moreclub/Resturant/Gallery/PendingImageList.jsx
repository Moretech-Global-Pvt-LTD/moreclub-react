import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { Placeholder } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ImageAccept from '../../../../components/Moreclub/Resturant/Gallery/ImageAccept';
import { setUserGalleryPending } from '../../../../redux/slices/gallerySlice';
import { useDispatch, useSelector } from 'react-redux';
import { morefoodAuthenticatedAxios } from '../../../../utills/axios/morefoodaxios';

const PendingImagelist = () => {
    const { res_id } = useParams();
    const dispatch = useDispatch();
   const  gallery = useSelector(state => state.gallery)
    const { data, isLoading, isError } = useQuery({
        queryKey: [`Resturant Unverified images ${res_id}`],
        queryFn: async () => {
            const response = await morefoodAuthenticatedAxios.get(
                `moreclub/user/restaurants/gallery/user/upload/${res_id}/?status=unverified`
            );
            const data = await response.data.data;
            dispatch(setUserGalleryPending(data));
            return data;
        },
        staleTime: 300000,
    });

    if (isLoading) {
        return (
            <div className="d-flex  flex-wrap gap-2">
                    <Placeholder as="p" animation="glow" className="rounded w-25 me-2">
                        <Placeholder xs={12} style={{ width: "16rem", height: "16rem", }} />
                    </Placeholder>
                    <Placeholder as="p" animation="glow" className="rounded w-25 me-2">
                        <Placeholder xs={12} style={{ width: "16rem", height: "16rem", }} />
                    </Placeholder><Placeholder as="p" animation="glow" className="rounded w-25 me-2">
                        <Placeholder xs={12} style={{ width: "16rem", height: "16rem", }} />
                    </Placeholder><Placeholder as="p" animation="glow" className="rounded w-25 me-2">
                        <Placeholder xs={12} style={{ width: "16rem", height: "16rem", }} />
                    </Placeholder><Placeholder as="p" animation="glow" className="rounded w-25 me-2">
                        <Placeholder xs={12} style={{ width: "16rem", height: "16rem", }} />
                    </Placeholder><Placeholder as="p" animation="glow" className="rounded w-25 me-2">
                        <Placeholder xs={12} style={{ width: "16rem", height: "16rem", }} />
                    </Placeholder>
                    <Placeholder as="p" animation="glow" className="rounded w-25 me-2">
                        <Placeholder xs={12} style={{ width: "16rem", height: "16rem", }} />
                    </Placeholder>
                    <Placeholder as="p" animation="glow" className="rounded w-25 me-2">
                        <Placeholder xs={12} style={{ width: "16rem", height: "16rem", }} />
                    </Placeholder><Placeholder as="p" animation="glow" className="rounded w-25 me-2">
                        <Placeholder xs={12} style={{ width: "16rem", height: "16rem", }} />
                    </Placeholder><Placeholder as="p" animation="glow" className="rounded w-25 me-2">
                        <Placeholder xs={12} style={{ width: "16rem", height: "16rem", }} />
                    </Placeholder><Placeholder as="p" animation="glow" className="rounded w-25 me-2">
                        <Placeholder xs={12} style={{ width: "16rem", height: "16rem", }} />
                    </Placeholder><Placeholder as="p" animation="glow" className="rounded w-25 me-2">
                        <Placeholder xs={12} style={{ width: "16rem", height: "16rem", }} />
                    </Placeholder>
                   
              
            </div>
        );
    }

    if (isError) {
        return <div className="text-dynamic-white">Error: retriving</div>;
    }

   
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