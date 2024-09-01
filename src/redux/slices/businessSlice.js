import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoading: false,
  error: null,
  businessTypeList:[],
  businessProfile: {},
  businessQRInfo:[],
};
export const businessReducer = createSlice({
  name: "businessReducer",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
      state.error = null;
    },
    businessTypeSuccess: (state, { payload }) => {
      state.businessTypeList = payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    businessQRInfoSuccess: (state, { payload }) => {
      state.businessQRInfo = payload;
    },
    businessProfileSucess: (state, { payload }) => {
      state.businessProfile = payload;
    },
  },
});

export const {
  setLoading,
  businessTypeSuccess,
  setError,
  businessQRInfoSuccess,
  businessProfileSucess
} = businessReducer.actions;
export default businessReducer.reducer;
