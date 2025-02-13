import React, { useEffect } from 'react'
import RestaurantLayout from '../../../../components/Layout/RestaurantLayout'
import { useParams } from 'react-router-dom';
import RestaurantCardSkeleton from '../../../../components/Skeleton/RestaurantCardSkeleton';
import UniversalErrorbox from '../../../../components/Layout/UniversalErrorBox';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSections } from '../../../../redux/api/tableApi';
import TableOrderContent from './TableOrderContent';

const Tableorder = () => {
    const {res_id} = useParams()

    const section = useSelector((state) => state.table);  

    const dispatch = useDispatch();

  useEffect(() => {
    if (res_id) {
       dispatch(fetchSections(res_id));
    }
  }, [res_id, dispatch]);




  if (section.loading) {
    return (
        <RestaurantLayout>
                <RestaurantCardSkeleton />
            </RestaurantLayout>
    );
  }

  if (section.error) {
    return <RestaurantLayout>
        <UniversalErrorbox message="Something went wrong while fetching the Restaurant tables" 
        retry={["Restaurant tables and sections", res_id]}
        />
    </RestaurantLayout>
  }

    
  return (
    <RestaurantLayout>
      <TableOrderContent />
    </RestaurantLayout>
  )
}

export default Tableorder




