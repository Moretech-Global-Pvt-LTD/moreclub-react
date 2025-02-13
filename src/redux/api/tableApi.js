"use client";

import { morefoodAuthenticatedAxios } from "../../utills/axios/morefoodaxios";
import { setLoading, setSections, setTableError} from "../slices/tableSlice";

const shouldRefresh = (lastFetched, maxAge = 5 * 60 * 1000)=> {
  return !lastFetched || Date.now() - new Date(lastFetched).getTime() > maxAge;
};

// Fetch Menus
export const fetchSections =
  (res_id, forceRefresh = false) => async (dispatch, getState) => {
    const { table } = getState();
    const { loading, tableRestaurant_id } = table;
    if (tableRestaurant_id === res_id && loading) {
      return; // Skip fetching if data is still on loading
    }
    dispatch(setLoading(true));

    try {
      const response = await morefoodAuthenticatedAxios.get(`moreclub/restaurant/${res_id}/section/`);
      dispatch(setSections({ Section: response.data.data , res_id }));
    } catch (error) {
      dispatch(setTableError(error.message || "Failed to fetch menus" ));
    } finally {
        dispatch(setLoading(false));
    }
  };
