import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: null,
  purchaseAmount: 0,
  currency: "",
  convertedRate: 0
};

const purchaseReducer = createSlice({
  name: "purchaseReducer",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    updatePurchaseAmount: (state, action) => {
      state.purchaseAmount = action.payload;
    },
    setPurchaseCurrency: (state, action) => {
      state.currency = action.payload;
    },
    setPurchaseConversion: (state, action) => {
      state.convertedRate = action.payload;
    },
  },
});

export const {
  setLoading,
  setError,
  updatePurchaseAmount,
  setPurchaseCurrency,
  setPurchaseConversion,
} = purchaseReducer.actions;

export default purchaseReducer.reducer;
