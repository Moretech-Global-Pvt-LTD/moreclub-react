import { useQuery } from '@tanstack/react-query';
import React from 'react'
import RestaurantCardSkeleton from '../../Skeleton/RestaurantCardSkeleton';
import PopularSaloonCarousel from './PopularSaloonCarousel';

import Cookies from "js-cookie"
import { moresalonPublicAxios } from '../../../utills/axios/moresalonaxios';
import UniversalErrorbox from '../../Layout/UniversalErrorBox';

const PopularSaloon = () => {

    const { data, isLoading, isError } = useQuery({
        queryKey: ["Popular Saloon List"],
        queryFn: async () => {
            const response = await moresalonPublicAxios.get(`saloons/popular/`,{
                headers: {
                  'x-country-code': Cookies.get("countryCode"),
                }
              });
            const data = await response.data.data;
            return data;
        },
        staleTime: 60000,
    });

    if (isLoading) {
        return (
            <RestaurantCardSkeleton />
        );
    }

    if (isError) {
        return <UniversalErrorbox message="Something went wrong while fetching the Salons" 
        retry={["Popular Saloon List"]}
        />
    }

  return (
      <div>{data && data.length !== 0 && <PopularSaloonCarousel data={data} />}</div>
  )
}

export default PopularSaloon