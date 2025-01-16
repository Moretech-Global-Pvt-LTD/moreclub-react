import React from 'react'
import Saloonlayout from './Saloonlayout'
import SaloonDetailContent from './SaloonDetailContent';
import RestaurantCardSkeleton from '../../../../components/Skeleton/RestaurantCardSkeleton';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { moresalonAuthenticatedAxios } from '../../../../utills/axios/moresalonaxios';

const SaloonDetail = () => {
    const { id } = useParams();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["Saloon detail", id],
        queryFn: async () => {
            const response = await moresalonAuthenticatedAxios.get(`moreclub/users/saloon/${id}/`);
            const data = await response.data.data;
            return data;
        },
        staleTime: 360000,
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