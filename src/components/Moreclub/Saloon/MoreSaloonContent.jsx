import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { moresaloonhostURL, moresaloonURL } from '../../../config/config';
import RestaurantCardSkeleton from '../../Skeleton/RestaurantCardSkeleton';
import { Row } from 'react-bootstrap';
import SaloonCard from './SaloonCard';
import axios from 'axios';

const MoreSaloonContent = () => {

    const { data, isLoading, isError } = useQuery({
        queryKey: ["More Saloon List"],
        queryFn: async () => {
            const response = await axios.get(`${moresaloonURL}saloons/lists/`);
            const data = await response.data.data;
            return data;
        },
        staleTime: 100,
    });

    if (isLoading) {
        return (
            <RestaurantCardSkeleton />
        );
    }

    if (isError) {
        return <div className="text-dynamic-white">Error: retriving</div>;
    }


  return (
      <>
          <h4 className="mx-auto mt-3 ">Saloons</h4>

          <Row xs={2} sm={2} md={2} lg={3} xl={4} xxl={5} className=" px-2">
              {data?.map((item) => (
                  <>
                      <SaloonCard key={item.id} link={`${moresaloonhostURL}/saloon/${item.id}`} sal={item} />
                  </>
              ))}
          </Row>


      </>
  )
}

export default MoreSaloonContent