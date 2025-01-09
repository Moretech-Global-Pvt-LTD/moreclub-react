import { axiosInstance } from "../.."; // Adjust the import based on your project structure
import { baseURL } from "../../config/config";
import { addNewNotifications, fetchNextPageSuccess, fetchNotificationsSuccess, markAllAsRead, setError, setLoading } from "../slices/notificationSlice";

export const fetchNotificationsApi = async (page = 1) => {
  const response = await axiosInstance.get(`${baseURL}notifications/notification/?page=${page}`);
  return response.data;
};

export const fetchNotifications = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const data = await fetchNotificationsApi(1);
    const notifications = data.data;
    const hasNextPage = !!data.meta.links.next;

    dispatch(fetchNotificationsSuccess({ notifications, hasNextPage }));
  } catch (error) {
    dispatch(setError(error.message || "Failed to fetch notifications"));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchNextPage = (currentPage) => async (dispatch) => {
  dispatch(setLoading(true));
  // console.log("function called");
  try {
    const nextPage = currentPage + 1;
    const data = await fetchNotificationsApi(nextPage);
    const notifications = data.data;
    const hasNextPage = !!data.meta.links.next;

    dispatch(fetchNextPageSuccess({ notifications, hasNextPage }));
  } catch (error) {
    dispatch(setError(error.message || "Failed to fetch next page of notifications"));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchNewNotifications = () => async (dispatch) => {
  try {
    const data = await fetchNotificationsApi(1); // Fetch page 1 periodically
    const notifications = data.data;
    dispatch(addNewNotifications({ notifications }));
  } catch (error) {
    console.error("Failed to fetch new notifications:", error);
  }
};

export const markAllAsReadApi = () => async (dispatch) => {
  try {
    const response = await axiosInstance.get(`${baseURL}notifications/notification/mark_as_read/`);
    if (response.status === 200) {
      dispatch(markAllAsRead());
    }
  } catch (error) {
    console.error("Failed to mark notifications as read:", error);
  }
};
