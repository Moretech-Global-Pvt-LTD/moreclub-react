import React, { useState } from 'react'
import RestaurantLayout from '../../../../components/Layout/RestaurantLayout'
// import Section from '../../../../components/Moreclub/Resturant/tablemanagement/section';
import { morefoodAuthenticatedAxios } from '../../../../utills/axios/morefoodaxios';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import RestaurantCardSkeleton from '../../../../components/Skeleton/RestaurantCardSkeleton';
import UniversalErrorbox from '../../../../components/Layout/UniversalErrorBox';
import TablemanagementContent from './TablemanagementContent';

const Tablemanagement = () => {
    const {res_id} = useParams()

    const { data, isLoading, isError } = useQuery({
        queryKey: ["Restaurant tables and sections"],
        queryFn: async () => {
          const response = await morefoodAuthenticatedAxios.get(`moreclub/restaurant/${res_id}/section/`);
          const data = await response.data.data;
          return data;
        },
        staleTime: 24000,
      });
  
      if (isLoading) {
        return (
            <RestaurantLayout>

                <RestaurantCardSkeleton />
            </RestaurantLayout>
        );
      }
  
      if (isError) {
        return <RestaurantLayout>
            <UniversalErrorbox message="Something went wrong while fetching the Restaurant tables" 
            retry={["Restaurant tables and sections"]}
            />
        </RestaurantLayout>
      }
    
  return (
    <RestaurantLayout>
      <TablemanagementContent sectionsdata={data} />
    </RestaurantLayout>
  )
}

export default Tablemanagement




