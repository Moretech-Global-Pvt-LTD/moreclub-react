import React from 'react'
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../..';
import { morefoodURL } from '../../../config/config';
import RestaurantLayoutSkeleton from '../../../components/Skeleton/RestaurantLayout';
import StationLayout from './StationLayout';
import StationDetailContent from '../../../components/Moreclub/Resturant/station/StationDetailContent';

const StationDetailPage = () => {

    const { id, name } = useParams();
    const stationName = name.replace(/-/g, " ");

    const { data, isLoading, isError } = useQuery({
        queryKey: [`Station ${id}`],
        queryFn: async () => {
            const response = await axiosInstance.get(
                `${morefoodURL}moreclub/station/${id}/`
            );
            const data = await response.data.data;
            return data;
        },
        staleTime: 10000,
    });

    if (isLoading) {
        return (
            <StationLayout title={`${stationName}`}>
                <RestaurantLayoutSkeleton />
            </StationLayout>
        );
    }

    if (isError) {
        return <StationLayout title={`${stationName}`} className="text-dynamic-white">Error: retriving</StationLayout>;
    }



  return (
      <StationLayout title={`${stationName}`} >
          <StationDetailContent data={data} />
      </StationLayout>
  )
}

export default StationDetailPage