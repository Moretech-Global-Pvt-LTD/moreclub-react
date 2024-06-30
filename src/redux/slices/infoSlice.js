import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: null,
  meta: null,
  privacy: null,
  faq: null
};

const metaReducer = createSlice({
  name: "metaReducer",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    updateMeta: (state, action) => {
      state.meta = action.payload;
    },
    updatePrivacy: (state, action) => {
      state.privacy = action.payload;
    },
    updateFaq: (state, action) => {
      state.faq = action.payload;
    },
  },
});

export const {
  setLoading,
  setError,
  updateMeta,
  updatePrivacy,
  updateFaq,
} = metaReducer.actions;

export default metaReducer.reducer;