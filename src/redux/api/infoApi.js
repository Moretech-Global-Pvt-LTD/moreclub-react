import axios from "axios"
import { baseURL } from "../../config/config"
import { setError, setLoading, updateMeta } from "../slices/infoSlice"


export const getMetadata = () => async (dispatch) =>{
    dispatch(setLoading(true))
    try{
      const res = await axios.get(`${baseURL}meta/company/information/`)
      dispatch(updateMeta(res.data.data))
    }catch(err){
      dispatch(setError(err))
    }finally{
        dispatch(setLoading(true));
    }
  }