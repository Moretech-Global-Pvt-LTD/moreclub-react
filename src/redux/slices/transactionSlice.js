import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoading: false,
  error: null,
  transaction: [],
  pointTransaction:[],
  businessTransaction:[],
  businessCouponsTransaction:[],
  businessMembershipTransaction:[],
  userCouponsTransaction:[],
  BillingTransaction:[],
};
export const transactionReducer = createSlice({
  name: "transactionReducer",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
      state.error = null;
    },
    setTransaction: (state, { payload }) => {
      state.transaction = payload;
    },
    setPointTransaction: (state, { payload }) => {
      state.pointTransaction = payload;
    },
    setBusinessTransaction: (state, { payload }) => {
      state.businessTransaction = payload;
    },
    setBusinessCouponTransaction: (state, { payload }) => {
      state.businessCouponsTransaction = payload;
    },
    setBusinessMembershipTransaction: (state, { payload }) => {
      state.businessMembershipTransaction = payload;
    },
    setUserCouponsTransaction: (state, { payload }) => {
      state.userCouponsTransaction = payload;
    },
    setBillingTransaction: (state, { payload }) => {
      state.BillingTransaction = payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setLoading,
//   businessTypeSuccess,
setTransaction,
  setPointTransaction,
  setBusinessTransaction,
  setBusinessCouponTransaction,
  setBusinessMembershipTransaction,
  setUserCouponsTransaction,
  setBillingTransaction,
  setError,
} = transactionReducer.actions;
export default transactionReducer.reducer;
