import React from 'react'
import { useQuery } from '@tanstack/react-query';
import PopularresturantCarousel from './PopularresturantCarousel';
import RestaurantCardSkeleton from '../../Skeleton/RestaurantCardSkeleton';
import { morefoodPublicAxios } from '../../../utills/axios/morefoodaxios';
import UniversalErrorbox from '../../Layout/UniversalErrorBox';

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
      return <UniversalErrorbox message="Something went wrong while fetching the Restaurants" 
      retry={["More Food Popular Resturant List"]}
      />
    }
  return (
    <div>
      {data && data.length !== 0 &&  <PopularresturantCarousel data={data} />}
    </div>
  );
}

export default PopularResturant