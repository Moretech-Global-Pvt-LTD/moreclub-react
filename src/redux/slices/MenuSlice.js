import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,

  menuList: [],
  menuRestaurant_id: null,
  menuLoading: false,
  menuError: null,
  menuLoaded: false,
  menuLastFetched: null, // Timestamp for auto-refresh

  variationTypeList: [],
  variationTypeRestaurant_id: null,
  variationTypeLoading: false,
  variationTypeError: null,
  variationTypeLoaded: false,
  variationTypeLastFetched: null,

  cuisineList: [],
  menuCuisineList:[],
  cuisineLoading: false,
  cuisineRestaurant_id: null,
  cuisineError: null,
  cuisineLoaded: false,
  cuisineLastFetched: null,

  foodItemList: {}, // Object to store food items keyed by menu_id
  foodItemLoading: {},
  foodItemError: {}, // Object to store errors keyed by menu_id
  foodItemLastFetched: {}, // Track last fetch time by menu_id
  foodItemMenuId: [], // Store the current menu_id being tracked
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      const { loadingType, status } = payload; // loadingType: 'menu', 'cuisine', or 'foodItem'
      if (loadingType && state[`${loadingType}Loading`] !== undefined) {
        state[`${loadingType}Loading`] = status;
      }
    },
    setFoodItemLoading: (state, { payload }) => {
      const { menu_id, status } = payload;
      state.foodItemLoading[menu_id] = status;  
    },

    fetchMenuSuccess: (state, { payload }) => {
      const { res_id, menus } = payload
      state.menuList = menus;
      state.menuRestaurant_id = res_id;
      state.menuLoading = false;
      state.menuLoaded = true;
      state.menuLastFetched = Date.now(); // Update last fetched timestamp
    },

    addMenu: (state, { payload }) => {
      const {menu } = payload
      state.menuList = [...state.menuList, menu];
    },


    updateMenu: (state, { payload }) => {
      const { menu } = payload;
    
      // Find the index of the existing menu in menuList
      const existingIndex = state.menuList.findIndex((item) => item.id === menu.id);
    
      if (existingIndex !== -1) {
        // Update the existing menu
        state.menuList[existingIndex] = menu;
      } else {
        // Add the new menu if not found
        state.menuList = [...state.menuList, menu];
      }    
    },
    removeMenu: (state, { payload }) => {
      const { id } = payload;
      state.menuList = state.menuList.filter((item) => item.id !== id);
    },
    

    addCuisine: (state, { payload }) => {
      console.log(payload)
      const {cuisine } = payload
      state.cuisineList = [...state.cuisineList, cuisine];
      state.menuCuisineList = [...state.menuCuisineList, {
        value: cuisine.id, 
        label: cuisine.name 
      }];
    },

   

    updateCuisine: (state, { payload }) => {
      const { cuisine } = payload;
    
      // Find the index of the existing cuisine in cuisineList
      const existingIndex = state.cuisineList.findIndex((item) => item.id === cuisine.id);
    
      if (existingIndex !== -1) {
        // Update the existing cuisine
        state.cuisineList[existingIndex] = cuisine;
      } else {
        // Add the new cuisine if not found
        state.cuisineList = [...state.cuisineList, cuisine];
      }
    
      // Update menuCuisineList similarly
      const menuCuisineIndex = state.menuCuisineList.findIndex((item) => item.value === cuisine.id);
    
      if (menuCuisineIndex !== -1) {
        // Update the existing value-label pair
        state.menuCuisineList[menuCuisineIndex] = {
          value: cuisine.id,
          label: cuisine.name,
        };
      } else {
        // Add the new value-label pair if not found
        state.menuCuisineList = [
          ...state.menuCuisineList,
          {
            value: cuisine.id,
            label: cuisine.name,
          },
        ];
      }
    },
    removeCuisine: (state, { payload }) => {
      const { id } = payload;
      state.cuisineList = state.cuisineList.filter((item) => item.id !== id);
      state.menuCuisineList = state.menuCuisineList.filter((item) => item.value !== id);
    },
    

    addVariationType: (state, { payload }) => {
      const {variationType } = payload
      state.variationTypeList = [...state.variationTypeList, variationType];
    },

    fetchVariationTypeSuccess: (state, { payload }) => {
      const { res_id, variationTypes } = payload
      state.variationTypeList = variationTypes;
      state.variationTypeRestaurant_id = res_id;
      state.variationTypeLoading = false;
      state.variationTypeLoaded = true;
      state.variationTypeLastFetched = Date.now(); // Update last fetched timestamp
    },

    fetchCuisineSuccess: (state, { payload }) => {
      const { res_id, cuisines } = payload
      state.cuisineList = cuisines;
      state.menuCuisineList = cuisines.map(item => ({
        value: item.id, // Assuming 'id' is the value you want
        label: item.name // Assuming 'name' is the label you want
      }));
      state.cuisineRestaurant_id = res_id;
      state.cuisineLoading = false;
      state.cuisineLoaded = true;
      state.cuisineLastFetched = Date.now(); // Update last fetched timestamp
    },

    fetchFoodItemsSuccess: (state, { payload }) => {
      const { menu_id, foodItems } = payload; // Assuming payload contains menu_id and foodItems
      state.foodItemList[menu_id] = foodItems;
      state.foodItemLoading[menu_id] = false;
      state.foodItemMenuId = [...state.foodItemMenuId, menu_id];
      state.foodItemLastFetched[menu_id] = new Date().toISOString();
    },

    setFoodItemError: (state, { payload }) => {
      const { menu_id, errors } = payload; // Assuming payload contains menu_id and errors
      state.foodItemError[menu_id] = errors;
      state.foodItemLoading = false;
    },

    setError: (state, { payload }) => {
      const { errorType, error } = payload; // errorType: 'menu', 'cuisine', or 'foodItem'
      if (errorType && state[`${errorType}Error`] !== undefined) {
        state[`${errorType}Error`] = error;
      }
    },
  },
});

export const {
  setLoading,
  setFoodItemLoading,
  fetchMenuSuccess,
  fetchVariationTypeSuccess,
  fetchCuisineSuccess,
  fetchFoodItemsSuccess,
  setFoodItemError,
  addMenu,
  updateMenu,
  removeMenu,
  addCuisine,
  updateCuisine,
  removeCuisine,
  addVariationType,
  setError,
} = menuSlice.actions;

export default menuSlice.reducer;
