import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currencyDetail: {
    currencyCode: "EUR",
    symbol: "€",
  },
};

export const currencyReducer = createSlice({
  name: "currencyReducer",
  initialState,
  reducers: {
    setCurrency: (state, action) => {
      state.currencyDetail = action.payload;
    },
  },
});

export const { setCurrency } = currencyReducer.actions;
export default currencyReducer.reducer;
