import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
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
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setCurrency, setLoading } = currencyReducer.actions;
export default currencyReducer.reducer;
