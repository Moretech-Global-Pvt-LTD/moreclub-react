import { axiosInstance } from "../..";
import { baseURL } from "../../config/config";
import {
  setMethodCredentialsProvided,
  updateCardAccount,
  updatePaypalAccount,
  updateSwishAccount,
} from "../slices/WithDrawalSlice";

export const fetchMethodCredentials = () => async (dispatch) => {
  try {
    const res = await axiosInstance.get(`${baseURL}withdrawal/user/method/`);

    if (res.data.data) {
      await dispatch(updatePaypalAccount(res.data?.data?.paypal_accounts));

      await dispatch(updateCardAccount(res.data?.data?.card_accounts));

      await dispatch(updateSwishAccount(res.data?.data?.swisspay_accounts));

      dispatch(setMethodCredentialsProvided(true));
    } else {
      dispatch(setMethodCredentialsProvided(false));
    }
  } catch (err) {
    dispatch(setMethodCredentialsProvided(false));
  }
};
