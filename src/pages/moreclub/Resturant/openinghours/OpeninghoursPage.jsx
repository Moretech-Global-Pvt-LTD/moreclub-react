import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../../../..';
import { morefoodURL } from '../../../../config/config';
import DashboardLayout from '../../../../components/Layout/DashboardLayout';
import { Placeholder } from 'react-bootstrap';
import OpeningHoursForm from '../../../../components/Moreclub/Resturant/openingHours/openinghourform';

const OpeninghoursPage = () => {
    const { res_id } = useParams();


    const { data, isLoading, isError } = useQuery({
        queryKey: [`working hours ${res_id}`],
        queryFn: async () => {
            const response = await axiosInstance.get(
                `${morefoodURL}moreclub/user/restaurants/${res_id}/working/hours/`
            );
            const data = await response.data.data;
            return data;
        },
        staleTime: 100,
    });

    if (isLoading) {
        return (
            <DashboardLayout>
                <div className="row gap-2">
                    <Placeholder as="p" animation="glow" className="rounded w-50 me-2">
                        <Placeholder xs={12} lg={6} style={{ height: "10rem" }} />
                    </Placeholder>
                    <Placeholder as="p" animation="glow" className="rounded  w-25 me-2">
                        <Placeholder xs={12} style={{ height: "10rem" }} />
                    </Placeholder>
                    <Placeholder as="p" animation="glow" className="rounded  w-25">
                        <Placeholder xs={12} style={{ height: "10rem" }} />
                    </Placeholder>
                    <Placeholder as="p" animation="glow" className="rounded w-25 me-2">
                        <Placeholder xs={12} style={{ height: "10rem" }} />
                    </Placeholder>
                </div>
            </DashboardLayout>
        );
    }

    if (isError) {
        return (
            <DashboardLayout className="text-dynamic-white">
                Error: retriving
            </DashboardLayout>
        );
    }
    

    console.log("working hours", data);
    
    return (
        <DashboardLayout title={data.name}>
            {data && data.length > 0 &&
                <OpeningHoursForm existingdata={data} />
            }
            {data && data.length <= 0 &&
                <OpeningHoursForm />
            }
        </DashboardLayout>
    );
}

export default OpeninghoursPage