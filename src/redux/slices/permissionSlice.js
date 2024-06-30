import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoading: true,
  error: null,
  permission:{
    "my_network": true,
    "my_wallet": true,
    "my_coupon": true,
    "transaction": true,
    "billing": true,
    "business_transaction": true,
    "business_profile": true,
    "business_qr_code": true,
    "download": true,
    "send_sms_refer": true
  },
};

export const permissionReducer = createSlice({
  name: "permissionReducer",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
      state.error = null;
    },
    setPermission: (state, { payload }) => {
      state.permission = payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setLoading,
  setError,
  setPermission
} = permissionReducer.actions;
export default permissionReducer.reducer;
