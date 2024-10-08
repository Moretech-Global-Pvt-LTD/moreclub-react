import React from 'react'
import { RestaurantItemskeleton } from '../../components/Skeleton/SmallCardSkeleton';
import CuisineCard from '../../components/Moreclub/Resturant/Cuisine/CuisineCard2';
import { axiosInstance } from '../..';
import { useQuery } from '@tanstack/react-query';
import { morefoodURL } from '../../config/config';
import Cookies from "js-cookie"


const RestaurantCusine = () => {
   
    const { data, isLoading, isError } = useQuery({
        queryKey: [`morefood Cuisine List `],
        queryFn: async () => {
            const response = await axiosInstance.get(
                `${morefoodURL}menus/cuisines/`, {
                headers: {
                    'x-country-code': Cookies.get("countryCode"),
                }
            }
            );
            const data = await response.data.data;
            return data;
        },
        staleTime: 100,
    });

    if (isLoading) {
        return (
            <RestaurantItemskeleton />
        );
    }

    if (isError) {
        return <div className="text-dynamic-white">Error: retriving</div>;
    }

  

    return (
        <div>
            
           <div className="cuisine-container">
                {data.map((item) => (
                    <CuisineCard
                        id={item.id}
                        res_id={item.res_id}
                        logo={item.image}
                        name={item.name}
                        item={item.no_of_items}

                    />
                        
                    
                ))}
                    </div>

            {data && data.length === 0 &&
                <p className="text-center">No Cuisines Found</p>
            }
        </div>
    );
  
}

export default RestaurantCusine