import React, { useState } from 'react'
import { RestaurantItemskeleton } from '../../components/Skeleton/SmallCardSkeleton';
import { Col, Row } from 'react-bootstrap';
import CuisineCard from '../../components/Moreclub/Resturant/Cuisine/CuisineCard';
import { axiosInstance } from '../..';
import { useQuery } from '@tanstack/react-query';
import { morefoodURL } from '../../config/config';
import { useParams } from 'react-router-dom';

const RestaurantCusine = () => {
    const { partnerId, partnerName } = useParams();



    const { data, isLoading, isError } = useQuery({
        queryKey: [`morefood Cuisine List `],
        queryFn: async () => {
            const response = await axiosInstance.get(
                `${morefoodURL}menus/cuisines/`
            );
            const data = await response.data.data;
            return data;
        },
        staleTime: 100,
    });

    if (isLoading) {
        return (
            <RestaurantItemskeleton />
        );
    }

    if (isError) {
        return <div className="text-dynamic-white">Error: retriving</div>;
    }

  

    return (
        <div>
            <div className="d-flex align-items-center justify-content-between my-2">
                <h4> Cuisines</h4>
            </div>
            
            <div
                // xs={3}
                // sm={4}
                // md={4}
                // lg={4}
                // xl={6}
                // xxl={9}
                className="d-flex flex-wrap gx-3 gy-3 my-4"
            >
                {data.map((item) => (
                    // <Col className="d-flex flex-column">
                    <>
                    <CuisineCard
                        id={item.id}
                        res_id={item.res_id}
                        logo={item.image}
                        name={item.name}
                        item={item.no_of_items}

                    />
                        <CuisineCard
                            id={item.id}
                            res_id={item.res_id}
                            logo={item.image}
                            name={item.name}
                            item={item.no_of_items}

                        />
                        <CuisineCard
                            id={item.id}
                            res_id={item.res_id}
                            logo={item.image}
                            name={item.name}
                            item={item.no_of_items}

                        />
                        <CuisineCard
                            id={item.id}
                            res_id={item.res_id}
                            logo={item.image}
                            name={item.name}
                            item={item.no_of_items}

                        />
                    </>
                    // </Col>
                ))}
            </div>
            {data && data.length === 0 &&
                <p className="text-center">Add Cuisine for your Resturant</p>
            }
        </div>
    );
  
}

export default RestaurantCusine