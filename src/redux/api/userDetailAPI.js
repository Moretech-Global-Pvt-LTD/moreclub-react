import axios from "axios";
import { baseURL } from "../../config/config";
import { axiosInstance } from "../../index";
import { businessProfileSucess, businessTypeSuccess, setError } from "../slices/businessSlice";


export const businessType = () => async (dispatch) =>{
  try {
    const res = await axios.get(`${baseURL}business/all/types/`);
    dispatch(businessTypeSuccess(res?.data?.data))
  } catch (err) {
    dispatch(setError(err?.response?.data));
  }
};

export const businessProfile =(data) => async (dispatch) => {
  try {
    const res = await axiosInstance.post(`${baseURL}business/profile/`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return res;
  } catch (err) {
    return err.response.data;
  }
};

export const getBusinessProfile =() => async (dispatch) => {
  try {
    const res = await axiosInstance.get(`${baseURL}business/profile/`);
    await dispatch(businessProfileSucess(res?.data?.data))
  } catch (err) {
    if(err.response.status === 403) {
      err.response.data.detail = "You do not have permission to perform this action.";
    }
    await dispatch(setError(err?.response?.data));
  }
};

