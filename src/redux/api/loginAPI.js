import axios from "axios";
import { baseURL } from "../../config/config";
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
  // setVerified,
} from "../slices/userSlice";
import { redirect } from "react-router-dom";
import { userMembership } from "./userMembershipAPI";
import { getBusinessProfile } from "./userDetailAPI";
import { loadMembershipType } from "./membershipTypeAPI";
import { loadUserPermissions } from "./PermissionsAPI";
import { CurrencySet } from "./CurrencyConvertorAPI";

export const load_user = () => async (dispatch) => {
  if (sessionStorage.getItem("moretechglobal_access")) {
    dispatch(setLoading(true));
    try {
      const res = await axiosInstance.get(`${baseURL}auth/user/all/details/`);
      await dispatch(userSuccess(res.data?.data));
      await dispatch(setLoading(false));
    } catch (err) {
      const error = err.response?.data?.code;
      if (err.response.data.detail === "Invalid token.") {
        sessionStorage.removeItem("moretechglobal_access");
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

export const login = (username, password ,next) => async (dispatch) => {
  dispatch(setProcessing(true));
  if (username && password) {
    try {
      const res = await axios.post(`${baseURL}auth/login/`, {
        username,
        password,
        return_url: next,
      });
      await dispatch(loginSuccess(res.data.data));
      await dispatch(load_user());
      await dispatch(loadMembershipType());
      await dispatch(CurrencySet());
      await dispatch(getBusinessProfile());
      await dispatch(loadUserPermissions());
      await dispatch(setProcessing(false));
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
        // {
        //   headers: {
        //     'Content-Type': 'multipart/form-data'
        //   }
        // }
      );
      //  const res =await fetch(`${baseURL}auth/email/register/`, {
      //     method: 'POST',
      //     body: data,
      //     // headers: {
      //     //   'Content-Type': 'multipart/form-data'
      //     // }
      //   })

      dispatch(setMessage("Account Created Successfully"));

      dispatch(setLoading(false));
      return res;
    } catch (err) {
      dispatch(setLoading(false));
      return err.response.data;
    }
  };

export const otpResend = (username) => async (dispatch) => {
  try {
    const res = await axios.post(`${baseURL}auth/resend-otp/`, {
      username,
    });
    return res;
  } catch (err) {
    return err.response.data;
  }
};

export const otpVerify = (username, code , callbackUrl) => async (dispatch) => {
  try {
    const res = await axios.post(`${baseURL}auth/register/verify/`, {
      username,
      code,
      return_url: callbackUrl
    });
    if (res.status === 200) {
      sessionStorage.setItem("moretechglobal_access", res.data.data.token);
      sessionStorage.setItem(
        "moretechglobal_refresh",
        res.data.data.refresh_token
      );
      // localStorage.setItem("moretechglobal_access", res.data.data.token);
      // localStorage.setItem(
      //   "moretechglobal_refresh",
      //   res.data.data.refresh_token
      // );
      localStorage.removeItem("otp_username");
      await dispatch(load_user());
      await dispatch(userMembership());
      await dispatch(CurrencySet());
      await dispatch(loadMembershipType());
      await dispatch(getBusinessProfile());
    }
    return res;
  } catch (err) {
    return err.response.data;
  }
};

export const otpPhoneSend = (phone_number) => async (dispatch) => {
  try {
    const res = await axiosInstance.post(`${baseURL}auth/otp/phone/verify/`, {
      phone_number,
    });
    return res;
  } catch (err) {
    return err.response.data;
  }
};

export const otpPhoneResend = (phone_number) => async (dispatch) => {
  try {
    const res = await axiosInstance.post(`${baseURL}auth/resend/otp/phone/`, {
      phone_number,
    });
    return res;
  } catch (err) {
    return err.response.data;
  }
};

export const otpPhoneVerify = (phone_number, code) => async (dispatch) => {
  try {
    const res = await axiosInstance.post(
      `${baseURL}auth/otp/phone/verify/confirm/`,
      {
        phone_number,
        code,
      }
    );
    if (res.status === 200) {
      localStorage.removeItem("otp_phonenumber");
      await dispatch(load_user());
      await dispatch(userMembership());
      await dispatch(CurrencySet());
      await dispatch(loadMembershipType());
      await dispatch(getBusinessProfile());
    }
    return res;
  } catch (err) {
    return err.response.data;
  }
};

export const logout = () => (dispatch) => {
  dispatch(logMeOut());
  redirect("/login");
};

export const update_profile = (formData) => async (dispatch) => {
  if (sessionStorage.getItem("moretechglobal_access")) {
    dispatch(setLoading(true));
    try {
      const res = await axiosInstance.patch(
        `${baseURL}auth/user/all/details/`,
        formData
      );
      await dispatch(userSuccess(res.data.data));
      await dispatch(load_user());
      await dispatch(loadMembershipType());
      await dispatch(CurrencySet());
      await dispatch(setLoading(false));
      return res.data;
    } catch (err) {
      const res = err.response.data;
      dispatch(userFail());
      dispatch(setLoading(false));
    }
  } else {
    dispatch(userFail());
    dispatch(setLoading(false));
  }
};

export const update_profile_picture = (formData) => async (dispatch) => {
  if (sessionStorage.getItem("moretechglobal_access")) {
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
      // dispatch(userSuccess(res.data.data));
      await dispatch(setLoading(false));
      await dispatch(load_user());
      await dispatch(loadMembershipType());
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
  if (sessionStorage.getItem("moretechglobal_access")) {
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
      // dispatch(userSuccess(res.data.data));
      await dispatch(setLoading(false));
      await dispatch(load_user());
      await dispatch(loadMembershipType());
      await dispatch(getBusinessProfile());
      await dispatch(CurrencySet());
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
  if (sessionStorage.getItem("moretechglobal_access")) {
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
      // dispatch(userSuccess(res.data.data));
      await dispatch(load_user());
      await dispatch(loadMembershipType());
      await dispatch(getBusinessProfile());
      await dispatch(setLoading(false));
      await dispatch();
      return res.data.success;
    } catch (error) {
      dispatch(setLoading(false));
    }
  } else {
    dispatch(userFail());
    dispatch(setLoading(false));
  }
};

export const forget_password = (formData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axios.post(`${baseURL}auth/password/reset/`, formData);
    dispatch(setLoading(false));

    return res.data.success;
  } catch (error) {
    dispatch(setLoading(false));
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
    await dispatch(userMembership());
    await dispatch(loadMembershipType());
    await dispatch(getBusinessProfile());
    return res.data.success;
  } catch (error) {
    dispatch(setLoading(false));
  }
};

export const update_Kyc_document = (formData) => async (dispatch) => {
  if (sessionStorage.getItem("moretechglobal_access")) {
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
  if (sessionStorage.getItem("moretechglobal_access")) {
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
