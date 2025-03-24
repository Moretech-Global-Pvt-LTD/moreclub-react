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
    businessQrinfoUpdate: (state, { payload }) => {
      if (
        state.businessQRInfo.length > 0 &&
        state.businessQRInfo.find((item) => item.business_type_name === payload.business_type_name)
      ) {
        state.businessQRInfo[
          state.businessQRInfo.findIndex((item) => item.business_type_name === payload.business_type_name)
        ] = payload;
      } else {
        state.businessQRInfo = [...state.businessQRInfo, payload];
       
      }
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
  businessQrinfoUpdate,
  businessProfileSucess
} = businessReducer.actions;
export default businessReducer.reducer;
