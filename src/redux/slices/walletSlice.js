import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoading: false,
  error: null,
  transactionpinStatus: null,
  wallet: {}
  
};
export const walletReducer = createSlice({
  name: "walletReducer",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
      state.error = null;
    },
    settransactionpinState: (state, { payload }) => {
      state.transactionpinStatus = payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
    setWallet: (state, { payload }) => {
      state.wallet = payload;
    },
  },
});

export const {
  setLoading,
  settransactionpinState,
  setError,
  setWallet
} = walletReducer.actions;
export default walletReducer.reducer;
