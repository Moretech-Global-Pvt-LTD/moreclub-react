import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoading: false,
  projectList:[],
  singleProject:{},
  error: null,
};
export const projectReducer = createSlice({
  name: "projectReducer",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
      state.error = null;
    },
    projectSuccess: (state, { payload }) => {
      state.projectList = payload;
    },
    projectDetailSuccess: (state, { payload }) => {
      state.singleProject = payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  },
});

export const {
  setLoading,
  projectSuccess,
  projectDetailSuccess,
  setError
} = projectReducer.actions;
export default projectReducer.reducer;
