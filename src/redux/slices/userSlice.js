import { createSlice } from "@reduxjs/toolkit";
import { setAccessToken, setRefressToken } from "../../utills/token";
import Cookies from "js-cookie";

const initialState = {
  user: null,
  isProcessing: false,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  access: Cookies.get("moretechglobal_access"),
  refresh: Cookies.get("moretechglobal_refresh"),
  message: null,
  profileUser: null,
  membershipType: null,
  isSuperAdmin: false,
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
      setAccessToken(payload.token)
      setRefressToken(payload.refresh)
         state.access = payload.token;
         state.refresh =payload.refresh;
      // state.access = sessionStorage.setItem(
      //   "moretechglobal_access",
      //   payload.token
      // );
      // state.refresh = sessionStorage.setItem(
      //   "moretechglobal_refresh",
      //   payload.refresh
      // );
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
      sessionStorage.setItem("username", action.payload.username);
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

    superAdmin: (state, { payload }) => { 
      state.isSuperAdmin = payload;
    },

    setMeta: (state, { payload }) => {
      state.meta = payload;
    },
    logMeOut: (state) => {
      Cookies.remove("moretechglobal_access");
      Cookies.remove("moretechglobal_refresh");

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
  superAdmin,
  setMessage,
  setMembershipType,
} = userRegister.actions;

export default userRegister.reducer;
