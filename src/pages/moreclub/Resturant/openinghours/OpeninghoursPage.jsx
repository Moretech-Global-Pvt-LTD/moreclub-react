import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useParams } from 'react-router-dom';
import { morefoodURL } from '../../../../config/config';
import { Placeholder } from 'react-bootstrap';
import OpeningHoursForm from '../../../../components/Moreclub/Resturant/openingHours/openinghourform';
import RestaurantLayout from '../../../../components/Layout/RestaurantLayout';
import { morefoodAuthenticatedAxios } from '../../../../utills/axios/morefoodaxios';

const OpeninghoursPage = () => {
    const { res_id } = useParams();


    const { data, isLoading, isError } = useQuery({
        queryKey: [`working hours ${res_id}`],
        queryFn: async () => {
            const response = await morefoodAuthenticatedAxios.get(
                `moreclub/user/restaurants/${res_id}/working/hours/`
            );
            const data = await response.data.data;
            return data;
        },
        staleTime: 420000,
    });

    if (isLoading) {
        return (
            <RestaurantLayout>
                <div className="row gap-2">
                    <Placeholder as="p" animation="glow" className="rounded  w-25 me-2">
                        <Placeholder xs={12} style={{ height: "10rem" }} />
                    </Placeholder>
                    <Placeholder as="p" animation="glow" className="rounded  w-25 me-2">
                        <Placeholder xs={12} style={{ height: "10rem" }} />
                    </Placeholder>
                    <Placeholder as="p" animation="glow" className="rounded w-25 me-2">
                        <Placeholder xs={12} style={{ height: "10rem" }} />
                    </Placeholder>
                </div>
            </RestaurantLayout>
        );
    }

    if (isError) {
        return (
            <RestaurantLayout className="text-dynamic-white">
                Error: retriving
            </RestaurantLayout>
        );
    }

    
    return (
        <RestaurantLayout>
            {data && data.length > 0 &&
                <OpeningHoursForm existingdata={data} />
            }
            {data && data.length <= 0 &&
                <OpeningHoursForm />
            }
        </RestaurantLayout>
    );
}

export default OpeninghoursPage