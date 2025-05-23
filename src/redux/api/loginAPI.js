import axios from "axios";
import { baseURL, morefoodURL } from "../../config/config";
import { axiosInstance } from "../../index";
import {
  setLoading,
  setProcessing,
  setError,
  loginSuccess,
  userSuccess,
  setMessage,
  // removeMesage,
  userFail,
  logMeOut,
  superAdmin,
  // setVerified,
} from "../slices/userSlice";
import { userMembership } from "./userMembershipAPI";
import { getBusinessProfile } from "./userDetailAPI";
import { loadMembershipType } from "./membershipTypeAPI";
import { loadUserPermissions } from "./PermissionsAPI";
import { CurrencySet } from "./CurrencyConvertorAPI";
import { getAccessToken, removeToken, setAccessToken, setRefressToken } from "../../utills/token";
import { fetchNotifications } from "./notificationApi";
import { businessProfileSucess } from "../slices/businessSlice";
// import { setupNotifications } from "../../utills/firebase";

export const load_user = (allFetching = true) => async (dispatch) => {
  if (getAccessToken()) {
    dispatch(setLoading(true));
    try {
      const res = await axiosInstance.get(`${baseURL}auth/user/all/details/`);
      
      await dispatch(userSuccess(res.data?.data));
      if(allFetching){
        if(res.data.data.user_type === "BUSINESS"){
          await dispatch(getBusinessProfile());
        }
        await dispatch(isSuperAdmin());
        await dispatch(userMembership());
        await dispatch(loadMembershipType());
        await dispatch(CurrencySet());
        await dispatch(loadUserPermissions());
      }
      await dispatch(setLoading(false));
      await dispatch(fetchNotifications())
    } catch (err) {
      const error = err.response?.data?.code;
      console.log(error);
      if (err.response.data.detail === "Invalid token.") {
        removeToken();
        dispatch(userFail());
      }
      dispatch(userFail());
      dispatch(setLoading(false));
    }
  } else {
    dispatch(userFail());
    dispatch(setLoading(false));
  }
};


export const business_account = (accessToken) => async (dispatch) => {
  try{
    const res = await axios.get(`${baseURL}permissions/business/exist/`,{
      headers:{
        Authorization: `Bearer ${accessToken}`
      }
    });
    if(res.data.data.user_type === "BUSINESS"){
      localStorage.setItem("business_exists", res.data.data.business_exists);
    }
  }catch(err){
    console.log(err);
  }

}

export const login = (username, password ,next) => async (dispatch) => {
  dispatch(setProcessing(true));
  if (username && password) {
    try {
      const res = await axios.post(`${baseURL}auth/login/`, {
        username,
        password,
        return_url: next,
      });
      await dispatch(business_account(res.data.data.token));
      await dispatch(loginSuccess(res.data.data));
      await dispatch(load_user());
      await dispatch(setProcessing(false));
      // await setupNotifications()
      localStorage.removeItem("otp_username");
      return res;
    } catch (err) {
      dispatch(setError(err.response.data.non_field_errors[0]));
      dispatch(setProcessing(false));
      return err;
    }
  } else {
    dispatch(setError("All fields required"));
    dispatch(setProcessing(false));
  }
};

export const isSuperAdmin =()=> async (dispatch) => {
  try {
    const res = await axiosInstance.get(`${morefoodURL}permissions/station/owner/superuser/`);
    await dispatch(superAdmin(res.data.data));
  } catch (err) {
    if(err.response.status === 401) {
      await dispatch(superAdmin(false));
    }
  }
};

// export const verifyOTP = (otpPhoneEmail, otp) => async (dispatch) => {
//   if (otpPhoneEmail && otp) {
//     dispatch(setLoading(true));
//     try {
//       const res = await axios.post(`${baseURL}validateotp/`, {
//         phone_email: otpPhoneEmail,
//         otp: otp,
//       });
//       if (res.data.status) {
//         dispatch(setMessage(res.data.detail));
//       } else {
//         dispatch(setError(res.data.detail));
//       }
//       dispatch(setLoading(false));
//       return res.data.status;
//     } catch (err) {
//       dispatch(setLoading(false));
//     }
//   } else {
//     dispatch(setError("All fields required"));
//     dispatch(setLoading(false));
//   }
// };

// export const sendOTP = (phone_email) => async (dispatch) => {
//   if (phone_email) {
//     dispatch(setLoading(true));
//     try {
//       const res = await axios.post(`${baseURL}sendotp/`, {
//         phone_email: phone_email,
//       });
//       if (res.data.status) {
//         dispatch(setMessage(res.data.detail));
//         dispatch(setLoading(false));
//       } else {
//         dispatch(setError(res.data.detail));
//         dispatch(setLoading(false));
//       }
//     } catch (err) {
//       dispatch(setLoading(false));
//     }
//   } else {
//     dispatch(setError("All fields required"));
//     dispatch(setLoading(false));
//   }
// };

export const register =
  (data, reffer = null, bpms = null) =>
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      let Url;
      if (reffer) {
        Url = `${baseURL}auth/email/register/?referral=${reffer}`;
      } else if (bpms) {
        Url = `${baseURL}auth/email/register/?bpms=${bpms}`;
      } else {
        Url = `${baseURL}auth/email/register/`;
      }
      const res = await axios.post(
        Url,
        data
      );
      dispatch(setMessage("Account Created Successfully"));
      dispatch(setLoading(false));
      return res;
    } catch (err) {
      dispatch(setLoading(false));
      return err.response.data;
    }
  };

export const otpChangePasswordResend = (formData) => async (dispatch) => {
  try {
    console.log(formData);
    const res = await axios.post(`${baseURL}auth/resend-otp/forget/password/`, { username: formData.username,
      reset_type: formData.reset_type
     });
    return res;
  } catch (err) {
    return err.response;
  }
};

// export const otpVerify = (username, code , callbackUrl) => async (dispatch) => {
//   try {
//     const res = await axios.post(`${baseURL}auth/register/verify/`, {
//       username,
//       code,
//       return_url: callbackUrl
//     });
//     if (res.status === 200) {
//       setAccessToken(res.data.data.token);
//       setRefressToken(res.data.data.refresh_token);
      
      
//       localStorage.removeItem("otp_username");
//       await dispatch(load_user());
//       await dispatch(userMembership());
//       await dispatch(isSuperAdmin());
//       await dispatch(CurrencySet());
//       await dispatch(loadMembershipType());
//       await dispatch(getBusinessProfile());
//       // await setupNotifications();
//     }
//     return res;
//   } catch (err) {
//     return err.response.data;
//   }
// };

// phone otp resend at the register 
export const otpResend = (username) => async (dispatch) => {
  try {
    const res = await axios.post(`${baseURL}auth/resend/otp/phone/`, {
     phone_number: username,
    });
    return res;
  } catch (err) {
    return err.response.data;
  }
};

// phone otp verify at the register 
export const otpVerify = (username, code , callbackUrl) => async (dispatch) => {
  try {
    const res = await axios.post(`${baseURL}auth/otp/phone/verify/confirm/`, {
      phone_number: username,
      code,
      return_url: callbackUrl
    });
    if (res.status === 200) {
      setAccessToken(res.data.data.token);
      setRefressToken(res.data.data.refresh_token);
      
      
      localStorage.removeItem("otp_username");
      await dispatch(load_user());
      // await setupNotifications();
    }
    return res;
  } catch (err) {
    return err.response.data;
  }
};




// export const otpPhoneSend = (phone_number) => async (dispatch) => {
//   try {
//     const res = await axiosInstance.post(`${baseURL}auth/otp/phone/verify/`, {
//       phone_number,
//     });
//     return res;
//   } catch (err) {
//     return err;
//   }
// };

export const otpEmailResend = (phone_number) => async (dispatch) => {
  try {
    const res = await axiosInstance.post(`${baseURL}auth/resend-otp/`, {
      username:phone_number,
    });
    return res;
  } catch (err) {
    return err.response;
  }
};

export const otpEmailVerify = (email, code) => async (dispatch) => {
  try {
    const res = await axiosInstance.post(
      `${baseURL}auth/register/verify/`,
      {
        username:email,
        code,
      }
    );
    if (res.status === 200) {
      localStorage.removeItem("otp_phonenumber");
      await dispatch(load_user());
    }
    return res;
  } catch (err) {
    return err.response.data;
  }
};

export const logout = () => (dispatch) => {
  dispatch(logMeOut());
 
  // window.location.href = "/login";
  // redirect("/login");
};

export const update_profile = (formData) => async (dispatch) => {
  if (getAccessToken()) {
    dispatch(setLoading(true));
    try {
      const res = await axiosInstance.patch(
        `${baseURL}auth/user/all/details/`,
        formData
      );
      await dispatch(userSuccess(res.data.data));
      await dispatch(setLoading(false));
      return res.data;
    } catch (err) {
      const res = err.response.data;
      console.log(res);
      dispatch(userFail());
      dispatch(setLoading(false));
    }
  } else {
    dispatch(userFail());
    dispatch(setLoading(false));
  }
};

export const update_profile_picture = (formData) => async (dispatch) => {
  if (getAccessToken()) {
    dispatch(setLoading(true));
    try {
      const res = await axiosInstance.post(
        `${baseURL}auth/update/profile/picture/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      await dispatch(setLoading(false));
      await dispatch(load_user(false));
      return res.data.success;
    } catch (error) {
      dispatch(setLoading(false));
      return "error";
    }
  } else {
    dispatch(userFail());
    dispatch(setLoading(false));
  }
};

export const update_business_document = (formData) => async (dispatch) => {
  if (getAccessToken()) {
    dispatch(setLoading(true));
    try {
      const res = await axiosInstance.patch(
        `${baseURL}business/profile/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
     
      await dispatch(businessProfileSucess(res?.data?.data))
      await dispatch(setLoading(false));
      return res;
    } catch (error) {
      dispatch(setLoading(false));
    }
  } else {
    dispatch(userFail());
    dispatch(setLoading(false));
  }
};
export const update_business_detail = (formData) => async (dispatch) => {
  if (getAccessToken()) {
    dispatch(setLoading(true));
    try {
      const res = await axiosInstance.patch(
        `${baseURL}business/profile/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      await dispatch(businessProfileSucess(res?.data?.data))
      await dispatch(setLoading(false));
      return res.data.success;
    } catch (error) {
      dispatch(setLoading(false));
    }
  } else {
    dispatch(userFail());
    dispatch(setLoading(false));
  }
};

export const forget_password = (formData) => async () => {
  try {
    const res = await axios.post(`${baseURL}auth/password/reset/`, formData);

    return res;
  } catch (error) {

    return error.response;
  }
};

export const forget_password_otp_verify = (formData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axios.post(
      `${baseURL}auth/password/reset/confirm/`,
      formData
    );
    dispatch(setLoading(false));
    return res;
  } catch (error) {
    dispatch(setLoading(false));
  }
};

export const change_password = (formData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosInstance.post(
      `${baseURL}auth/password/change/`,
      formData
    );
    dispatch(setLoading(false));
    await dispatch(load_user());
    return res.data.success;
  } catch (error) {
    dispatch(setLoading(false));
  }
};

export const update_Kyc_document = (formData) => async (dispatch) => {
  if (getAccessToken()) {
    dispatch(setLoading(true));
    try {
      const res = await axiosInstance.patch(
        `${baseURL}kyc/documents/upload/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res;
    } catch (error) {
      dispatch(setLoading(false));
      return error.response;
    }
  } else {
    dispatch(userFail());
    dispatch(setLoading(false));
  }
};

export const upload_Kyc_document = (formData) => async (dispatch) => {
  if (getAccessToken()) {
    dispatch(setLoading(true));
    try {
      const res = await axiosInstance.post(
        `${baseURL}kyc/documents/upload/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return res;
    } catch (error) {
      dispatch(setLoading(false));

      return error.response;
    }
  } else {
    dispatch(userFail());
    dispatch(setLoading(false));
  }
};

export const forget_pin = (formData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosInstance.post(
      `${baseURL}auth/forget/user/pin/`,
      formData
    );
    dispatch(setLoading(false));

    return res;
  } catch (error) {
    dispatch(setLoading(false));
    return error.response;
  }
};

export const forget_pin_otp_verify = (formData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosInstance.post(
      `${baseURL}auth/verify/forget/user/pin/`,
      formData
    );
    dispatch(setLoading(false));
    return res;
  } catch (error) {
    dispatch(setLoading(false));
    return error.response;
  }
};
