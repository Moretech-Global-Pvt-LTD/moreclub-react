import { axiosInstance } from "../..";
import { baseURL } from "../../config/config";
import { setError, setLoading, setWallet, settransactionpinState } from "../slices/walletSlice";



export const checkTransactionPin =()=> async (dispatch) => {
    try {
      const res = await axiosInstance.get(
        `${baseURL}notifications/user/pin/alert/`
      );
      if (!res.data?.data?.status) {
        dispatch(settransactionpinState(false));
      }else{
        dispatch(settransactionpinState(true))
      }
    } catch (err) {
      dispatch(setError('Error fetching transaction pint detail'));
        dispatch(setLoading(false));
    }
  };


  export const getWallet= () => async (dispatch)=>{
    dispatch(setLoading(true))
      try {
        const res = await axiosInstance.get(`${baseURL}wallets/wallet/`);
        dispatch(setWallet(res.data.data))
      } catch (err) {
        dispatch(setError('Error fetching wallet info'));
        dispatch(setLoading(false));
       
      }
    };
  