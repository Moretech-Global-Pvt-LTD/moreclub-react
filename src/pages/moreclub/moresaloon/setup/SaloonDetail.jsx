import React from 'react'
import Saloonlayout from './Saloonlayout'
import SaloonDetailContent from './SaloonDetailContent';
import RestaurantCardSkeleton from '../../../../components/Skeleton/RestaurantCardSkeleton';
import axios from 'axios';
import { moresaloonURL } from '../../../../config/config';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

const SaloonDetail = () => {
    const { id } = useParams();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["Saloon detail", id],
        queryFn: async () => {
            const response = await axios.get(`${moresaloonURL}saloons/${id}/details/`);
            const data = await response.data.data;
            return data;
        },
        staleTime: 100,
    });

    if (isLoading) {
        return (
            <Saloonlayout >
                <RestaurantCardSkeleton />
            </Saloonlayout>
        );
    }

    if (isError) {

        return (

            <Saloonlayout>
                <div className="text-dynamic-white">Error: retriving</div>;
            </Saloonlayout>
        )
    }
  return (
      <Saloonlayout><SaloonDetailContent data={data}/></Saloonlayout>
  )
}

export default SaloonDetail;