import { axiosInstance } from "../..";
import { morefoodURL } from "../../config/config";
import { fetchFoodItemsDetailSuccess, setFoodItemDetailError, setFoodItemDetailLoading } from "../slices/FoodItemDetailSlice";


const shouldRefresh = (lastFetched, maxAge = 5 * 60 * 1000) => {
    return !lastFetched || Date.now() - lastFetched > maxAge;
  };


  export const fetchFoodItemDetail = (id, res_id, forceRefresh = false) => async (dispatch, getState) => {
    const state = getState();
    const { foodItemDetail, foodItemLastDetailFetched, foodItemDetailLoading, foodItemId } = state.FoodDetail;
  
    // Check if food items are already loaded for this menu_id and if it should be refreshed
    if (foodItemId.includes(id) && !forceRefresh) {
      if (foodItemDetail[id] && !shouldRefresh(foodItemLastDetailFetched[id])) {
        return; // Skip the API call if food items are already loaded and not stale
      }
    }
  
    // Set loading state for this menu_id
    dispatch(setFoodItemDetailLoading({status: true, id }));
  
    try {
      const response = await axiosInstance.get(`${morefoodURL}moreclub/user/all/food/items/${res_id}/${id}/`);
      const foodItems = response.data.data;
  
      // Dispatch success to store the food items
      dispatch(fetchFoodItemsDetailSuccess({ id, foodItems }));
    } catch (error) {
      // Dispatch error if something went wrong
      dispatch(setFoodItemDetailError({ id, errors: error.message || "Failed to fetch food Detail" }));
    } finally {
      // Reset the loading state for this menu_id
      dispatch(setFoodItemDetailLoading({ status: false, id }));
    }
  };






 

  
  