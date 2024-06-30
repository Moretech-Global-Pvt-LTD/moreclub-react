import { baseURL } from "../../config/config";
import { axiosInstance } from "../../index";
import { setMembershipType, setError } from "../slices/userSlice";


export const userMembership =() => async (dispatch) => {
    try {
      const res = await axiosInstance.get(`${baseURL}members/user/membership/`);
      await dispatch(setMembershipType(res?.data?.data));
    } catch (err) {
      await dispatch(setError(err?.response?.data));
    }
  };