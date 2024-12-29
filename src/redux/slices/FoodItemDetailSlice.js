import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  foodItemDetail: {}, // Object to store food items keyed by menu_id
  foodItemDetailLoading: {},
  foodItemDetailError: {}, // Object to store errors keyed by menu_id
  foodItemLastDetailFetched: {}, // Track last fetch time by menu_id
  foodItemId: [], // Store the current menu_id being tracked
};

export const FoodDetailSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {

    setFoodItemDetailLoading: (state, { payload }) => {
      const { id, status } = payload;
      state.foodItemDetailLoading[id] = status;  
    },

    fetchFoodItemsDetailSuccess: (state, { payload }) => {
      const { id, foodItems } = payload; // Assuming payload contains menu_id and foodItems
      state.foodItemDetail[id] = foodItems;
      state.foodItemDetailLoading[id] = false;
      state.foodItemId = [...state.foodItemId, id];
      state.foodItemLastDetailFetched[id] = new Date().toISOString();
    },

    setFoodItemDetailError: (state, { payload }) => {
      const { id, errors } = payload; // Assuming payload contains menu_id and errors
      state.foodItemError[id] = errors;
      state.foodItemLoading = false;
    },
  },
});

export const {
  setFoodItemDetailLoading,
  fetchFoodItemsDetailSuccess,
  setFoodItemDetailError
  
} = FoodDetailSlice.actions;

export default FoodDetailSlice.reducer;
