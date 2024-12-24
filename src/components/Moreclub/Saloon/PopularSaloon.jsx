import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { moresaloonURL } from '../../../config/config';
import RestaurantCardSkeleton from '../../Skeleton/RestaurantCardSkeleton';
import PopularSaloonCarousel from './PopularSaloonCarousel';
import axios from 'axios';
import Cookies from "js-cookie"

const PopularSaloon = () => {

    const { data, isLoading, isError } = useQuery({
        queryKey: ["Popular Saloon List"],
        queryFn: async () => {
            const response = await axios.get(`${moresaloonURL}saloons/popular/`,{
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
        return <div className="text-dynamic-white">Error: retriving</div>;
    }

  return (
      <div>{data && data.length !== 0 && <PopularSaloonCarousel data={data} />}</div>
  )
}

export default PopularSaloon