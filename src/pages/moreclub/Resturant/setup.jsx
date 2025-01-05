import React from 'react'
import Setuppage from '../../../components/Moreclub/Resturant/Setup/setuppage';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import RestaurantLayoutSkeleton from '../../../components/Skeleton/RestaurantLayout';
import RestaurantLayout from '../../../components/Layout/RestaurantLayout';
import { morefoodAuthenticatedAxios } from '../../../utills/axios/morefoodaxios';

const Setup = () => {
   const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: [`Restaurant ${id}`],
    queryFn: async () => {
      const response = await morefoodAuthenticatedAxios.get(
        `moreclub/user/restaurants/${id}/`
      );
      const data = await response.data.data;
      return data;
    },
    staleTime: 300000,
  });

  if (isLoading) {
    return (
      <RestaurantLayout>
        <RestaurantLayoutSkeleton/>
      </RestaurantLayout>
    );
  }

  if (isError) {
    return <RestaurantLayout className="text-dynamic-white">Error: retriving</RestaurantLayout>;
  }



  return (
    <RestaurantLayout>
      <Setuppage data={data} />
    </RestaurantLayout>
  );
}

export default Setup