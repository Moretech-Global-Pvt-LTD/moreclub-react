import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  withdrawalStep: 1, 
  isLoading: false,
  error: null,
  withdrawalAmount: 0,
  currency: "",
  conversion: "",
  method: "",
  paypal:"",
  swiss:"",
  card:null,
  paypalAccount: null,
  swishAccount: null,
  CardAccount:null,
  methodCredentials: {},
  isMethodCredentialsProvided: false,
};

const withdrawalReducer = createSlice({
  name: "withdrawal",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setWithdrawalAmount: (state, action) => {
      state.withdrawalAmount = action.payload;
    },
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
    setConversion: (state, action) => {
      state.conversion = action.payload;
    },
    setMethod: (state, action) => {
      state.method = action.payload;
    },
    setMethodCredentials: (state, action) => {
      state.methodCredentials = action.payload;
    },
    setMethodCredentialsProvided: (state, action) => {
      state.isMethodCredentialsProvided = action.payload;
    },
    setPin: (state, action) => {
      state.pin = action.payload;
    },
    setWithdrawalStep : (state, action)=>{
      state.withdrawalStep = action.payload
    },
    setSwiss:(state, action)=>{
      state.swiss = action.payload
    },
    setPaypal:(state, action)=>{
      state.paypal = action.payload
    },
    setCard:(state, action)=>{
      state.card = action.payload
    },
    updatePaypalAccount:(state, action)=>{
      state.paypalAccount = action.payload
    },
    updateSwishAccount:(state, action)=>{
      state.swishAccount = action.payload
    },
    updateCardAccount:(state, action)=>{
      state.CardAccount = action.payload
    }
  },
});

export const {
  setLoading,
  setError,
  setWithdrawalAmount,
  setCurrency,
  setConversion,
  setMethod,
  setMethodCredentials,
  setMethodCredentialsProvided,
  setPin,
  setWithdrawalStep,
  setSwiss,
  setPaypal,
  setCard,
  updatePaypalAccount,
  updateSwishAccount,
  updateCardAccount
} = withdrawalReducer.actions;

export default withdrawalReducer.reducer;
