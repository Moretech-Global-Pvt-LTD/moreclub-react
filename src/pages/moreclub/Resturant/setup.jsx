import React from 'react'
import DashboardLayout from '../../../components/Layout/DashboardLayout';
import Setuppage from '../../../components/Moreclub/Resturant/Setup/setuppage';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../..';
import { morefoodURL } from '../../../config/config';
import { useParams } from 'react-router-dom';
import RestaurantLayoutSkeleton from '../../../components/Skeleton/RestaurantLayout';
import RestaurantLayout from '../../../components/Layout/RestaurantLayout';

const Setup = () => {
   const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: [`Resturant ${id}`],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `${morefoodURL}moreclub/user/restaurants/${id}/`
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