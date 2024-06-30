import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    userStep: 1,
    businessStep:1,
  formData: {
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    user_type: "",
    country_code:"SE",
    country:"Sweden",
    phone_prefix: "+46",
    business_profile: {
      business_types: [],
      business_name: "",
      business_address: "",
      business_email: "",
      business_phone: "",
      business_registration_number: "",
      business_document:null
    },
    business_discount: [{
      business_type: "",
      discount: ""
    }]
  }
  };



export const registerReducer = createSlice({
  name: "registerReducer",
  initialState,
  reducers: {
      updateFormData: (state, action) => {
        state.formData = { ...state.formData, ...action.payload };
      },
      nextStep: (state) => {
        state.userStep += 1;
      },
      previousStep: (state) => {
        state.userStep -= 1;
      },
      currentStep:(state, action)=>{
        state.userStep = action.payload
      },
      currentBusinessStep:(state, action)=>{
        state.businessStep = action.payload
      },
      nextBusinessStep:(state, action)=>{
        state.businessStep  += 1;
      },
      prevBusinessStep:(state, action)=>{
        state.businessStep -= 1;
      }
  },
});

export const {
   updateFormData,
   nextStep,
   previousStep,
   currentStep,
   currentBusinessStep,
   prevBusinessStep,
   nextBusinessStep,
} = registerReducer.actions;
export default registerReducer.reducer;
