import React from 'react'
import { morefoodURL } from '../../../../config/config';
import { axiosInstance } from '../../../..';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import DashboardLayout from '../../../../components/Layout/DashboardLayout';
import OrderCard from '../../../../components/Moreclub/Resturant/Orders/orderCard';
import { Table } from 'react-bootstrap';

const ResturantOrder = () => {
  const { res_id, slug } = useParams(); 
  const name = slug.replace("-", " ");
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
         <DashboardLayout>
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
         </DashboardLayout>
       );
     }

     if (isError) {
       return <div className="text-dynamic-white">Error: retriving</div>;
     }


  return (
    <DashboardLayout title={ `${name} orders`}>
      <Table responsive className="bg-white">
        <thead className="border-bottom-0">
          <tr className="pricingcard-premium">
            <th className="text-white">Order ID</th>
            <th className="text-white">Date</th>
            <th className="text-white">Customer Name</th>
            <th className="text-white">Location</th>

            <th className="text-white text-center">Order Status</th>
            <th className="text-white text-center">Action</th>
            {/* )} */}
          </tr>
          {data.map((row) => (
            <OrderCard item={row} key={row.id}  />
          ))}
        </thead>
      </Table>
    </DashboardLayout>
  );
}

export default ResturantOrder