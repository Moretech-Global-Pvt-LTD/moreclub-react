import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoading: false,
  couponValueList:[],
  couponList:[],
  couponDetail:{},
  error: null,
};
export const couponReducer = createSlice({
  name: "couponReducer",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
      state.error = null;
    },
    couponValueSuccess: (state, { payload }) => {
      state.couponValueList = payload;
    },
    couponSuccess: (state, { payload }) => {
      state.couponList = payload;
    },
    couponDetailSuccess: (state, { payload }) => {
      state.couponDetail = payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  },
});

export const {
  setLoading,
  couponValueSuccess,
  couponSuccess,
  couponDetailSuccess,
  setError
} = couponReducer.actions;
export default couponReducer.reducer;
