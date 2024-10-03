import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { Placeholder } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../../../..';
import { morefoodURL } from '../../../../config/config';
import ImageAccept from '../../../../components/Moreclub/Resturant/Gallery/ImageAccept';

const PendingImagelist = () => {
    const { res_id, cat_id, slug } = useParams();
    const { data, isLoading, isError } = useQuery({
        queryKey: [`Resturant Unverified images ${res_id}`],
        queryFn: async () => {
            const response = await axiosInstance.get(
                `${morefoodURL}moreclub/user/restaurants/gallery/user/upload/${res_id}/?status=unverified`
            );
            const data = await response.data.data;
            return data;
        },
        staleTime: 60000,
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


    // const datas = data && data.map((e) => ({ ...e, width: "300", height: "200" }));
    // console.log(datas)

    return (
        <div className='d-flex  flex-wrap gap-2'>
            {data.map((item, index) => (
                <ImageAccept key={item.id} item={item}  />
            ))
            }
        </div>
    )
}

export default PendingImagelist