import React from 'react'
import DashboardLayout from '../../../Layout/DashboardLayout';
import Divider from '../../../divider/Divider';
import FoodItemForm from './FoodItemForm';
import { useQuery } from '@tanstack/react-query';
import { morefoodURL } from '../../../../config/config';
import { axiosInstance } from '../../../..';
import { useParams } from 'react-router-dom';
import { Col, Placeholder, Row } from 'react-bootstrap';






const FoodItem = () => {
    const { res_id, cat_id, id , slug} = useParams();
    const { data, isLoading, isError } = useQuery({
      queryKey: [`Resturant SubMenu ${id}`],
      queryFn: async () => {
        const response = await axiosInstance.get(
          `${morefoodURL}moreclub/user/food/items/details/${cat_id}/${id}/${res_id}/`
        );
        const data = await response.data.data;
        return data;
      },
      staleTime: 100,
    });

     if (isLoading) {
       return (
         <DashboardLayout>
           <div className=" card row gap-2">
             <Placeholder as="p" animation="glow" className="rounded w-50 me-2">
              <Placeholder xs={12} style={{ height: "4rem" }} />
            </Placeholder>
            <Placeholder as="p" animation="glow" className="rounded  w-75 me-2">
              <Placeholder xs={12} style={{ height: "4rem" }} />
            </Placeholder>
            <Placeholder as="p" animation="glow" className="rounded  w-100">
              <Placeholder xs={12} style={{ height: "4rem" }} />
            </Placeholder>
           </div>
         </DashboardLayout>
       );
     }

     if (isError) {
       return <div className="text-dynamic-white">Error: retriving</div>;
     }

  return (
    <DashboardLayout>

      <Row>
        <Col xs={12} lg={8} xxl={6}>
          <FoodItemForm data={data} />
        </Col>
      </Row>
         
      <Divider />
    </DashboardLayout>
  );
}

export default FoodItem;