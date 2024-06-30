import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: null,
  membershipList:[],
  planDetail:{},
};
export const membershipTypeReducer = createSlice({
  name: "membershipTypeReducer",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
      state.error = null;
    },
    membershipSuccess: (state, { payload }) => {
      state.membershipList = payload;
    },
    planDetailSuccess: (state, { payload }) => {
      state.planDetail = payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setLoading,
  membershipSuccess,
  setError,
  planDetailSuccess,

} = membershipTypeReducer.actions;
export default membershipTypeReducer.reducer;
