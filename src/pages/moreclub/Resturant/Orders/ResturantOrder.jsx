import React from 'react'
import { morefoodURL } from '../../../../config/config';
import { axiosInstance } from '../../../..';
import { useQuery } from '@tanstack/react-query';
import { useLocation,  useParams } from 'react-router-dom';
import DashboardLayout from '../../../../components/Layout/DashboardLayout';
import OrderCard from '../../../../components/Moreclub/Resturant/Orders/orderCard';
import { Placeholder, Table } from 'react-bootstrap';
import Divider from '../../../../components/divider/Divider';
import FilterComponent from '../../../../components/Moreclub/CommonComponents/FilterComponents';

const ResturantOrder = () => {
  const { res_id, slug } = useParams(); 

  const location = useLocation();

  // Read the search and date parameters directly from the URL
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q') || '';
  const filterDate = queryParams.get('date') || '';
  const orderStatus = queryParams.get('order_status') || '';
  const orderType = queryParams.get('order_type') || '';


  const OrderStatusType = ["Pending", "Cooked", "Delivered", "Cancalled", "Confirmed"]
  const OrderType = ["dine-here", "packed", "delivery"]

  const name = slug.replace("-", " ");
      const { data, isLoading, isError } = useQuery({
        queryKey: [`Resturant order ${res_id}`, searchQuery, filterDate, orderStatus, orderType],
        queryFn: async () => {
          const response = await axiosInstance.get(
            `${morefoodURL}moreclub/user/orders/${res_id}/?${queryParams.toString()}`
          );
          const data = await response.data.data;
          return data;
        },
        staleTime: 1000,
      });
  
  
    
     if (isLoading) {
       return (
         <DashboardLayout title={`${name} orders`}>
           <FilterComponent OrderStatusTypes={OrderStatusType} OrderTypes={OrderType} invalidatekey={[`Resturant order ${res_id}`, searchQuery, filterDate, orderStatus, orderType]}/>
             <Table responsive className="bg-white">
               <thead className="border-bottom-0">
                 <tr className="pricingcard-premium">
                   <th className="text-white">Order ID</th>
                   <th className="text-white">Date</th>
                   <th className="text-white">Customer Name</th>
                   <th className="text-white">Location</th>

                   <th className="text-white text-center">Order Status</th>
                   
                   {/* )} */}
                 </tr>
               </thead>
                
           </Table>
           <div className="row gap-2">

             <Placeholder as="p" animation="glow" className="rounded my-1 w-100">
               <Placeholder xs={12} style={{ height: "2rem" }} />
             </Placeholder>
             <Placeholder as="p" animation="glow" className="rounded my-2 w-100">
               <Placeholder xs={12} style={{ height: "2rem" }} />
             </Placeholder>
             <Placeholder as="p" animation="glow" className="rounded my-2 w-100">
               <Placeholder xs={12} style={{ height: "2rem" }} />
             </Placeholder>
             <Placeholder as="p" animation="glow" className="rounded my-2 w-100">
               <Placeholder xs={12} style={{ height: "2rem" }} />
             </Placeholder>
             <Placeholder as="p" animation="glow" className="rounded my-2 w-100">
               <Placeholder xs={12} style={{ height: "2rem" }} />
             </Placeholder>

           </div>
          
         </DashboardLayout>
       );
     }

     if (isError) {
       return <DashboardLayout title={`${name} orders`} className="text-dynamic-white">
         <FilterComponent OrderStatusTypes={OrderStatusType} OrderTypes={OrderType} invalidatekey={[`Resturant order ${res_id}`, searchQuery, filterDate, orderStatus, orderType]} />
         <Table responsive className="bg-white">
           <thead className="border-bottom-0">
             <tr className="pricingcard-premium">
               <th className="text-white">Order ID</th>
               <th className="text-white">Date</th>
               <th className="text-white">Customer Name</th>
               <th className="text-white">Location</th>

               <th className="text-white text-center">Order Status</th>
               
               {/* )} */}
             </tr>
           </thead>

         </Table>
         Error: retriving
       
       </DashboardLayout>;
     }


  return (
    <DashboardLayout title={`${name} orders`}>
      <FilterComponent OrderStatusTypes={OrderStatusType} OrderTypes={OrderType} invalidatekey={[`Resturant order ${res_id}`, searchQuery, filterDate, orderStatus, orderType]} />
      <Table responsive className="bg-white">
        <thead className="border-bottom-0">
          <tr className="pricingcard-premium">
            <th className="text-white">Order ID</th>
            <th className="text-white">Date</th>
            <th className="text-white">Customer Name</th>
            <th className="text-white">Location</th>

            <th className="text-white text-center">Order Status</th>
            
            {/* )} */}
          </tr>
          {data && data.length > 0 && data.map((row) => (
            <OrderCard item={row} key={row.id}  />
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan="5"  className="text-center text-dynamic-white align-middle " style={{ height: "8rem" }}>
                No Orders yet
              </td>
            </tr>
          )}
        </thead>

      </Table>
      <Divider/>
    </DashboardLayout>
  );
}

export default ResturantOrder