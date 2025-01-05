import React from 'react'
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import StationLayout from '../../Station/StationLayout';
import RestaurantLayoutSkeleton from '../../../../components/Skeleton/RestaurantLayout';
import { morefoodAuthenticatedAxios } from '../../../../utills/axios/morefoodaxios';

const NearbyStationMenuPage = () => {

    const { resid, stationid, name } = useParams();
    const stationName = name.replace(/-/g, " ");

    const { data, isLoading, isError } = useQuery({
        queryKey: [`Nearby Station menu ${stationid}`],
        queryFn: async () => {
            const response = await morefoodAuthenticatedAxios.get(
                `moreclub/station/${stationid}/${resid}/food-items/`
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
      <StationLayout title={`${stationName} Menu`}>NearbyStationMenuPage</StationLayout>
  )
}

export default NearbyStationMenuPage