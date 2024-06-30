import { axiosInstance } from "../..";
import { baseURL } from "../../config/config";
import { setError, setLoading, setPermission } from "../slices/permissionSlice";

export const loadUserPermissions = () => async (dispatch) => {
  await dispatch(setLoading(true));
  try {
    const response = await axiosInstance.get(
      `${baseURL}permissions/list/`
    );
    await dispatch(setPermission(response.data.data));
    await dispatch(setLoading(false));
  } catch (error) {
    await dispatch(setError("Error fetching membership types"));
    await dispatch(setLoading(false));
  }
};
