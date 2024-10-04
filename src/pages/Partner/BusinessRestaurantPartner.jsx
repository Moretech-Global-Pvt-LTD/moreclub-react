import React from 'react'
import { useParams } from 'react-router-dom';
import { getAccessToken } from '../../utills/token';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import LandingLayout from '../../components/Layout/LandingLayout';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import UnauthenticatedBusinessPartnerContent from './UnauthenticatedPartnerContent';
import Divider from '../../components/divider/Divider';
import { axiosInstance } from '../..';
import { useQuery } from '@tanstack/react-query';
import { baseURL, morefoodhostURL } from '../../config/config';
import { BestDealsinTownSkeleton } from '../../components/Skeleton/SmallCardSkeleton';
import { Col, Row } from 'react-bootstrap';
import OffersCard from '../../components/dashboard/Offercard';

const BusinessRestaurantPartner = () => {
    const { partnerId, partnerName, cuisineName } = useParams();

    const title = partnerName.replace(/-/g, " ");
    const CuisineName = cuisineName.replace(/-/g, " ").toLowerCase();  


    if (!!getAccessToken()) {
            
        return (
            <DashboardLayout title={`${CuisineName} Cuisine`}>
                    <BusinessPartnerContent partnerId={partnerId} CuisineName={CuisineName}/>
                    <Divider />
                </DashboardLayout>
            );
        
    } else {
        return (
            <LandingLayout>
                <Breadcrumb
                    breadcrumbTitle={title}
                    breadcrumbNav={[
                        {
                            navText: "Home",
                            path: "/",
                        },
                    ]}
                />
                <div className="container">
                    <UnauthenticatedBusinessPartnerContent partnerId={partnerId} />
                    <Divider />
                </div>
            </LandingLayout>
        );
    }

}

export default BusinessRestaurantPartner


const BusinessPartnerContent = ({ partnerId, CuisineName }) => {

    const { partnerName, cuisineName } = useParams();
    const title = partnerName.replace(/-/g, " ")
    const { data, isLoading, isError } = useQuery({
        queryKey: [`restaurant partners data ${cuisineName} `],
        queryFn: async () => {

            const response = await axiosInstance.get(
                `${baseURL}business/partners/${partnerId}/?cuisine=${cuisineName}`
            );
            return response.data.data;
        },
        staleTime: 1000,
    });

    if (isLoading) {
        return (
            <div className="d-flex gap-2">
                <BestDealsinTownSkeleton />
            </div>
        );
    }

    if (isError) {
        <div className="text-dynamic white">Error getting data</div>;
    }

    
    return (
        <div className="mt-4">
            <Row sm={2} md={4} className="gx-3 gy-3">
                {data && data.map((item) => (
                    <Col className="d-flex flex-column">
                        <OffersCard
                            id={item.id}
                            partnerName={partnerName}
                            logo={item.business_logo}
                            name={item.business_name}
                            address={item.business_address}
                            email={item.business_email}
                            phone={item.business_phone}
                            discounts={item.business_discounts}
                        />
                    </Col>
                ))}
            </Row>
            {/* <Row xs={2} sm={2} md={2} lg={3} xl={4} xxl={5} className=" px-2">
                {data?.map((item) => (
                        <ResturantCard key={item.id} link={`${morefoodhostURL}/resturants/${item.id}`} res={item} />
                ))}
            </Row> */}
            {data && data.length === 0 && (
                <>
                    <Divider />
                    <p className="text-center">Partner not Registered yet having {CuisineName} cuisines</p>
                    <Divider />

                </>
            )}
        </div>
    );
};