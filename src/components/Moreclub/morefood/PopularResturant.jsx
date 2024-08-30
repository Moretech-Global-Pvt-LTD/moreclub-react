import React from 'react'
import { Placeholder} from 'react-bootstrap';
import { morefoodURL } from '../../../config/config';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import PopularresturantCarousel from './PopularresturantCarousel';
const PopularResturant = () => {
    const { data, isLoading, isError } = useQuery({
      queryKey: ["More Food Popular Resturant List"],
      queryFn: async () => {
        const response = await axios.get(
          `${morefoodURL}restaurants/popular-restaurants/`
        );
        const data = await response.data.data;
        return data;
      },
      staleTime: 100,
    });

    if (isLoading) {
      return (
        <div className="row gap-2">
          <Placeholder as="p" animation="glow" className="rounded w-25 me-2">
            <Placeholder xs={12} style={{ height: "10rem" }} />
          </Placeholder>
          <Placeholder as="p" animation="glow" className="rounded  w-25 me-2">
            <Placeholder xs={12} style={{ height: "10rem" }} />
          </Placeholder>
          <Placeholder as="p" animation="glow" className="rounded  w-25">
            <Placeholder xs={12} style={{ height: "10rem" }} />
          </Placeholder>
          <Placeholder as="p" animation="glow" className="rounded w-25 me-2">
            <Placeholder xs={12} style={{ height: "10rem" }} />
          </Placeholder>
        </div>
      );
    }

    if (isError) {
      return <div className="text-dynamic-white">Error: retriving</div>;
    }
  return (
    <div>
      {data && data.length !== 0 &&  <PopularresturantCarousel data={data} />}
    </div>
  );
}

export default PopularResturant