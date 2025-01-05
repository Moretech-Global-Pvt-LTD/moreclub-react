import React from 'react'
import { useQuery } from '@tanstack/react-query';
import PopularresturantCarousel from './PopularresturantCarousel';
import RestaurantCardSkeleton from '../../Skeleton/RestaurantCardSkeleton';
import { morefoodPublicAxios } from '../../../utills/axios/morefoodaxios';

const PopularResturant = () => {


    const { data, isLoading, isError } = useQuery({
      queryKey: ["More Food Popular Resturant List"],
      queryFn: async () => {
        const response = await morefoodPublicAxios.get(
          `restaurants/popular-restaurants/`,
          
        );
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
    <div>
      {data && data.length !== 0 &&  <PopularresturantCarousel data={data} />}
    </div>
  );
}

export default PopularResturant