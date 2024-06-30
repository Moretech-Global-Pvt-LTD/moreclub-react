
import { baseURL } from "../../config/config";
import { setBillingTransaction, setBusinessCouponTransaction, setBusinessTransaction, setPointTransaction, setTransaction, setBusinessMembershipTransaction, setError, setLoading } from "../slices/transactionSlice";
import { axiosInstance } from "../..";

export const get_transaction = () => async (dispatch) => {
    dispatch(setLoading(true));
    try { 
        const response = await axiosInstance.get(`${baseURL}billings/user/membership/transaction/list/`);
        dispatch(setTransaction(response.data.data));
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setError('Error fetching project details'));
        dispatch(setLoading(false));
    }
};

export const get_point_transaction = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await axiosInstance.get(`${baseURL}wallets/transaction/`);
        dispatch(setPointTransaction(response.data.data));
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setError('Error fetching project details'));
        dispatch(setLoading(false));
    }
};

export const get_Business_transaction = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await axiosInstance.get(`${baseURL}billings/business/transaction/list/`);
      
        dispatch(setBusinessTransaction(response.data.data));
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setError('Error fetching project details'));
        dispatch(setLoading(false));
    }
};

export const get_BusinessCoupon_transaction = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await axiosInstance.get(`${baseURL}billings/business/transaction/list/?types=coupon`);
       
        dispatch(setBusinessCouponTransaction(response.data.data));
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setError('Error fetching project details'));
        dispatch(setLoading(false));
    }
};

export const get_BusinessMembership_transaction = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await axiosInstance.get(`${baseURL}billings/business/transaction/list/?types=membership`);
       
        dispatch(setBusinessMembershipTransaction(response.data.data));
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setError('Error fetching project details'));
        dispatch(setLoading(false));
    }
};

export const get_UserCoupons_transaction = (couponId) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await axiosInstance.get(`${baseURL}coupons/transaction/${couponId}/`);
        dispatch(setLoading(false));
        return response.data;
    } catch (error) {
        dispatch(setError('Error fetching project details'));
        dispatch(setLoading(false));
    }
};

export const get_Billing_transaction = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await axiosInstance.get(`${baseURL}billings/business/list/`);
        dispatch(setBillingTransaction(response.data.data));
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setError('Error fetching project details'));
        dispatch(setLoading(false));
    }
};