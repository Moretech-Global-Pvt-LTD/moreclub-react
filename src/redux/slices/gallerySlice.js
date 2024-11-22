import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  userGalleryPending: [],
  userGalleryAccepted: [],
  restaurantGallery: [],
  pendingCount: 0,
  error: null,
};

const prependUniqueItems = (gallery, newItems) => {
  return [
    ...newItems.filter(
      (newItem) =>
        !gallery.some((existingItem) => existingItem.id === newItem.id)
    ),
    ...gallery,
  ];
};

export const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
      if (action.payload) state.error = null;
    },
    setUserGalleryPending: (state, { payload }) => {
      // Replace all items with unique ones
      state.userGalleryPending = payload.filter(
        (newItem) =>
          !state.userGalleryPending.some(
            (existingItem) => existingItem.id === newItem.id
          )
      );
      state.pendingCount = state.userGalleryPending.length;
    },
    setUserGalleryAccepted: (state, { payload }) => {
      // Replace all items with unique ones
      state.userGalleryAccepted = payload.filter(
        (newItem) =>
          !state.userGalleryAccepted.some(
            (existingItem) => existingItem.id === newItem.id
          )
      );
    },
    setRestaurantGallery: (state, { payload }) => {
      // Replace all items with unique ones
      state.restaurantGallery = payload
    },
    updateRestaurantGallery: (state, { payload }) => {
      // Replace all items with unique ones
      state.restaurantGallery = prependUniqueItems(state.restaurantGallery, payload);
    },

    deleteRestaurantGallery: (state, { payload }) => {
     
      const exists = state.restaurantGallery.some(
        (item) => item.id === payload
      );

      if(exists) {
      state.restaurantGallery = state.restaurantGallery.filter(
        (item) => item.id !== payload
      );
    }
    },

    addNewPendingItem: (state, { payload }) => {
      // Add to pending gallery only if unique
      const exists = state.userGalleryPending.some(
        (item) => item.id === payload.id
      );
      if (!exists) {
        state.userGalleryPending.unshift(payload);
        state.pendingCount += 1;
      }
    },
    approvePendingItem: (state, { payload }) => {
        // Remove the item from userGalleryPending
        state.userGalleryPending = state.userGalleryPending.filter(
          (item) => item.id !== payload.id
        );
      
        // Update the pending count
        state.pendingCount = state.userGalleryPending.length;
      
        // Check if the item already exists in userGalleryAccepted
        const exists = state.userGalleryAccepted.some(
          (item) => item.id === payload.id
        );
      
        // If not, add the item to the top of userGalleryAccepted
        if (!exists) {
          state.userGalleryAccepted.unshift(payload);
        }
      },
    deleteItem: (state, { payload }) => {
        // Remove from pending gallery
        state.userGalleryPending = state.userGalleryPending.filter(
          (item) => item.id !== payload.id
        );
        state.userGalleryAccepted = state.userGalleryAccepted.filter(
            (item) => item.id !== payload.id
          );
        state.pendingCount = state.userGalleryPending.length;       
      },

    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    resetGallery: (state) => {
      state.userGalleryPending = [];
      state.userGalleryAccepted = [];
      state.restaurantGallery = [];
      state.pendingCount = 0;
    },
  },
});

export const {
  setLoading,
  setUserGalleryPending,
  setUserGalleryAccepted,
  setRestaurantGallery,
  addNewPendingItem,
  approvePendingItem,
  updateRestaurantGallery,
  deleteRestaurantGallery,
  deleteItem,
  setError,
  resetGallery,
} = gallerySlice.actions;

export default gallerySlice.reducer;
