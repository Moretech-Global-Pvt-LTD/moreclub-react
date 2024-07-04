import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isProcessing: false,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  access: sessionStorage.getItem("moretechglobal_access"),
  refresh: sessionStorage.getItem("moretechglobal_refresh"),
  message: null,
  profileUser: null,
  membershipType: null,
};
export const userRegister = createSlice({
  name: "userRegister",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setProcessing: (state, action) => {
      state.isProcessing = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    loginSuccess: (state, { payload }) => {
      state.access = sessionStorage.setItem(
        "moretechglobal_access",
        payload.token
      );
      state.refresh = sessionStorage.setItem(
        "moretechglobal_refresh",
        payload.refresh
      );
      // state.access = localStorage.setItem(
      //   "moretechglobal_access",
      //   payload.token
      // );
      // state.refresh = localStorage.setItem(
      //   "moretechglobal_refresh",
      //   payload.refresh
      // );
      state.isAuthenticated = true;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    userSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    passwordChangeSuccess: (state, action) => {
      state.message = action.payload;
    },
    profileUserSuccess: (state, action) => {
      state.profileUser = action.payload;
      state.isAuthenticated = true;
    },
    removeMesage: (state) => {
      state.message = null;
    },
    removeError: (state) => {
      state.error = null;
    },
    userRegisterSuccess: (state, action) => {
      state.message =
        "Successfully registered ! Please activate account from mail.";
    },
    userFail: (state, { payload }) => {
      state.user = null;
      state.error = payload;
      state.isAuthenticated = false;
    },
    authSuccess: (state) => {
      state.isAuthenticated = true;
    },
    setMeta: (state, { payload }) => {
      state.meta = payload;
    },
    logMeOut: (state) => {
      sessionStorage.removeItem("moretechglobal_access");
      sessionStorage.removeItem("moretechglobal_refresh");

      // localStorage.removeItem("moretechglobal_access");
      state.user = null;
      state.access = null;
      state.isAuthenticated = false;
    },
    setMembershipType: (state, action) => {
      state.membershipType = action.payload;
    },
  },
});

export const {
  setLoading,
  setProcessing,
  loginSuccess,
  userSuccess,
  authFail,
  userFail,
  setMeta,
  removeMesage,
  removeError,
  authSuccess,
  userRegisterSuccess,
  logMeOut,
  profileUserSuccess,
  passwordChangeSuccess,
  setError,
  setMessage,
  setMembershipType,
} = userRegister.actions;

export default userRegister.reducer;
