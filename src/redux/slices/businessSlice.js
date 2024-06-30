import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoading: false,
  error: null,
  businessTypeList:[],
  businessProfile: {}
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
    businessProfileSucess: (state, { payload }) => {
      state.businessProfile = payload;
    },
  },
});

export const {
  setLoading,
  businessTypeSuccess,
  setError,
  businessProfileSucess
} = businessReducer.actions;
export default businessReducer.reducer;
