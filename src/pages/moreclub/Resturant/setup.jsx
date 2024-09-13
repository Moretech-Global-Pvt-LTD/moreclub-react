import React from 'react'
import DashboardLayout from '../../../components/Layout/DashboardLayout';
import Setuppage from '../../../components/Moreclub/Resturant/Setup/setuppage';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../..';
import { morefoodURL } from '../../../config/config';
import { useParams } from 'react-router-dom';
import { Placeholder } from 'react-bootstrap';
import RestaurantLayoutSkeleton from '../../../components/Skeleton/RestaurantLayout';

const Setup = () => {
   const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: [`Resturant List ${id}`],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `${morefoodURL}moreclub/user/restaurants/${id}/`
      );
      const data = await response.data.data;
      return data;
    },
    staleTime: 100,
  });

  if (isLoading) {
    return (
      <DashboardLayout>
        <RestaurantLayoutSkeleton/>
      </DashboardLayout>
    );
  }

  if (isError) {
    return <DashboardLayout className="text-dynamic-white">Error: retriving</DashboardLayout>;
  }



  return (
    <DashboardLayout title={data.name}>
      <Setuppage data={data} />
    </DashboardLayout>
  );
}

export default Setup