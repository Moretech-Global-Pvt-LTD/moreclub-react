import axios from "axios";
import { baseURL } from "../../config/config";
import {
  setLoading,
  couponValueSuccess,
  setError,
  // couponSuccess,
  couponDetailSuccess,
} from "../slices/couponSlice";
import { axiosInstance } from "../..";

export const loadCouponValue = (days) => async (dispatch) => {
  dispatch(setLoading(true)); 

  try {
    const response = await axios.get(`${baseURL}coupons/list/?days=${days}`);
    dispatch(couponValueSuccess(response.data.data));

    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError("Error fetching coupon value types"));
    dispatch(setLoading(false));
  }
};

export const load_coupon_detail = (id) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const response = await axios.get(`${baseURL}coupons/${id}/`);

    dispatch(couponDetailSuccess(response.data.data));

    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError("Error fetching plan details"));
    dispatch(setLoading(false));
  }
};

export const get_user_coupon_list = () => async (dispatch) => {
  try {
    const response = await axiosInstance.get(`${baseURL}coupons/user/list/`);
    dispatch(setLoading(false));
    return response;
  } catch (error) {
    dispatch(setError("Error fetching Coupon List"));
    dispatch(setLoading(false));
  }
};
