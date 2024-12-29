import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: localStorage.getItem("theme") || "dark",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setThemes: (state, action) => {
      state.theme = action.payload.theme;
    },
  },
});

export const { setThemes } = themeSlice.actions;

export default themeSlice.reducer;