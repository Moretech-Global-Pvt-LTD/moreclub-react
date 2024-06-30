import axios from 'axios';
import {baseURL} from "../../config/config"
import { setLoading, membershipSuccess, setError, planDetailSuccess  } from '../slices/membershipTypeSlice';
import { axiosInstance } from '../..';

export const loadMembershipType = () => async (dispatch) => {
    dispatch(setLoading(true));

    try {
        const response = await axios.get(`${baseURL}members/all/membership_type/`);
        
        dispatch(membershipSuccess(response.data.data));
        
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setError('Error fetching membership types'));
        dispatch(setLoading(false));
    }
};

export const load_plan_detail = (id) => async (dispatch) => {
    dispatch(setLoading(true));

    try {
        const response = await axios.get(`${baseURL}members/membership/type/${id}/`);
        
        dispatch(planDetailSuccess(response.data.data));
        
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setError('Error fetching plan details'));
        dispatch(setLoading(false));
    }
};


export const register_membership = (membership_type, payment_intent, plan_time) => async (dispatch) => {
    dispatch(setLoading(true));
    try{
        dispatch(setLoading(false));
        const res = await axiosInstance.post(`${baseURL}members/register/membership/`, {
            membership_type,
            payment_intent,
            plan_time
        });
        return res.data;
    }
    catch(error){
        dispatch(setError('Error fetching plan details'));
        dispatch(setLoading(false));
    }
}