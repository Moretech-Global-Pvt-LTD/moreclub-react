import React from 'react'
import { useQuery } from '@tanstack/react-query';
import RestaurantCardSkeleton from '../../Skeleton/RestaurantCardSkeleton';
import UniversalErrorbox from '../../Layout/UniversalErrorBox';
import PopularHotelCarousel from './PopularHotelCarousel';
import { morelivingPublicAxios } from '../../../utills/axios/morelivingaxios';

const Popularhotels = () => {


    const { data, isLoading, isError } = useQuery({
      queryKey: ["More Living Popular Hotel List"],
      queryFn: async () => {
        const response = await morelivingPublicAxios.get(
          `property/popular-properties/`,
          
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
      return <UniversalErrorbox message="Something went wrong while fetching the Hotels" 
      retry={["More Living Popular Hotel List"]}
      />
    }
  return (
    <div>
      {data && data.length !== 0 &&  <PopularHotelCarousel data={data} />}
    </div>
  );
}

export default Popularhotels