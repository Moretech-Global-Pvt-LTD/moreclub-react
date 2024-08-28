import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { axiosInstance } from '../..';
import { baseURL } from '../../config/config';
import { Button, Card, Placeholder } from 'react-bootstrap';
import { businessQRInfoSuccess } from '../../redux/slices/businessSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import BusinessDiscountCard from './BusinessDiscountCard';


const BusinessInfo = () => {
    const dispatch = useDispatch();
    const businessProfiles = useSelector((state) => state.businessReducer);

    const { data, isLoading, isError } = useQuery({
        queryKey: ["business qr and  info discount"],
        queryFn: async () => {
            const response = await axiosInstance.get(`${baseURL}business/qr/code/`);
            const data = await response.data.data;
            await dispatch(businessQRInfoSuccess(data));
            return data;
        },
    });

    if (isLoading) {
        return (
            <>
                <Placeholder as="p" animation="glow" className="rounded">
                    <Placeholder xs={12} size="lg" style={{ height: "7rem" }} />
                </Placeholder>
            </>
        );
    }

    if (isError) {
        <div className="text-dynamic white">Error getting page data</div>;
    }

    console.log(data)
    console.log(businessProfiles)
    console.log(businessProfiles.BusinessInfo)
    return (
        <div className='d-flex flex-column my-4'>
            <Card className='p-2'>
                <h4>Business Discounts</h4>
                <div className='d-flex flex-column gap-3'>
                    {businessProfiles?.businessQRInfo && businessProfiles.businessQRInfo?.map((item) => (
                        <BusinessDiscountCard item={item} key={item.business_type_name} />
                    ))}
                </div>
            </Card>
        </div>
    )
}

export default BusinessInfo