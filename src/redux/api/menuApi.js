import { axiosInstance } from "../..";
import { morefoodURL } from "../../config/config";
import { addCuisine, addMenu, addVariationType, fetchCuisineSuccess, fetchFoodItemsSuccess, fetchMenuSuccess, fetchVariationTypeSuccess, setError, setFoodItemError, setFoodItemLoading, setLoading } from "../slices/MenuSlice";


const shouldRefresh = (lastFetched, maxAge = 5 * 60 * 1000) => {
    return !lastFetched || Date.now() - lastFetched > maxAge;
  };



  export const fetchMenus = (res_id, forceRefresh = false) => async (dispatch, getState) => {
    console.log("getting menus")
    const state = getState();
    const { menuLoaded, menuLastFetched, menuRestaurant_id } = state.menus;
  
    // If the menuRestaurant_id matches and we don't need a refresh, exit early
    if (menuRestaurant_id === res_id) {
        console.log("checking res_id")
      // Only skip if data is loaded and doesn't need a refresh
      if (menuLoaded && !shouldRefresh(menuLastFetched) && !forceRefresh) return;
    }
  
    // If the restaurant ID is different or data needs to be refreshed
    dispatch(setLoading({ loadingType: "menu", status: true }));
    console.log("fetching menus")
    try {
      const response = await axiosInstance.get(`${morefoodURL}moreclub/user/menus/${res_id}/`); // Replace with your actual API call
      const menus = response.data.data;
      console.log("menu response",menus);
      
      // Store menus in state upon successful API response
      dispatch(fetchMenuSuccess({ res_id, menus }));
    } catch (error) {
      // Handle any errors during the fetch
      dispatch(setError({ errorType: "menu", error: error.message || "Failed to fetch menus" }));
    } finally {
      // Stop the loading state once the API call is complete
      dispatch(setLoading({ loadingType: "menu", status: false }));
    }
  };

  
  export const fetchCuisines = (res_id, forceRefresh = false) => async (dispatch, getState) => {
    const state = getState();
    const { cuisineLoaded, cuisineLastFetched , cuisineRestaurant_id } = state.menus;
    if (cuisineRestaurant_id === res_id) {
        // Only skip if data is loaded and doesn't need a refresh
        if (cuisineLoaded && !shouldRefresh(cuisineLastFetched) && !forceRefresh) return;
      }

    dispatch(setLoading({ loadingType: "cuisine", status: true }));
    try {
      const response = await axiosInstance.get(`${morefoodURL}moreclub/user/cuisines/${res_id}/`); // Replace with your actual API call
      const cuisines = response.data.data;
  
      dispatch(fetchCuisineSuccess({res_id, cuisines}));
    } catch (error) {
      dispatch(setError({ errorType: "cuisine", error: error.message || "Failed to fetch cuisines" }));
    } finally {
      dispatch(setLoading({ loadingType: "cuisine", status: false }));
    }
  };



  export const fetchVariationtype = (res_id, forceRefresh = false) => async (dispatch, getState) => {
    const state = getState();
    const { variationTypeLoaded, variationTypeLastFetched, variationTypeRestaurant_id } = state.menus;
    if (variationTypeRestaurant_id === res_id) {
        // Only skip if data is loaded and doesn't need a refresh
        if (variationTypeLoaded && !shouldRefresh(variationTypeLastFetched) && !forceRefresh) return;
      }
    dispatch(setLoading({ loadingType: "variationType", status: true }));
    try {
      const response = await axiosInstance.get(`${morefoodURL}moreclub/user/variation/types/${res_id}/`); // Replace with your actual API call
      const variationTypes = response.data.data;
  
      dispatch(fetchVariationTypeSuccess({res_id, variationTypes}));
    } catch (error) {
      dispatch(setError({ errorType: "cuisine", error: error.message || "Failed to fetch cuisines" }));
    } finally {
      dispatch(setLoading({ loadingType: "variationType", status: false }));
    }
  };
  


  export const fetchFoodItems = (menu_id, res_id, forceRefresh = false) => async (dispatch, getState) => {
    const state = getState();
    const { foodItemList, foodItemLastFetched, foodItemLoading, foodItemMenuId } = state.menus;
  
    // Check if food items are already loaded for this menu_id and if it should be refreshed
    if (foodItemMenuId.includes(menu_id) && !forceRefresh) {
      if (foodItemList[menu_id] && !shouldRefresh(foodItemLastFetched[menu_id])) {
        return; // Skip the API call if food items are already loaded and not stale
      }
    }
  
    // Set loading state for this menu_id
    dispatch(setFoodItemLoading({status: true, menu_id }));
  
    try {
      const response = await axiosInstance.get(`${morefoodURL}moreclub/user/food/items/${menu_id}/${res_id}`);
      const foodItems = response.data.data;
  
      // Dispatch success to store the food items
      dispatch(fetchFoodItemsSuccess({ menu_id, foodItems }));
    } catch (error) {
      // Dispatch error if something went wrong
      dispatch(setFoodItemError({ menu_id, errors: error.message || "Failed to fetch food items" }));
    } finally {
      // Reset the loading state for this menu_id
      dispatch(setFoodItemLoading({ status: false, menu_id }));
    }
  };



  export const addMenus = (data, res_id) => async (dispatch) => {
    try {
      const response = await axiosInstance.post(`${morefoodURL}moreclub/user/menus/${res_id}/`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const menu = response.data.data;
      dispatch(addMenu({ menu }));
      return response
    } catch (error) {
      return error.response
    } 
  };


  export const addCuisines = (data, res_id) => async (dispatch) => {
    try {
      const response = await axiosInstance.post(`${morefoodURL}moreclub/user/cuisines/${res_id}/`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const menu = response.data.data;
      dispatch(addCuisine({ menu }));
      return response
    } catch (error) {
      return error.response
    } 
  };

  export const addVariationTypes = (data, res_id) => async (dispatch) => {
    try {
      const response = await axiosInstance.post(`${morefoodURL}moreclub/user/cuisines/${res_id}/`, data);
      const menu = response.data.data;
      dispatch(addVariationType({ menu }));
      return response
    } catch (error) {
      return error.response
    } 
  };
  
  