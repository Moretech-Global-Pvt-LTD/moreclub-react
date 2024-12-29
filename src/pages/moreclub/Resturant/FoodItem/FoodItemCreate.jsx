import React, { useEffect } from 'react'
import RestaurantLayout from '../../../../components/Layout/RestaurantLayout'
import MenuForm from '../../../../components/Moreclub/Resturant/Menu/MenuForm'
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchCuisines, fetchMenus, fetchVariationtype } from '../../../../redux/api/menuApi';

const FoodItemCreate = () => {
  const { res_id } = useParams(); // Get the restaurant ID from URL (if applicable)
  const dispatch = useDispatch();
  

  useEffect(() => {
   if(res_id){
      dispatch(fetchMenus(res_id)); 
      dispatch(fetchCuisines(res_id));
      dispatch(fetchVariationtype(res_id));
   }
  }, [res_id, dispatch]);



  return (
  <RestaurantLayout>
    <MenuForm/>
  </RestaurantLayout>
  )
}

export default FoodItemCreate
