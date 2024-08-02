import React from 'react'
import { morefoodURL } from '../../../config/config';
import { axiosInstance } from '../../..';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import DashboardLayout from '../../../components/Layout/DashboardLayout';
import OrderCard from '../../../components/Moreclub/Resturant/orderCard';

const ResturantOrder = () => {
    const { res_id } = useParams(); 
      const { data, isLoading, isError } = useQuery({
        queryKey: [`Resturant order ${res_id}`],
        queryFn: async () => {
          const response = await axiosInstance.get(
            `${morefoodURL}moreclub/user/orders/${res_id}/`
          );
          const data = await response.data.data;
          return data;
        },
        staleTime: 10,
      });
    
     if (isLoading) {
       return (
         <div className="container">
           <div className="row gap-2">
             {/* <Placeholder as="p" animation="glow" className="rounded w-25 me-2">
              <Placeholder xs={12} style={{ height: "2rem" }} />
            </Placeholder>
            <Placeholder as="p" animation="glow" className="rounded  w-75 me-2">
              <Placeholder xs={12} style={{ height: "2rem" }} />
            </Placeholder>
            <Placeholder as="p" animation="glow" className="rounded  w-100">
              <Placeholder xs={12} style={{ height: "2rem" }} />
            </Placeholder>
            <Placeholder as="p" animation="glow" className="rounded w-25 me-2">
              <Placeholder xs={12} style={{ height: "2rem" }} />
            </Placeholder>
            <Placeholder as="p" animation="glow" className="rounded  w-75 me-2">
              <Placeholder xs={12} style={{ height: "2rem" }} />
            </Placeholder>
            <Placeholder as="p" animation="glow" className="rounded  w-100">
              <Placeholder xs={12} style={{ height: "2rem" }} />
            </Placeholder>
            <Placeholder as="p" animation="glow" className="rounded w-25 me-2">
              <Placeholder xs={12} style={{ height: "2rem" }} />
            </Placeholder>
            <Placeholder as="p" animation="glow" className="rounded  w-75 me-2">
              <Placeholder xs={12} style={{ height: "2rem" }} />
            </Placeholder>
            <Placeholder as="p" animation="glow" className="rounded  w-100">
              <Placeholder xs={12} style={{ height: "2rem" }} />
            </Placeholder> */}
           </div>
         </div>
       );
     }

     if (isError) {
       return <div className="text-dynamic-white">Error: retriving</div>;
     }


  return (
      <DashboardLayout>
          {data.map((items) => (
              <OrderCard item={items} />
              
          ))}
          
    </DashboardLayout>
  )
}

export default ResturantOrder