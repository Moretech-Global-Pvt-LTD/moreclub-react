import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { moresaloonhostURL } from '../../../config/config';
import RestaurantCardSkeleton from '../../Skeleton/RestaurantCardSkeleton';
import { Row } from 'react-bootstrap';
import SaloonCard from './SaloonCard';
import Cookies from "js-cookie"
import { moresalonPublicAxios } from '../../../utills/axios/moresalonaxios';
import UniversalErrorbox from '../../Layout/UniversalErrorBox';

const MoreSaloonContent = () => {

    const { data, isLoading, isError } = useQuery({
        queryKey: ["More Saloon List"],
        queryFn: async () => {
            const response = await moresalonPublicAxios.get(`saloons/lists/`,
                {
                    headers: {
                        'x-country-code': Cookies.get("countryCode"),
                    }
                }
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
        return <UniversalErrorbox message="Something went wrong while fetching the Salons" 
        retry={["More Saloon List"]}
        />
    }


  return (
      <>
          <h4 className="mx-auto mt-3 ">Salons</h4>

          <Row xs={2} sm={2} md={2} lg={3} xl={4} xxl={5} className=" px-2">
              {data?.map((item) => (
                  <SaloonCard key={item.id} link={`${moresaloonhostURL}/salons/${item.id}`} sal={item} />
                  
              ))}
          </Row>


      </>
  )
}

export default MoreSaloonContent