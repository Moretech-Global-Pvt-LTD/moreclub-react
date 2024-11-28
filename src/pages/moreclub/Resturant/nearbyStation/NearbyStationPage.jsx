import React from 'react'
import DashboardLayout from '../../../../components/Layout/DashboardLayout'
import StationLayout from '../../Station/StationLayout';
import RestaurantCardSkeleton from '../../../../components/Skeleton/RestaurantCardSkeleton';
import { axiosInstance } from '../../../..';
import { morefoodURL } from '../../../../config/config';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams, useSearchParams } from "react-router-dom";
import Cookies from "js-cookie"



// Helper function to calculate distance using Haversine formula
const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Earth's radius in km

    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a = Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLng / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

const NearbyStationPage = () => {

    const { resid } = useParams();
    const [searchParams] = useSearchParams();
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    const { data, isLoading, isError } = useQuery({
        queryKey: ["nearby station List"],
        queryFn: async () => {
            const response = await axiosInstance.get(`${morefoodURL}moreclub/station/${resid}/nearby/`, {
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
            <StationLayout title={"Nearby Station"}>
                <RestaurantCardSkeleton />
            </StationLayout>
        );
    }

    if (isError) {
        return <StationLayout title={"Nearby Station"}> Error: retriving</StationLayout>;
    }




    return (
        <DashboardLayout title={"Nearby Station"}>
            <div className="nearby-station-container">
                {data && data.length > 0 && data.map((station) => {
                    const distance = calculateDistance(lat, lng, station.lat, station.lng).toFixed(1);
                    return <StationCard key={station.id} item={station} distance={distance} />;
                })}
            </div>
        </DashboardLayout>
    )
}

export default NearbyStationPage


const StationCard = ({ item, distance }) => {
    const { resid } = useParams();
    return (
        <Link to={`/restaurant/${resid}/station/${item.id}/${item.name.replace(/ /g, "-")}`} class="nearby-station-card">
            <div class="nearby-station-info">
                <h3 class="nearby-station-name">{item.name}</h3>
                <p class="nearby-station-location">{distance} km away</p>
            </div>
        </Link>
    )
}